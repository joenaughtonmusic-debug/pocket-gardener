/**
 * Visualiser overlay asset coverage — full plant database audit.
 *
 * Source: Supabase `plants` table export in plantDatabaseCatalog.json
 * (refresh: npm run export:plant-catalog)
 *
 * Does not drive runtime visualiser behaviour.
 */

import catalogData from './plantDatabaseCatalog.json'
import {
  CREATE_VISUAL_PLANT_OPTIONS,
  REGISTERED_OVERLAY_PATHS,
  ROW_PREVIEW_PLANT_OPTIONS,
  resolveOverlayAsset,
} from '../visualIdeas/plantOverlayAssets'
import {
  DB_TO_SELECTOR_ALIAS,
  PALE_FLOWER_CUTOUT_NOTE,
  PLANT_COVERAGE_OVERRIDES,
  ROW_MODE_DB_NAMES,
  VISUALISE_SELECTOR_NAMES,
  defaultManualCutoutRisk,
  defaultPriority,
  detectPaleFlowerRisk,
  inferClassificationFromAsset,
  intentForPlant,
  isPrimaryExactOwner,
  type CatalogPlant,
} from './visualiserCoverageRules'
import type {
  AssetClassification,
  AssetProductionRoadmap,
  CoverageSummary,
  ManualCutoutRisk,
  VisualiserAssetCoverageRow,
} from './visualiserAssetCoverage.types'

export type {
  AssetClassification,
  AssetPriority,
  AssetProductionRoadmap,
  CoverageSummary,
  ManualCutoutRisk,
  VisualiserAssetCoverageRow,
} from './visualiserAssetCoverage.types'

const PRIOR_AUDIT_ROW_COUNT = 51

const catalogPlants = catalogData.plants as CatalogPlant[]

const SELECTOR_DB_NAMES = new Set(
  Object.entries(DB_TO_SELECTOR_ALIAS).map(([db]) => db),
)
for (const opt of CREATE_VISUAL_PLANT_OPTIONS) {
  const dbMatch = catalogPlants.find(
    (p) =>
      p.common_name === opt.name ||
      DB_TO_SELECTOR_ALIAS[p.common_name] === opt.name,
  )
  if (dbMatch) SELECTOR_DB_NAMES.add(dbMatch.common_name)
}

function buildRow(plant: CatalogPlant): VisualiserAssetCoverageRow {
  const override = PLANT_COVERAGE_OVERRIDES[plant.id]
  const intent = intentForPlant(plant)
  const asset = resolveOverlayAsset([plant.common_name], intent)
  const primary = isPrimaryExactOwner(plant, asset.key)

  let classification =
    override?.classification ??
    inferClassificationFromAsset(plant, asset.key, primary)

  if (override?.forceExact) classification = 'exact_asset_ready'

  const paleFlowerRisk = override?.paleFlowerRisk ?? detectPaleFlowerRisk(plant)
  const manualCutoutRisk =
    override?.manualCutoutRisk ??
    defaultManualCutoutRisk(plant, paleFlowerRisk, classification)

  let priority = override?.priority ?? defaultPriority(classification)
  if (classification === 'close_shared_asset_ok' && /pratia|dietes|astelia|coprosma|muehlenbeckia|palm|kentia|king palm/i.test(plant.common_name)) {
    priority = 'soon'
  }

  const selectorAlias = DB_TO_SELECTOR_ALIAS[plant.common_name]
  const inVisualiseSelector =
    SELECTOR_DB_NAMES.has(plant.common_name) ||
    (selectorAlias != null && VISUALISE_SELECTOR_NAMES.has(selectorAlias)) ||
    VISUALISE_SELECTOR_NAMES.has(plant.common_name)

  const inRowMode = ROW_MODE_DB_NAMES.has(plant.common_name)

  let notes = override?.notes ?? ''
  if (!notes) {
    if (classification === 'exact_asset_ready') {
      notes = `Dedicated or primary overlay: ${asset.key}.`
    } else if (classification === 'close_shared_asset_ok') {
      notes = `Shares ${asset.key} overlay — visually similar form family.`
    } else if (classification === 'temporary_fallback_only') {
      notes = `Temporary ${asset.key} fallback — replace with dedicated asset.`
    } else if (classification === 'needs_new_asset') {
      notes = `No dedicated overlay; resolves to ${asset.key}.`
    } else {
      notes = 'Not suitable for garden photo spot overlay at current scale.'
    }
  }
  if (paleFlowerRisk && !notes.includes(PALE_FLOWER_CUTOUT_NOTE)) {
    notes = `${notes} ${PALE_FLOWER_CUTOUT_NOTE}`.trim()
  }

  return {
    plantId: plant.id,
    plantName: plant.common_name,
    scientificName: plant.scientific_name,
    plantType: plant.plant_type,
    taskCategory: plant.task_category,
    assetKey: asset.key,
    assetPath: asset.src,
    classification,
    priority,
    manualCutoutRisk,
    paleFlowerRisk,
    inVisualiseSelector,
    inRowMode,
    notes,
  }
}

