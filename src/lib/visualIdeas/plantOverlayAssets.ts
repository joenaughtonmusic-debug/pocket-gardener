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
    src: '/plant-overlays/camellia.png',
    defaultWidthFraction: widthFraction(200),
    aspect: 1,
  },
  'camellia-legacy': {
    key: 'camellia-legacy',
    src: '/plant-overlays/camellia_clean_transparent.png',
    defaultWidthFraction: widthFraction(200),
    aspect: 1,
  },
  'corokia-geentys-green': {
    key: 'corokia-geentys-green',
    src: '/plant-overlays/corokia-geentys-green.png',
    defaultWidthFraction: widthFraction(200),
    aspect: 1,
  },
  'corokia-virgata': {
    key: 'corokia-virgata',
    src: '/plant-overlays/corokia-virgata.png',
    defaultWidthFraction: widthFraction(220),
    aspect: 1,
  },
  'english-holly': {
    key: 'english-holly',
    src: '/plant-overlays/english-holly.png',
    defaultWidthFraction: widthFraction(240),
    aspect: 1,
  },
  'boston-ivy': {
    key: 'boston-ivy',
    src: '/plant-overlays/boston-ivy.png',
    defaultWidthFraction: widthFraction(260),
    aspect: 1,
  },
  'canna-lily': {
    key: 'canna-lily',
    src: '/plant-overlays/canna-lily.png',
    defaultWidthFraction: widthFraction(220),
    aspect: 1,
  },
  'cherry-tree': {
    key: 'cherry-tree',
    src: '/plant-overlays/cherry-tree.png',
    defaultWidthFraction: widthFraction(300),
    aspect: 1,
  },
  'cordyline-stricta': {
    key: 'cordyline-stricta',
    src: '/plant-overlays/cordyline-stricta.png',
    defaultWidthFraction: widthFraction(260),
    aspect: 1,
  },
  'crepe-myrtle': {
    key: 'crepe-myrtle',
    src: '/plant-overlays/crepe-myrtle.png',
    defaultWidthFraction: widthFraction(280),
    aspect: 1,
  },
  dogwood: {
    key: 'dogwood',
    src: '/plant-overlays/dogwood.png',
    defaultWidthFraction: widthFraction(280),
    aspect: 1,
  },
  'ake-ake': {
    key: 'ake-ake',
    src: '/plant-overlays/ake-ake.png',
    defaultWidthFraction: widthFraction(260),
    aspect: 1,
  },
  'apple-tree': {
    key: 'apple-tree',
    src: '/plant-overlays/apple-tree.png',
    defaultWidthFraction: widthFraction(300),
    aspect: 1,
  },
  avocado: {
    key: 'avocado',
    src: '/plant-overlays/avocado.png',
    defaultWidthFraction: widthFraction(300),
    aspect: 1,
  },
  begonia: {
    key: 'begonia',
    src: '/plant-overlays/begonia.png',
    defaultWidthFraction: widthFraction(200),
    aspect: 1,
  },
  blueberry: {
    key: 'blueberry',
    src: '/plant-overlays/blueberry.png',
    defaultWidthFraction: widthFraction(180),
    aspect: 1,
  },
  bottlebrush: {
    key: 'bottlebrush',
    src: '/plant-overlays/bottlebrush.png',
    defaultWidthFraction: widthFraction(240),
    aspect: 1,
  },
  'box-elder': {
    key: 'box-elder',
    src: '/plant-overlays/box-elder.png',
    defaultWidthFraction: widthFraction(300),
    aspect: 1,
  },
  bromeliad: {
    key: 'bromeliad',
    src: '/plant-overlays/bromeliad.png',
    defaultWidthFraction: widthFraction(220),
    aspect: 1,
  },
  'cabbage-tree': {
    key: 'cabbage-tree',
    src: '/plant-overlays/cabbage-tree.png',
    defaultWidthFraction: widthFraction(280),
    aspect: 1,
  },
  birch: {
    key: 'birch',
    src: '/plant-overlays/birch.png',
    defaultWidthFraction: widthFraction(280),
    aspect: 1,
  },
  escallonia: {
    key: 'escallonia',
    src: '/plant-overlays/escallonia.png',
    defaultWidthFraction: widthFraction(240),
    aspect: 1,
  },
  'european-beech': {
    key: 'european-beech',
    src: '/plant-overlays/european-beech.png',
    defaultWidthFraction: widthFraction(300),
    aspect: 1,
  },
  'european-hornbeam': {
    key: 'european-hornbeam',
    src: '/plant-overlays/european-hornbeam.png',
    defaultWidthFraction: widthFraction(280),
    aspect: 1,
  },
  'evergreen-ash': {
    key: 'evergreen-ash',
    src: '/plant-overlays/evergreen-ash.png',
    defaultWidthFraction: widthFraction(300),
    aspect: 1,
  },
  feijoa: {
    key: 'feijoa',
    src: '/plant-overlays/feijoa.png',
    defaultWidthFraction: widthFraction(260),
    aspect: 1,
  },
  oak: {
    key: 'oak',
    src: '/plant-overlays/oak.png',
    defaultWidthFraction: widthFraction(300),
    aspect: 1,
  },
  'camellia-hedge': {
    key: 'camellia-hedge',
    src: '/plant-overlays/camellia-hedge.png',
    defaultWidthFraction: widthFraction(340),
    aspect: 1,
  },
  'corokia-geentys-green-hedge': {
    key: 'corokia-geentys-green-hedge',
    src: '/plant-overlays/corokia-geentys-green-hedge.png',
    defaultWidthFraction: widthFraction(340),
    aspect: 1,
  },
  'corokia-virgata-hedge': {
    key: 'corokia-virgata-hedge',
    src: '/plant-overlays/corokia-virgata-hedge.png',
    defaultWidthFraction: widthFraction(340),
    aspect: 1,
  },
  eugenia: {
    key: 'eugenia',
    src: '/plant-overlays/eugenia.png',
    defaultWidthFraction: widthFraction(340),
    aspect: 1,
  },
  'flame-tree': {
    key: 'flame-tree',
    src: '/plant-overlays/flame-tree.png',
    defaultWidthFraction: widthFraction(300),
    aspect: 1,
  },
  'flax-lily': {
    key: 'flax-lily',
    src: '/plant-overlays/flax-lily.png',
    defaultWidthFraction: widthFraction(240),
    aspect: 1,
  },
  'forest-pansy': {
    key: 'forest-pansy',
    src: '/plant-overlays/forest-pansy.png',
    defaultWidthFraction: widthFraction(280),
    aspect: 1,
  },
  'fortnight-lily': {
    key: 'fortnight-lily',
    src: '/plant-overlays/fortnight-lily.png',
    defaultWidthFraction: widthFraction(220),
    aspect: 1,
  },
  'foxtail-agave': {
    key: 'foxtail-agave',
    src: '/plant-overlays/foxtail-agave.png',
    defaultWidthFraction: widthFraction(260),
    aspect: 1,
  },
  hardenbergia: {
    key: 'hardenbergia',
    src: '/plant-overlays/hardenbergia.png',
    defaultWidthFraction: widthFraction(260),
    aspect: 1,
  },
  hellebore: {
    key: 'hellebore',
    src: '/plant-overlays/hellebore.png',
    defaultWidthFraction: widthFraction(200),
    aspect: 1,
  },
  'hen-and-chicken-fern': {
    key: 'hen-and-chicken-fern',
    src: '/plant-overlays/hen-and-chicken-fern.png',
    defaultWidthFraction: widthFraction(240),
    aspect: 1,
  },
  hibiscus: {
    key: 'hibiscus',
    src: '/plant-overlays/hibiscus.png',
    defaultWidthFraction: widthFraction(260),
    aspect: 1,
  },
  'himalayan-birch': {
    key: 'himalayan-birch',
    src: '/plant-overlays/himalayan-birch.png',
    defaultWidthFraction: widthFraction(280),
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
  'ake-ake',
  'apple-tree',
  'avocado',
  'begonia',
  'blueberry',
  'bottlebrush',
  'box-elder',
  'bromeliad',
  'cabbage-tree',
  'corokia-geentys-green',
  'corokia-virgata',
  'english-holly',
  'boston-ivy',
  'canna-lily',
  'cherry-tree',
  'cordyline-stricta',
  'crepe-myrtle',
  'dogwood',
  'birch',
  'escallonia',
  'european-beech',
  'european-hornbeam',
  'evergreen-ash',
  'feijoa',
  'oak',
  'flame-tree',
  'flax-lily',
  'forest-pansy',
  'fortnight-lily',
  'foxtail-agave',
  'hardenbergia',
  'hellebore',
  'hen-and-chicken-fern',
  'hibiscus',
  'himalayan-birch',
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
  {
    name: 'Ake-Ake',
    description: 'Hardy NZ native shrub or small tree with glossy foliage.',
    notes: 'Coastal and exposed sites; can be clipped or left natural.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Native', 'Coastal', 'Low maintenance'],
    plantTypes: ['Shrub', 'Tree'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['dry', 'average'],
      drainage: ['average', 'well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Apple Tree',
    description: 'Deciduous fruit tree with spring blossom and autumn fruit.',
    notes: 'Suits sunny sheltered spots; good for edible garden zones.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Cottage', 'Low maintenance'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Avocado',
    description: 'Evergreen subtropical fruit tree with dense canopy.',
    notes: 'Needs shelter from frost and wind; strong focal tree.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Subtropical', 'Coastal'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['sheltered'],
    },
  },
  {
    name: 'Begonia',
    description: 'Compact flowering plant for shaded borders and pots.',
    notes: 'Colourful blooms; suits part shade and moist soil.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Cottage', 'Subtropical'],
    plantTypes: ['Shrub', 'Groundcover'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered'],
    },
  },
  {
    name: 'Blueberry',
    description: 'Compact deciduous fruiting shrub with autumn colour.',
    notes: 'Acid soil preferred; good for edible borders.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Cottage', 'Low maintenance'],
    plantTypes: ['Shrub'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['moist'],
      drainage: ['well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Bottlebrush',
    description: 'Hardy flowering shrub or small tree with red brush flowers.',
    notes: 'Attracts birds; suits sunny coastal and inland sites.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Native', 'Coastal', 'Low maintenance'],
    plantTypes: ['Shrub', 'Tree'],
    conditions: {
      sun: ['full sun'],
      moisture: ['average', 'dry'],
      drainage: ['well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Box Elder',
    description: 'Fast-growing deciduous tree with light, open canopy.',
    notes: 'Quick shade or screening tree; suits moist soils.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Low maintenance'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'Bromeliad',
    description: 'Tropical rosette plant with bold architectural form.',
    notes: 'Subtropical accent; suits sheltered frost-free spots.',
    detectedIntent: 'feature planting',
    style: 'Feature planting',
    gardenStyles: ['Subtropical', 'Coastal'],
    plantTypes: ['Shrub'],
    conditions: {
      sun: ['part shade'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['sheltered'],
    },
  },
  {
    name: 'Cabbage Tree',
    description: 'Iconic NZ native with upright sword-like leaves and trunk.',
    notes: 'Structural native feature; very hardy once established.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Native', 'Coastal', 'Subtropical'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Corokia Geentys Green',
    description: 'Compact NZ native hedge shrub with fine glossy foliage.',
    notes: 'Dense clipped or natural form; suits formal and native planting.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Native', 'Formal', 'Coastal'],
    plantTypes: ['Shrub', 'Hedge / screening'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'dry'],
      drainage: ['average', 'well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Corokia Virgata',
    description: 'Airily branched NZ native shrub with wavy-edged leaves.',
    notes: 'Informal hedge or structural shrub; many cultivars available.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Native', 'Formal', 'Coastal'],
    plantTypes: ['Shrub', 'Hedge / screening'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'dry'],
      drainage: ['average', 'well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'English Holly',
    description: 'Evergreen shrub or small tree with glossy spiny leaves.',
    notes: 'Formal structure plant; red berries on female plants.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Formal', 'Cottage'],
    plantTypes: ['Shrub', 'Tree', 'Hedge / screening'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Boston Ivy',
    description: 'Vigorous climber with bold green foliage and autumn colour.',
    notes: 'Self-clinging on walls and fences; needs space to spread.',
    detectedIntent: 'climber planting',
    style: 'Climbers',
    gardenStyles: ['Formal', 'Cottage', 'Low maintenance'],
    plantTypes: ['Climber'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Camellia',
    description: 'Classic evergreen flowering shrub with glossy leaves.',
    notes: 'Winter and spring blooms; suits part shade and acid soil.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Formal', 'Cottage'],
    plantTypes: ['Shrub'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['average', 'moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Canna Lily',
    description: 'Upright tropical clump with bold leaves and bright flowers.',
    notes: 'Subtropical border accent; dies back in cold winters.',
    detectedIntent: 'general planting',
    style: 'Border planting',
    gardenStyles: ['Subtropical', 'Cottage'],
    plantTypes: ['Shrub'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered'],
    },
  },
  {
    name: 'Cherry Tree',
    description: 'Small ornamental tree with spring blossom.',
    notes: 'Deciduous feature tree; suits sunny sheltered sites.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Cottage', 'Formal'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Cordyline Stricta',
    description: 'Upright clumping cordyline with narrow strappy leaves.',
    notes: 'Compact architectural form; subtropical and sheltered spots.',
    detectedIntent: 'general planting',
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
    name: 'Crepe Myrtle',
    description: 'Small ornamental tree or large shrub with summer flowers.',
    notes: 'Deciduous; attractive bark and long flowering season.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Cottage', 'Formal', 'Subtropical'],
    plantTypes: ['Tree', 'Shrub'],
    conditions: {
      sun: ['full sun'],
      moisture: ['average', 'dry'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'Dogwood',
    description: 'Small ornamental tree with spring flowers and autumn colour.',
    notes: 'Understorey tree; suits part shade and moist soil.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Cottage', 'Formal'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['part shade', 'full sun'],
      moisture: ['moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: "Erman's Birch",
    description: 'Small deciduous tree with white peeling bark and light foliage.',
    notes: 'Ornamental feature tree; suits cool moist sites.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Formal', 'Cottage'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['moist'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'Escallonia',
    description: 'Evergreen hedge shrub with glossy leaves and summer flowers.',
    notes: 'Coastal-tolerant screen plant; clips well.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Coastal', 'Cottage', 'Formal'],
    plantTypes: ['Shrub', 'Hedge / screening'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'European Beech',
    description: 'Large deciduous tree with smooth grey bark and dense crown.',
    notes: 'Formal avenue or specimen tree; holds copper leaves in winter when clipped.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Formal', 'Cottage'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'European Hornbeam',
    description: 'Deciduous tree or formal hedge with ridged bark and neat foliage.',
    notes: 'Classic pleached or clipped hedge tree.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Formal'],
    plantTypes: ['Tree', 'Hedge / screening'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'Evergreen Ash',
    description: 'Medium evergreen tree with glossy pinnate leaves.',
    notes: 'Fast-growing shade tree; suits warm climates.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Formal', 'Subtropical'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'Feijoa',
    description: 'Evergreen shrub or small tree with grey-green foliage and edible fruit.',
    notes: 'Hardy edible screen plant; suits mixed borders.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Cottage', 'Low maintenance'],
    plantTypes: ['Shrub', 'Tree'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'dry'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'English Oak',
    description: 'Classic large deciduous tree with spreading crown and lobed leaves.',
    notes: 'Long-lived specimen tree; needs space.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Formal', 'Cottage'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Flame Tree',
    description: 'Deciduous tree with maple-like leaves and summer flame-red flowers.',
    notes: 'Bold seasonal colour; suits warm dry sites.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Subtropical', 'Cottage'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun'],
      moisture: ['average', 'dry'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'Flax Lily',
    description: 'Strappy evergreen perennial with blue flowers and berry-like fruit.',
    notes: 'Neat border or mass planting; low maintenance.',
    detectedIntent: 'general planting',
    style: 'Border planting',
    gardenStyles: ['Native', 'Coastal', 'Low maintenance'],
    plantTypes: ['Grass / strappy plant', 'Shrub'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'dry'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'Forest Pansy',
    description: 'Small deciduous tree with heart-shaped purple-red foliage.',
    notes: 'Understorey feature tree; spring blossom.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Formal', 'Cottage'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['part shade', 'full sun'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['sheltered', 'moderate'],
    },
  },
  {
    name: 'Fortnight Lily (Dietes)',
    description: 'Hardy strappy clump with iris-like white flowers through summer.',
    notes: 'Dry-tolerant edging plant; repeats bloom in fortnightly flushes.',
    detectedIntent: 'general planting',
    style: 'Border planting',
    gardenStyles: ['Coastal', 'Low maintenance', 'Formal'],
    plantTypes: ['Grass / strappy plant'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'dry'],
      drainage: ['well drained'],
      wind: ['moderate', 'exposed'],
    },
  },
  {
    name: 'Foxtail Agave',
    description: 'Sculptural succulent rosette with soft arching grey-green leaves.',
    notes: 'Drought-tolerant accent; suits contemporary and subtropical gardens.',
    detectedIntent: 'general planting',
    style: 'Feature planting',
    gardenStyles: ['Subtropical', 'Coastal', 'Low maintenance'],
    plantTypes: ['Shrub'],
    conditions: {
      sun: ['full sun'],
      moisture: ['dry', 'average'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'Hardenbergia',
    description: 'Native climber or groundcover with pea-like purple flowers in winter.',
    notes: 'Fast cover for fences and pergolas; also works as a spillover groundcover.',
    detectedIntent: 'climber planting',
    style: 'Climbers',
    gardenStyles: ['Native', 'Cottage'],
    plantTypes: ['Climber', 'Groundcover'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average', 'moist'],
      drainage: ['well drained'],
      wind: ['moderate'],
    },
  },
  {
    name: 'Hellebore (Winter Rose)',
    description: 'Shade-loving perennial with nodding winter flowers above bold foliage.',
    notes: 'Valuable winter colour in woodland borders.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
    gardenStyles: ['Cottage', 'Formal'],
    plantTypes: ['Shrub'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['moist'],
      drainage: ['well drained'],
      wind: ['sheltered'],
    },
  },
  {
    name: 'Hen and Chicken Fern',
    description: 'Native ground fern with arching fronds and plantlets on mature leaves.',
    notes: 'Shady understory or ponga companion; moist humus-rich soil.',
    detectedIntent: 'general planting',
    style: 'Border planting',
    gardenStyles: ['Native', 'Cottage'],
    plantTypes: ['Groundcover'],
    conditions: {
      sun: ['part shade', 'full shade'],
      moisture: ['moist'],
      drainage: ['average', 'well drained'],
      wind: ['sheltered'],
    },
  },
  {
    name: 'Hibiscus',
    description: 'Tropical evergreen shrub with large colourful flowers.',
    notes: 'Sheltered sunny spot; suits subtropical and coastal gardens.',
    detectedIntent: 'shrub planting',
    style: 'Shrubs',
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
    name: 'Himalayan Birch',
    description: 'Small to medium tree with striking white peeling bark.',
    notes: 'Distinct from Erman’s Birch; suits cool moist gardens.',
    detectedIntent: 'feature tree',
    style: 'Feature tree',
    gardenStyles: ['Formal', 'Cottage'],
    plantTypes: ['Tree'],
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['moist'],
      drainage: ['well drained'],
      wind: ['moderate'],
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
  { pattern: /flax lily|dianella/i,                                    assetKey: 'flax-lily' },
  { pattern: /fortnight lily|dietes/i,                                 assetKey: 'fortnight-lily' },
  { pattern: /himalayan birch|betula utilis/i,                          assetKey: 'himalayan-birch' },
  { pattern: /flame tree|brachychiton/i,                               assetKey: 'flame-tree' },
  { pattern: /forest pansy|cercis/i,                                   assetKey: 'forest-pansy' },
  { pattern: /foxtail agave|agave attenuata/i,                         assetKey: 'foxtail-agave' },
  { pattern: /hardenbergia/i,                                          assetKey: 'hardenbergia' },
  { pattern: /hellebore|helleborus/i,                                 assetKey: 'hellebore' },
  { pattern: /hen and chicken|asplenium bulbiferum/i,                  assetKey: 'hen-and-chicken-fern' },
  { pattern: /hibiscus/i,                                             assetKey: 'hibiscus' },
  { pattern: /phormium|flax|astelia|harakeke|nz flax/i,                assetKey: 'flax' },
  { pattern: /ponga|tree.?fern|dicksonia|cyathea/i,                    assetKey: 'ponga' },
  { pattern: /camellia hedge/i,                                         assetKey: 'camellia-hedge' },
  { pattern: /corokia geentys green hedge|geentys green hedge/i,       assetKey: 'corokia-geentys-green-hedge' },
  { pattern: /corokia virgata hedge/i,                                   assetKey: 'corokia-virgata-hedge' },
  { pattern: /corokia geentys|geentys green/i,                         assetKey: 'corokia-geentys-green' },
  { pattern: /corokia virgata/i,                                       assetKey: 'corokia-virgata' },
  { pattern: /corokia/i,                                               assetKey: 'corokia-geentys-green' },
  { pattern: /eugenia/i,                                               assetKey: 'eugenia' },
  { pattern: /erman.?s birch|betula ermanii/i,                         assetKey: 'birch' },
  { pattern: /english oak|quercus robur/i,                               assetKey: 'oak' },
  { pattern: /escallonia/i,                                            assetKey: 'escallonia' },
  { pattern: /european beech|fagus sylvatica/i,                          assetKey: 'european-beech' },
  { pattern: /european hornbeam|carpinus betulus/i,                    assetKey: 'european-hornbeam' },
  { pattern: /evergreen ash|fraxinus griffithii/i,                       assetKey: 'evergreen-ash' },
  { pattern: /feijoa|acca sellowiana/i,                                assetKey: 'feijoa' },
  { pattern: /english holly|ilex aquifolium/i,                        assetKey: 'english-holly' },
  { pattern: /\bholly\b/i,                                             assetKey: 'english-holly' },
  { pattern: /boston ivy|parthenocissus tricuspidata/i,                assetKey: 'boston-ivy' },
  { pattern: /camellia/i,                                              assetKey: 'camellia' },
  { pattern: /canna lily|canna indica|\bcanna\b/i,                     assetKey: 'canna-lily' },
  { pattern: /cherry tree|prunus cerasus|prunus avium|prunus serrulata|\bcherry\b/i, assetKey: 'cherry-tree' },
  { pattern: /cordyline stricta/i,                                       assetKey: 'cordyline-stricta' },
  { pattern: /cabbage tree|cordyline australis|tī kōuka|ti kouka/i,  assetKey: 'cabbage-tree' },
  { pattern: /cordyline/i,                                             assetKey: 'cordyline-stricta' },
  { pattern: /crepe myrtle|crape myrtle|lagerstroemia/i,               assetKey: 'crepe-myrtle' },
  { pattern: /dogwood|cornus florida|cornus/i,                         assetKey: 'dogwood' },
  { pattern: /ake.?ake|dodonaea/i,                                     assetKey: 'ake-ake' },
  { pattern: /apple tree|malus/i,                                      assetKey: 'apple-tree' },
  { pattern: /avocado|persea/i,                                        assetKey: 'avocado' },
  { pattern: /begonia/i,                                               assetKey: 'begonia' },
  { pattern: /blueberry|vaccinium/i,                                   assetKey: 'blueberry' },
  { pattern: /bottlebrush|callistemon/i,                               assetKey: 'bottlebrush' },
  { pattern: /box elder|acer negundo/i,                                assetKey: 'box-elder' },
  { pattern: /bromeliad|alcantarea/i,                                  assetKey: 'bromeliad' },
  { pattern: /griselinia/i,                                              assetKey: 'griselinia-hedge' },
  { pattern: /ficus tuff|ficus tuffy|ficus tuffi/i,                      assetKey: 'ficus-tuffy-hedge' },
  { pattern: /buxus|box hedge|boxwood/i,                                 assetKey: 'buxus-hedge' },
  { pattern: /lomandra|carex|libertia|agapanthus/i,             assetKey: 'lomandra' },
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
  { name: 'Camellia Hedge', detectedIntent: 'hedge/screening' },
  { name: 'Corokia Geentys Green Hedge', detectedIntent: 'hedge/screening' },
  { name: 'Corokia Virgata Hedge', detectedIntent: 'hedge/screening' },
  { name: 'Eugenia', detectedIntent: 'hedge/screening' },
]

const ROW_PREVIEW_PLANT_NAMES = new Set(ROW_PREVIEW_PLANT_OPTIONS.map((p) => p.name))

export function supportsRowPreview(plantName: string): boolean {
  return ROW_PREVIEW_PLANT_NAMES.has(plantName)
}

/** Registered overlay asset paths — for coverage audits and path checks. */
export const REGISTERED_OVERLAY_PATHS: readonly string[] = Object.values(ASSETS).map(
  (asset) => asset.src,
)

/** Dev /dev-overlay QA — production row/hedge asset keys (read-only). */
export const PRODUCTION_HEDGE_OVERLAY_KEYS = new Set(
  Object.values(ASSETS)
    .filter((asset) => asset.key.endsWith('-hedge') || asset.key === 'eugenia')
    .map((asset) => asset.key),
)

/** Dev /dev-overlay QA — map registry filename to asset key (read-only). */
export function overlayFilenameToAssetKey(filename: string): string | undefined {
  const src = `/plant-overlays/${filename}`
  for (const asset of Object.values(ASSETS)) {
    if (asset.src === src) return asset.key
  }
  return undefined
}

/** Dev /dev-overlay QA — spot PNG paired with a hedge-row PNG (read-only). */
export const SPOT_HEDGE_OVERLAY_PAIRS: ReadonlyArray<{
  label: string
  spotFile: string
  hedgeFile: string
}> = [
  { label: 'Camellia', spotFile: 'camellia.png', hedgeFile: 'camellia-hedge.png' },
  {
    label: 'Corokia Geentys Green',
    spotFile: 'corokia-geentys-green.png',
    hedgeFile: 'corokia-geentys-green-hedge.png',
  },
  {
    label: 'Corokia Virgata',
    spotFile: 'corokia-virgata.png',
    hedgeFile: 'corokia-virgata-hedge.png',
  },
]

// TODO: Future hedge mode — support linear metres, desired height, trim frequency,
// and calendar duration estimates.
