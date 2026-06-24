/**
 * Maps selected plant species / detected intent to a local transparent PNG or SVG
 * overlay asset. Used by the Quick Preview section on the Visual Ideas detail page.
 *
 * Assets live in public/plant-overlays/ and are produced by:
 *   npm run process:plant-overlays
 */

export interface OverlayAsset {
  key: string
  src: string
  /** Default width as a fraction of the container width (0–1). */
  defaultWidthFraction: number
  /** Aspect ratio: width / height. */
  aspect: number
}

/** Reference preview width used when tuning defaultWidthFraction from dev-overlay px sizes. */
const PREVIEW_REF_WIDTH = 900

function widthFraction(px: number): number {
  return px / PREVIEW_REF_WIDTH
}

const ASSETS: Record<string, OverlayAsset> = {
  hydrangea: {
    key: 'hydrangea',
    src: '/plant-overlays/hydrangea.png',
    defaultWidthFraction: widthFraction(220),
    aspect: 1,
  },
  'bird-of-paradise': {
    key: 'bird-of-paradise',
    src: '/plant-overlays/bird-of-paradise.png',
    defaultWidthFraction: widthFraction(260),
    aspect: 1,
  },
  nikau: {
    key: 'nikau',
    src: '/plant-overlays/nikau.png',
    defaultWidthFraction: widthFraction(320),
    aspect: 1,
  },
  hebe: {
    key: 'hebe',
    src: '/plant-overlays/hebe.png',
    defaultWidthFraction: widthFraction(180),
    aspect: 1,
  },
  'renga-renga-lily': {
    key: 'renga-renga-lily',
    src: '/plant-overlays/renga-renga-lily.png',
    defaultWidthFraction: widthFraction(220),
    aspect: 1,
  },
  clivia: {
    key: 'clivia',
    src: '/plant-overlays/clivia.png',
    defaultWidthFraction: widthFraction(200),
    aspect: 1,
  },
  'star-jasmine': {
    key: 'star-jasmine',
    src: '/plant-overlays/star-jasmine.png',
    defaultWidthFraction: widthFraction(260),
    aspect: 1,
  },
  flax: {
    key: 'flax',
    src: '/plant-overlays/flax.png',
    defaultWidthFraction: widthFraction(240),
    aspect: 1,
  },
  groundcover: {
    key: 'groundcover',
    src: '/plant-overlays/groundcover.png',
    defaultWidthFraction: widthFraction(160),
    aspect: 1,
  },
  ponga: {
    key: 'ponga',
    src: '/plant-overlays/ponga.png',
    defaultWidthFraction: widthFraction(280),
    aspect: 1,
  },
  lomandra: {
    key: 'lomandra',
    src: '/plant-overlays/lomandra.png',
    defaultWidthFraction: widthFraction(220),
    aspect: 4576 / 3056,
  },
  camellia: {
    key: 'camellia',
    src: '/plant-overlays/camellia_clean_transparent.png',
    defaultWidthFraction: widthFraction(200),
    aspect: 1,
  },
  // Legacy / category fallbacks — kept for saved concepts and non-approved species
  buxus: {
    key: 'buxus',
    src: '/plant-overlays/buxus.png',
    defaultWidthFraction: widthFraction(200),
    aspect: 1,
  },
  'buxus-hedge': {
    key: 'buxus-hedge',
    src: '/plant-overlays/buxus-hedge.png',
    defaultWidthFraction: widthFraction(340),
    aspect: 1,
  },
  'griselinia-hedge': {
    key: 'griselinia-hedge',
    src: '/plant-overlays/griselinia-hedge.png',
    defaultWidthFraction: widthFraction(340),
    aspect: 1,
  },
  'ficus-tuffy-hedge': {
    key: 'ficus-tuffy-hedge',
    src: '/plant-overlays/ficus-tuffy-hedge.png',
    defaultWidthFraction: widthFraction(340),
    aspect: 1,
  },
  hedge: {
    key: 'hedge',
    src: '/plant-overlays/hedge-section.svg',
    defaultWidthFraction: 0.42,
    aspect: 320 / 200,
  },
  'strappy-clump': {
    key: 'strappy-clump',
    src: '/plant-overlays/strappy-clump.svg',
    defaultWidthFraction: widthFraction(220),
    aspect: 200 / 250,
  },
  'rounded-shrub': {
    key: 'rounded-shrub',
    src: '/plant-overlays/rounded-shrub.svg',
    defaultWidthFraction: widthFraction(200),
    aspect: 200 / 230,
  },
}

