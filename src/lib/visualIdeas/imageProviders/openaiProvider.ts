import { editVisualConcept } from '../generateVisualConcept'
import type { ImageProvider, ImageProviderInput, ImageProviderResult } from './types'

export class OpenAIProvider implements ImageProvider {
  async generate(input: ImageProviderInput): Promise<ImageProviderResult> {
    const { b64Image, error } = await editVisualConcept({
      originalPhotoUrl: input.originalPhotoUrl,
      goalText: input.goalText,
      detectedIntent: input.detectedIntent,
      selectedSpecies: input.selectedSpecies,
      hedgeForm: input.hedgeForm,
      placementPoint: input.placementPoint,
    })

    if (error || !b64Image) {
      return { imageBuffer: null, error: error ?? 'Image editing returned no result.' }
    }

    return { imageBuffer: Buffer.from(b64Image, 'base64'), error: null }
  }
}
