/**
 * Classification rules and manual overrides for visualiser asset coverage.
 * Used by visualiserAssetCoverage.ts — does not affect runtime visualiser behaviour.
 */

import type { AssetClassification, AssetPriority, ManualCutoutRisk } from './visualiserAssetCoverage.types'

export interface CatalogPlant {
  id: number
  common_name: string
  scientific_name: string | null
  plant_type: string | null
  task_category: string | null
  flower_color: string | null
  is_native: boolean | null
  maintenance_level: string | null
}

export interface PlantCoverageOverride {
  classification?: AssetClassification
  priority?: AssetPriority
  manualCutoutRisk?: ManualCutoutRisk
  paleFlowerRisk?: boolean
  notes?: string
  /** Force exact even when asset is shared — rarely used */
  forceExact?: boolean
}

/** Manual overrides by plants.id — authoritative over heuristics. */
export const PLANT_COVERAGE_OVERRIDES: Record<number, PlantCoverageOverride> = {
  // ── Exact / launch — Visualise selector plants ───────────────────────────
  5: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated hydrangea.png.' },
  68: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated bird-of-paradise.png.' },
  15: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated nikau.png.' },
  50: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated hebe.png.' },
  141: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Dedicated renga-renga-lily.png. White/pale flowers may need manual cutout or non-white source background.',
  },
  6: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated clivia.png.' },
  7: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Dedicated star-jasmine.png. White flowers may need manual cutout or non-white source background.',
  },
  75: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated lomandra.png (large file — consider resize). Small white flower spikes — monitor cutout quality.',
  },
  4: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Maps to griselinia-hedge.png. Row mode + spot hedge rule.' },
  76: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Maps to ficus-tuffy-hedge.png. Row mode + spot hedge rule.' },
  29: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Maps to buxus-hedge.png. Row mode + spot hedge rule.' },
  77: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Japanese Box → buxus-hedge.png via species rule.' },
  42: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated ponga.png.' },

  // ── Close shared ─────────────────────────────────────────────────────────
  12: { classification: 'close_shared_asset_ok', priority: 'launch', notes: 'Shares flax.png — same strappy form family.' },
  24: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Silver Flax (Astelia) shares flax.png.' },
  16: {
    classification: 'close_shared_asset_ok',
    priority: 'soon',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Shares groundcover.png. White flowers — manual cutout may be needed.',
  },
  43: {
    classification: 'close_shared_asset_ok',
    priority: 'later',
    paleFlowerRisk: true,
    notes: 'Fortnight Lily (Dietes) shares lomandra.png. White flowers — distinct form from Lomandra.',
  },
  62: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Muehlenbeckia shares groundcover.png.' },
  35: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Mirror Bush (Coprosma) shares groundcover.png — shrub habit not ideal.' },
  71: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Spot: camellia.png. Row: camellia-hedge.png via Camellia Hedge row option.',
  },
  52: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Kentia Palm — intent/palm rules may map to ponga/nikau; not all palms suit Nikau silhouette.' },
  22: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'King Palm — shares palm/feature resolution; dedicated palm asset later.' },
  45: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Sugar Cane Palm — palm silhouette share.' },
  38: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Sago Palm — palm-like; may share nikau/ponga intent asset.' },
  108: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Liriope shares lomandra/groundcover family — strappy border clump.' },
  40: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Flax Lily (Dianella) — strappy; no dedicated asset, lomandra share if wired.' },

  // ── Temporary fallback ───────────────────────────────────────────────────
  20: {
    classification: 'temporary_fallback_only',
    priority: 'soon',
    notes: 'Row mode only. Uses generic hedge-section.svg — replace with Titoki native screen PNG.',
  },

  // ── Needs new asset — priority candidates ────────────────────────────────
  147: {
    classification: 'needs_new_asset',
    priority: 'soon',
    paleFlowerRisk: true,
    manualCutoutRisk: 'high',
    notes:
      'gardenia-v2.png on disk but NOT registered — auto cutout likely removes white flowers. Manual cutout or non-white source background required before wiring. Do NOT mark exact until QA passes.',
  },
  54: {
    classification: 'needs_new_asset',
    priority: 'soon',
    notes: 'lavender white.png on disk, unregistered. Process and QA before registry.',
  },
  8: {
    classification: 'needs_new_asset',
    priority: 'later',
    paleFlowerRisk: true,
    notes: 'lemon white.png on disk, unregistered. Citrus tree-scale overlay needed.',
  },
  55: { classification: 'needs_new_asset', priority: 'later', paleFlowerRisk: true, notes: 'Citrus — tree overlay needed.' },
  56: { classification: 'needs_new_asset', priority: 'later', paleFlowerRisk: true, notes: 'Citrus — tree overlay needed.' },
  60: { classification: 'needs_new_asset', priority: 'later', paleFlowerRisk: true, notes: 'Citrus — tree overlay needed.' },
  37: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Spot: corokia-geentys-green.png. Row: corokia-geentys-green-hedge.png.',
  },
  92: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Spot: corokia-virgata.png. Row: corokia-virgata-hedge.png.',
  },
  10: { classification: 'needs_new_asset', priority: 'later', notes: 'Pittosporum hedge — common NZ screen; needs dedicated PNG.' },
  61: { classification: 'needs_new_asset', priority: 'later', notes: 'Large coastal tree — poor fit for spot overlay scale without dedicated asset.' },
  112: { classification: 'needs_new_asset', priority: 'later', notes: 'Kōwhai — native feature tree; needs dedicated asset.' },
  59: { classification: 'needs_new_asset', priority: 'later', paleFlowerRisk: true, notes: 'Deciduous magnolia — large tree overlay.' },
  135: { classification: 'needs_new_asset', priority: 'later', paleFlowerRisk: true, notes: 'Evergreen magnolia — large tree overlay.' },
  32: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated cabbage-tree.png overlay.',
  },
  131: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated cordyline-stricta.png overlay.' },
  113: { classification: 'needs_new_asset', priority: 'later', notes: 'Large native tree — defer dedicated asset.' },
  138: { classification: 'needs_new_asset', priority: 'later', notes: 'Philodendron Xanadu — subtropical clump; no overlay.' },
  117: { classification: 'needs_new_asset', priority: 'later', notes: 'Rhododendron shrub — no species rule.' },
  118: { classification: 'needs_new_asset', priority: 'later', notes: 'Vireya rhododendron — no species rule.' },
  134: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated canna-lily.png overlay.' },
  128: {
    classification: 'needs_new_asset',
    priority: 'later',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Manuka (Leptospermum) — fine-textured native shrub.',
  },
  17: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated escallonia.png overlay — spot mode only.',
  },
  58: {
    classification: 'needs_new_asset',
    priority: 'later',
    paleFlowerRisk: true,
    notes: 'Ligustrum hedge — white flower spikes; needs hedge PNG.',
  },
  72: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated eugenia.png hedge row overlay — row mode only.',
  },
  116: { classification: 'needs_new_asset', priority: 'later', notes: 'Murraya hedge — no dedicated PNG.' },
  96: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated english-holly.png overlay.' },
  107: { classification: 'needs_new_asset', priority: 'later', notes: 'Port Wine Magnolia hedge — no overlay.' },
  83: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated european-hornbeam.png overlay — spot mode only.',
  },
  150: { classification: 'needs_new_asset', priority: 'later', notes: 'Rose — cottage shrub; no overlay.' },
  145: { classification: 'needs_new_asset', priority: 'later', notes: 'Hibiscus — subtropical shrub; no overlay.' },
  114: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated begonia.png overlay.' },
  115: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated bromeliad.png overlay.' },
  133: { classification: 'needs_new_asset', priority: 'later', notes: 'Foxtail Agave — succulent rosette; no overlay.' },
  30: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated bottlebrush.png overlay.' },
  13: { classification: 'needs_new_asset', priority: 'later', notes: 'Pink Rhaphiolepis — shrub; no overlay.' },
  99: { classification: 'needs_new_asset', priority: 'later', notes: 'Smoke Bush — large shrub/small tree.' },
  94: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated crepe-myrtle.png overlay.' },
  63: { classification: 'needs_new_asset', priority: 'later', notes: 'Olive — silvery tree/shrub; no overlay.' },
  18: { classification: 'needs_new_asset', priority: 'later', notes: 'Japanese Maple — deciduous feature; large tree overlay.' },
  33: { classification: 'needs_new_asset', priority: 'later', notes: 'Forest Pansy — small tree.' },
  79: { classification: 'needs_new_asset', priority: 'later', paleFlowerRisk: true, notes: 'Redbud — small flowering tree.' },
  136: {
    classification: 'needs_new_asset',
    priority: 'later',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Michelia Bubbles — white flowers; manual cutout likely.',
  },
  140: {
    classification: 'needs_new_asset',
    priority: 'later',
    paleFlowerRisk: true,
    notes: 'Westringia — white flowers; coastal shrub overlay.',
  },
  151: {
    classification: 'needs_new_asset',
    priority: 'later',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Hellebore — white/cream flowers; low perennial.',
  },
  34: {
    classification: 'needs_new_asset',
    priority: 'later',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Silver Bush — white flowers; low shrub.',
  },
  122: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated boston-ivy.png overlay.' },
  137: {
    classification: 'needs_new_asset',
    priority: 'later',
    notes: 'Ficus Pumila — held; ficus pumilia.png cutout too transparent/weak for production.',
  },
  120: { classification: 'needs_new_asset', priority: 'later', notes: 'Hardenbergia — climber; no overlay.' },
  119: { classification: 'needs_new_asset', priority: 'later', notes: 'Tecomanthe — native climber; no overlay.' },
  121: { classification: 'needs_new_asset', priority: 'later', notes: 'Orange Trumpet Vine — climber; no overlay.' },
  123: { classification: 'needs_new_asset', priority: 'later', notes: 'Virginia Creeper — climber; no overlay.' },
  23: { classification: 'needs_new_asset', priority: 'later', notes: 'Hen and Chicken Fern — ground fern; not tree-fern scale.' },
  27: { classification: 'needs_new_asset', priority: 'later', notes: 'Silver Lady Fern — shade fern; no overlay.' },
  110: { classification: 'needs_new_asset', priority: 'later', notes: 'Mondo Grass — too low for spot overlay.' },
  41: { classification: 'needs_new_asset', priority: 'later', notes: 'Silver Falls — trailing groundcover; poor overlay scale.' },
  139: { classification: 'needs_new_asset', priority: 'later', notes: 'Spanish Shawl — groundcover; low priority.' },
  111: { classification: 'needs_new_asset', priority: 'later', notes: 'Rain Lily — small bulb; poor overlay scale.' },
  132: { classification: 'needs_new_asset', priority: 'later', notes: 'Iresine — colourful foliage perennial; low priority.' },
  57: { classification: 'needs_new_asset', priority: 'later', notes: 'Tractor Seat — bold leaf perennial; low overlay priority.' },

  // ── Not visualiser relevant ──────────────────────────────────────────────
  21: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated apple-tree.png overlay.' },
  25: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated avocado.png overlay.' },
  28: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated blueberry.png overlay.' },
  46: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated feijoa.png overlay — spot mode only.' },
  3: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated cherry-tree.png overlay.' },
  70: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Stone fruit tree — out of scope.' },
  19: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Forest giant — not suitable for garden photo spot overlay.' },
  66: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native timber tree — out of scope.' },
  39: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  101: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  95: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  98: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  26: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  44: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated ake-ake.png overlay.' },
  97: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  91: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  51: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Medium native tree — poor spot overlay scale.' },
  89: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated box-elder.png overlay.' },
  105: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated oak.png overlay — spot mode only.',
  },
  87: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated birch.png overlay — spot mode only.',
  },
  93: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated european-beech.png overlay — spot mode only.',
  },
  85: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree — out of scope.' },
  47: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated evergreen-ash.png overlay — spot mode only.' },
  88: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree — out of scope.' },
  106: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large street tree — out of scope.' },
  84: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree — out of scope.' },
  102: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree — out of scope.' },
  103: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree — out of scope.' },
  80: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree — out of scope.' },
  86: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree/shrub — out of scope.' },
  36: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated dogwood.png overlay.' },
  90: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large conifer — out of scope.' },
  81: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large conifer — out of scope.' },
  109: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Indoor/tropical houseplant — not garden visualiser focus.' },
}

