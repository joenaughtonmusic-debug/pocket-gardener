import catalog from '../visualiser/plantDatabaseCatalog.json'
import {
  PLANT_CATEGORY_FILTERS,
  categoriesForDbPlantType,
  type PlantCategoryFilter,
} from '../plants/plantCategories'
import type { CreateVisualPlantOption, PlantTypeFilter } from './plantOverlayAssets'

const PREVIEW_NAME_ALIASES: Record<string, string> = {
  'harakeke (new zealand flax)': 'NZ Flax',
  'camellia sasanqua': 'Camellia',
  'tree fern (ponga)': 'Ponga Fern',
  'pratia angulata': 'Pratia',
  hebe: 'Hebe (Koromiko)',
  phormium: 'NZ Flax',
}

const catalogPlantTypeByName = new Map(
  catalog.plants.map((plant) => [plant.common_name.toLowerCase(), plant.plant_type]),
)

function plantTypesFallback(types: PlantTypeFilter[]): PlantCategoryFilter[] {
  const map: Partial<Record<PlantTypeFilter, PlantCategoryFilter>> = {
    'Hedge / screening': 'Hedge',
    Shrub: 'Shrub',
    Tree: 'Tree',
    Groundcover: 'Groundcover',
    'Grass / strappy plant': 'Flax',
    Climber: 'Climber',
  }

  return [...new Set(types.map((type) => map[type]).filter(Boolean))] as PlantCategoryFilter[]
}

export function getPreviewPlantCategories(
  plant: CreateVisualPlantOption,
): PlantCategoryFilter[] {
  const lookupName = (
    PREVIEW_NAME_ALIASES[plant.name.toLowerCase()] ?? plant.name
  ).toLowerCase()
  const dbType = catalogPlantTypeByName.get(lookupName)

  if (dbType) return categoriesForDbPlantType(dbType)
  return plantTypesFallback(plant.plantTypes)
}

export function previewPlantMatchesCategory(
  plant: CreateVisualPlantOption,
  category: PlantCategoryFilter | '',
): boolean {
  if (!category) return true
  return getPreviewPlantCategories(plant).includes(category)
}

export function categoriesUsedByPreviewPlants(
  plants: CreateVisualPlantOption[],
): PlantCategoryFilter[] {
  const used = new Set<PlantCategoryFilter>()

  for (const plant of plants) {
    for (const category of getPreviewPlantCategories(plant)) {
      used.add(category)
    }
  }

  return PLANT_CATEGORY_FILTERS.filter((category) => used.has(category))
}
