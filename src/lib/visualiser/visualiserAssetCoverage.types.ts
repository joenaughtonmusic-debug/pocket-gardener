export type AssetClassification =
  | 'exact_asset_ready'
  | 'close_shared_asset_ok'
  | 'temporary_fallback_only'
  | 'needs_new_asset'
  | 'not_visualiser_relevant'

export type AssetPriority = 'launch' | 'soon' | 'later' | 'not_needed'

export type ManualCutoutRisk = 'none' | 'likely' | 'high'

export interface VisualiserAssetCoverageRow {
  plantId: number
  plantName: string
  scientificName: string | null
  plantType: string | null
  taskCategory: string | null
  assetKey: string
  assetPath: string
  classification: AssetClassification
  priority: AssetPriority
  manualCutoutRisk: ManualCutoutRisk
  paleFlowerRisk: boolean
  inVisualiseSelector: boolean
  inRowMode: boolean
  notes: string
}

export interface CoverageSummary {
  totalPlantsInDatabase: number
  totalVisualiserRelevant: number
  exactAssetReady: number
  closeSharedAssetOk: number
  temporaryFallbackOnly: number
  needsNewAsset: number
  notVisualiserRelevant: number
  highManualCutoutRisk: number
  paleFlowerRiskCount: number
  brokenRegistryPaths: string[]
  registeredPathCount: number
  unwiredDiskAssets: string[]
  /** Why the prior audit had fewer rows (curated subset, not full DB). */
  priorAuditRowCount: number
}

export interface AssetProductionRoadmap {
  launchPriority: string[]
  soonAfterLaunch: string[]
  later: string[]
  manualCutoutLikely: string[]
}
