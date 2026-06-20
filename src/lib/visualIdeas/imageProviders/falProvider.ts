import { createFalClient, ApiError } from '@fal-ai/client'
import { createClient } from '@supabase/supabase-js'
import {
  createPlacementMask,
  createCentralMask,
  createDebugOverlay,
  normalizePlantingType,
  type MaskGeometry,
} from '../createPlacementMask'
import { describeSpeciesListForImage } from '../describePlantForImage'
import type { ImageProvider, ImageProviderInput, ImageProviderResult } from './types'

const FAL_ENDPOINT = 'fal-ai/flux-pro/v1/fill'

// ---------------------------------------------------------------------------
// Error helpers
// ---------------------------------------------------------------------------

interface FalErrorDetail {
  isApiError: boolean
  status?: number
  detail?: unknown
  message: string
}

function extractFalError(err: unknown): FalErrorDetail {
  if (err instanceof ApiError) {
    const body = err.body as Record<string, unknown> | null | undefined
    return {
      isApiError: true,
      status: err.status,
      detail: body?.detail ?? body ?? null,
      message: String(body?.detail ?? err.status ?? 'fal ApiError'),
    }
  }
  const message = err instanceof Error ? err.message : String(err)
  return { isApiError: false, message }
}

// ---------------------------------------------------------------------------
// Debug mask upload  (only runs when VISUAL_IDEAS_DEBUG_MASK=true)
// ---------------------------------------------------------------------------

async function uploadDebugAssets(
  maskBuffer: Buffer,
  originalBuffer: Buffer,
  geometry: MaskGeometry,
): Promise<void> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    console.warn('[fal][debug] Skipping debug upload — SUPABASE env vars missing')
    return
  }

  const admin = createClient(supabaseUrl, serviceKey)
  const ts = Date.now()
  const maskPath = `visual-ideas/debug-masks/mask-${ts}.png`
  const overlayPath = `visual-ideas/debug-masks/overlay-${ts}.jpg`

  // Upload mask
  const { error: maskErr } = await admin.storage
    .from('weed-images')
    .upload(maskPath, maskBuffer, { contentType: 'image/png', upsert: false })

  if (maskErr) {
    console.error('[fal][debug] Mask upload failed', { message: maskErr.message })
  } else {
    const { data: { publicUrl: maskUrl } } = admin.storage.from('weed-images').getPublicUrl(maskPath)
    console.log('[fal][debug] Mask URL', maskUrl)
  }

  // Build and upload overlay (resized JPEG to stay under storage size limits)
  try {
    const overlay = await createDebugOverlay(originalBuffer, geometry)
    const { error: overlayErr } = await admin.storage
      .from('weed-images')
      .upload(overlayPath, overlay.buffer, { contentType: 'image/jpeg', upsert: false })

    if (overlayErr) {
      console.error('[fal][debug] Overlay upload failed', { message: overlayErr.message })
    } else {
      const { data: { publicUrl: overlayUrl } } = admin.storage.from('weed-images').getPublicUrl(overlayPath)
      console.log('[fal][debug] Overlay URL', overlayUrl, {
        overlayWidth: overlay.width,
        overlayHeight: overlay.height,
      })
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[fal][debug] Overlay generation failed', { message: msg })
  }
}

// ---------------------------------------------------------------------------
// Prompt builder — inpainting-specific wording
// ---------------------------------------------------------------------------