/** Asset keys that represent dedicated PNG overlays (primary owners). */
export const PRIMARY_EXACT_ASSET_PATTERNS: Array<{ pattern: RegExp; assetKey: string }> = [
  { pattern: /^hydrangea$/i, assetKey: 'hydrangea' },
  { pattern: /bird of paradise|strelitzia reginae/i, assetKey: 'bird-of-paradise' },
  { pattern: /^nikau palm$/i, assetKey: 'nikau' },
  { pattern: /^hebe/i, assetKey: 'hebe' },
  { pattern: /^renga renga lily$/i, assetKey: 'renga-renga-lily' },
  { pattern: /^clivia$/i, assetKey: 'clivia' },
  { pattern: /^star jasmine$/i, assetKey: 'star-jasmine' },
  { pattern: /^lomandra$/i, assetKey: 'lomandra' },
  { pattern: /^ponga fern$/i, assetKey: 'ponga' },
  { pattern: /^griselinia$/i, assetKey: 'griselinia-hedge' },
  { pattern: /^ficus tuffi$/i, assetKey: 'ficus-tuffy-hedge' },
  { pattern: /buxus|japanese box/i, assetKey: 'buxus-hedge' },
  { pattern: /^nz flax$/i, assetKey: 'flax' },
  { pattern: /^camellia$/i, assetKey: 'camellia' },
  { pattern: /^ake-ake$/i, assetKey: 'ake-ake' },
  { pattern: /^apple tree$/i, assetKey: 'apple-tree' },
  { pattern: /^avocado$/i, assetKey: 'avocado' },
  { pattern: /^begonia$/i, assetKey: 'begonia' },
  { pattern: /^blueberry$/i, assetKey: 'blueberry' },
  { pattern: /^bottlebrush$/i, assetKey: 'bottlebrush' },
  { pattern: /^box elder$/i, assetKey: 'box-elder' },
  { pattern: /^bromeliad$/i, assetKey: 'bromeliad' },
  { pattern: /^cabbage tree$/i, assetKey: 'cabbage-tree' },
  { pattern: /^corokia geentys green$/i, assetKey: 'corokia-geentys-green' },
  { pattern: /^corokia virgata$/i, assetKey: 'corokia-virgata' },
  { pattern: /^english holly$/i, assetKey: 'english-holly' },
  { pattern: /^boston ivy$/i, assetKey: 'boston-ivy' },
  { pattern: /^canna lily$/i, assetKey: 'canna-lily' },
  { pattern: /^cherry tree$/i, assetKey: 'cherry-tree' },
  { pattern: /^cordyline stricta$/i, assetKey: 'cordyline-stricta' },
  { pattern: /^crepe myrtle$/i, assetKey: 'crepe-myrtle' },
  { pattern: /^dogwood$/i, assetKey: 'dogwood' },
  { pattern: /^erman.?s birch$/i, assetKey: 'birch' },
  { pattern: /^escallonia$/i, assetKey: 'escallonia' },
  { pattern: /^european beech$/i, assetKey: 'european-beech' },
  { pattern: /^european hornbeam$/i, assetKey: 'european-hornbeam' },
  { pattern: /^evergreen ash$/i, assetKey: 'evergreen-ash' },
  { pattern: /^feijoa$/i, assetKey: 'feijoa' },
  { pattern: /^english oak$/i, assetKey: 'oak' },
]

