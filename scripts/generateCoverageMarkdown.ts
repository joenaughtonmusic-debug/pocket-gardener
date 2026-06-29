/**
 * Regenerate docs/visualiser-asset-coverage.md from live coverage data.
 * Run: npx tsx scripts/generateCoverageMarkdown.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import {
  FULL_VISUALISER_COVERAGE,
  VISUALISER_ASSET_COVERAGE,
  getAssetProductionRoadmap,
  getCoverageSummary,
  ROW_MODE_ALLOWED_PLANTS,
  ROW_MODE_EXCLUDED_EXAMPLES,
  UNWIRED_DISK_ASSETS,
} from '../src/lib/visualiser/visualiserAssetCoverage'
import { PREVIEW_PLANT_OPTIONS } from '../src/lib/visualIdeas/plantOverlayAssets'

const s = getCoverageSummary()
const roadmap = getAssetProductionRoadmap()

function tableRows(rows: typeof VISUALISER_ASSET_COVERAGE): string {
  const header =
    '| Plant | Scientific name | Type | Asset key | Classification | Priority | Cutout risk | Pale flowers | Notes |\n' +
    '|-------|-----------------|------|-----------|----------------|----------|-------------|--------------|-------|'
  const body = rows
    .map((r) => {
      const sci = r.scientificName ?? '—'
      const type = r.plantType ?? '—'
      const pale = r.paleFlowerRisk ? 'Yes' : '—'
      const notes = r.notes.replace(/\|/g, '\\|').replace(/\n/g, ' ')
      return `| ${r.plantName} | ${sci} | ${type} | ${r.assetKey} | ${r.classification} | ${r.priority} | ${r.manualCutoutRisk} | ${pale} | ${notes} |`
    })
    .join('\n')
  return `${header}\n${body}`
}

const selectorOnly = FULL_VISUALISER_COVERAGE.filter((r) => r.plantId === -1)

const md = `# Visualiser plant overlay — asset coverage report

Developer-facing audit for Pocket Gardener's photo overlay visualiser.

**Source of truth:** \`src/lib/visualiser/visualiserAssetCoverage.ts\` (built from \`plantDatabaseCatalog.json\`)

Last generated: ${new Date().toISOString().slice(0, 10)}

Refresh plant list: \`npm run export:plant-catalog\` (requires Supabase env)  
Validate overlay paths: \`npm run validate:overlay-paths\`

---

## Why the prior audit showed 51 rows

The first coverage pass (${s.priorAuditRowCount} rows) was a **curated subset**: Visualise selector plants, row-mode hedges, suggest-engine names, and style-tag seed patterns — not the full Supabase \`plants\` table.

This report covers **all ${s.totalPlantsInDatabase} plants** in the Plant Library database export, plus ${selectorOnly.length} Visualise-selector-only entries not present under matching DB names (e.g. Agapanthus, Phormium).

Runtime resolution is unchanged — \`resolveOverlayAsset()\` in \`plantOverlayAssets.ts\`.

---

## Summary (full database)

| Metric | Count |
|--------|------:|
| **Total plants in database** | ${s.totalPlantsInDatabase} |
| **Visualiser-relevant** | ${s.totalVisualiserRelevant} |
| **Exact asset ready** | ${s.exactAssetReady} |
| **Close shared asset OK** | ${s.closeSharedAssetOk} |
| **Temporary fallback only** | ${s.temporaryFallbackOnly} |
| **Needs new asset** | ${s.needsNewAsset} |
| **Not visualiser relevant** | ${s.notVisualiserRelevant} |
| **High manual cutout risk** | ${s.highManualCutoutRisk} |
| **White/pale flower risk flagged** | ${s.paleFlowerRiskCount} |
| **Broken registry paths** | ${s.brokenRegistryPaths.length} |
| **Registered overlay keys** | ${s.registeredPathCount} |

### Visualise selector (spot mode)

${PREVIEW_PLANT_OPTIONS.length} plants in \`PREVIEW_PLANT_OPTIONS\` — all resolve to approved PNG keys (no broken paths in chooser).

### Row mode (hedge/screen only)

Allowed: ${ROW_MODE_ALLOWED_PLANTS.join(', ')}

Excluded examples (must NOT be added): ${ROW_MODE_EXCLUDED_EXAMPLES.join(', ')}

---

## Asset production roadmap

### Launch priority

${roadmap.launchPriority.map((p) => `- ${p}`).join('\n')}

### Soon after launch

${roadmap.soonAfterLaunch.map((p) => `- ${p}`).join('\n')}

### Later

${roadmap.later.map((p) => `- ${p}`).join('\n')}

### Manual cutout likely / high

${roadmap.manualCutoutLikely.map((p) => `- ${p}`).join('\n')}

**Note:** White/pale flowers may need manual cutout or a non-white source background.

### Gardenia status

Gardenia is **needs_new_asset** (not exact_asset_ready). \`gardenia-v2.png\` exists on disk but is unwired — auto background removal likely removes white flowers. Do not register until manual QA passes.

---

## Unwired disk assets

${UNWIRED_DISK_ASSETS.map((p) => `- \`${p}\``).join('\n')}

---

## Full per-plant coverage (${s.totalPlantsInDatabase} database plants)

${tableRows(VISUALISER_ASSET_COVERAGE)}

${
  selectorOnly.length > 0
    ? `---

## Visualise selector only (not in DB export under same name)

${tableRows(selectorOnly as typeof VISUALISER_ASSET_COVERAGE)}

`
    : ''
}---

## Maintenance

1. After DB plant changes: \`npm run export:plant-catalog\`
2. Update overrides in \`visualiserCoverageRules.ts\` when assets ship
3. Regenerate this doc: \`npx tsx scripts/generateCoverageMarkdown.ts\`
4. Row mode: only true hedge/screen PNG assets in \`ROW_PREVIEW_PLANT_OPTIONS\`
5. Do not wire weak cutouts — keep Gardenia and similar as needs_new until QA passes

## Related files

- \`src/lib/visualiser/plantDatabaseCatalog.json\` — DB export snapshot
- \`src/lib/visualiser/visualiserCoverageRules.ts\` — overrides and heuristics
- \`src/lib/visualIdeas/plantOverlayAssets.ts\` — runtime registry
- \`scripts/exportPlantCatalog.ts\` — refresh catalog from Supabase
`

const out = path.join(process.cwd(), 'docs/visualiser-asset-coverage.md')
fs.writeFileSync(out, md)
console.log(`Wrote ${out}`)
