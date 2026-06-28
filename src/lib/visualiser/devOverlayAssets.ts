/**
 * Dev-only overlay definitions for /dev-overlay smoke testing.
 * Not used by the production visualiser editor or plant selectors.
 *
 * TODO: Future — generate a dev overlay asset manifest from public/plant-overlays/
 * (e.g. fs read at build time or a small API route) so newly processed files appear
 * automatically without editing this list.
 */

import { REGISTERED_OVERLAY_PATHS } from '../visualIdeas/plantOverlayAssets'

export type DevOverlayGroup = 'registered' | 'dev_qa_variants' | 'new_batch' | 'svg_placeholder'

export interface DevOverlayDef {
  id: string
  label: string
  /** Filename under public/plant-overlays/ */
  file: string
  defaultWidth: number
  aspect: number
  group: DevOverlayGroup
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
    return {
      id: `reg-${file.replace(/[^a-z0-9]+/gi, '-')}`,
      label: REGISTERED_FILE_LABELS[file] ?? file,
      file,
      defaultWidth: isSvg ? (file.includes('hedge') ? 300 : 200) : 220,
      aspect: file === 'lomandra.png' ? 4576 / 3056 : isSvg && file.includes('hedge') ? 320 / 200 : isSvg && file.includes('strappy') ? 200 / 250 : isSvg ? 200 / 230 : 1,
      group: isSvg ? 'svg_placeholder' : 'registered',
    }
  })
}

/** Processed variants and unwired candidates — QA only, not in production registry. */
const DEV_QA_VARIANT_OVERLAYS: DevOverlayDef[] = [
  {
    id: 'qa-bird-white',
    label: 'Bird of Paradise (white proc.)',
    file: 'birds of paradies white.png',
    defaultWidth: 260,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-buxus-hedge-v2',
    label: 'Buxus Hedge v2',
    file: 'buxus-hedge-v2.png',
    defaultWidth: 320,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-citrus',
    label: 'Citrus / Lemon Tree',
    file: 'lemon white.png',
    defaultWidth: 300,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-clivia-white',
    label: 'Clivia (white proc.)',
    file: 'clivia white.png',
    defaultWidth: 200,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-gardenia',
    label: 'Gardenia (white proc.)',
    file: 'Gardenia white.png',
    defaultWidth: 200,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-gardenia-v2',
    label: 'Gardenia v2',
    file: 'gardenia-v2.png',
    defaultWidth: 200,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-hebe-white',
    label: 'Hebe (white proc.)',
    file: 'hebe white.png',
    defaultWidth: 180,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-hydrangea-white',
    label: 'Hydrangea (white proc.)',
    file: 'Hydrangea white.png',
    defaultWidth: 220,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-lavender',
    label: 'Lavender',
    file: 'lavender white.png',
    defaultWidth: 180,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-nikau-white',
    label: 'Nikau (white proc.)',
    file: 'Nikau white.png',
    defaultWidth: 320,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-renga-white',
    label: 'Renga Renga (white proc.)',
    file: 'Renga renga white.png',
    defaultWidth: 220,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-star-jasmine-white',
    label: 'Star Jasmine (white proc.)',
    file: 'star jasmine white.png',
    defaultWidth: 260,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-griselinia-src',
    label: 'Griselinia (unwired src)',
    file: 'griselinia.png',
    defaultWidth: 340,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-ficus-src',
    label: 'Ficus tuffi (unwired src)',
    file: 'ficus tuffi.png',
    defaultWidth: 340,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-apple-raw',
    label: 'Apple (raw archive)',
    file: 'Apple-raw.png',
    defaultWidth: 300,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-avocado-raw',
    label: 'Avocado (raw archive)',
    file: 'Avocado-raw.png',
    defaultWidth: 300,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-bottlebrush-raw',
    label: 'Bottlebrush (raw archive)',
    file: 'Bottlebrush-raw.png',
    defaultWidth: 240,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-akeake-raw',
    label: 'Ake-Ake (raw archive)',
    file: 'akeake-raw.png',
    defaultWidth: 260,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-begonia-raw',
    label: 'Begonia (raw archive)',
    file: 'begonia-raw.png',
    defaultWidth: 200,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-blueberry-raw',
    label: 'Blueberry (raw archive)',
    file: 'blueberry-raw.png',
    defaultWidth: 180,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-boxelder-raw',
    label: 'Box Elder (raw archive)',
    file: 'boxelder-raw.png',
    defaultWidth: 300,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-bromeliad-raw',
    label: 'Bromeliad (raw archive)',
    file: 'bromeliad-raw.png',
    defaultWidth: 220,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-cabbage-tree-raw',
    label: 'Cabbage Tree (raw archive)',
    file: 'cabbage-tree-raw.png',
    defaultWidth: 280,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-corokia-geentys-src',
    label: 'Corokia Geentys Green (spaced src)',
    file: 'corokia geentys green.png',
    defaultWidth: 220,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-corokia-virgata-src',
    label: 'Corokia Virgata (spaced src)',
    file: 'corokia virgata.png',
    defaultWidth: 220,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-holly-src',
    label: 'English Holly (spaced src)',
    file: 'holly.png',
    defaultWidth: 240,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-boston-ivy-src',
    label: 'Boston Ivy (spaced src)',
    file: 'boston ivy.png',
    defaultWidth: 260,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-canna-lily-src',
    label: 'Canna Lily (spaced src)',
    file: 'canna lilly.png',
    defaultWidth: 220,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-cherry-tree-src',
    label: 'Cherry Tree (spaced src)',
    file: 'cherry tree.png',
    defaultWidth: 300,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-cordyline-stricta-src',
    label: 'Cordyline Stricta (spaced src)',
    file: 'cordyline stricta showoff.png',
    defaultWidth: 260,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-crepe-myrtle-src',
    label: 'Crepe Myrtle (spaced src)',
    file: 'crepe myrtle.png',
    defaultWidth: 280,
    aspect: 1,
    group: 'dev_qa_variants',
  },
  {
    id: 'qa-camellia-legacy',
    label: 'Camellia (legacy transparent)',
    file: 'camellia_clean_transparent.png',
    defaultWidth: 200,
    aspect: 1,
    group: 'dev_qa_variants',
  },
]

