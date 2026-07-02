/**
 * Dev-only overlay definitions for /dev-overlay smoke testing.
 * Not used by the production visualiser editor or plant selectors.
 *
 * New processed PNGs are discovered via `npm run refresh:dev-overlays`, which
 * regenerates devOverlayManifest.generated.ts from assets/plant-overlays/processed/.
 */

import { REGISTERED_OVERLAY_PATHS } from '../visualIdeas/plantOverlayAssets'
import { GENERATED_NEW_BATCH_TEST_OVERLAYS } from './devOverlayManifest.generated'
import { GENERATED_DEV_ALPHA_BATCH_OVERLAYS } from './devAlphaBatchManifest.generated'
import { DEV_OVERLAY_FILE_CACHE_BUST } from './devOverlayCacheBust.generated'
import {
  enrichHeldOverlay,
  enrichLatestBatchOverlay,
  enrichOldQaOverlay,
  enrichProductionOverlay,
  enrichRawArchiveOverlay,
  enrichAlphaBatchOverlay,
} from './devOverlayCatalog'

export type DevOverlayGroup =
  | 'production'
  | 'alpha_batch'
  | 'latest_batch'
  | 'held'
  | 'raw_archive'
  | 'old_qa'
  | 'fallbacks'

export type DevOverlayTag =
  | 'production'
  | 'spot'
  | 'hedge'
  | 'latest'
  | 'unwired'
  | 'held'
  | 'raw-archive'
  | 'old-qa'
  | 'fallback'
  | 'pair-spot'
  | 'pair-hedge'

export type DevOverlayFilterId =
  | 'all'
  | 'production'
  | 'alpha'
  | 'latest'
  | 'unwired'
  | 'hedge'
  | 'held'
  | 'archive'
  | 'fallbacks'

export interface DevOverlayDef {
  id: string
  label: string
  /** Filename under public/plant-overlays/ */
  file: string
  defaultWidth: number
  aspect: number
  group: DevOverlayGroup
  tags?: DevOverlayTag[]
  /** Paired spot/hedge filename when applicable. */
  pairWith?: string
  pairLabel?: string
  statusNote?: string
  /** Bust browser cache when a PNG was reprocessed in place (dev QA only). */
  cacheBust?: string
}

export function devOverlaySrc(file: string, cacheBust?: string): string {
  const base = `/plant-overlays/${encodeURIComponent(file)}`
  return cacheBust ? `${base}?v=${encodeURIComponent(cacheBust)}` : base
}

const REGISTERED_FILE_LABELS: Record<string, string> = {
  'hydrangea.png': 'Hydrangea',
  'bird-of-paradise.png': 'Bird of Paradise',
  'nikau.png': 'Nikau',
  'hebe.png': 'Hebe',
  'renga-renga-lily.png': 'Renga Renga Lily',
  'clivia.png': 'Clivia',
  'star-jasmine.png': 'Star Jasmine',
  'flax.png': 'Flax',
  'groundcover.png': 'Groundcover',
  'ponga.png': 'Ponga',
  'lomandra.png': 'Lomandra',
  'camellia.png': 'Camellia',
  'camellia_clean_transparent.png': 'Camellia (legacy)',
  'corokia-geentys-green.png': 'Corokia Geentys Green',
  'corokia-virgata.png': 'Corokia Virgata',
  'english-holly.png': 'English Holly',
  'boston-ivy.png': 'Boston Ivy',
  'canna-lily.png': 'Canna Lily',
  'cherry-tree.png': 'Cherry Tree',
  'cordyline-stricta.png': 'Cordyline Stricta',
  'crepe-myrtle.png': 'Crepe Myrtle',
  'dogwood.png': 'Dogwood',
  'birch.png': "Erman's Birch",
  'escallonia.png': 'Escallonia',
  'european-beech.png': 'European Beech',
  'european-hornbeam.png': 'European Hornbeam',
  'evergreen-ash.png': 'Evergreen Ash',
  'feijoa.png': 'Feijoa',
  'oak.png': 'English Oak',
  'camellia-hedge.png': 'Camellia Hedge',
  'corokia-geentys-green-hedge.png': 'Corokia Geentys Green Hedge',
  'corokia-virgata-hedge.png': 'Corokia Virgata Hedge',
  'eugenia.png': 'Eugenia',
  'flame-tree.png': 'Flame Tree',
  'flax-lily.png': 'Flax Lily',
  'forest-pansy.png': 'Forest Pansy',
  'fortnight-lily.png': 'Fortnight Lily',
  'foxtail-agave.png': 'Foxtail Agave',
  'hardenbergia.png': 'Hardenbergia',
  'hellebore.png': 'Hellebore',
  'hen-and-chicken-fern.png': 'Hen and Chicken Fern',
  'hibiscus.png': 'Hibiscus',
  'himalayan-birch.png': 'Himalayan Birch',
  'buxus.png': 'Buxus',
  'buxus-hedge.png': 'Buxus Hedge',
  'griselinia-hedge.png': 'Griselinia Hedge',
  'ficus-tuffy-hedge.png': 'Ficus Tuffy Hedge',
  'ake-ake.png': 'Ake-Ake',
  'apple-tree.png': 'Apple Tree',
  'avocado.png': 'Avocado',
  'begonia.png': 'Begonia',
  'blueberry.png': 'Blueberry',
  'bottlebrush.png': 'Bottlebrush',
  'box-elder.png': 'Box Elder',
  'bromeliad.png': 'Bromeliad',
  'cabbage-tree.png': 'Cabbage Tree',
  'hedge-section.svg': 'Hedge Section (SVG)',
  'strappy-clump.svg': 'Strappy Clump (SVG)',
  'rounded-shrub.svg': 'Rounded Shrub (SVG)',
}