export const APPROVED_PNG_KEYS = new Set([
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
])

export const HEDGE_PNG_KEYS = new Set([
  'buxus-hedge',
  'griselinia-hedge',
  'ficus-tuffy-hedge',
  'camellia-hedge',
  'corokia-geentys-green-hedge',
  'corokia-virgata-hedge',
  'eugenia',
])

export const SVG_FALLBACK_KEYS = new Set(['hedge', 'strappy-clump', 'rounded-shrub'])

export const VISUALISE_SELECTOR_NAMES = new Set([
  'Hydrangea',
  'Bird of Paradise',
  'Nikau Palm',
  'Hebe',
  'Renga Renga Lily',
  'Clivia',
  'Star Jasmine',
  'Lomandra',
  'Agapanthus',
  'Camellia sasanqua',
  'Harakeke (New Zealand Flax)',
  'Phormium',
  'Pratia angulata',
  'Tree Fern (Ponga)',
])

/** DB common_name → visualise selector name (subset not in DB under same name). */
export const DB_TO_SELECTOR_ALIAS: Record<string, string> = {
  'Bird Of Paradise': 'Bird of Paradise',
  'Hebe (Koromiko)': 'Hebe',
  'NZ Flax': 'Harakeke (New Zealand Flax)',
  'Ponga Fern': 'Tree Fern (Ponga)',
  Pratia: 'Pratia angulata',
  Camellia: 'Camellia sasanqua',
}

