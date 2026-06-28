/**
 * Generate docs/visualiser-asset-production-checklist.md from coverage data.
 * Run: npx tsx scripts/generateProductionChecklist.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import {
  BATCH_LABELS,
  QA_STATUS_DEFINITIONS,
  SOURCE_IMAGE_RULES,
  buildProductionChecklist,
  getChecklistSummary,
  getManualCutoutTrack,
  type ProductionChecklistItem,
} from '../src/lib/visualiser/visualiserAssetProductionChecklist'

function formatItem(item: ProductionChecklistItem, index: number): string {
  const pale = item.paleFlowerRisk ? '**Yes**' : 'No'
  const cutout =
    item.manualCutoutRisk === 'high'
      ? '**HIGH**'
      : item.manualCutoutRisk === 'likely'
        ? 'Likely'
        : 'None'
  const flags = [
    item.inVisualiseSelector ? 'Visualise selector' : null,
    item.inRowMode ? 'Row mode' : null,
    item.qaStatus === 'manual_cutout_needed' ? 'Manual cutout needed' : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return `### ${index}. ${item.plantName}

| Field | Value |
|-------|-------|
| Scientific name | ${item.scientificName ?? '—'} |
| Visual form | \`${item.visualForm}\` |
| Asset type | **${item.assetType}** |
| Classification | ${item.classification} |
| QA status | \`${item.qaStatus}\` |
| Pale flower risk | ${pale} |
| Manual cutout risk | ${cutout} |
| Current fallback | \`${item.currentFallback}\` |
| Flags | ${flags || '—'} |

**Source image guidance:** ${item.sourceImageGuidance}

**Notes:** ${item.notes}
`
}

function batchSection(batch: 1 | 2 | 3, items: ProductionChecklistItem[]): string {
  const batchItems = items.filter((i) => i.batch === batch)
  if (batchItems.length === 0) return ''
  return `## ${BATCH_LABELS[batch]}

${batchItems.length} asset${batchItems.length === 1 ? '' : 's'}.

${batchItems.map((item, i) => formatItem(item, i + 1)).join('\n')}
`
}

const summary = getChecklistSummary()
const all = buildProductionChecklist()
const manual = getManualCutoutTrack()
const gardenia = all.find((i) => /gardenia/i.test(i.plantName))

const manualTable = manual
  .map(
    (i) =>
      `| ${i.plantName} | ${i.batch} | ${i.manualCutoutRisk} | ${i.paleFlowerRisk ? 'Yes' : '—'} | \`${i.qaStatus}\` | \`${i.currentFallback.split(' ')[0]}\` |`,
  )
  .join('\n')

const content = `# Visualiser asset production checklist

Practical workflow derived from the [full coverage audit](./visualiser-asset-coverage.md).

**Source:** \`src/lib/visualiser/visualiserAssetProductionChecklist.ts\`  
**Regenerate:** \`npx tsx scripts/generateProductionChecklist.ts\`

Last generated: ${new Date().toISOString().slice(0, 10)}

> **Do not wire assets until QA status is \`approved\`.** Gardenia and other pale-flower plants may require \`manual_cutout_needed\` before approval.

---

## Summary

| Metric | Count |
|--------|------:|
| Total production items | ${summary.totalItems} |
| Batch 1 (highest launch value) | ${summary.batch1} |
| Batch 2 (soon after launch) | ${summary.batch2} |
| Batch 3 (later) | ${summary.batch3} |
| Manual cutout / pale flower track | ${summary.manualCutoutTrack} |
| Pale flower risk flagged | ${summary.paleFlowerFlagged} |
| Visualise selector gaps | ${summary.visualiseSelectorGaps} |

---

## Source image rules (all assets)

${SOURCE_IMAGE_RULES.map((r) => `- ${r}`).join('\n')}

---

## QA status workflow

| Status | Meaning |
|--------|---------|
${Object.entries(QA_STATUS_DEFINITIONS)
  .map(([k, v]) => `| \`${k}\` | ${v} |`)
  .join('\n')}

Typical flow: \`needed\` → \`raw_created\` → \`processed\` → \`approved\` → \`wired\`  
Pale flowers may branch to \`manual_cutout_needed\` before \`approved\`.

---

## Gardenia — manual cutout priority

${gardenia ? formatItem(gardenia, 1) : '_Gardenia not found in checklist._'}

**Action:** Do not register \`gardenia-v2.png\` until manual QA confirms white/cream flowers survive cutout.

---

${batchSection(1, all)}

${batchSection(2, all)}

${batchSection(3, all)}

---

## Manual cutout / pale flower risk track

Plants requiring extra care when shooting or processing (${manual.length} items). Many also appear in batches above.

| Plant | Batch | Cutout risk | Pale flowers | QA status | Fallback key |
|-------|------:|-------------|--------------|-----------|--------------|
${manualTable}

---

## Row mode reminder

Row mode remains **hedge/screen PNG assets only** (Griselinia, Ficus Tuffy, Buxus, Titoki). Do not add strappy plants (Lomandra, Agapanthus, flax) to row mode when wiring new assets.

---

## Maintenance

1. Refresh plant catalog: \`npm run export:plant-catalog\`
2. Regenerate coverage doc: \`npx tsx scripts/generateCoverageMarkdown.ts\`
3. Regenerate this checklist: \`npx tsx scripts/generateProductionChecklist.ts\`
4. After creating assets: run \`npm run process:plant-overlays\`, then \`npm run validate:overlay-paths\`
5. Only wire to \`plantOverlayAssets.ts\` when QA is \`approved\` (separate task)

## Related files

- \`src/lib/visualiser/visualiserAssetCoverage.ts\` — full 120-plant audit
- \`src/lib/visualIdeas/plantOverlayAssets.ts\` — runtime registry (do not change in production pass)
- \`src/lib/visualIdeas/plantVisualForms.ts\` — visual form labels
- \`public/plant-overlays/\` — overlay files
`

const outPath = path.join(process.cwd(), 'docs/visualiser-asset-production-checklist.md')
fs.writeFileSync(outPath, content)
console.log(`Wrote ${outPath} (${summary.totalItems} items)`)
