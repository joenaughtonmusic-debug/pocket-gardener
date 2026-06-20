/**
 * Returns a visual description of a plant species suitable for inclusion in an
 * image-generation prompt.  Descriptions focus on leaf shape, colour, texture,
 * and overall form — the details that a vision model needs to render the plant
 * convincingly.
 *
 * For known species we return a curated description.
 * For unknowns we fall back to the common name with any notes appended.
 */

const KNOWN_SPECIES: Record<string, string> = {
  titoki:
    'New Zealand native, glossy bright-green pinnate leaves, small tree / screening form, lush but not box-like',
  griselinia:
    'dense bright apple-green oval leaves, clean hedge texture, upright evergreen shrub',
  camellia:
    'Camellia japonica: an upright flowering evergreen garden shrub with glossy dark-green oval leaves, dense woody branching, and several visible camellia flowers in soft pink, white, or red. Natural rounded shrub form, not a clipped ball. Foliage should be healthy green, not black.',
  lomandra:
    'fine strappy grass-like clumps with arching mid-green foliage, low-growing tussock form',
  hydrangea:
    'rounded leafy shrub with broad flat green leaves and large domed flower heads',
  buxus:
    'small dense clipped boxwood-style evergreen, fine dark-green leaves, geometric mounding habit',
  'box hedge': 'fine dark-green leaves, dense clipped boxwood-style evergreen hedge',
  lavender:
    'soft silvery-grey aromatic foliage, slender upright flower spikes in purple/blue when in bloom',
  agapanthus:
    'strappy mid-green strap leaves in clumping rosettes, globe-shaped flower heads on tall stems',
  phormium:
    'bold strap-leaved New Zealand flax with stiff upright fans of green or bronze-red leaves',
  'new zealand flax':
    'bold strap-leaved plant with stiff upright fans, green or bronze-red coloured',
  hebe:
    'neat rounded evergreen shrub, small dark-green leaves, small flower spikes in white or purple',
  pittosporum:
    'glossy dark-green oval leaves, dense rounded evergreen shrub / small tree',
  'photinia red robin':
    'dense evergreen shrub with vivid red new growth fading to glossy dark green, ideal hedge',
  photinia:
    'dense evergreen shrub with vivid red new growth fading to glossy dark green',
  liriope:
    'fine strappy grass-like clumps, dark green arching foliage, low ground-covering habit',
  'japanese maple':
    'delicate palmate leaves in deep red or green depending on cultivar, elegant layered branching',
  olive: 'fine silver-green narrow leaves on gnarled picturesque framework, Mediterranean character',
  rosemary:
    'fine needle-like aromatic silver-green foliage, mounding or upright form, small blue flowers',
}

/**
 * @param speciesName  The species common or scientific name (case-insensitive).
 * @param fallbackNotes  Optional free-text description / notes from the plant library.
 */
export function describePlantForImage(
  speciesName: string,
  fallbackNotes?: string | null,
): string {
  const key = speciesName.toLowerCase().trim()

  // Try exact match
  if (KNOWN_SPECIES[key]) {
    return `${speciesName} — ${KNOWN_SPECIES[key]}`
  }

  // Try partial match (e.g. "Griselinia littoralis" → matches "griselinia")
  for (const [knownKey, description] of Object.entries(KNOWN_SPECIES)) {
    if (key.includes(knownKey) || knownKey.includes(key)) {
      return `${speciesName} — ${description}`
    }
  }

  // Fallback: name + any library notes
  if (fallbackNotes) {
    return `${speciesName} — ${fallbackNotes}`
  }

  return speciesName
}

/**
 * Builds a combined species description string for multiple species, suitable
 * for embedding directly in an image prompt.
 */
export function describeSpeciesListForImage(species: string[]): string {
  if (species.length === 0) return 'suitable mature garden plants'
  return species.map((s) => describePlantForImage(s)).join('; ')
}
