import type { Plant } from '../types/plants'

/** Style choices saved on garden_areas.style */
export const GARDEN_AREA_STYLE_OPTIONS = [
  'Formal',
  'Native',
  'Subtropical',
  'Cottage',
  'Coastal',
  'Low Maintenance',
  'Edible',
  'Not Sure',
] as const

/** Goal choices saved on garden_areas.goal */
export const GARDEN_AREA_GOAL_OPTIONS = [
  'Privacy / Screening',
  'Colour',
  'Low Maintenance',
  'Native planting',
  'Edible garden',
  'Child friendly',
  'Pollinators',
  'Not Sure',
] as const

export type GardenAreaStyle = (typeof GARDEN_AREA_STYLE_OPTIONS)[number]
export type GardenAreaGoal = (typeof GARDEN_AREA_GOAL_OPTIONS)[number]

export interface StyleInfo {
  description: string
  useCases: string[]
}

/** Short description and suggested use cases per style, shown in the "Use This Style" journey. */
export const STYLE_INFO: Record<string, StyleInfo> = {
  Subtropical: {
    description: 'Lush foliage, layered planting, year-round interest.',
    useCases: ['Sheltered courtyards', 'North-facing beds', 'Statement focal plantings'],
  },
  Native: {
    description: 'Low maintenance, supports local wildlife, suits NZ conditions.',
    useCases: ['Boundary plantings', 'Wildlife corridors', 'Low-water areas'],
  },
  Formal: {
    description: 'Structured planting, symmetry, clean lines.',
    useCases: ['Entranceways', 'Hedging', 'Geometric borders'],
  },
  Coastal: {
    description: 'Tough plants suited to exposed, windy, or salt-spray conditions.',
    useCases: ['Exposed frontages', 'Windbreaks', 'Salt-tolerant borders'],
  },
  Cottage: {
    description: 'Relaxed, romantic planting with soft colours and textures.',
    useCases: ['Flower beds', 'Mixed borders', 'Informal spaces'],
  },
  'Low Maintenance': {
    description: 'Easy-care plantings that look good with minimal intervention.',
    useCases: ['Busy households', 'Rental gardens', 'Low-input borders'],
  },
  Edible: {
    description: 'Productive plantings that combine beauty with a harvest.',
    useCases: ['Vegetable beds', 'Fruit trees', 'Kitchen gardens'],
  },
}

export interface RankedPlantMatch {
  plant: Plant
  /** Short label when style/goal metadata suggests a fit; null otherwise */
  matchLabel: string | null
}

function plantType(plant: Plant): string {
  return (plant.plant_type || '').trim().toLowerCase()
}

function maintenance(plant: Plant): string {
  return (plant.maintenance_level || '').trim().toLowerCase()
}

/**
 * Light prioritisation using existing plant fields only.
 * Condition matching remains the primary filter — this re-sorts results.
 */
export function rankPlantsForArea(
  plants: Plant[],
  style: string | null | undefined,
  goal: string | null | undefined,
): RankedPlantMatch[] {
  const activeStyle = style && style !== 'Not Sure' ? style : null
  const activeGoal = goal && goal !== 'Not Sure' ? goal : null

  const scored = plants.map((plant) => {
    let score = 0
    const labels: string[] = []

    const add = (points: number, label: string) => {
      score += points
      if (!labels.includes(label)) labels.push(label)
    }

    const type = plantType(plant)
    const maint = maintenance(plant)

    if (activeStyle === 'Native' && plant.is_native) add(2, 'Native fit')
    if (activeStyle === 'Edible' && type === 'fruit') add(2, 'Edible pick')
    if (activeStyle === 'Low Maintenance' && maint === 'low') add(2, 'Low maintenance')
    if (activeStyle === 'Formal' && type === 'hedge') add(2, 'Formal structure')
    if (activeStyle === 'Cottage' && type === 'flower') add(1, 'Cottage colour')
    if (activeStyle === 'Subtropical' && (type === 'palm' || type === 'flax')) {
      add(1, 'Subtropical feel')
    }
    if (activeStyle === 'Coastal' && plant.is_native) add(1, 'Coastal-friendly')

    if (activeGoal === 'Privacy / Screening' && type === 'hedge') add(3, 'Good for screening')
    if (activeGoal === 'Colour' && (type === 'flower' || !!plant.flower_color)) {
      add(2, 'Adds colour')
    }
    if (activeGoal === 'Low Maintenance' && maint === 'low') add(2, 'Easy care')
    if (activeGoal === 'Native planting' && plant.is_native) add(2, 'Native species')
    if (activeGoal === 'Edible garden' && type === 'fruit') add(2, 'Edible pick')
    if (activeGoal === 'Pollinators' && type === 'flower') add(1, 'Pollinator-friendly')
    if (activeGoal === 'Child friendly' && maint === 'low') add(1, 'Easy care')

    return { plant, score, matchLabel: labels[0] ?? null }
  })

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return (a.plant.common_name || '').localeCompare(b.plant.common_name || '')
    })
    .map(({ plant, matchLabel }) => ({ plant, matchLabel }))
}