/** Approved PNG overlays shown in the production Visualise plant chooser. */
export const APPROVED_OVERLAY_KEYS = new Set<string>([
  'hydrangea',
  'bird-of-paradise',
  'nikau',
  'hebe',
  'renga-renga-lily',
  'clivia',
  'star-jasmine',
  'flax',
  'groundcover',
  'ponga',
  'lomandra',
  'camellia',
])

const FALLBACK_ASSET: OverlayAsset = ASSETS['rounded-shrub']

/** Plants available in the simplified Visualise creation flow. */
export type GardenStyleFilter =
  | 'Subtropical'
  | 'Native'
  | 'Formal'
  | 'Cottage'
  | 'Coastal'
  | 'Low maintenance'

export type PlantTypeFilter =
  | 'Hedge / screening'
  | 'Shrub'
  | 'Tree'
  | 'Groundcover'
  | 'Grass / strappy plant'
  | 'Climber'

export type SunCondition = 'full sun' | 'part shade' | 'full shade'
export type MoistureCondition = 'dry' | 'average' | 'moist'
export type DrainageCondition = 'poor' | 'average' | 'well drained'
export type WindCondition = 'sheltered' | 'moderate' | 'exposed'

export type SuitabilityResult = 'good' | 'possible' | 'poor'

export interface PlantConditionProfile {
  sun: SunCondition[]
  moisture: MoistureCondition[]
  drainage: DrainageCondition[]
  wind: WindCondition[]
}

export interface CreateVisualPlantOption {
  name: string
  description: string
  notes: string
  detectedIntent: string
  style: string | null
  gardenStyles: GardenStyleFilter[]
  plantTypes: PlantTypeFilter[]
  conditions: PlantConditionProfile
}

export const GARDEN_STYLE_FILTERS: Array<GardenStyleFilter | 'Any'> = [
  'Any',
  'Subtropical',
  'Native',
  'Formal',
  'Cottage',
  'Coastal',
  'Low maintenance',
]

export const PLANT_TYPE_FILTERS: Array<PlantTypeFilter | 'Any'> = [
  'Any',
  'Hedge / screening',
  'Shrub',
  'Tree',
  'Groundcover',
  'Grass / strappy plant',
  'Climber',
]

