import OpenAI from 'openai'

export function buildConceptPrompt({
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
    : 'suitable garden species'

  let hedgeInstructions = ''
  if (hedgeForm === 'raised_or_pleached_screen') {
    hedgeInstructions =
      'If depicting a hedge or screen, show the foliage mainly above the lower 50cm with visible stems or trunks below — a raised or pleached form with some open space underneath.'
  } else if (hedgeForm === 'full_coverage_from_ground') {
    hedgeInstructions =
      'If depicting a hedge or screen, show dense foliage right from ground level — full coverage from the base up with no visible gaps below.'
  }

  return (
    `Using the uploaded garden photo as the compositional base, create a realistic visual concept ` +
    `showing ${speciesLabel} planted along the visible boundary or garden area. ` +
    `The gardener's goal: "${goalText}". Planting intent: ${detectedIntent}. ` +
    `Keep the driveway, existing trees, large ferns, trunks, road edge, structures, ` +
    `paths, lighting poles, and overall perspective unchanged — do not alter, remove, ` +
    `or reposition existing built or established elements. ` +
    `Plants should be approximately true-to-life scale, roughly 1.5–2m tall for hedges unless specified otherwise. ` +
    `${hedgeInstructions} ` +
    `Make the new planting visually resemble ${speciesLabel} in colour, leaf shape, texture, and form. ` +
    `Do not add text labels, watermarks, signage, or decorative overlays. ` +
    `This is a realistic garden planting concept for visual inspiration only.`
  ).trim()
}

/**
 * Generates a garden concept image using gpt-image-1.
 * Returns the raw base64-encoded PNG so the caller can upload it to
 * persistent storage (e.g. Supabase) rather than relying on a short-lived URL.
 * gpt-image-1 does not return URLs — only b64_json.
 *
 * If OPENAI_API_KEY is not set, returns a descriptive error rather than throwing.
 */
export async function generateVisualConcept({
  goalText,
  detectedIntent,
  selectedSpecies,
  hedgeForm,
}: {
  goalText: string
  detectedIntent: string
  selectedSpecies: string[]
  hedgeForm: string | null
  originalPhotoUrl?: string | null
}): Promise<{ b64Image: string | null; error: string | null }> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return {
      b64Image: null,
      error: 'Image generation is not configured. Add OPENAI_API_KEY to enable this feature.',
    }
  }

  try {
    const openai = new OpenAI({ apiKey })
    const prompt = buildConceptPrompt({ goalText, detectedIntent, selectedSpecies, hedgeForm })

    const response = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'medium',
    })

    const b64Image = response.data?.[0]?.b64_json ?? null
    if (!b64Image) {
      return { b64Image: null, error: 'Image generation returned no result.' }
    }

    return { b64Image, error: null }
  } catch (err: any) {
    console.error('Visual concept generation error:', err)
    return { b64Image: null, error: err.message || 'Image generation failed.' }
  }
}
