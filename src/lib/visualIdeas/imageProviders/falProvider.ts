import { createFalClient } from '@fal-ai/client'
import { createPlacementMask, createCentralMask } from '../createPlacementMask'
import { describeSpeciesListForImage } from '../describePlantForImage'
import type { ImageProvider, ImageProviderInput, ImageProviderResult } from './types'

const FAL_ENDPOINT = 'fal-ai/flux-pro/v1/fill'

// ---------------------------------------------------------------------------
// Prompt builder — inpainting-specific wording
// ---------------------------------------------------------------------------

function buildFalPrompt(input: ImageProviderInput): string {
  const {
    goalText,
    detectedIntent,
    selectedSpecies,
    hedgeForm,
    plantingType,
  } = input

  const speciesDescription = describeSpeciesListForImage(selectedSpecies)

  let hedgeInstructions = ''
  if (hedgeForm === 'raised_or_pleached_screen') {
    hedgeInstructions =
      `Show the ${selectedSpecies.join(' / ') || 'plants'} foliage mainly above 50 cm with visible trunks or stems below — a raised or pleached screen form with open space underneath.`
  } else if (hedgeForm === 'full_coverage_from_ground') {
    hedgeInstructions =
      `Show dense foliage right from ground level — full coverage from the base up, no visible gaps or bare stems.`
  }

  const sizeInstruction =
    'Show the planting as mature, full-sized, lush, healthy, and realistically integrated into the existing planting bed.'

  const lines = [
    `ONLY modify the white masked area of the image. Preserve everything outside the mask exactly as it appears — sky, structures, paths, fences, existing trees, and all existing plants outside the mask must remain unchanged.`,
    ``,
    `In the masked area, paint: ${speciesDescription}.`,
    sizeInstruction,
    hedgeInstructions,
    plantingType ? `Planting type: ${plantingType}.` : '',
    `Planting goal: ${goalText || detectedIntent}.`,
    ``,
    `Do NOT add text labels, watermarks, arrows, or any overlay. This is a realistic garden planting concept for visual inspiration only.`,
  ]

  return lines.filter(Boolean).join('\n')
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export class FalProvider implements ImageProvider {
  async generate(input: ImageProviderInput): Promise<ImageProviderResult> {
    const falKey = process.env.FAL_KEY
    if (!falKey) {
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
        return {
          imageBuffer: null,
          error: `Could not download original photo (HTTP ${res.status}).`,
        }
      }
      originalBuffer = Buffer.from(await res.arrayBuffer())
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      return { imageBuffer: null, error: `Could not download original photo: ${msg}` }
    }

    // 2. Generate mask
    let maskBuffer: Buffer
    const maskType = input.plantingType ?? 'fallback'
    try {
      if (input.placementPoint) {
        maskBuffer = await createPlacementMask(
          originalBuffer,
          input.placementPoint,
          input.plantingType,
        )
        console.log('[fal] Mask generated from placement point', {
          maskType,
          placementPoint: input.placementPoint,
        })
      } else {
        console.warn(
          '[fal] No placement point provided — using central fallback mask. ' +
          'Ask the user to mark a placement point for better results.',
        )
        maskBuffer = await createCentralMask(originalBuffer, input.plantingType)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      return { imageBuffer: null, error: `Mask generation failed: ${msg}` }
    }

    // 3. Build prompt
    const prompt = buildFalPrompt(input)

    // 4. Configure fal client and upload files
    const falClient = createFalClient({ credentials: falKey })

    let imageUrl: string
    let maskUrl: string
    try {
      const imageFile = new File([new Uint8Array(originalBuffer)], 'garden-photo.png', { type: 'image/png' })
      const maskFile = new File([new Uint8Array(maskBuffer)], 'mask.png', { type: 'image/png' })

      ;[imageUrl, maskUrl] = await Promise.all([
        falClient.storage.upload(imageFile),
        falClient.storage.upload(maskFile),
      ])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      return { imageBuffer: null, error: `Failed to upload images to fal storage: ${msg}` }
    }

    // 5. Call Flux Pro Fill inpainting endpoint
    let resultImageUrl: string
    try {
      console.log('[fal] Calling endpoint', FAL_ENDPOINT, {
        species: input.selectedSpecies,
        plantingType: input.plantingType,
        hasPlacementPoint: !!input.placementPoint,
      })

      const result = await falClient.subscribe(FAL_ENDPOINT, {
        input: {
          prompt,
          image_url: imageUrl,
          mask_url: maskUrl,
        },
      })

      // The result type is unknown — access safely
      const data = result?.data as Record<string, unknown> | undefined
      const images = data?.images as Array<{ url: string }> | undefined
      const firstImageUrl = images?.[0]?.url

      if (!firstImageUrl) {
        return {
          imageBuffer: null,
          error: 'fal.ai returned no image in the response.',
        }
      }

      resultImageUrl = firstImageUrl
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[fal] Endpoint call failed:', msg)
      return { imageBuffer: null, error: `fal.ai image generation failed: ${msg}` }
    }

    // 6. Download the generated image
    let imageBuffer: Buffer
    try {
      const res = await fetch(resultImageUrl)
      if (!res.ok) {
        return {
          imageBuffer: null,
          error: `Could not download fal.ai result image (HTTP ${res.status}).`,
        }
      }
      imageBuffer = Buffer.from(await res.arrayBuffer())
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      return { imageBuffer: null, error: `Failed to download fal.ai result: ${msg}` }
    }

    const durationMs = Date.now() - startedAt
    console.log('[fal] Generation complete', {
      provider: 'fal',
      endpoint: FAL_ENDPOINT,
      maskType,
      species: input.selectedSpecies,
      hasPlacementPoint: !!input.placementPoint,
      durationMs,
    })

    return { imageBuffer, error: null }
  }
}