export const ROW_MODE_DB_NAMES = new Set(['Griselinia', 'Ficus Tuffi', 'Buxus (Box Hedge)', 'Titoki', 'Eugenia'])

const PALE_FLOWER_COLOR = /white|cream|ivory|pale|light/i

const PALE_FLOWER_NAME =
  /jasmine|gardenia|michelia|hellebore|manuka|westringia|silver bush|pratia|renga renga|fortnight lily|dietes|escallonia|eugenia|ligustrum|magnolia|dogwood|lacebark|serviceberry|rede?bud|silver bush|fortnight|michelia|hellebore/i

export function detectPaleFlowerRisk(plant: CatalogPlant): boolean {
  if (plant.flower_color && PALE_FLOWER_COLOR.test(plant.flower_color)) return true
  if (PALE_FLOWER_NAME.test(plant.common_name)) return true
  if (/star jasmine/i.test(plant.common_name)) return true
  return false
}

export function intentForPlant(plant: CatalogPlant): string | null {
  const type = (plant.plant_type || '').toLowerCase()
  const task = (plant.task_category || '').toLowerCase()
  if (type.includes('hedge') || task === 'hedge') return 'hedge/screening'
  if (type.includes('climber') || task === 'climber') return 'climber planting'
  if (type.includes('groundcover') || type.includes('grass')) return 'groundcover planting'
  if (type.includes('palm') || task === 'palm') return 'feature tree'
  if (type.includes('fern')) return 'feature tree'
  if (type.includes('tree')) return 'feature tree'
  if (type.includes('flax')) return 'general planting'
  if (type.includes('shrub') || type.includes('flower') || type.includes('perennial')) return 'shrub planting'
  return 'general planting'
}

