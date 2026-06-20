import { normalizePlantingType } from './createPlacementMask'

// ---------------------------------------------------------------------------
// Form categories
// ---------------------------------------------------------------------------

export type PlantVisualForm =
  | 'strappy_clump'
  | 'rounded_flowering_shrub'
  | 'rounded_evergreen_shrub'
  | 'clipped_formal_shrub'
  | 'hedge_screen'
  | 'small_tree'
  | 'feature_tree'
  | 'palm_tropical'
  | 'architectural_flax'
  | 'groundcover'
  | 'climber'
  | 'fern'
  | 'unknown'

export interface VisualFormDescriptor {
  /** Sentence fragment describing the plant's appearance — embedded in the prompt */
  description: string
  /** Positive instruction telling the model how to render the form */
  formInstruction: string
  /** Brief size / scale guidance */
  scaleHint: string
  /** Compact negative clause specific to this form */
  negatives: string
}

// ---------------------------------------------------------------------------
// Descriptors per form — these are the sentences the model actually sees
// ---------------------------------------------------------------------------

export const VISUAL_FORM_DESCRIPTORS: Record<PlantVisualForm, VisualFormDescriptor> = {
  strappy_clump: {
    description:
      'an ornamental grass-like clump with long narrow arching strap leaves growing from the base',
    formInstruction:
      'Show a clumping tussock of long, narrow, arching leaves radiating from the base — clear strap-leaf form.',
    scaleHint: 'Approximately 40–80 cm tall and wide depending on species and perspective.',
    negatives:
      'Not a leafy shrub, not a hedge, not a copied nearby plant, not a flat mat.',
  },

  rounded_flowering_shrub: {
    description:
      'an upright rounded woody shrub with visible leafy volume and seasonal flowers',
    formInstruction:
      'Show a healthy rounded woody shrub with clearly visible leaves and at least a few flowers. ' +
      'Use natural green foliage — not black. Show realistic woody branching, not a clipped ball.',
    scaleHint: 'Approximately 60 cm to 1.5 m tall depending on species.',
    negatives:
      'Not a groundcover, not grass-like, not a clipped black mound, not a flat mat.',
  },

  rounded_evergreen_shrub: {
    description:
      'an upright rounded evergreen shrub with dense leafy volume and woody branching',
    formInstruction:
      'Show a healthy rounded evergreen shrub with dense green foliage and woody structure. ' +
      'Blend naturally into the garden bed with a realistic shadow at the base.',
    scaleHint: 'Approximately 60 cm to 1.2 m tall depending on species.',
    negatives:
      'Not a groundcover, not grass-like, not an artificial clipped ball.',
  },

  clipped_formal_shrub: {
    description:
      'a dense, neatly clipped evergreen shrub with fine leaves and a geometric form',
    formInstruction:
      'Show a tidy, compact, densely clipped shrub — small fine leaves, geometric rounded or box-like outline.',
    scaleHint: 'Approximately 30–80 cm tall.',
    negatives:
      'Not a loose wild shrub, not a groundcover, not a grass clump.',
  },

  hedge_screen: {
    description:
      'a continuous vertical screen or dense hedge with tightly packed foliage forming a boundary',
    formInstruction:
      'Show a dense, tall, continuous hedge or screen planting filling the masked area top-to-bottom. ' +
      'Even, wall-like foliage with no visible gaps.',
    scaleHint: 'Approximately 1.5–3 m tall depending on context.',
    negatives:
      'Not individual round balls, not groundcover, not spaced individual plants.',
  },

  small_tree: {
    description:
      'a small multi-branched or single-trunked tree with a visible trunk and light canopy',
    formInstruction:
      'Show a small tree with a clear trunk (or trunks) and an open leafy canopy above.',
    scaleHint: 'Approximately 2–5 m tall in mature form; show proportional to scene.',
    negatives:
      'Not a shrub-ball, not a hedge, not a grass clump.',
  },

  feature_tree: {
    description:
      'a bold specimen tree with a strong trunk, architectural branching, and full canopy',
    formInstruction:
      'Show a mature specimen tree with a clearly visible trunk and full, well-shaped canopy filling most of the masked height.',
    scaleHint: 'Suggest mature height — show proportional to the garden scene.',
    negatives:
      'Not a shrub, not a hedge, not a grass clump.',
  },

  palm_tropical: {
    description:
      'a tropical or architectural plant with a bold upright form, large leaves or palm fronds',
    formInstruction:
      'Show a bold upright architectural plant — large tropical leaves or palm fronds clearly visible.',
    scaleHint: 'Can range from 60 cm to several metres; match species scale.',
    negatives:
      'Not a soft rounded shrub, not a grass clump, not a hedge.',
  },

  architectural_flax: {
    description:
      'a bold strap-leaved architectural plant with stiff, upright or arching fans of broad leaves',
    formInstruction:
      'Show stiff, sword-like strap leaves fanning out from the base — bold, architectural, upright form.',
    scaleHint: 'Approximately 60 cm to 1.5 m tall depending on cultivar.',
    negatives:
      'Not a soft rounded shrub, not fine grass, not a hedge, not a tree.',
  },

  groundcover: {
    description:
      'a low spreading mat or carpet of foliage close to the soil surface',
    formInstruction:
      'Show a low, spreading groundcover filling the masked area close to ground level.',
    scaleHint: 'Below 30 cm tall; spreading laterally.',
    negatives:
      'Not a tall shrub, not a tree, not upright.',
  },

  climber: {
    description:
      'a climbing or scrambling plant with flexible stems and foliage growing along a surface or support',
    formInstruction:
      'Show a climbing plant with flexible stems and leaves growing against a surface or support.',
    scaleHint: 'Height and spread depend on the support structure shown.',
    negatives:
      'Not a free-standing shrub or tree.',
  },

  fern: {
    description:
      'a lush fern with arching fronds radiating from a central crown',
    formInstruction:
      'Show arching green fronds radiating from a central crown — classic fern form, soft and lush.',
    scaleHint: 'Approximately 40 cm to 1 m tall depending on species.',
    negatives:
      'Not a leafy shrub, not grass-like, not a tree.',
  },

  unknown: {
    description: 'a healthy, well-established garden plant',
    formInstruction:
      'Show a clearly visible, healthy, lush plant filling the masked area naturally. ' +
      'Blend naturally into the garden bed.',
    scaleHint: 'Match scale to the surrounding garden context.',
    negatives:
      'Not a copied existing nearby plant, not generic garden texture.',
  },
}

