export interface SuggestedSpecies {
  name: string
  description: string
  notes: string
}

export interface SuggestionResult {
  detectedIntent: string
  suggestedSpecies: SuggestedSpecies[]
  askHedgeForm: boolean
}

/**
 * Deterministic rule-based plant suggestion engine for the Visual Ideas feature.
 * Analyses the user's goal text and returns a detected intent,
 * 3 suitable plant/species options, and whether to prompt for hedge form.
 */
export function suggestPlants(goalText: string): SuggestionResult {
  const lower = goalText.toLowerCase()

  if (/hedge|screen|privacy|boundary|fence\s*line|barrier/.test(lower)) {
    return {
      detectedIntent: 'hedge/screening',
      suggestedSpecies: [
        {
          name: 'Titoki',
          description: 'NZ native small tree/screening plant with glossy dark green leaves and distinctive red seed pods.',
          notes: 'Suitable as native screening or small tree. Can be pleached or raised. Not necessarily dense from ground unless trained or underplanted with low shrubs.',
        },
        {
          name: 'Griselinia littoralis',
          description: 'Dense, fast-growing NZ native evergreen — one of the most reliable hedge plants in New Zealand.',
          notes: 'Hardy coastal and inland. Creates a solid, dense hedge from ground level. Low maintenance once established.',
        },
        {
          name: 'Camellia sasanqua',
          description: 'Flowering evergreen hedge with attractive white, pink, or red flowers from autumn through winter.',
          notes: 'Good for formal or informal hedging. Dense foliage with seasonal colour interest.',
        },
      ],
      askHedgeForm: true,
    }
  }

  if (/\bnative\b|indigenous|nz native|new zealand native|tāonga/.test(lower)) {
    return {
      detectedIntent: 'native planting',
      suggestedSpecies: [
        {
          name: 'Harakeke (New Zealand Flax)',
          description: 'Bold NZ native with upright strap-like leaves. Great as a feature or screening plant.',
          notes: 'Very hardy, suits wet or dry conditions. Fast-growing. Many cultivars with coloured foliage available.',
        },
        {
          name: 'Coprosma repens',
          description: 'Shiny-leaved NZ native shrub. Excellent for coastal and exposed garden sites.',
          notes: 'Many variegated varieties available. Good for hedging, borders, or mixed native planting.',
        },
        {
          name: 'Pohutukawa',
          description: 'Iconic NZ coastal tree with brilliant crimson flowers in summer. Long-lived specimen tree.',
          notes: 'Spectacular in flower. Best suited to coastal and well-drained sites. Needs room to spread.',
        },
      ],
      askHedgeForm: false,
    }
  }

  if (/subtropical|tropical|lush|jungle|banana|palm|fern/.test(lower)) {
    return {
      detectedIntent: 'subtropical planting',
      suggestedSpecies: [
        {
          name: 'Tree Fern (Mamaku)',
          description: 'Dramatic NZ native tree fern with large spreading fronds. Creates instant sub-tropical atmosphere.',
          notes: 'Prefers sheltered, moist, and partly shaded conditions. Can reach 3–5m tall.',
        },
        {
          name: 'Strelitzia (Bird of Paradise)',
          description: 'Bold tropical-looking perennial with striking orange and blue flowers.',
          notes: 'Drought-tolerant once established. Full sun. Makes a strong visual statement in any garden.',
        },
        {
          name: 'Canna Lily',
          description: 'Large-leaved tropical-look plant with bright summer flowers in orange, red, or yellow.',
          notes: 'Easy to grow and multiplies well. Ideal for bold subtropical borders or statement planting.',
        },
      ],
      askHedgeForm: false,
    }
  }

  if (/low.?maintenance|easy|hardy|drought|no.?fuss|low effort/.test(lower)) {
    return {
      detectedIntent: 'low maintenance',
      suggestedSpecies: [
        {
          name: 'Agapanthus',
          description: 'Tough, clumping perennial with blue or white summer flowers on tall stems.',
          notes: 'Almost indestructible. Drought-tolerant once established. Great for borders, edges, and slopes.',
        },
        {
          name: 'Griselinia littoralis',
          description: 'Dense NZ native hedge plant. Very low maintenance once established.',
          notes: 'Rarely needs pest or disease treatment. Tidy once or twice a year. Long-lived.',
        },
        {
          name: 'Lomandra',
          description: 'Compact grass-like NZ native. Extremely tough and virtually self-managing.',
          notes: 'Excellent for mass planting, slopes, or dry exposed borders.',
        },
      ],
      askHedgeForm: false,
    }
  }

  if (/colou?r|flower|bloom|bright|display|cottage|roses?|perennial/.test(lower)) {
    return {
      detectedIntent: 'colour/flowering',
      suggestedSpecies: [
        {
          name: 'Camellia sasanqua',
          description: 'Evergreen shrub with white, pink, or red flowers in autumn and winter.',
          notes: 'Long-flowering season. Works as a hedge, espalier, or specimen feature plant.',
        },
        {
          name: 'Agapanthus',
          description: 'Bold blue or white summer flowers on upright stems above strappy green foliage.',
          notes: 'Long-lived and very reliable. Drought-tolerant.',
        },
        {
          name: 'Salvia',
          description: 'Cottage garden favourite with a long flowering season in blue, purple, pink, or red.',
          notes: 'Attracts bees and butterflies. Low maintenance. Cut back after flowering to keep compact.',
        },
      ],
      askHedgeForm: false,
    }
  }

  return {
    detectedIntent: 'general planting',
    suggestedSpecies: [
      {
        name: 'Griselinia littoralis',
        description: 'Reliable NZ native hedge and screening plant. An all-round workhorse.',
        notes: 'Dense, tidy, and low maintenance. Suits most Auckland garden conditions.',
      },
      {
        name: 'Agapanthus',
        description: 'Clumping perennial with summer flowers. Excellent for borders and garden edges.',
        notes: 'Hardy and very long-lived. Little attention needed once established.',
      },
      {
        name: 'Harakeke (New Zealand Flax)',
        description: 'Bold NZ native feature plant with dramatic upright strap leaves.',
        notes: 'Architectural and tough. Available in many sizes and foliage colours.',
      },
    ],
    askHedgeForm: false,
  }
}