/** Latest processed batch — cleared when assets graduate to production registry. */
export const NEW_BATCH_TEST_OVERLAYS: DevOverlayDef[] = []

export const DEV_OVERLAY_GROUPS: Array<{
  key: DevOverlayGroup
  title: string
  description: string
}> = [
  {
    key: 'registered',
    title: 'Registered / production assets',
    description: 'Files referenced in plantOverlayAssets.ts ASSETS registry.',
  },
  {
    key: 'dev_qa_variants',
    title: 'Dev QA variants (unwired)',
    description: 'Processed PNGs on disk — not in production registry or selector.',
  },
  {
    key: 'new_batch',
    title: 'New processed test batch',
    description: 'Latest process:plant-overlays output — reprocessed retries listed first.',
  },
  {
    key: 'svg_placeholder',
    title: 'SVG fallbacks',
    description: 'Generic placeholder shapes used when no PNG matches.',
  },
]

/** All dev overlay options, grouped for /dev-overlay UI. */
export function getDevOverlayCatalog(): DevOverlayDef[] {
  const registered = registeredOverlays()
  const registeredFiles = new Set(registered.map((o) => o.file))
  const qaVariants = DEV_QA_VARIANT_OVERLAYS.filter((o) => !registeredFiles.has(o.file))
  return [...registered, ...qaVariants, ...NEW_BATCH_TEST_OVERLAYS]
}

export function getDevOverlaysByGroup(group: DevOverlayGroup): DevOverlayDef[] {
  return getDevOverlayCatalog().filter((o) => o.group === group)
}

export const DEFAULT_DEV_OVERLAY: DevOverlayDef = getDevOverlayCatalog()[0]