// ---------------------------------------------------------------------------
// Species → form classification
// ---------------------------------------------------------------------------

type FormResolver =
  | PlantVisualForm
  | ((normalizedPlantingType: string | null) => PlantVisualForm)

interface SpeciesRule {
  /** All lowercase substrings that identify this species */
  keys: string[]
  form: FormResolver
}

/**
 * Ordered list of species rules. Checked top-to-bottom; first match wins.
 * Keys are matched by substring against the lowercased species name.
 */
const SPECIES_RULES: SpeciesRule[] = [
  // ── Strappy / grass-like clumps ──────────────────────────────────────────
  { keys: ['lomandra'], form: 'strappy_clump' },
  { keys: ['libertia'], form: 'strappy_clump' },
  { keys: ['carex'], form: 'strappy_clump' },
  { keys: ['dietes', 'fortnight lily'], form: 'strappy_clump' },
  { keys: ['mondo grass', 'ophiopogon'], form: 'strappy_clump' },
  { keys: ['liriope', 'lilyturf'], form: 'strappy_clump' },
  { keys: ['agapanthus', 'lily of the nile'], form: 'strappy_clump' },
  { keys: ['dianella'], form: 'strappy_clump' },
  { keys: ['anigozanthos', 'kangaroo paw'], form: 'strappy_clump' },

  // ── Architectural flax ────────────────────────────────────────────────────
  { keys: ['phormium', 'new zealand flax', 'harakeke', 'nz flax'], form: 'architectural_flax' },

  // ── Flowering shrubs ──────────────────────────────────────────────────────
  { keys: ['camellia'], form: 'rounded_flowering_shrub' },
  { keys: ['hydrangea'], form: 'rounded_flowering_shrub' },
  { keys: ['gardenia'], form: 'rounded_flowering_shrub' },
  { keys: ['rose', 'rosa'], form: 'rounded_flowering_shrub' },
  { keys: ['rhododendron', 'azalea'], form: 'rounded_flowering_shrub' },
  { keys: ['magnolia'], form: 'rounded_flowering_shrub' },
  { keys: ['fuchsia'], form: 'rounded_flowering_shrub' },
  { keys: ['tibouchina'], form: 'rounded_flowering_shrub' },
  { keys: ['murraya', 'orange jessamine'], form: 'rounded_flowering_shrub' },
  { keys: ['viburnum'], form: 'rounded_flowering_shrub' },

  // ── Formal / clipped shrubs ───────────────────────────────────────────────
  { keys: ['buxus', 'box hedge', 'boxwood', 'english box'], form: 'clipped_formal_shrub' },
  { keys: ['ilex', 'holly'], form: 'clipped_formal_shrub' },

  // ── Hedge / screen ────────────────────────────────────────────────────────
  { keys: ['griselinia'], form: 'hedge_screen' },
  { keys: ['photinia'], form: 'hedge_screen' },
  { keys: ['leylandii', 'leyland', 'cupressus'], form: 'hedge_screen' },
  { keys: ['thuja', 'arborvitae'], form: 'hedge_screen' },
  { keys: ['escallonia'], form: 'hedge_screen' },
  { keys: ['oleander'], form: 'hedge_screen' },

  // ── Context-dependent: hedge/screening → hedge_screen, else small_tree ───
  {
    keys: ['titoki', 'alectryon excelsus'],
    form: (t) =>
      t === 'hedge' || t === 'screening' || t === 'border_planting'
        ? 'hedge_screen'
        : 'small_tree',
  },
  {
    keys: ['pittosporum'],
    form: (t) =>
      t === 'hedge' || t === 'screening' || t === 'border_planting'
        ? 'hedge_screen'
        : 'rounded_evergreen_shrub',
  },

  // ── Rounded evergreen shrubs ──────────────────────────────────────────────
  { keys: ['hebe'], form: 'rounded_evergreen_shrub' },
  { keys: ['lavender', 'lavandula'], form: 'rounded_evergreen_shrub' },
  { keys: ['rosemary', 'salvia rosmarinus'], form: 'rounded_evergreen_shrub' },
  { keys: ['coprosma'], form: 'rounded_evergreen_shrub' },
  { keys: ['leptospermum', 'tea tree', 'mānuka', 'manuka'], form: 'rounded_evergreen_shrub' },
  { keys: ['corokia'], form: 'rounded_evergreen_shrub' },
  { keys: ['leucadendron'], form: 'rounded_evergreen_shrub' },
  { keys: ['westringia', 'coast rosemary'], form: 'rounded_evergreen_shrub' },
  { keys: ['choisya', 'mexican orange'], form: 'rounded_evergreen_shrub' },
  { keys: ['osmanthus'], form: 'rounded_evergreen_shrub' },

  // ── Small trees ───────────────────────────────────────────────────────────
  { keys: ['japanese maple', 'acer palmatum'], form: 'small_tree' },
  { keys: ['olive', 'olea europaea'], form: 'small_tree' },
  { keys: ['olearia', 'daisy bush'], form: 'rounded_evergreen_shrub' },
  { keys: ['crabapple', 'malus'], form: 'small_tree' },
  { keys: ['cherry', 'prunus'], form: 'small_tree' },
  { keys: ['kowhai', 'sophora'], form: 'small_tree' },

  // ── Feature trees ─────────────────────────────────────────────────────────
  { keys: ['cordyline', 'cabbage tree', 'tī kōuka', 'ti kouka'], form: 'feature_tree' },
  { keys: ['tree fern', 'silver fern', 'ponga', 'cyathea', 'dicksonia'], form: 'feature_tree' },
  { keys: ['pohutukawa'], form: 'feature_tree' },
  { keys: ['puriri'], form: 'feature_tree' },
  { keys: ['kauri', 'agathis'], form: 'feature_tree' },

  // ── Palms / tropical ──────────────────────────────────────────────────────
  { keys: ['strelitzia', 'bird of paradise'], form: 'palm_tropical' },
  { keys: ['nikau', 'rhopalostylis'], form: 'palm_tropical' },
  { keys: ['phoenix', 'date palm', 'canary palm'], form: 'palm_tropical' },
  { keys: ['washingtonia', 'fan palm'], form: 'palm_tropical' },
  { keys: ['archontophoenix', 'bangalow'], form: 'palm_tropical' },
  { keys: ['banana', 'musa'], form: 'palm_tropical' },
  { keys: ['heliconia'], form: 'palm_tropical' },
  { keys: ['gunnera'], form: 'palm_tropical' },

  // ── Groundcovers ──────────────────────────────────────────────────────────
  { keys: ['pratia', 'isotoma'], form: 'groundcover' },
  { keys: ['ajuga', 'bugle'], form: 'groundcover' },
  { keys: ['dichondra'], form: 'groundcover' },
  { keys: ['creeping jenny', 'lysimachia'], form: 'groundcover' },
  { keys: ['pachysandra'], form: 'groundcover' },
  { keys: ['vinca', 'periwinkle'], form: 'groundcover' },

  // ── Ferns ─────────────────────────────────────────────────────────────────
  { keys: ['blechnum', 'hard fern', 'crown fern', 'kiwakiwa'], form: 'fern' },
  { keys: ['asplenium', 'spleenwort', 'hen and chicken'], form: 'fern' },
  { keys: ['adiantum', 'maidenhair'], form: 'fern' },
  { keys: ['polystichum', 'shield fern', 'pikopiko'], form: 'fern' },
  { keys: ['microsorum', 'fragrant fern'], form: 'fern' },

  // ── Climbers ──────────────────────────────────────────────────────────────
  { keys: ['wisteria'], form: 'climber' },
  { keys: ['clematis'], form: 'climber' },
  { keys: ['bougainvillea'], form: 'climber' },
  { keys: ['passionfruit', 'passiflora'], form: 'climber' },
  { keys: ['ivy', 'hedera'], form: 'climber' },
  { keys: ['jasmine', 'jasminum', 'trachelospermum'], form: 'climber' },
]

/**
 * Classifies a plant species into a visual form category.
 *
 * @param species     Common or scientific name (case-insensitive).
 * @param plantingType  Optional planting type — used for context-dependent species
 *                      like Titoki (hedge context → hedge_screen, otherwise small_tree).
 */
export function getPlantVisualForm(
  species: string,
  plantingType?: string | null,
): PlantVisualForm {
  const normalizedType = normalizePlantingType(plantingType)
  const key = species.toLowerCase().trim()

  for (const rule of SPECIES_RULES) {
    const matched = rule.keys.some((k) => key.includes(k) || k.includes(key))
    if (matched) {
      return typeof rule.form === 'function' ? rule.form(normalizedType) : rule.form
    }
  }

  // Fallback: infer from planting type when species is unknown
  if (normalizedType === 'groundcovers') return 'groundcover'
  if (normalizedType === 'feature_tree') return 'feature_tree'
  if (normalizedType === 'hedge' || normalizedType === 'screening') return 'hedge_screen'

  return 'unknown'
}
