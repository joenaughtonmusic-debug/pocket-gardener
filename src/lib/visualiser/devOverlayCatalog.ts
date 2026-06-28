/**
 * Dev-only overlay catalog helpers for /dev-overlay QA grouping and filters.
 * Not used by production Visualise.
 */

import {
  APPROVED_OVERLAY_KEYS,
  overlayFilenameToAssetKey,
  PRODUCTION_HEDGE_OVERLAY_KEYS,
  SPOT_HEDGE_OVERLAY_PAIRS,
} from '../visualIdeas/plantOverlayAssets'
import type { DevOverlayDef, DevOverlayFilterId, DevOverlayGroup, DevOverlayTag } from './devOverlayAssets'

export function isHedgeCandidateFile(filename: string): boolean {
  const lower = filename.toLowerCase()
  return (
    lower.includes('hedge') ||
    lower.includes('eugenia') ||
    lower.includes('griselinia') ||
    lower.includes('escallonia') ||
    lower.includes('buxus') ||
    lower.includes('ficus tuff')
  )
}

function pairForFile(file: string) {
  return SPOT_HEDGE_OVERLAY_PAIRS.find((pair) => pair.spotFile === file || pair.hedgeFile === file)
}

export function enrichProductionOverlay(base: DevOverlayDef): DevOverlayDef {
  if (base.file.endsWith('.svg')) {
    return {
      ...base,
      group: 'fallbacks',
      tags: ['fallback'],
      statusNote: 'SVG placeholder — not a PNG overlay.',
    }
  }

  const assetKey = overlayFilenameToAssetKey(base.file)
  const tags: DevOverlayTag[] = ['production']
  const pair = pairForFile(base.file)

  if (assetKey && APPROVED_OVERLAY_KEYS.has(assetKey)) tags.push('spot')
  if (assetKey && PRODUCTION_HEDGE_OVERLAY_KEYS.has(assetKey)) tags.push('hedge')

  let statusNote: string | undefined
  if (pair) {
    if (pair.spotFile === base.file) {
      tags.push('pair-spot')
      statusNote = `Production spot · hedge pair: ${pair.hedgeFile}`
    } else {
      tags.push('pair-hedge')
      statusNote = `Production hedge row · spot pair: ${pair.spotFile}`
    }
  } else if (assetKey && PRODUCTION_HEDGE_OVERLAY_KEYS.has(assetKey)) {
    statusNote = 'Production hedge row only'
  } else if (assetKey && APPROVED_OVERLAY_KEYS.has(assetKey)) {
    statusNote = 'Production spot / preview'
  } else if (assetKey) {
    statusNote = 'Registered fallback / legacy asset'
  }

  return {
    ...base,
    group: 'production',
    tags,
    pairLabel: pair?.label,
    pairWith: pair?.spotFile === base.file ? pair.hedgeFile : pair?.hedgeFile === base.file ? pair.spotFile : undefined,
    statusNote,
  }
}

export function enrichLatestBatchOverlay(base: DevOverlayDef): DevOverlayDef {
  const tags: DevOverlayTag[] = ['latest', 'unwired']
  if (isHedgeCandidateFile(base.file)) tags.push('hedge')

  return {
    ...base,
    group: 'latest_batch',
    tags,
    statusNote: isHedgeCandidateFile(base.file)
      ? 'Latest processed · unwired · possible hedge/row candidate'
      : 'Latest processed · unwired · not in production registry',
  }
}

export function enrichHeldOverlay(base: DevOverlayDef): DevOverlayDef {
  const weakCutout = /ficus|pumil/i.test(base.file) || /ficus|pumil/i.test(base.label)
  return {
    ...base,
    group: 'held',
    tags: ['held', 'unwired'],
    statusNote: weakCutout
      ? 'Held — cutout too transparent / weak; do not wire to production'
      : 'Held — not approved for production',
  }
}

export function enrichRawArchiveOverlay(base: DevOverlayDef): DevOverlayDef {
  const tags: DevOverlayTag[] = ['raw-archive', 'unwired']
  if (isHedgeCandidateFile(base.file)) tags.push('hedge')

  return {
    ...base,
    group: 'raw_archive',
    tags,
    statusNote: 'Raw archive — pre-approval source PNG',
  }
}