function fileFromRegisteredPath(src: string): string {
  return src.replace(/^\/plant-overlays\//, '')
}

function registeredOverlays(): DevOverlayDef[] {
  return REGISTERED_OVERLAY_PATHS.map((src) => {
    const file = fileFromRegisteredPath(src)
    const isSvg = file.endsWith('.svg')
    const base: DevOverlayDef = {
      id: `reg-${file.replace(/[^a-z0-9]+/gi, '-')}`,
      label: REGISTERED_FILE_LABELS[file] ?? file,
      file,
      defaultWidth: isSvg ? (file.includes('hedge') ? 300 : 200) : 220,
      aspect: file === 'lomandra.png' ? 4576 / 3056 : isSvg && file.includes('hedge') ? 320 / 200 : isSvg && file.includes('strappy') ? 200 / 250 : isSvg ? 200 / 230 : 1,
      group: isSvg ? 'fallbacks' : 'production',
      cacheBust: DEV_OVERLAY_FILE_CACHE_BUST[file],
    }
    return enrichProductionOverlay(base)
  })
}

type QaArchiveKind = 'held' | 'raw' | 'old_qa'

interface QaOverlayInput {
  id: string
  label: string
  file: string
  defaultWidth: number
  aspect: number
  archiveKind: QaArchiveKind
}

function buildQaOverlay(input: QaOverlayInput): DevOverlayDef {
  const base: DevOverlayDef = {
    id: input.id,
    label: input.label,
    file: input.file,
    defaultWidth: input.defaultWidth,
    aspect: input.aspect,
    group: input.archiveKind === 'held' ? 'held' : input.archiveKind === 'raw' ? 'raw_archive' : 'old_qa',
  }

  if (input.archiveKind === 'held') return enrichHeldOverlay(base)
  if (input.archiveKind === 'raw') return enrichRawArchiveOverlay(base)
  return enrichOldQaOverlay(base)
}

/** Processed variants and unwired candidates — QA only, not in production registry. */
const DEV_QA_VARIANT_INPUTS: QaOverlayInput[] = [
  {
    id: 'qa-ficus-pumila-held',
    label: 'Ficus Pumila',
    file: 'ficus pumilia.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'held',
  },
  {
    id: 'qa-apple-raw',
    label: 'Apple (raw archive)',
    file: 'Apple-raw.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'raw',
  },
  {
    id: 'qa-avocado-raw',
    label: 'Avocado (raw archive)',
    file: 'Avocado-raw.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'raw',
  },
  {
    id: 'qa-bottlebrush-raw',
    label: 'Bottlebrush (raw archive)',
    file: 'Bottlebrush-raw.png',
    defaultWidth: 240,
    aspect: 1,
    archiveKind: 'raw',
  },
  {
    id: 'qa-akeake-raw',
    label: 'Ake-Ake (raw archive)',
    file: 'akeake-raw.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'raw',
  },
  {
    id: 'qa-begonia-raw',
    label: 'Begonia (raw archive)',
    file: 'begonia-raw.png',
    defaultWidth: 200,
    aspect: 1,
    archiveKind: 'raw',
  },
  {
    id: 'qa-blueberry-raw',
    label: 'Blueberry (raw archive)',
    file: 'blueberry-raw.png',
    defaultWidth: 180,
    aspect: 1,
    archiveKind: 'raw',
  },
  {
    id: 'qa-boxelder-raw',
    label: 'Box Elder (raw archive)',
    file: 'boxelder-raw.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'raw',
  },
  {
    id: 'qa-bromeliad-raw',
    label: 'Bromeliad (raw archive)',
    file: 'bromeliad-raw.png',
    defaultWidth: 220,
    aspect: 1,
    archiveKind: 'raw',
  },
  {
    id: 'qa-cabbage-tree-raw',
    label: 'Cabbage Tree (raw archive)',
    file: 'cabbage-tree-raw.png',
    defaultWidth: 280,
    aspect: 1,
    archiveKind: 'raw',
  },
  {
    id: 'qa-bird-white',
    label: 'Bird of Paradise (white proc.)',
    file: 'birds of paradies white.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-buxus-hedge-v2',
    label: 'Buxus Hedge v2',
    file: 'buxus-hedge-v2.png',
    defaultWidth: 320,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-citrus',
    label: 'Citrus / Lemon Tree',
    file: 'lemon white.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-clivia-white',
    label: 'Clivia (white proc.)',
    file: 'clivia white.png',
    defaultWidth: 200,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-gardenia',
    label: 'Gardenia (white proc.)',
    file: 'Gardenia white.png',
    defaultWidth: 200,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-gardenia-v2',
    label: 'Gardenia v2',
    file: 'gardenia-v2.png',
    defaultWidth: 200,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-hebe-white',
    label: 'Hebe (white proc.)',
    file: 'hebe white.png',
    defaultWidth: 180,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-hydrangea-white',
    label: 'Hydrangea (white proc.)',
    file: 'Hydrangea white.png',
    defaultWidth: 220,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-lavender',
    label: 'Lavender',
    file: 'lavender white.png',
    defaultWidth: 180,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-nikau-white',
    label: 'Nikau (white proc.)',
    file: 'Nikau white.png',
    defaultWidth: 320,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-renga-white',
    label: 'Renga Renga (white proc.)',
    file: 'Renga renga white.png',
    defaultWidth: 220,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-star-jasmine-white',
    label: 'Star Jasmine (white proc.)',
    file: 'star jasmine white.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-griselinia-src',
    label: 'Griselinia (unwired src)',
    file: 'griselinia.png',
    defaultWidth: 340,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-ficus-src',
    label: 'Ficus tuffi (unwired src)',
    file: 'ficus tuffi.png',
    defaultWidth: 340,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-corokia-geentys-src',
    label: 'Corokia Geentys Green (spaced src)',
    file: 'corokia geentys green.png',
    defaultWidth: 220,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-corokia-virgata-src',
    label: 'Corokia Virgata (spaced src)',
    file: 'corokia virgata.png',
    defaultWidth: 220,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-holly-src',
    label: 'English Holly (spaced src)',
    file: 'holly.png',
    defaultWidth: 240,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-boston-ivy-src',
    label: 'Boston Ivy (spaced src)',
    file: 'boston ivy.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-canna-lily-src',
    label: 'Canna Lily (spaced src)',
    file: 'canna lilly.png',
    defaultWidth: 220,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-cherry-tree-src',
    label: 'Cherry Tree (spaced src)',
    file: 'cherry tree.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-cordyline-stricta-src',
    label: 'Cordyline Stricta (spaced src)',
    file: 'cordyline stricta showoff.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-crepe-myrtle-src',
    label: 'Crepe Myrtle (spaced src)',
    file: 'crepe myrtle.png',
    defaultWidth: 280,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-camellia-legacy',
    label: 'Camellia (legacy transparent)',
    file: 'camellia_clean_transparent.png',
    defaultWidth: 200,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-corokia-geentys-hedge-src',
    label: 'Corokia Geentys Green Hedge (spaced src)',
    file: 'corokia geentys green hedge.png',
    defaultWidth: 340,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-corokia-virgata-hedge-src',
    label: 'Corokia Virgata Hedge (spaced src)',
    file: 'corokia virgata hedge.png',
    defaultWidth: 340,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-flame-tree-src',
    label: 'Flame Tree (spaced src)',
    file: 'flame tree.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-flax-lily-src',
    label: 'Flax Lily (spaced src)',
    file: 'flax lilly.png',
    defaultWidth: 240,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-forest-pansy-src',
    label: 'Forest Pansy (spaced src)',
    file: 'forest pansy.png',
    defaultWidth: 280,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-fortnight-lily-src',
    label: 'Fortnight Lily (spaced src)',
    file: 'dietes fortnight lilly.png',
    defaultWidth: 220,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-foxtail-agave-src',
    label: 'Foxtail Agave (spaced src)',
    file: 'foxtail agave.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-hen-chicken-src',
    label: 'Hen and Chicken Fern (spaced src)',
    file: 'hen and chicken fern.png',
    defaultWidth: 240,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-himalayan-birch-src',
    label: 'Himalayan Birch (spaced src)',
    file: 'himalayan birch.png',
    defaultWidth: 280,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-hoheria-src',
    label: 'Lacebark / Hoheria (spaced src)',
    file: 'Hoheria.png',
    defaultWidth: 280,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-japanese-maple-src',
    label: 'Japanese Maple (spaced src)',
    file: 'Japanese maple.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-kentia-palm-src',
    label: 'Kentia Palm (spaced src)',
    file: 'Kentia Palm.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-king-palm-src',
    label: 'King Palm (spaced src)',
    file: 'King Palm.png',
    defaultWidth: 260,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-lime-tree-src',
    label: 'Lime Tree (spaced src)',
    file: 'lime tree.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-london-plane-tree-src',
    label: 'London Plane Tree (spaced src)',
    file: 'london plane tree.png',
    defaultWidth: 320,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-magnolia-deciduous-src',
    label: 'Magnolia Deciduous (spaced src)',
    file: 'Magnolia deciduous.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-magnolia-evergreen-src',
    label: 'Magnolia Evergreen (spaced src)',
    file: 'magnolia evergreen.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-mandarin-tree-src',
    label: 'Mandarin Tree (spaced src)',
    file: 'mandarin tree.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-manuka-tree-src',
    label: 'Manuka (spaced src)',
    file: 'manuka tree.png',
    defaultWidth: 240,
    aspect: 1,
    archiveKind: 'old_qa',
  },
  {
    id: 'qa-magnolia-evergreen-final-src',
    label: 'Magnolia Evergreen (spaced src)',
    file: 'magnolia tree evergreen final.png',
    defaultWidth: 300,
    aspect: 1,
    archiveKind: 'old_qa',
  },
]

const DEV_QA_VARIANT_OVERLAYS: DevOverlayDef[] = DEV_QA_VARIANT_INPUTS.map(buildQaOverlay)

/** Filenames in static dev QA variants — excluded from auto-generated new batch. */
export const DEV_QA_OVERLAY_FILES: readonly string[] = DEV_QA_VARIANT_OVERLAYS.map(
  (overlay) => overlay.file,
)

/** Alpha batch (A–C) — dev QA only; run npm run refresh:dev-overlays after adding PNGs. */
export const DEV_ALPHA_BATCH_OVERLAYS: DevOverlayDef[] = GENERATED_DEV_ALPHA_BATCH_OVERLAYS.map(
  enrichAlphaBatchOverlay,
)

/** Latest processed batch — auto-generated; run npm run refresh:dev-overlays to update. */
export const NEW_BATCH_TEST_OVERLAYS: DevOverlayDef[] = GENERATED_NEW_BATCH_TEST_OVERLAYS.map(
  enrichLatestBatchOverlay,
)

/** All dev overlay options for /dev-overlay UI. */
export function getDevOverlayCatalog(): DevOverlayDef[] {
  const registered = registeredOverlays()
  const registeredFiles = new Set(registered.map((overlay) => overlay.file))
  const qaVariants = DEV_QA_VARIANT_OVERLAYS.filter((overlay) => !registeredFiles.has(overlay.file))
  return [...registered, ...qaVariants, ...DEV_ALPHA_BATCH_OVERLAYS, ...NEW_BATCH_TEST_OVERLAYS]
}

export function getDevOverlaysByGroup(group: DevOverlayGroup): DevOverlayDef[] {
  return getDevOverlayCatalog().filter((overlay) => overlay.group === group)
}

export const DEFAULT_DEV_OVERLAY: DevOverlayDef =
  getDevOverlayCatalog().find((overlay) => overlay.group === 'alpha_batch') ??
  getDevOverlayCatalog().find((overlay) => overlay.group === 'latest_batch') ??
  getDevOverlayCatalog().find((overlay) => overlay.tags?.includes('production')) ??
  getDevOverlayCatalog()[0]
