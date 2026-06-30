/** Plant Library category filters — aligned with `plants.plant_type` in the database. */
export const PLANT_CATEGORY_FILTERS = [
  'Hedge',
  'Shrub',
  'Tree',
  'Flower',
  'Palm',
  'Flax',
  'Groundcover',
  'Climber',
  'Fruit',
] as const

export type PlantCategoryFilter = (typeof PLANT_CATEGORY_FILTERS)[number]

/** Map a DB `plant_type` value (including compound types) to Library filter categories. */
export function categoriesForDbPlantType(
  plantType: string | null | undefined,
): PlantCategoryFilter[] {
  if (!plantType) return []

  const t = plantType.toLowerCase()
  const out = new Set<PlantCategoryFilter>()

  if (t.includes('hedge')) out.add('Hedge')
  if (t.includes('shrub')) out.add('Shrub')
  if (t.includes('tree')) out.add('Tree')
  if (t.includes('flower')) out.add('Flower')
  if (t.includes('palm')) out.add('Palm')
  if (t.includes('flax')) out.add('Flax')
  if (t.includes('groundcover') || t.includes('grass')) out.add('Groundcover')
  if (t.includes('climber')) out.add('Climber')
  if (t.includes('fruit')) out.add('Fruit')

  return [...out]
}

export function plantMatchesCategory(
  plantType: string | null | undefined,
  category: PlantCategoryFilter | '',
): boolean {
  if (!category) return true
  return categoriesForDbPlantType(plantType).includes(category)
}
