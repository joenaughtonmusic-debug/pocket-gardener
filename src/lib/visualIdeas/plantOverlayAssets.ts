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

const ASSETS: Record<string, OverlayAsset> = {
  lomandra: {
    key: 'lomandra',
    src: '/plant-overlays/lomandra.png',
    defaultWidthFraction: 0.14,
    aspect: 4576 / 3056,
  },
  camellia: {
    key: 'camellia',
    src: '/plant-overlays/camellia_clean_transparent.png',
    defaultWidthFraction: 0.20,
    aspect: 1,
  },
  flax: {
    key: 'flax',
    src: '/plant-overlays/flax.png',
    defaultWidthFraction: 0.18,
    aspect: 1,
  },
  groundcover: {
    key: 'groundcover',
    src: '/plant-overlays/groundcover.png',
    defaultWidthFraction: 0.16,
    aspect: 1,
  },
  ponga: {
    key: 'ponga',
    src: '/plant-overlays/ponga.png',
    defaultWidthFraction: 0.24,
    aspect: 1,
  },
  buxus: {
    key: 'buxus',
    src: '/plant-overlays/buxus.png',
    defaultWidthFraction: 0.20,
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
    defaultWidthFraction: 0.14,
    aspect: 200 / 250,
  },
  'rounded-shrub': {
    key: 'rounded-shrub',
    src: '/plant-overlays/rounded-shrub.svg',
    defaultWidthFraction: 0.20,
    aspect: 200 / 230,
  },
}

const FALLBACK_ASSET: OverlayAsset = ASSETS['rounded-shrub']

/** Species-name matching rules, tested in priority order. */
const SPECIES_RULES: Array<{ pattern: RegExp; assetKey: string }> = [
  { pattern: /phormium|flax|astelia/i,                                   assetKey: 'flax' },
  { pattern: /ponga|tree.?fern|dicksonia|cyathea/i,                      assetKey: 'ponga' },
  { pattern: /griselinia|titoki/i,                                       assetKey: 'hedge' },
  { pattern: /buxus/i,                                                   assetKey: 'buxus' },
  { pattern: /camellia/i,                                                assetKey: 'camellia' },
  { pattern: /lomandra|carex|libertia|dietes|agapanthus|harakeke/i,     assetKey: 'lomandra' },
  { pattern: /groundcover|ground.?cover|pratia|muehlenbeckia|coprosma/i, assetKey: 'groundcover' },
]

/** Detected-intent matching rules. */
const INTENT_RULES: Array<{ pattern: RegExp; assetKey: string }> = [
  { pattern: /hedge|screen/i,               assetKey: 'hedge' },
  { pattern: /ponga|tree.?fern/i,           assetKey: 'ponga' },
  { pattern: /flax|phormium/i,              assetKey: 'flax' },
  { pattern: /groundcover|ground.?cover/i,  assetKey: 'groundcover' },
  { pattern: /shrub/i,                      assetKey: 'camellia' },
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
