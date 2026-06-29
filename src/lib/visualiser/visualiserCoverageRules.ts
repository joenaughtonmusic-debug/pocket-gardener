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
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Dedicated fortnight-lily.png overlay. White flowers passed QA.',
  },
  62: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Dedicated muehlenbeckia.png overlay — spot mode only.',
  },
  35: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Dedicated mirror-bush.png overlay — spot mode only.',
  },
  71: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Spot: camellia.png. Row: camellia-hedge.png via Camellia Hedge row option.',
  },
  52: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated kentia-palm.png overlay — spot mode only.' },
  22: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated king-palm.png overlay — spot mode only.' },
  45: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Sugar Cane Palm — palm silhouette share.' },
  38: { classification: 'close_shared_asset_ok', priority: 'later', notes: 'Sago Palm — palm-like; may share nikau/ponga intent asset.' },
  108: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated liriope.png overlay — spot mode only.' },
  40: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated flax-lily.png overlay (Dianella).' },

  // ── Temporary fallback ───────────────────────────────────────────────────
  20: {
    classification: 'temporary_fallback_only',
    priority: 'soon',
    notes: 'Row mode only. Uses generic hedge-section.svg — replace with Titoki native screen PNG.',
  },

  // ── Needs new asset — priority candidates ────────────────────────────────
  147: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated gardenia.png overlay — spot mode only. Manual cutout QA passed.',
  },
  54: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Dedicated lavender.png overlay — spot mode only.',
  },
  8: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Reuses lemon.png via Meyer Lemon species rule (same asset as Lemon Tree). Spot mode only.',
  },
  55: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated lemon.png overlay — spot mode only.' },
  56: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated lime-tree.png overlay — spot mode only.' },
  60: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated mandarin-tree.png overlay — spot mode only.' },
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
  112: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated kowhai.png overlay — spot mode only.' },
  59: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated magnolia-deciduous.png overlay — spot mode only.' },
  135: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated magnolia-evergreen.png overlay — spot mode only. Cream flowers passed QA.' },
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
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated manuka.png overlay — spot mode only. Latest replacement with denser foliage; pink flowers passed QA.',
  },
  17: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated escallonia.png overlay — spot mode only.',
  },
  58: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated ligustrum.png overlay — spot shrub specimen only, not row mode.',
  },
  72: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated eugenia.png hedge row overlay — row mode only.',
  },
  116: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated murraya.png overlay — spot shrub specimen only, not row mode.',
  },
  96: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated english-holly.png overlay.' },
  107: { classification: 'needs_new_asset', priority: 'later', notes: 'Port Wine Magnolia hedge — no overlay.' },
  83: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated european-hornbeam.png overlay — spot mode only.',
  },
  150: { classification: 'needs_new_asset', priority: 'later', notes: 'Rose — cottage shrub; no overlay.' },
  145: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated hibiscus.png overlay.' },
  114: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated begonia.png overlay.' },
  115: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated bromeliad.png overlay.' },
  133: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated foxtail-agave.png overlay.' },
  30: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated bottlebrush.png overlay.' },
  13: { classification: 'needs_new_asset', priority: 'later', notes: 'Pink Rhaphiolepis — shrub; no overlay.' },
  99: { classification: 'needs_new_asset', priority: 'later', notes: 'Smoke Bush — large shrub/small tree.' },
  94: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated crepe-myrtle.png overlay.' },
  63: { classification: 'needs_new_asset', priority: 'later', notes: 'Olive — silvery tree/shrub; no overlay.' },
  18: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated japanese-maple.png overlay — spot mode only.' },
  33: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated forest-pansy.png overlay.' },
  79: { classification: 'needs_new_asset', priority: 'later', paleFlowerRisk: true, notes: 'Redbud — small flowering tree.' },
  136: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Dedicated michelia-bubbles.png overlay — spot mode only. Cream flowers passed QA.',
  },
  140: {
    classification: 'needs_new_asset',
    priority: 'later',
    paleFlowerRisk: true,
    notes: 'Westringia — white flowers; coastal shrub overlay.',
  },
  151: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    manualCutoutRisk: 'likely',
    notes: 'Dedicated hellebore.png overlay. White/cream flowers passed QA.',
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
  120: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated hardenbergia.png overlay.' },
  119: { classification: 'needs_new_asset', priority: 'later', notes: 'Tecomanthe — native climber; no overlay.' },
  121: { classification: 'needs_new_asset', priority: 'later', notes: 'Orange Trumpet Vine — climber; no overlay.' },
  123: { classification: 'needs_new_asset', priority: 'later', notes: 'Virginia Creeper — climber; no overlay.' },
  23: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated hen-and-chicken-fern.png overlay.' },
  27: { classification: 'needs_new_asset', priority: 'later', notes: 'Silver Lady Fern — shade fern; no overlay.' },
  110: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Dedicated mondo-grass.png overlay — spot mode only.',
  },
  41: { classification: 'needs_new_asset', priority: 'later', notes: 'Silver Falls — trailing groundcover; poor overlay scale.' },
  139: { classification: 'needs_new_asset', priority: 'later', notes: 'Spanish Shawl — groundcover; low priority.' },
  111: { classification: 'needs_new_asset', priority: 'later', notes: 'Rain Lily — small bulb; poor overlay scale.' },
  132: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated iresine.png overlay — spot mode only.' },
  57: { classification: 'needs_new_asset', priority: 'later', notes: 'Tractor Seat — bold leaf perennial; low overlay priority.' },

  // ── Not visualiser relevant ──────────────────────────────────────────────
  21: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated apple-tree.png overlay.' },
  25: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated avocado.png overlay.' },
  28: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated blueberry.png overlay.' },
  46: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated feijoa.png overlay — spot mode only.' },
  3: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated cherry-tree.png overlay.' },
  70: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Stone fruit tree — out of scope.' },
  39: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated kahikatea.png overlay — spot mode only.' },
  19: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated kauri.png overlay — spot mode only.' },
  101: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated kohekohe.png overlay — spot mode only.' },
  97: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated karaka.png overlay — spot mode only.' },
  66: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native timber tree — out of scope.' },
  95: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  98: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  26: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large native tree — out of scope.' },
  44: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated ake-ake.png overlay.' },
  91: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated lancewood.png overlay — spot mode only.' },
  51: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated lacebark.png overlay (Hoheria) — spot mode only. Pale flowers passed QA.',
  },
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
  85: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated himalayan-birch.png overlay — distinct from Erman\'s Birch (birch.png).',
  },
  47: { classification: 'exact_asset_ready', priority: 'launch', notes: 'Dedicated evergreen-ash.png overlay — spot mode only.' },
  88: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated flame-tree.png overlay.' },
  106: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated london-plane-tree.png overlay — spot mode only.' },
  84: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    paleFlowerRisk: true,
    notes: 'Dedicated mexican-alder.png overlay — spot mode only.',
  },
  102: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree — out of scope.' },
  103: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree — out of scope.' },
  80: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree — out of scope.' },
  86: { classification: 'not_visualiser_relevant', priority: 'not_needed', notes: 'Large deciduous tree/shrub — out of scope.' },
  36: { classification: 'exact_asset_ready', priority: 'launch', paleFlowerRisk: true, notes: 'Dedicated dogwood.png overlay.' },
  90: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Dedicated monterey-cypress.png overlay — spot mode only.',
  },
  81: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Dedicated norfolk-island-pine.png overlay — spot mode only.',
  },
  109: {
    classification: 'exact_asset_ready',
    priority: 'launch',
    notes: 'Dedicated monstera.png overlay — spot mode only.',
  },
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
  { pattern: /^flame tree$/i, assetKey: 'flame-tree' },
  { pattern: /^flax lily$/i, assetKey: 'flax-lily' },
  { pattern: /^forest pansy$/i, assetKey: 'forest-pansy' },
  { pattern: /^fortnight lily/i, assetKey: 'fortnight-lily' },
  { pattern: /^foxtail agave$/i, assetKey: 'foxtail-agave' },
  { pattern: /^hardenbergia$/i, assetKey: 'hardenbergia' },
  { pattern: /^hellebore/i, assetKey: 'hellebore' },
  { pattern: /^hen and chicken fern$/i, assetKey: 'hen-and-chicken-fern' },
  { pattern: /^hibiscus$/i, assetKey: 'hibiscus' },
  { pattern: /^himalayan birch$/i, assetKey: 'himalayan-birch' },
  { pattern: /^iresine$/i, assetKey: 'iresine' },
  { pattern: /^japanese maple$/i, assetKey: 'japanese-maple' },
  { pattern: /^kahikatea$/i, assetKey: 'kahikatea' },
  { pattern: /^karaka$/i, assetKey: 'karaka' },
  { pattern: /^kauri$/i, assetKey: 'kauri' },
  { pattern: /^kentia palm$/i, assetKey: 'kentia-palm' },
  { pattern: /^king palm$/i, assetKey: 'king-palm' },
  { pattern: /^kohekohe$/i, assetKey: 'kohekohe' },
  { pattern: /^kōwhai$/i, assetKey: 'kowhai' },
  { pattern: /^lacebark$/i, assetKey: 'lacebark' },
  { pattern: /^lavender$/i, assetKey: 'lavender' },
  { pattern: /^gardenia$/i, assetKey: 'gardenia' },
  { pattern: /^lancewood$/i, assetKey: 'lancewood' },
  { pattern: /^lemon tree$/i, assetKey: 'lemon' },
  { pattern: /^lime tree$/i, assetKey: 'lime-tree' },
  { pattern: /^ligustrum$/i, assetKey: 'ligustrum' },
  { pattern: /^liriope/i, assetKey: 'liriope' },
  { pattern: /^london plane tree$/i, assetKey: 'london-plane-tree' },
  { pattern: /^magnolia \(deciduous\)$/i, assetKey: 'magnolia-deciduous' },
  { pattern: /^magnolia \(evergreen\)$/i, assetKey: 'magnolia-evergreen' },
  { pattern: /^mandarin tree$/i, assetKey: 'mandarin-tree' },
  { pattern: /^manuka$/i, assetKey: 'manuka' },
  { pattern: /^mexican alder$/i, assetKey: 'mexican-alder' },
  { pattern: /^meyer lemon$/i, assetKey: 'lemon' },
  { pattern: /^michelia bubbles$/i, assetKey: 'michelia-bubbles' },
  { pattern: /^mirror bush$/i, assetKey: 'mirror-bush' },
  { pattern: /^mondo grass$/i, assetKey: 'mondo-grass' },
  { pattern: /^monstera \(swiss cheese plant\)$/i, assetKey: 'monstera' },
  { pattern: /^monterey cypress$/i, assetKey: 'monterey-cypress' },
  { pattern: /^muehlenbeckia$/i, assetKey: 'muehlenbeckia' },
  { pattern: /^murraya$/i, assetKey: 'murraya' },
  { pattern: /^norfolk island pine$/i, assetKey: 'norfolk-island-pine' },
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
  'iresine',
  'japanese-maple',
  'kahikatea',
  'karaka',
  'kauri',
  'kentia-palm',
  'king-palm',
  'kohekohe',
  'kowhai',
  'lacebark',
  'lavender',
  'gardenia',
  'lancewood',
  'lemon',
  'ligustrum',
  'lime-tree',
  'liriope',
  'london-plane-tree',
  'magnolia-deciduous',
  'magnolia-evergreen',
  'mandarin-tree',
  'manuka',
  'mexican-alder',
  'michelia-bubbles',
  'mirror-bush',
  'mondo-grass',
  'monstera',
  'monterey-cypress',
  'muehlenbeckia',
  'murraya',
  'norfolk-island-pine',
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