export function isNotVisualiserRelevantHeuristic(plant: CatalogPlant): boolean {
  const type = (plant.plant_type || '').toLowerCase()
  if (type === 'fruit') return true
  if (type.includes('indoor')) return true
  const name = plant.common_name.toLowerCase()
  if (/apple|cherry|peach|avocado|blueberry|feijoa|mandarin|lemon tree|lime tree|meyer lemon/.test(name)) {
    return true
  }
  const largeTrees =
    /kauri|totara|kahikatea|pohutukawa|puriri|taraire|kohekohe|rewarewa|putaputaw|english oak|london plane|wych elm|european beech|himalayan birch|ermans birch|mexican alder|evergreen ash|flame tree|box elder|norfolk island|monterey cypress|small-leaved lime|silk tree|serviceberry|dogwood|lacebark|lancewood|karaka|ake-ake/
  if (largeTrees.test(name) && type.includes('tree')) return true
  return false
}

export function defaultManualCutoutRisk(
  plant: CatalogPlant,
  paleFlower: boolean,
  classification: AssetClassification,
): ManualCutoutRisk {
  if (classification === 'not_visualiser_relevant') return 'none'
  if (/gardenia/i.test(plant.common_name)) return 'high'
  if (paleFlower && /gardenia|michelia|hellebore|manuka|silver bush|westringia|pratia|renga renga|dietes|star jasmine/i.test(plant.common_name)) {
    return 'likely'
  }
  if (/corokia|leptospermum|manuka|escallonia|eugenia|ligustrum/i.test(plant.common_name)) return 'likely'
  return 'none'
}

export function inferClassificationFromAsset(
  plant: CatalogPlant,
  assetKey: string,
  resolvedViaPrimary: boolean,
): AssetClassification {
  if (isNotVisualiserRelevantHeuristic(plant)) return 'not_visualiser_relevant'
  if (resolvedViaPrimary && (APPROVED_PNG_KEYS.has(assetKey) || HEDGE_PNG_KEYS.has(assetKey))) {
    return 'exact_asset_ready'
  }
  if (APPROVED_PNG_KEYS.has(assetKey) || HEDGE_PNG_KEYS.has(assetKey)) {
    return 'close_shared_asset_ok'
  }
  if (assetKey === 'hedge' && SVG_FALLBACK_KEYS.has(assetKey)) return 'temporary_fallback_only'
  if (SVG_FALLBACK_KEYS.has(assetKey)) return 'needs_new_asset'
  return 'needs_new_asset'
}

export function defaultPriority(classification: AssetClassification): AssetPriority {
  switch (classification) {
    case 'exact_asset_ready':
      return 'launch'
    case 'close_shared_asset_ok':
      return 'launch'
    case 'temporary_fallback_only':
      return 'soon'
    case 'needs_new_asset':
      return 'later'
    case 'not_visualiser_relevant':
      return 'not_needed'
  }
}

export function isPrimaryExactOwner(plant: CatalogPlant, assetKey: string): boolean {
  return PRIMARY_EXACT_ASSET_PATTERNS.some(
    (rule) => rule.assetKey === assetKey && rule.pattern.test(plant.common_name),
  )
}

export const PALE_FLOWER_CUTOUT_NOTE =
  'White/pale flowers may need manual cutout or a non-white source background.'
