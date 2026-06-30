import type { CreateVisualPlantOption } from './plantOverlayAssets'

export type VisualiserGardenStyleTag =
  | 'Tropical / Subtropical'
  | 'Formal'
  | 'Native'
  | 'Coastal'
  | 'Cottage'
  | 'Low Maintenance'
  | 'Privacy / Screening'

export type VisualiserPlantRoleTag =
  | 'Hedge / Screen'
  | 'Feature Plant'
  | 'Filler / Mass Planting'
  | 'Groundcover'
  | 'Flowering Colour'
  | 'Climber'

export const VISUALISER_GARDEN_STYLE_OPTIONS: Array<VisualiserGardenStyleTag | 'Any'> = [
  'Any',
  'Tropical / Subtropical',
  'Formal',
  'Native',
  'Coastal',
  'Cottage',
  'Low Maintenance',
  'Privacy / Screening',
]

export const VISUALISER_PLANT_ROLE_OPTIONS: Array<VisualiserPlantRoleTag | 'Any'> = [
  'Any',
  'Hedge / Screen',
  'Feature Plant',
  'Filler / Mass Planting',
  'Groundcover',
  'Flowering Colour',
  'Climber',
]

const GARDEN_STYLE_FROM_LEGACY: Record<string, VisualiserGardenStyleTag> = {
  Subtropical: 'Tropical / Subtropical',
  Formal: 'Formal',
  Native: 'Native',
  Coastal: 'Coastal',
  Cottage: 'Cottage',
  'Low maintenance': 'Low Maintenance',
}

/** Resolve garden-style tags from explicit metadata and legacy gardenStyles. */
export function resolveStyleTags(plant: CreateVisualPlantOption): VisualiserGardenStyleTag[] {
  const tags = new Set<VisualiserGardenStyleTag>(plant.styleTags ?? [])

  for (const legacy of plant.gardenStyles) {
    const mapped = GARDEN_STYLE_FROM_LEGACY[legacy]
    if (mapped) tags.add(mapped)
  }

  const context = `${plant.detectedIntent} ${plant.notes} ${plant.description}`.toLowerCase()
  if (
    plant.plantTypes.includes('Hedge / screening') ||
    /hedge|screen|privacy/.test(context)
  ) {
    tags.add('Privacy / Screening')
  }

  return [...tags]
}

/** Resolve plant-role tags from explicit metadata and existing option fields. */
export function resolveRoleTags(plant: CreateVisualPlantOption): VisualiserPlantRoleTag[] {
  if (plant.roleTags?.length) return [...plant.roleTags]

  const tags = new Set<VisualiserPlantRoleTag>()
  const context = `${plant.description} ${plant.notes} ${plant.detectedIntent}`.toLowerCase()

  if (
    plant.plantTypes.includes('Hedge / screening') ||
    /hedge|screen/.test(context)
  ) {
    tags.add('Hedge / Screen')
  }

  if (plant.plantTypes.includes('Climber') || plant.style === 'Climbers') {
    tags.add('Climber')
  }

  if (plant.plantTypes.includes('Groundcover') || plant.style === 'Groundcovers') {
    tags.add('Groundcover')
  }

  if (
    plant.style === 'Feature planting' ||
    plant.style === 'Feature tree' ||
    /feature tree|feature planting/.test(plant.detectedIntent)
  ) {
    tags.add('Feature Plant')
  }

  if (plant.style === 'Border planting') {
    tags.add('Filler / Mass Planting')
  } else if (
    plant.detectedIntent === 'general planting' &&
    plant.plantTypes.includes('Grass / strappy plant')
  ) {
    tags.add('Filler / Mass Planting')
  }

  if (/flower|bloom|colour|color|seasonal/.test(context)) {
    tags.add('Flowering Colour')
  }

  if (tags.size === 0) {
    if (plant.style === 'Shrubs' || plant.detectedIntent === 'shrub planting') {
      tags.add('Feature Plant')
    } else if (plant.plantTypes.includes('Tree')) {
      tags.add('Feature Plant')
    } else {
      tags.add('Filler / Mass Planting')
    }
  }

  return [...tags]
}

export function plantMatchesGardenStyle(
  plant: CreateVisualPlantOption,
  gardenStyle: VisualiserGardenStyleTag | 'Any',
): boolean {
  if (gardenStyle === 'Any') return true
  return resolveStyleTags(plant).includes(gardenStyle)
}

export function plantMatchesPlantRole(
  plant: CreateVisualPlantOption,
  plantRole: VisualiserPlantRoleTag | 'Any',
): boolean {
  if (plantRole === 'Any') return true
  return resolveRoleTags(plant).includes(plantRole)
}

export interface SortedPreviewPlantOptions<T extends CreateVisualPlantOption> {
  recommended: T[]
  other: T[]
  hasActiveFilters: boolean
  hasExactMatches: boolean
}

/** Sort matches to the top; never remove plants from the result set. */
export function sortPreviewPlantsByOptionalFilters<T extends CreateVisualPlantOption>(
  plants: T[],
  gardenStyle: VisualiserGardenStyleTag | 'Any',
  plantRole: VisualiserPlantRoleTag | 'Any',
): SortedPreviewPlantOptions<T> {
  const hasActiveFilters = gardenStyle !== 'Any' || plantRole !== 'Any'

  if (!hasActiveFilters) {
    return {
      recommended: plants,
      other: [],
      hasActiveFilters: false,
      hasExactMatches: true,
    }
  }

  const recommended: T[] = []
  const other: T[] = []

  for (const plant of plants) {
    const matchesStyle = plantMatchesGardenStyle(plant, gardenStyle)
    const matchesRole = plantMatchesPlantRole(plant, plantRole)
    if (matchesStyle && matchesRole) {
      recommended.push(plant)
    } else {
      other.push(plant)
    }
  }

  return {
    recommended,
    other,
    hasActiveFilters: true,
    hasExactMatches: recommended.length > 0,
  }
}

export const PREVIEW_PICKER_HELPER_TEXT =
  'Optional: choose a garden style or plant role to see more relevant suggestions.'

export const PREVIEW_PICKER_NO_MATCHES_TEXT =
  'No exact matches yet — showing all visualiser plants.'