/** Full database coverage — one row per unique plant in plantDatabaseCatalog.json. */
export const VISUALISER_ASSET_COVERAGE: VisualiserAssetCoverageRow[] =
  catalogPlants.map(buildRow)

export const REGISTRY_PATHS_LAST_VERIFIED = '2026-06-28'
export const REGISTRY_PATHS_OK = true as const

export const UNWIRED_DISK_ASSETS: readonly string[] = [
  '/plant-overlays/gardenia-v2.png',
  '/plant-overlays/Gardenia white.png',
  '/plant-overlays/lavender white.png',
  '/plant-overlays/lemon white.png',
  '/plant-overlays/griselinia.png',
  '/plant-overlays/buxus-hedge-v2.png',
  '/plant-overlays/ficus tuffi.png',
  '/plant-overlays/Buxus ball white.png',
  '/plant-overlays/Buxus white.png',
  '/plant-overlays/Hydrangea white.png',
  '/plant-overlays/Nikau white.png',
  '/plant-overlays/Flax white.png',
  '/plant-overlays/hebe white.png',
  '/plant-overlays/clivia white.png',
  '/plant-overlays/groundcover white.png',
  '/plant-overlays/ponga white.png',
  '/plant-overlays/renga renga white.png',
  '/plant-overlays/star jasmine white.png',
  '/plant-overlays/birds of paradies white.png',
]

export function getCoverageSummary(): CoverageSummary {
  const count = (c: AssetClassification) =>
    VISUALISER_ASSET_COVERAGE.filter((r) => r.classification === c).length

  return {
    totalPlantsInDatabase: VISUALISER_ASSET_COVERAGE.length,
    totalVisualiserRelevant: VISUALISER_ASSET_COVERAGE.filter(
      (r) => r.classification !== 'not_visualiser_relevant',
    ).length,
    exactAssetReady: count('exact_asset_ready'),
    closeSharedAssetOk: count('close_shared_asset_ok'),
    temporaryFallbackOnly: count('temporary_fallback_only'),
    needsNewAsset: count('needs_new_asset'),
    notVisualiserRelevant: count('not_visualiser_relevant'),
    highManualCutoutRisk: VISUALISER_ASSET_COVERAGE.filter(
      (r) => r.manualCutoutRisk === 'high',
    ).length,
    paleFlowerRiskCount: VISUALISER_ASSET_COVERAGE.filter((r) => r.paleFlowerRisk).length,
    brokenRegistryPaths: REGISTRY_PATHS_OK ? [] : [...REGISTERED_OVERLAY_PATHS],
    registeredPathCount: REGISTERED_OVERLAY_PATHS.length,
    unwiredDiskAssets: [...UNWIRED_DISK_ASSETS],
    priorAuditRowCount: PRIOR_AUDIT_ROW_COUNT,
  }
}

