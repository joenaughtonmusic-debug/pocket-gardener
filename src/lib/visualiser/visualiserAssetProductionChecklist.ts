/**
 * Visualiser asset production checklist — derived from coverage audit.
 * Does not drive runtime behaviour or wire assets.
 */

import { getPlantVisualForm, type PlantVisualForm } from '../visualIdeas/plantVisualForms'
import {
  FULL_VISUALISER_COVERAGE,
  UNWIRED_DISK_ASSETS,
  type VisualiserAssetCoverageRow,
} from './visualiserAssetCoverage'
import type { ManualCutoutRisk } from './visualiserAssetCoverage.types'

export type ProductionBatch = 1 | 2 | 3

export type AssetTypeNeeded = 'spot' | 'row' | 'both'

export type QaStatus =
  | 'needed'
  | 'raw_created'
  | 'processed'
  | 'approved'
  | 'wired'
  | 'rejected'
  | 'manual_cutout_needed'

export interface ProductionChecklistItem {
  plantName: string
  scientificName: string | null
  batch: ProductionBatch
  visualForm: PlantVisualForm
  assetType: AssetTypeNeeded
  paleFlowerRisk: boolean
  manualCutoutRisk: ManualCutoutRisk
  currentFallback: string
  sourceImageGuidance: string
  qaStatus: QaStatus
  classification: VisualiserAssetCoverageRow['classification']
  notes: string
  inVisualiseSelector: boolean
  inRowMode: boolean
}

/** Standard source photography rules for all overlay production. */
export const SOURCE_IMAGE_RULES: readonly string[] = [
  'Full plant visible — whole plant inside frame',
  'Front-on or near front-on angle (not extreme top-down)',
  'No pot, no soil, no nursery label',
  'Muted grey-green background (not pure white)',
  'Strong edge contrast between foliage and background',
  'No flowers touching the image edge',
  'White/pale flowers: shoot warm cream tones OR use strong contrast against a non-white background',
  'Even lighting — avoid harsh backlight on pale petals',
  'Single specimen — no mixed planting in frame',
]

export const QA_STATUS_DEFINITIONS: Record<QaStatus, string> = {
  needed: 'Asset not started — add to production queue',
  raw_created: 'Source photo captured; not yet processed',
  processed: 'Background removed / PNG exported via process:plant-overlays',
  approved: 'Visual QA passed — acceptable for registry',
  wired: 'Registered in plantOverlayAssets.ts and live (do not wire until approved)',
  rejected: 'Cutout or form unsuitable — reshoot or manual fix required',
  manual_cutout_needed: 'Auto background removal failed — hand-mask in editor',
}

/** NZ-common hedges/shrubs prioritised immediately after launch batch. */
const BATCH_2_NAME_PATTERNS =
  /pittosporum|murraya|corokia|escallonia|ligustrum|eugenia|english holly|port wine magnolia|manuka|westringia|michelia|hibiscus|rhododendron|pohutukawa|kōwhai|kowhai|rose|olive|port wine|mirror bush/i

const UNWIRED_RAW_BY_PLANT: Record<string, string> = {
  Gardenia: '/plant-overlays/gardenia-v2.png',
  Lavender: '/plant-overlays/lavender white.png',
  'Meyer Lemon': '/plant-overlays/lemon white.png',
}

function needsProduction(row: VisualiserAssetCoverageRow): boolean {
  if (row.classification === 'not_visualiser_relevant') return false
  if (row.classification === 'exact_asset_ready') return false
  if (row.classification === 'needs_new_asset') return true
  if (row.classification === 'temporary_fallback_only') return true
  if (row.classification === 'close_shared_asset_ok' && row.priority === 'soon') return true
  return false
}

function assignBatch(row: VisualiserAssetCoverageRow): ProductionBatch {
  if (row.priority === 'soon') return 1
  if (row.priority === 'later' && BATCH_2_NAME_PATTERNS.test(row.plantName)) return 2
  return 3
}

function inferAssetType(row: VisualiserAssetCoverageRow, form: PlantVisualForm): AssetTypeNeeded {
  if (row.inRowMode) return 'row'
  const type = (row.plantType || '').toLowerCase()
  const task = (row.taskCategory || '').toLowerCase()
  if (form === 'hedge_screen' || type.includes('hedge') || task === 'hedge') {
    return row.inVisualiseSelector ? 'both' : 'row'
  }
  if (form === 'climber') return 'spot'
  if (form === 'groundcover' || form === 'strappy_clump') return 'spot'
  return 'spot'
}

function plantingTypeForForm(row: VisualiserAssetCoverageRow): string | null {
  const task = (row.taskCategory || '').toLowerCase()
  if (task === 'hedge') return 'hedge'
  if (task === 'climber') return 'climbing'
  return null
}

