export interface ImageProviderInput {
  originalPhotoUrl: string
  goalText: string
  detectedIntent: string
  selectedSpecies: string[]
  hedgeForm: string | null
  placementPoint: { x: number; y: number } | null
  /** One of: 'Hedge' | 'Screening' | 'Border planting' | 'Feature tree' | 'Shrubs' | 'Groundcovers' */
  plantingType?: string | null
}

export interface ImageProviderResult {
  /** PNG image buffer ready to upload */
  imageBuffer: Buffer | null
  error: string | null
}

export interface ImageProvider {
  generate(input: ImageProviderInput): Promise<ImageProviderResult>
}