export const CREATE_VISUAL_PLANT_OPTIONS: CreateVisualPlantOption[] = [
  {
    name: 'Hydrangea',
    description: 'Flowering shrub with bold seasonal blooms.',
    notes: 'Suits part shade borders and foundation planting.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Cottage', 'Formal', 'Coastal'],
    plantTypes: ['Shrub'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Bird of Paradise',
    description: 'Tropical upright plant with striking architectural form.',
    notes: 'Strong focal point for sunny sheltered spots.',
    detectedIntent: 'feature planting',
    style: 'Feature planting',
    gardenStyles: ['Subtropical', 'Coastal'],
    plantTypes: ['Shrub'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Nikau Palm',
    description: 'NZ native palm with a clean upright trunk and crown.',
    notes: 'Instant subtropical height and structure.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Native', 'Subtropical', 'Coastal'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['part shade'],
      moisture: ['moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Hebe',
    description: 'Compact evergreen shrub with tidy foliage.',
    notes: 'Reliable structure plant for borders and edges.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Native', 'Coastal', 'Low maintenance'],
    plantTypes: ['Shrub'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Renga Renga Lily',
    description: 'Strappy native clump with airy white summer flowers.',
    notes: 'Soft underplanting for shady borders.',
    detectedIntent: 'general planting',
    style: 'Border planting',
    gardenStyles: ['Native', 'Cottage', 'Low maintenance'],
    plantTypes: ['Grass / strappy plant'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Clivia',
    description: 'Shade-loving clump with bold strappy leaves and seasonal flowers.',
    notes: 'Excellent under trees and in dry shade.',
    detectedIntent: 'groundcover planting',
    style: 'Groundcovers',
    gardenStyles: ['Cottage', 'Subtropical', 'Low maintenance'],
    plantTypes: ['Groundcover', 'Grass / strappy plant'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['dry', 'average'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered'],
    },
  },
  {
    name: 'Star Jasmine',
    description: 'Evergreen climber with glossy leaves and fragrant flowers.',
    notes: 'Suits fences, pergolas, and sheltered walls.',
    detectedIntent: 'climber planting',
    style: 'Climbers',
    gardenStyles: ['Formal', 'Cottage', 'Subtropical'],
    plantTypes: ['Climber'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Lomandra',
    description: 'Compact grass-like clump. Tough and low maintenance.',
    notes: 'Good for borders, slopes, and mass planting.',
    detectedIntent: 'general planting',
    style: 'Border planting',
    gardenStyles: ['Native', 'Low maintenance', 'Coastal'],
    plantTypes: ['Grass / strappy plant'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['dry', 'average'],
      drainage: ['average', 'well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Agapanthus',
    description: 'Strappy clump with blue or white summer flowers.',
    notes: 'Hardy border and edge plant.',
    detectedIntent: 'general planting',
    style: 'Border planting',
    gardenStyles: ['Cottage', 'Low maintenance', 'Coastal'],
    plantTypes: ['Grass / strappy plant'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Camellia sasanqua',
    description: 'Flowering evergreen shrub with seasonal colour.',
    notes: 'Works as a specimen shrub or informal hedge.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Formal', 'Cottage'],
    plantTypes: ['Shrub', 'Hedge / screening'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Harakeke (New Zealand Flax)',
    description: 'Bold architectural NZ native with upright strap leaves.',
    notes: 'Strong vertical form for feature or screening.',
    detectedIntent: 'general planting',
    style: 'Feature tree',
    gardenStyles: ['Native', 'Coastal', 'Low maintenance', 'Subtropical'],
    plantTypes: ['Grass / strappy plant'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Phormium',
    description: 'Architectural flax with upright strappy foliage.',
    notes: 'Many sizes and foliage colours available.',
    detectedIntent: 'general planting',
    style: 'Feature tree',
    gardenStyles: ['Native', 'Coastal', 'Low maintenance', 'Subtropical'],
    plantTypes: ['Grass / strappy plant'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Pratia angulata',
    description: 'Low spreading groundcover with small white flowers.',
    notes: 'Suits edges, gaps, and underplanting.',
    detectedIntent: 'groundcover planting',
    style: 'Groundcovers',
    gardenStyles: ['Native', 'Cottage', 'Low maintenance'],
    plantTypes: ['Groundcover'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Tree Fern (Ponga)',
    description: 'Tall tree fern with spreading fronds.',
    notes: 'Instant subtropical structure and height.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Native', 'Subtropical'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
]

export interface SpotConditions {
  sun: SunCondition | 'not sure'
  moisture: MoistureCondition | 'not sure'
  drainage: DrainageCondition | 'not sure'
  wind: WindCondition | 'not sure'
}

export function plantMatchesSpotConditions(
  plant: CreateVisualPlantOption,
  spot: SpotConditions,
): boolean {
  if (spot.sun !== 'not sure' && !plant.conditions.sun.includes(spot.sun)) return false
  if (spot.moisture !== 'not sure' && !plant.conditions.moisture.includes(spot.moisture)) return false
  if (spot.drainage !== 'not sure' && !plant.conditions.drainage.includes(spot.drainage)) return false
  if (spot.wind !== 'not sure' && !plant.conditions.wind.includes(spot.wind)) return false
  return true
}

/** Filter preview plants by style, type, and optional garden conditions. */
export function filterVisualPlantOptions(
  options: CreateVisualPlantOption[],
  gardenStyle: GardenStyleFilter | 'Any',
  plantType: PlantTypeFilter | 'Any',
  spot?: SpotConditions,
): CreateVisualPlantOption[] {
  return options.filter((plant) => {
    const styleMatch =
      gardenStyle === 'Any' || plant.gardenStyles.includes(gardenStyle)
    const typeMatch =
      plantType === 'Any' || plant.plantTypes.includes(plantType)
    const conditionMatch = !spot || plantMatchesSpotConditions(plant, spot)
    return styleMatch && typeMatch && conditionMatch
  })
}

/**
 * Rough suitability check for the creation flow.
 * Returns null when no plant is selected or all condition fields are "not sure".
 */
export function checkPlantSuitability(
  plantName: string,
  spot: SpotConditions,
): SuitabilityResult | null {
  const plant = getCreateVisualPlantOption(plantName)
  if (!plant) return null

  const checks: Array<{ chosen: boolean; match: boolean }> = []

  if (spot.sun !== 'not sure') {
    checks.push({
      chosen: true,
      match: plant.conditions.sun.includes(spot.sun),
    })
  }
  if (spot.moisture !== 'not sure') {
    checks.push({
      chosen: true,
      match: plant.conditions.moisture.includes(spot.moisture),
    })
  }
  if (spot.drainage !== 'not sure') {
    checks.push({
      chosen: true,
      match: plant.conditions.drainage.includes(spot.drainage),
    })
  }
  if (spot.wind !== 'not sure') {
    checks.push({
      chosen: true,
      match: plant.conditions.wind.includes(spot.wind),
    })
  }

  if (checks.length === 0) return null

  const mismatches = checks.filter((c) => !c.match).length
  const matches = checks.filter((c) => c.match).length

  if (mismatches === 0 && matches > 0) return 'good'
  if (mismatches >= 2) return 'poor'
  if (mismatches === 1) return 'possible'
  return 'possible'
}

export function suitabilityLabel(result: SuitabilityResult): string {
  switch (result) {
    case 'good':
      return 'Looks like a good fit'
    case 'possible':
      return 'Possible fit — check details before planting'
    case 'poor':
      return 'May not suit this spot'
  }
}

export function suitabilityTone(result: SuitabilityResult): string {
  switch (result) {
    case 'good':
      return 'bg-green-50 border-green-100 text-green-800'
    case 'possible':
      return 'bg-amber-50 border-amber-100 text-amber-800'
    case 'poor':
      return 'bg-red-50 border-red-100 text-red-700'
  }
}

/** Build suggested_species payload from the creation-flow plant list. */
export function createVisualPlantSuggestions(): Array<{ name: string; description: string; notes: string }> {
  return PREVIEW_PLANT_OPTIONS.map(({ name, description, notes }) => ({
    name,
    description,
    notes,
  }))
}

/** Find a creation-flow plant option by name. */
export function getCreateVisualPlantOption(name: string): CreateVisualPlantOption | undefined {
  return CREATE_VISUAL_PLANT_OPTIONS.find((p) => p.name === name)
}

/** Species-name matching rules, tested in priority order. */
const SPECIES_RULES: Array<{ pattern: RegExp; assetKey: string }> = [
  { pattern: /hydrangea/i,                                              assetKey: 'hydrangea' },
  { pattern: /bird of paradise|strelitzia/i,                           assetKey: 'bird-of-paradise' },
  { pattern: /nikau/i,                                                 assetKey: 'nikau' },
  { pattern: /hebe|koromiko/i,                                         assetKey: 'hebe' },
  { pattern: /renga.?renga|arthropodium/i,                             assetKey: 'renga-renga-lily' },
  { pattern: /clivia/i,                                                assetKey: 'clivia' },
  { pattern: /star jasmine|trachelospermum/i,                          assetKey: 'star-jasmine' },
  { pattern: /phormium|flax|astelia|harakeke|nz flax/i,                assetKey: 'flax' },
  { pattern: /ponga|tree.?fern|dicksonia|cyathea/i,                    assetKey: 'ponga' },
  { pattern: /camellia/i,                                              assetKey: 'camellia' },
  { pattern: /griselinia/i,                                              assetKey: 'griselinia-hedge' },
  { pattern: /ficus tuff|ficus tuffy|ficus tuffi/i,                      assetKey: 'ficus-tuffy-hedge' },
  { pattern: /buxus|box hedge|boxwood/i,                                 assetKey: 'buxus-hedge' },
  { pattern: /lomandra|carex|libertia|dietes|agapanthus/i,             assetKey: 'lomandra' },
  { pattern: /groundcover|ground.?cover|pratia|muehlenbeckia|coprosma/i, assetKey: 'groundcover' },
  // Legacy / category fallbacks for saved concepts and unmatched species
  { pattern: /titoki/i,                                                 assetKey: 'hedge' },
]

/** Detected-intent matching rules. */
const INTENT_RULES: Array<{ pattern: RegExp; assetKey: string }> = [
  { pattern: /climber/i,                      assetKey: 'star-jasmine' },
  { pattern: /hedge|screen/i,                 assetKey: 'hedge' },
  { pattern: /ponga|tree.?fern|palm/i,       assetKey: 'ponga' },
  { pattern: /flax|phormium/i,                assetKey: 'flax' },
  { pattern: /groundcover|ground.?cover/i,   assetKey: 'groundcover' },
  { pattern: /feature tree/i,                  assetKey: 'nikau' },
  { pattern: /shrub/i,                        assetKey: 'camellia' },
  { pattern: /general planting|border/i,      assetKey: 'lomandra' },
]

/**
 * Returns an overlay asset by its key. Falls back to rounded-shrub if the key
 * is unknown (e.g. an old saved value that no longer maps to a file).
 */
export function getAssetByKey(key: string): OverlayAsset {
  return ASSETS[key] ?? FALLBACK_ASSET
}

/**
 * Resolves the best overlay asset for the current Visual Ideas state.
 *
 * Priority:
 *   1. First selected species that matches a rule
 *   2. All suggested (unselected) species names (first match wins)
 *   3. Detected intent
 *   4. Fallback: rounded-shrub SVG
 */
export function resolveOverlayAsset(
  selectedSpecies: string[],
  detectedIntent: string | null,
  suggestedSpeciesNames?: string[],
): OverlayAsset {
  const allSpecies = [
    ...selectedSpecies,
    ...(suggestedSpeciesNames ?? []),
  ]

  for (const name of allSpecies) {
    for (const rule of SPECIES_RULES) {
      if (rule.pattern.test(name)) {
        return ASSETS[rule.assetKey] ?? FALLBACK_ASSET
      }
    }
  }

  if (detectedIntent) {
    for (const rule of INTENT_RULES) {
      if (rule.pattern.test(detectedIntent)) {
        return ASSETS[rule.assetKey] ?? FALLBACK_ASSET
      }
    }
  }

  return FALLBACK_ASSET
}

/** Production Visualise chooser — approved dedicated PNG overlays only. */
export const PREVIEW_PLANT_OPTIONS: CreateVisualPlantOption[] = CREATE_VISUAL_PLANT_OPTIONS.filter(
  (plant) => APPROVED_OVERLAY_KEYS.has(resolveOverlayAsset([plant.name], plant.detectedIntent).key),
)

/** Default normalised row span for hedge/row previews. */
export const DEFAULT_ROW_WIDTH = 0.55

/** Plants available as a hedge/row preview (screening hedges with dedicated PNG assets). */
export const ROW_PREVIEW_PLANT_OPTIONS: Array<{ name: string; detectedIntent: string }> = [
  { name: 'Griselinia Hedge', detectedIntent: 'hedge/screening' },
  { name: 'Ficus Tuffy Hedge', detectedIntent: 'hedge/screening' },
  { name: 'Buxus Hedge', detectedIntent: 'shrub planting' },
  { name: 'Titoki', detectedIntent: 'hedge/screening' },
]

const ROW_PREVIEW_PLANT_NAMES = new Set(ROW_PREVIEW_PLANT_OPTIONS.map((p) => p.name))

export function supportsRowPreview(plantName: string): boolean {
  return ROW_PREVIEW_PLANT_NAMES.has(plantName)
}

// TODO: Future hedge mode — support linear metres, desired height, trim frequency,
// and calendar duration estimates.
