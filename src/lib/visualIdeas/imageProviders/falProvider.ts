import { createFalClient, ApiError } from '@fal-ai/client'
import { createPlacementMask, createCentralMask, normalizePlantingType } from '../createPlacementMask'
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
// Prompt builder — inpainting-specific wording
// ---------------------------------------------------------------------------

function shrubSizeInstruction(): string {
  return (
    'Add a mature, full-sized garden shrub that fills most of the masked area. ' +
    'The shrub should be approximately knee to waist height — roughly 60–100 cm tall depending on perspective. ' +
    'It must have clear woody shrub structure with visible leafy volume, not a flat groundcover or grass clump.'
  )
}

function buildFalPrompt(input: ImageProviderInput): string {
  const { goalText, detectedIntent, selectedSpecies, hedgeForm, plantingType } = input
  const normalizedType = normalizePlantingType(plantingType)
  const speciesDescription = describeSpeciesListForImage(selectedSpecies)
  const speciesLabel = selectedSpecies.length > 0 ? selectedSpecies.join(' / ') : 'the selected plant'

  // ── Hedge form ────────────────────────────────────────────────────────────
  let hedgeFormInstruction = ''
  if (hedgeForm === 'raised_or_pleached_screen') {
    hedgeFormInstruction =
      `Show the ${speciesLabel} foliage mainly above 50 cm with visible trunks or stems below — ` +
      `a raised or pleached screen form with open space underneath.`
  } else if (hedgeForm === 'full_coverage_from_ground') {
    hedgeFormInstruction =
      `Show dense foliage right from ground level — full coverage from the base up, no gaps or bare stems.`
  }

  // ── Size / form instruction by planting type ──────────────────────────────
  let sizeInstruction: string
  if (normalizedType === 'shrubs') {
    sizeInstruction = shrubSizeInstruction()
  } else if (normalizedType === 'feature_tree') {
    sizeInstruction =
      'Show a mature, full-sized specimen tree with clear trunk and canopy, realistically integrated into the garden.'
  } else if (normalizedType === 'groundcovers') {
    sizeInstruction =
      'Show a low, spreading groundcover planting filling the masked area at ground level.'
  } else {
    sizeInstruction =
      'Show the planting as mature, full-sized, lush, healthy, and realistically integrated into the existing garden.'
  }

  // ── Negative instructions ─────────────────────────────────────────────────
  const negatives = [
    'Do not simply clone or duplicate nearby existing plants.',
    'Do not fill the mask with generic garden texture or a copied patch of the surrounding ground.',
    'Create the selected plant as a new, distinct plant with its own form and character.',
    normalizedType === 'shrubs' || normalizedType === 'feature_tree'
      ? 'Do not make the plant look like a grass clump or groundcover.'
      : '',
    'Do not add text labels, watermarks, arrows, or any overlay.',
    'Do not alter, recolour, or replace anything outside the white masked area.',
  ].filter(Boolean).join(' ')

  const lines = [
    // Mask instruction — the most important constraint, stated first
    'TASK: Fill ONLY the white masked area of the image with new planting. ' +
    'Preserve everything outside the mask exactly as it appears — ' +
    'sky, structures, paths, fences, existing trees, and all plants outside the mask must remain pixel-perfect and unchanged.',

    '',

    // Species — the primary creative instruction
    `SPECIES TO PLANT: ${speciesDescription}.`,
    `The plant in the masked area must look like ${speciesLabel} specifically — ` +
    `match its characteristic leaf shape, colour, texture, and natural growth habit.`,

    '',

    // Scale / form
    sizeInstruction,
    hedgeFormInstruction,

    '',

    // Context / goal
    goalText || detectedIntent
      ? `Garden goal: ${goalText || detectedIntent}.`
      : '',

    '',

    // Negatives
    negatives,
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
        maskBuffer = await createPlacementMask(
          originalBuffer,
          input.placementPoint,
          rawPlantingType,
        )
        console.log('[fal] Mask generated from placement point', {
          maskType,
          placementPoint: input.placementPoint,
          bytes: maskBuffer.byteLength,
        })
      } else {
        console.warn('[fal] No placement point — using central fallback mask')
        maskBuffer = await createCentralMask(originalBuffer, rawPlantingType)
        console.log('[fal] Central fallback mask generated', { maskType, bytes: maskBuffer.byteLength })
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[fal] Mask generation failed', { message: msg })
      return { imageBuffer: null, error: `Mask generation failed: ${msg}` }
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