function buildFalPrompt(input: ImageProviderInput): string {
  const { goalText, detectedIntent, selectedSpecies, hedgeForm, plantingType } = input
  const normalizedType = normalizePlantingType(plantingType)
  const speciesDescription = describeSpeciesListForImage(selectedSpecies)
  const speciesLabel = selectedSpecies.length > 0 ? selectedSpecies.join(' / ') : 'a garden plant'

  // ── Form instruction — short, positive, type-aware ────────────────────────
  let formInstruction: string
  if (normalizedType === 'shrubs') {
    formInstruction =
      `Fill the masked area with one clearly visible, healthy garden shrub. ` +
      `Use natural mid-to-dark green foliage — not black foliage. ` +
      `Show realistic woody branching and leafy volume, not a perfectly round artificial mound. ` +
      `Blend the plant naturally into the garden bed with a realistic contact shadow. ` +
      `Do not make the plant look like a copied nearby shrub.`
  } else if (normalizedType === 'feature_tree') {
    formInstruction = `Show a healthy specimen tree with a visible trunk and full canopy filling the masked area.`
  } else if (normalizedType === 'groundcovers') {
    formInstruction = `Show a low spreading groundcover plant filling the masked area at ground level.`
  } else if (normalizedType === 'hedge' || normalizedType === 'screening' || normalizedType === 'border_planting') {
    formInstruction = `Show dense, lush hedge planting filling the masked area.`
  } else {
    formInstruction = `Show a healthy, lush plant filling the masked area naturally.`
  }

  // ── Hedge form ────────────────────────────────────────────────────────────
  let hedgeFormInstruction = ''
  if (hedgeForm === 'raised_or_pleached_screen') {
    hedgeFormInstruction =
      `Show foliage mainly above 50 cm with visible trunks or stems below — raised or pleached form.`
  } else if (hedgeForm === 'full_coverage_from_ground') {
    hedgeFormInstruction = `Show dense foliage right from ground level with no gaps.`
  }

  const lines = [
    // 1. Primary action — stated first so the model leads with creation, not preservation
    `Add ${speciesLabel} to the white masked area of the image. ` +
    `The masked area should visibly contain the new plant after editing.`,

    '',

    // 2. Species identity
    `Plant species: ${speciesDescription}.`,
    `Match the characteristic leaf shape, colour, texture, and natural growth habit of ${speciesLabel}.`,

    '',

    // 3. Form
    formInstruction,
    hedgeFormInstruction,

    '',

    // 4. Goal context (brief)
    goalText || detectedIntent ? `Garden goal: ${goalText || detectedIntent}.` : '',

    '',

    // 5. Minimal constraints — only what matters
    `Keep everything outside the masked area exactly as it appears. ` +
    `Do not alter the sky, structures, paths, or existing plants outside the mask. ` +
    `Do not clone nearby plants. Do not add text or labels. ` +
    `Blend the new plant's lighting and shadows naturally with the scene.`,
  ]

  return lines.filter(Boolean).join('\n')
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export class FalProvider implements ImageProvider {
  async generate(input: ImageProviderInput): Promise<ImageProviderResult> {
    const falKey = process.env.FAL_KEY
    const falKeyPresent = !!falKey

    console.log('[fal] Starting generation', {
      provider: 'fal',
      endpoint: FAL_ENDPOINT,
      falKeyPresent,
    })

    if (!falKey) {
      console.error('[fal] FAL_KEY is missing — cannot proceed')
      return {
        imageBuffer: null,
        error: 'FAL_KEY environment variable is not set. Add it to enable fal.ai image generation.',
      }
    }

    const startedAt = Date.now()

    // 1. Download original photo
    let originalBuffer: Buffer
    try {
      const res = await fetch(input.originalPhotoUrl)
      if (!res.ok) {
        console.error('[fal] Original photo download failed', { httpStatus: res.status })
        return {
          imageBuffer: null,
          error: `Could not download original photo (HTTP ${res.status}).`,
        }
      }
      originalBuffer = Buffer.from(await res.arrayBuffer())
      console.log('[fal] Original photo downloaded', { bytes: originalBuffer.byteLength })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[fal] Original photo download threw', { message: msg })
      return { imageBuffer: null, error: `Could not download original photo: ${msg}` }
    }

    // 2. Generate mask
    let maskBuffer: Buffer
    let maskGeometry: MaskGeometry
    const rawPlantingType = input.plantingType ?? null
    const normalizedPlantingType = normalizePlantingType(rawPlantingType)
    const maskType = normalizedPlantingType ?? 'fallback'

    console.log('[fal] Planting type', {
      raw: rawPlantingType,
      normalized: normalizedPlantingType,
      maskType,
    })

    try {
      if (input.placementPoint) {
        const result = await createPlacementMask(originalBuffer, input.placementPoint, rawPlantingType)
        maskBuffer = result.maskBuffer
        maskGeometry = result.geometry
        console.log('[fal] Mask geometry (placement point)', {
          imageWidth: maskGeometry.imageWidth,
          imageHeight: maskGeometry.imageHeight,
          tapX: maskGeometry.tapX,
          tapY: maskGeometry.tapY,
          maskCx: maskGeometry.maskCx,
          maskCy: maskGeometry.maskCy,
          maskRx: maskGeometry.maskRx,
          maskRy: maskGeometry.maskRy,
          maskWidthPct: `${maskGeometry.maskWidthPct}%`,
          maskHeightPct: `${maskGeometry.maskHeightPct}%`,
          maskType,
          normalizedPlantingType,
        })
      } else {
        console.warn('[fal] No placement point — using central fallback mask')
        const result = await createCentralMask(originalBuffer, rawPlantingType)
        maskBuffer = result.maskBuffer
        maskGeometry = result.geometry
        console.log('[fal] Mask geometry (central fallback)', {
          imageWidth: maskGeometry.imageWidth,
          imageHeight: maskGeometry.imageHeight,
          maskCx: maskGeometry.maskCx,
          maskCy: maskGeometry.maskCy,
          maskRx: maskGeometry.maskRx,
          maskRy: maskGeometry.maskRy,
          maskWidthPct: `${maskGeometry.maskWidthPct}%`,
          maskHeightPct: `${maskGeometry.maskHeightPct}%`,
          maskType,
        })
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[fal] Mask generation failed', { message: msg })
      return { imageBuffer: null, error: `Mask generation failed: ${msg}` }
    }

    // Debug upload (fire-and-forget, does not block generation)
    if (process.env.VISUAL_IDEAS_DEBUG_MASK === 'true') {
      uploadDebugAssets(maskBuffer, originalBuffer, maskGeometry).catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err)
        console.error('[fal][debug] uploadDebugAssets threw', { message: msg })
      })
    }

    // 3. Build prompt
    const prompt = buildFalPrompt(input)

    // 4. Upload image and mask to fal storage
    const falClient = createFalClient({ credentials: falKey })

    let imageUrl: string
    let maskUrl: string
    try {
      console.log('[fal] Uploading image and mask to fal storage...')
      const imageFile = new File([new Uint8Array(originalBuffer)], 'garden-photo.png', { type: 'image/png' })
      const maskFile = new File([new Uint8Array(maskBuffer)], 'mask.png', { type: 'image/png' })

      ;[imageUrl, maskUrl] = await Promise.all([
        falClient.storage.upload(imageFile),
        falClient.storage.upload(maskFile),
      ])
      console.log('[fal] Storage upload succeeded', {
        imageUrl: imageUrl.slice(0, 60) + '…',
        maskUrl: maskUrl.slice(0, 60) + '…',
      })
    } catch (err: unknown) {
      const detail = extractFalError(err)
      console.error('[fal] Storage upload FAILED', {
        stage: 'storage_upload',
        isApiError: detail.isApiError,
        status: detail.status,
        detail: detail.detail,
        message: detail.message,
      })
      return {
        imageBuffer: null,
        error: `Failed to upload images to fal storage: ${detail.message}`,
      }
    }

    // 5. Call Flux Pro Fill inpainting endpoint
    let resultImageUrl: string
    try {
      console.log('[fal] Calling model endpoint', {
        endpoint: FAL_ENDPOINT,
        species: input.selectedSpecies,
        speciesDescriptor: describeSpeciesListForImage(input.selectedSpecies).slice(0, 120),
        maskType,
        hasPlacementPoint: !!input.placementPoint,
        promptLength: prompt.length,
      })

      const result = await falClient.subscribe(FAL_ENDPOINT, {
        input: {
          prompt,
          image_url: imageUrl,
          mask_url: maskUrl,
        },
      })

      const data = result?.data as Record<string, unknown> | undefined
      const images = data?.images as Array<{ url: string }> | undefined
      const firstImageUrl = images?.[0]?.url

      if (!firstImageUrl) {
        console.error('[fal] Model returned no image', { data })
        return { imageBuffer: null, error: 'fal.ai returned no image in the response.' }
      }

      resultImageUrl = firstImageUrl
      console.log('[fal] Model call succeeded', { resultImageUrl: resultImageUrl.slice(0, 60) + '…' })
    } catch (err: unknown) {
      const detail = extractFalError(err)
      console.error('[fal] Model subscribe FAILED', {
        stage: 'model_subscribe',
        endpoint: FAL_ENDPOINT,
        isApiError: detail.isApiError,
        status: detail.status,
        detail: detail.detail,
        message: detail.message,
      })
      return {
        imageBuffer: null,
        error: `fal.ai image generation failed: ${detail.message}`,
      }
    }

    // 6. Download the generated image
    let imageBuffer: Buffer
    try {
      const res = await fetch(resultImageUrl)
      if (!res.ok) {
        console.error('[fal] Result image download failed', { httpStatus: res.status })
        return {
          imageBuffer: null,
          error: `Could not download fal.ai result image (HTTP ${res.status}).`,
        }
      }
      imageBuffer = Buffer.from(await res.arrayBuffer())
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[fal] Result image download threw', { message: msg })
      return { imageBuffer: null, error: `Failed to download fal.ai result: ${msg}` }
    }

    const durationMs = Date.now() - startedAt
    console.log('[fal] Generation complete', {
      provider: 'fal',
      endpoint: FAL_ENDPOINT,
      rawPlantingType,
      normalizedPlantingType,
      maskType,
      species: input.selectedSpecies,
      hasPlacementPoint: !!input.placementPoint,
      durationMs,
    })

    return { imageBuffer, error: null }
  }
}
