import OpenAI, { toFile } from 'openai'

/**
 * Builds the image edit prompt.
 * Emphasises what must be PRESERVED and what should be ADDED.
 */
export function buildEditPrompt({
  goalText,
  detectedIntent,
  selectedSpecies,
  hedgeForm,
}: {
  goalText: string
  detectedIntent: string
  selectedSpecies: string[]
  hedgeForm: string | null
}): string {
  const speciesLabel = selectedSpecies.length > 0
    ? selectedSpecies.join(', ')
    : 'suitable garden plants'

  let hedgeInstructions = ''
  if (hedgeForm === 'raised_or_pleached_screen') {
    hedgeInstructions =
      `Show the ${speciesLabel} foliage mainly above the lower 50cm with visible stems or trunks below — a raised or pleached form with open space underneath. ` +
      `If Titoki is selected, show glossy dark green Titoki foliage at roughly 2m tall with visible trunks below 50cm.`
  } else if (hedgeForm === 'full_coverage_from_ground') {
    hedgeInstructions =
      `Show dense ${speciesLabel} foliage right from ground level — full coverage from the base up with no visible gaps below.`
  }

  return [
    `IMPORTANT: This is a photo editing task. Work from the provided garden photo and make targeted additions only.`,
    ``,
    `KEEP UNCHANGED: the existing driveway, paths, road edge, large trees, tree ferns, trunks, lighting poles, structures, fences, sky, background, and overall perspective. Do not replace, recolour, or reposition any existing element.`,
    ``,
    `ADD ONLY: plant new ${speciesLabel} planting along the visible boundary or garden border area — only where there is currently bare soil, grass, or an empty edge. Do not plant over existing established plants or hard surfaces.`,
    ``,
    `Goal: "${goalText}". Planting intent: ${detectedIntent}.`,
    hedgeInstructions,
    ``,
    `Species visual reference: make the new planting look like ${speciesLabel} in leaf shape, colour, and texture. Approximate mature scale appropriate to the goal (roughly 1.5–2m tall for hedges).`,
    ``,
    `Do NOT add text labels, watermarks, signage, or arrows. This is a realistic garden planting concept for visual inspiration only.`,
  ].filter(Boolean).join('\n')
}

/**
 * Downloads the original garden photo and passes it as the input image to
 * `openai.images.edit()` with `gpt-image-1` and `input_fidelity: 'high'`.
 *
 * This is the PRIMARY path for Visual Ideas — the original photo IS sent to
 * OpenAI and the model edits it in-place rather than generating a new scene.
 *
 * Returns `{ b64Image, error }`. The caller should upload b64Image to storage.
 */
export async function editVisualConcept({
  originalPhotoUrl,
  goalText,
  detectedIntent,
  selectedSpecies,
  hedgeForm,
}: {
  originalPhotoUrl: string
  goalText: string
  detectedIntent: string
  selectedSpecies: string[]
  hedgeForm: string | null
}): Promise<{ b64Image: string | null; error: string | null }> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return {
      b64Image: null,
      error: 'Image generation is not configured. Add OPENAI_API_KEY to enable this feature.',
    }
  }

  // Download the original photo from Supabase storage
  let imageArrayBuffer: ArrayBuffer
  let mimeType: string
  try {
    const photoRes = await fetch(originalPhotoUrl)
    if (!photoRes.ok) {
      return { b64Image: null, error: `Could not download original photo (${photoRes.status}).` }
    }
    imageArrayBuffer = await photoRes.arrayBuffer()
    // Normalise MIME type to something the edit endpoint accepts
    const rawType = photoRes.headers.get('content-type') ?? ''
    if (rawType.includes('png')) {
      mimeType = 'image/png'
    } else if (rawType.includes('webp')) {
      mimeType = 'image/webp'
    } else {
      // HEIC and other formats are not supported; treat everything else as JPEG
      mimeType = 'image/jpeg'
    }
  } catch (err: any) {
    return { b64Image: null, error: `Could not download original photo: ${err.message}` }
  }

  try {
    const openai = new OpenAI({ apiKey })
    const prompt = buildEditPrompt({ goalText, detectedIntent, selectedSpecies, hedgeForm })

    // Convert ArrayBuffer to a named File object that the SDK can upload
    const imageFile = await toFile(imageArrayBuffer, 'garden-photo.jpg', { type: mimeType })

    const response = await openai.images.edit({
      model: 'gpt-image-1',
      image: imageFile,
      prompt,
      quality: 'medium',
      size: '1024x1024',
      // input_fidelity 'high' tells the model to maximally preserve the input
      // image's composition, perspective, and existing elements
      input_fidelity: 'high',
      n: 1,
    })

    const b64Image = response.data?.[0]?.b64_json ?? null
    if (!b64Image) {
      return { b64Image: null, error: 'Image editing returned no result.' }
    }

    return { b64Image, error: null }
  } catch (err: any) {
    console.error('Visual concept edit error:', err)
    return { b64Image: null, error: err.message || 'Image editing failed.' }
  }
}
