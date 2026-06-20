import type { ImageProvider } from './types'
import { OpenAIProvider } from './openaiProvider'
import { FalProvider } from './falProvider'

export type { ImageProvider, ImageProviderInput, ImageProviderResult } from './types'

/**
 * Returns the configured image provider.
 *
 * Controlled by the VISUAL_IDEAS_IMAGE_PROVIDER environment variable:
 *   - "fal"    → fal.ai Flux Pro Fill inpainting (requires FAL_KEY)
 *   - anything else / unset → OpenAI gpt-image-1 (default, requires OPENAI_API_KEY)
 */
export function getImageProvider(): ImageProvider {
  const provider = (process.env.VISUAL_IDEAS_IMAGE_PROVIDER ?? '').toLowerCase().trim()

  if (provider === 'fal') {
    return new FalProvider()
  }

  return new OpenAIProvider()
}