export function getAssetProductionRoadmap(): AssetProductionRoadmap {
  const needs = VISUALISER_ASSET_COVERAGE.filter(
    (r) =>
      r.classification === 'needs_new_asset' ||
      r.classification === 'temporary_fallback_only' ||
      r.classification === 'close_shared_asset_ok',
  )

  return {
    launchPriority: VISUALISER_ASSET_COVERAGE.filter(
      (r) => r.priority === 'launch' && r.classification !== 'not_visualiser_relevant',
    ).map((r) => r.plantName),
    soonAfterLaunch: needs
      .filter((r) => r.priority === 'soon')
      .map((r) => `${r.plantName} — ${r.notes.split('.')[0]}`),
    later: needs
      .filter((r) => r.priority === 'later')
      .map((r) => r.plantName),
    manualCutoutLikely: VISUALISER_ASSET_COVERAGE.filter(
      (r) => r.manualCutoutRisk === 'high' || r.manualCutoutRisk === 'likely',
    ).map(
      (r) =>
        `${r.plantName} (${r.manualCutoutRisk}${r.paleFlowerRisk ? ', pale flowers' : ''})`,
    ),
  }
}

export function findCoverageForPlant(plantName: string): VisualiserAssetCoverageRow | undefined {
  const lower = plantName.toLowerCase().trim()
  return VISUALISER_ASSET_COVERAGE.find(
    (r) =>
      r.plantName.toLowerCase() === lower ||
      r.plantName.toLowerCase().includes(lower) ||
      lower.includes(r.plantName.toLowerCase()),
  )
}

export function findCoverageByPlantId(plantId: number): VisualiserAssetCoverageRow | undefined {
  return VISUALISER_ASSET_COVERAGE.find((r) => r.plantId === plantId)
}

/** Row-mode plants in DB — hedge/screen only; no strappy plants. */
export const ROW_MODE_ALLOWED_PLANTS = ROW_PREVIEW_PLANT_OPTIONS.map((p) => p.name)

export const ROW_MODE_EXCLUDED_EXAMPLES = [
  'Lomandra',
  'Agapanthus',
  'NZ Flax',
  'Phormium',
  'Clivia',
  'Fortnight Lily (Dietes)',
] as const

/** Plants in CREATE_VISUAL flow but absent from DB under matching names (e.g. Agapanthus). */
export const SELECTOR_ONLY_PLANTS: VisualiserAssetCoverageRow[] = CREATE_VISUAL_PLANT_OPTIONS.filter(
  (opt) =>
    !catalogPlants.some(
      (p) =>
        p.common_name === opt.name || DB_TO_SELECTOR_ALIAS[p.common_name] === opt.name,
    ),
).map((opt) => {
  const asset = resolveOverlayAsset([opt.name], opt.detectedIntent)
  const paleFlowerRisk = /jasmine|renga|agapanthus|pratia|camellia/i.test(opt.name)
  const classification: AssetClassification = APPROVED_PRIMARY(opt.name, asset.key)
    ? 'exact_asset_ready'
    : asset.key === 'lomandra' || asset.key === 'flax' || asset.key === 'groundcover'
      ? 'close_shared_asset_ok'
      : 'needs_new_asset'

  return {
    plantId: -1,
    plantName: opt.name,
    scientificName: null,
    plantType: null,
    taskCategory: null,
    assetKey: asset.key,
    assetPath: asset.src,
    classification,
    priority: classification === 'close_shared_asset_ok' ? 'soon' : 'launch',
    manualCutoutRisk: paleFlowerRisk ? 'likely' : 'none',
    paleFlowerRisk,
    inVisualiseSelector: true,
    inRowMode: false,
    notes: `Visualise selector only — not in plantDatabaseCatalog.json export. ${asset.key} overlay.`,
  }
})

function APPROVED_PRIMARY(name: string, assetKey: string): boolean {
  const exactNames = [
    'Hydrangea',
    'Bird of Paradise',
    'Nikau Palm',
    'Hebe',
    'Renga Renga Lily',
    'Clivia',
    'Star Jasmine',
    'Lomandra',
    'Camellia sasanqua',
    'Tree Fern (Ponga)',
    'Ake-Ake',
    'Apple Tree',
    'Avocado',
    'Begonia',
    'Blueberry',
    'Bottlebrush',
    'Box Elder',
    'Bromeliad',
    'Cabbage Tree',
  ]
  return exactNames.includes(name)
}

/** Combined DB + selector-only plants for full visualiser surface audit. */
export const FULL_VISUALISER_COVERAGE: VisualiserAssetCoverageRow[] = [
  ...VISUALISER_ASSET_COVERAGE,
  ...SELECTOR_ONLY_PLANTS,
]