function sourceGuidance(row: VisualiserAssetCoverageRow, form: PlantVisualForm): string {
  const base = SOURCE_IMAGE_RULES.slice(0, 6).join('; ')
  const formHints: Partial<Record<PlantVisualForm, string>> = {
    strappy_clump:
      'Show full clump including base; strap leaves radiating naturally. Include flower stems if species has them (e.g. Agapanthus).',
    hedge_screen:
      'Horizontal hedge section or pleached screen segment; dense foliage wall, flat face to camera.',
    rounded_flowering_shrub:
      'Rounded shrub silhouette with visible flowers; foliage fills lower two-thirds of frame.',
    rounded_evergreen_shrub:
      'Compact evergreen shrub; show leaf texture — avoid overexposed highlights on fine leaves.',
    clipped_formal_shrub: 'Neat clipped ball or cube; even foliage density.',
    palm_tropical: 'Upright palm or tropical form; fronds/crown fully inside frame.',
    architectural_flax: 'Upright strap-leaf fan from base; show full height.',
    groundcover: 'Low spreading mat; shoot from slight angle to show depth.',
    climber: 'Climber on neutral flat support; show leaf mass not just a single stem.',
    fern: 'Fronds arching from crown; soft edges need strong background contrast.',
    small_tree: 'Small tree with visible trunk base to first branches.',
    feature_tree: 'Specimen tree — trunk and canopy; may need wider frame.',
  }
  let guidance = `${base}. ${formHints[form] ?? 'Match natural garden scale for spot overlay.'}`
  if (row.paleFlowerRisk) {
    guidance +=
      ' PALE FLOWERS: use warm cream petals or mid-grey-green background — never white-on-white.'
  }
  if (/gardenia/i.test(row.plantName)) {
    guidance +=
      ' GARDENIA: existing gardenia-v2.png failed auto cutout — reshoot with cream flowers on grey-green OR plan manual mask.'
  }
  return guidance
}

function initialQaStatus(row: VisualiserAssetCoverageRow): QaStatus {
  if (/gardenia/i.test(row.plantName)) {
    if (UNWIRED_DISK_ASSETS.some((p) => p.includes('gardenia'))) {
      return 'manual_cutout_needed'
    }
  }
  const rawPath = UNWIRED_RAW_BY_PLANT[row.plantName]
  if (rawPath && UNWIRED_DISK_ASSETS.includes(rawPath)) {
    return 'raw_created'
  }
  if (row.manualCutoutRisk === 'high') return 'manual_cutout_needed'
  return 'needed'
}

function buildItem(row: VisualiserAssetCoverageRow): ProductionChecklistItem {
  const form = getPlantVisualForm(row.plantName, plantingTypeForForm(row))
  const batch = assignBatch(row)
  return {
    plantName: row.plantName,
    scientificName: row.scientificName,
    batch,
    visualForm: form,
    assetType: inferAssetType(row, form),
    paleFlowerRisk: row.paleFlowerRisk,
    manualCutoutRisk: row.manualCutoutRisk,
    currentFallback: `${row.assetKey} (${row.assetPath})`,
    sourceImageGuidance: sourceGuidance(row, form),
    qaStatus: initialQaStatus(row),
    classification: row.classification,
    notes: row.notes,
    inVisualiseSelector: row.inVisualiseSelector,
    inRowMode: row.inRowMode,
  }
}

/** All plants requiring new or upgraded overlay assets. */
export function buildProductionChecklist(): ProductionChecklistItem[] {
  return FULL_VISUALISER_COVERAGE.filter(needsProduction)
    .map(buildItem)
    .sort((a, b) => {
      if (a.batch !== b.batch) return a.batch - b.batch
      if (a.inVisualiseSelector !== b.inVisualiseSelector) {
        return a.inVisualiseSelector ? -1 : 1
      }
      return a.plantName.localeCompare(b.plantName)
    })
}

export function getChecklistByBatch(batch: ProductionBatch): ProductionChecklistItem[] {
  return buildProductionChecklist().filter((item) => item.batch === batch)
}

/** Plants needing hand masking or pale-flower care — may overlap with batches 1–3. */
export function getManualCutoutTrack(): ProductionChecklistItem[] {
  return buildProductionChecklist().filter(
    (item) =>
      item.manualCutoutRisk === 'high' ||
      item.manualCutoutRisk === 'likely' ||
      item.paleFlowerRisk ||
      item.qaStatus === 'manual_cutout_needed',
  )
}

export function getChecklistSummary(): {
  totalItems: number
  batch1: number
  batch2: number
  batch3: number
  manualCutoutTrack: number
  paleFlowerFlagged: number
  visualiseSelectorGaps: number
} {
  const all = buildProductionChecklist()
  const manual = getManualCutoutTrack()
  return {
    totalItems: all.length,
    batch1: all.filter((i) => i.batch === 1).length,
    batch2: all.filter((i) => i.batch === 2).length,
    batch3: all.filter((i) => i.batch === 3).length,
    manualCutoutTrack: manual.length,
    paleFlowerFlagged: all.filter((i) => i.paleFlowerRisk).length,
    visualiseSelectorGaps: all.filter((i) => i.inVisualiseSelector).length,
  }
}

export const BATCH_LABELS: Record<ProductionBatch, string> = {
  1: 'Batch 1 — Highest launch value',
  2: 'Batch 2 — Soon after launch',
  3: 'Batch 3 — Later',
}
