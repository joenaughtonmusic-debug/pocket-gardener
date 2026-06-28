/**
 * Print coverage summary stats from the full plant database audit.
 * Run: npx tsx scripts/printCoverageSummary.ts
 */
import {
  FULL_VISUALISER_COVERAGE,
  VISUALISER_ASSET_COVERAGE,
  getAssetProductionRoadmap,
  getCoverageSummary,
} from '../src/lib/visualiser/visualiserAssetCoverage'

const s = getCoverageSummary()
console.log(JSON.stringify(s, null, 2))
console.log('\nRoadmap:', JSON.stringify(getAssetProductionRoadmap(), null, 2))
console.log('\nDB rows:', VISUALISER_ASSET_COVERAGE.length)
console.log('Full (incl selector-only):', FULL_VISUALISER_COVERAGE.length)

const heuristicOnly = VISUALISER_ASSET_COVERAGE.filter((r) => {
  const notes = r.notes
  return (
    !notes.includes('Dedicated') &&
    !notes.includes('gardenia') &&
    !notes.includes('Fruit') &&
    !notes.includes('out of scope') &&
    r.classification === 'needs_new_asset' &&
    r.assetKey === 'rounded-shrub'
  )
})
console.log('\nHeuristic needs_new (rounded-shrub):', heuristicOnly.length)
console.log(heuristicOnly.map((r) => r.plantName).join(', '))