export function enrichOldQaOverlay(base: DevOverlayDef): DevOverlayDef {
  const tags: DevOverlayTag[] = ['old-qa', 'unwired']
  if (isHedgeCandidateFile(base.file)) tags.push('hedge')

  return {
    ...base,
    group: 'old_qa',
    tags,
    statusNote: 'Old QA variant — unwired processed PNG',
  }
}

export function filterDevOverlays(
  catalog: DevOverlayDef[],
  filter: DevOverlayFilterId,
): DevOverlayDef[] {
  if (filter === 'all') return catalog

  switch (filter) {
    case 'production':
      return catalog.filter((overlay) => overlay.group === 'production')
    case 'latest':
      return catalog.filter((overlay) => overlay.group === 'latest_batch')
    case 'unwired':
      return catalog.filter((overlay) => overlay.tags?.includes('unwired'))
    case 'hedge':
      return catalog.filter((overlay) => overlay.tags?.includes('hedge'))
    case 'held':
      return catalog.filter((overlay) => overlay.group === 'held')
    case 'archive':
      return catalog.filter((overlay) => overlay.group === 'raw_archive')
    case 'fallbacks':
      return catalog.filter((overlay) => overlay.group === 'fallbacks')
    default:
      return catalog
  }
}

export function getDevOverlaySections(
  catalog: DevOverlayDef[],
  filter: DevOverlayFilterId,
): Array<{
  key: DevOverlayGroup
  title: string
  description: string
  items: DevOverlayDef[]
}> {
  const filtered = filterDevOverlays(catalog, filter)
  const groupOrder: DevOverlayGroup[] = [
    'production',
    'latest_batch',
    'held',
    'raw_archive',
    'old_qa',
    'fallbacks',
  ]

  return groupOrder
    .map((key) => {
      const meta = DEV_OVERLAY_GROUP_META[key]
      return {
        key,
        title: meta.title,
        description: meta.description,
        items: filtered.filter((overlay) => overlay.group === key),
      }
    })
    .filter((section) => section.items.length > 0)
}

const DEV_OVERLAY_GROUP_META: Record<
  DevOverlayGroup,
  { title: string; description: string }
> = {
  production: {
    title: 'Production / registered',
    description: 'Wired in plantOverlayAssets.ts — live in Visualise spot and/or row mode.',
  },
  latest_batch: {
    title: 'Latest processed batch',
    description: 'Newest output from process:plant-overlays — run refresh:dev-overlays after processing.',
  },
  held: {
    title: 'Held / rejected',
    description: 'Reviewed but not approved — do not wire until reprocessed.',
  },
  raw_archive: {
    title: 'Raw archive',
    description: 'Pre-approval -raw.png sources kept for reference.',
  },
  old_qa: {
    title: 'Old QA variants',
    description: 'Earlier processed attempts, spaced filenames, and legacy unwired PNGs.',
  },
  fallbacks: {
    title: 'SVG fallbacks',
    description: 'Generic placeholder shapes used when no PNG matches.',
  },
}

export const DEV_OVERLAY_FILTERS: Array<{
  id: DevOverlayFilterId
  label: string
  hint: string
}> = [
  { id: 'all', label: 'All', hint: 'Show every dev overlay group' },
  { id: 'production', label: 'Production', hint: 'Registered / approved assets only' },
  { id: 'latest', label: 'Latest batch', hint: 'Newest processed unwired PNGs' },
  { id: 'unwired', label: 'Unwired', hint: 'Any processed PNG not in production registry' },
  { id: 'hedge', label: 'Hedge / row', hint: 'Hedge tiles and row-mode candidates' },
  { id: 'held', label: 'Held', hint: 'Rejected or blocked assets' },
  { id: 'archive', label: 'Raw archive', hint: '-raw.png archive sources' },
  { id: 'fallbacks', label: 'Fallbacks', hint: 'SVG placeholders' },
]

export function overlayButtonStyleTags(tags: DevOverlayTag[] | undefined): {
  spot: boolean
  hedge: boolean
  held: boolean
  latest: boolean
  unwired: boolean
} {
  return {
    spot: tags?.includes('spot') ?? false,
    hedge: tags?.includes('hedge') ?? false,
    held: tags?.includes('held') ?? false,
    latest: tags?.includes('latest') ?? false,
    unwired: tags?.includes('unwired') ?? false,
  }
}
