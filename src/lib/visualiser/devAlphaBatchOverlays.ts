/**
 * Dev-only alpha batch overlays for visual QA before production wiring.
 * Not registered in plantOverlayAssets.ts — enable with NEXT_PUBLIC_SHOW_DEV_OVERLAYS=true.
 */

import type { CreateVisualPlantOption, OverlayAsset } from '../visualIdeas/plantOverlayAssets'
import { getAssetByKey, PREVIEW_PLANT_OPTIONS } from '../visualIdeas/plantOverlayAssets'

const PREVIEW_REF_WIDTH = 900
import { GENERATED_DEV_ALPHA_BATCH_OVERLAYS } from './devAlphaBatchManifest.generated'
import type { DevOverlayDef } from './devOverlayAssets'

export type DevAlphaBatchPlantType =
  | 'Groundcover'
  | 'Shrub'
  | 'Grass / strappy plant'

export interface DevAlphaBatchSpec {
  slug: string
  label: string
  /** Kebab-case filename under public/plant-overlays/ */
  file: string
  defaultWidth: number
  plantTypes: DevAlphaBatchPlantType[]
  /** Processed/raw/public source filenames to copy from (first match wins). */
  sourceCandidates: readonly string[]
}

/** First alphabetical processed batch — Agapanthus intentionally omitted (already in production). */
export const DEV_ALPHA_BATCH_SPECS: readonly DevAlphaBatchSpec[] = [
  {
    slug: 'acorus',
    label: 'Acorus',
    file: 'acorus.png',
    defaultWidth: 220,
    plantTypes: ['Grass / strappy plant', 'Groundcover'],
    sourceCandidates: ['acorus.png', 'acorus raw.png', 'Acorus raw.png'],
  },
  {
    slug: 'ajuga',
    label: 'Ajuga',
    file: 'ajuga.png',
    defaultWidth: 200,
    plantTypes: ['Groundcover'],
    sourceCandidates: ['ajuga.png'],
  },
  {
    slug: 'alstroemeria',
    label: 'Alstroemeria',
    file: 'alstroemeria.png',
    defaultWidth: 220,
    plantTypes: ['Shrub'],
    sourceCandidates: ['alstroemeria.png'],
  },
  {
    slug: 'apodasmia',
    label: 'Apodasmia',
    file: 'apodasmia.png',
    defaultWidth: 220,
    plantTypes: ['Grass / strappy plant'],
    sourceCandidates: ['apodasmia.png'],
  },
  {
    slug: 'astilbe',
    label: 'Astilbe',
    file: 'astilbe.png',
    defaultWidth: 220,
    plantTypes: ['Groundcover', 'Shrub'],
    sourceCandidates: ['astilbe.png'],
  },
  {
    slug: 'azalea',
    label: 'Azalea',
    file: 'azalea.png',
    defaultWidth: 240,
    plantTypes: ['Shrub'],
    sourceCandidates: ['azalea.png'],
  },
  {
    slug: 'carex',
    label: 'Carex',
    file: 'carex.png',
    defaultWidth: 200,
    plantTypes: ['Grass / strappy plant', 'Groundcover'],
    sourceCandidates: ['carex.png'],
  },
  {
    slug: 'choisya',
    label: 'Choisya',
    file: 'choisya.png',
    defaultWidth: 240,
    plantTypes: ['Shrub'],
    sourceCandidates: ['choisya.png'],
  },
  {
    slug: 'clumping-bamboo',
    label: 'Clumping Bamboo',
    file: 'clumping-bamboo.png',
    defaultWidth: 280,
    plantTypes: ['Grass / strappy plant'],
    sourceCandidates: ['clumping-bamboo.png', 'clumping bamboo.png'],
  },
] as const

export const DEV_ALPHA_BATCH_ASSET_KEY_PREFIX = 'dev-alpha-'

export function isDevOverlaysEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_DEV_OVERLAYS === 'true'
}

export function devAlphaAssetKey(slug: string): string {
  return `${DEV_ALPHA_BATCH_ASSET_KEY_PREFIX}${slug}`
}

export function isDevAlphaAssetKey(key: string): boolean {
  return key.startsWith(DEV_ALPHA_BATCH_ASSET_KEY_PREFIX)
}

function devAlphaOverlaySrc(file: string, cacheBust?: string): string {
  const base = `/plant-overlays/${encodeURIComponent(file)}`
  return cacheBust ? `${base}?v=${encodeURIComponent(cacheBust)}` : base
}

function buildDevAlphaAsset(def: DevOverlayDef): OverlayAsset {
  return {
    key: devAlphaAssetKey(def.id.replace(/^alpha-/, '')),
    src: devAlphaOverlaySrc(def.file, def.cacheBust),
    defaultWidthFraction: def.defaultWidth / PREVIEW_REF_WIDTH,
    aspect: def.aspect,
  }
}

const DEV_ALPHA_ASSETS: Map<string, OverlayAsset> = new Map(
  GENERATED_DEV_ALPHA_BATCH_OVERLAYS.map((def) => {
    const asset = buildDevAlphaAsset(def)
    return [asset.key, asset] as const
  }),
)

const DEV_ALPHA_BY_LABEL = new Map(
  GENERATED_DEV_ALPHA_BATCH_OVERLAYS.map((def) => [def.label, def] as const),
)

export function getDevAlphaBatchOverlayDefs(): DevOverlayDef[] {
  return GENERATED_DEV_ALPHA_BATCH_OVERLAYS
}

export function getDevAlphaAssetByKey(key: string): OverlayAsset | undefined {
  return DEV_ALPHA_ASSETS.get(key)
}

export function resolvePreviewAsset(key: string): OverlayAsset {
  return getDevAlphaAssetByKey(key) ?? getAssetByKey(key)
}

export function isDevAlphaPreviewPlant(name: string): boolean {
  return DEV_ALPHA_BY_LABEL.has(name)
}

export function getDevAlphaAssetForPlant(name: string): OverlayAsset | undefined {
  const def = DEV_ALPHA_BY_LABEL.get(name)
  if (!def) return undefined
  return getDevAlphaAssetByKey(devAlphaAssetKey(def.id.replace(/^alpha-/, '')))
}

function genericDevPlantOption(spec: DevAlphaBatchSpec): CreateVisualPlantOption {
  return {
    name: spec.label,
    description: 'Dev QA overlay — not yet in production visualiser.',
    notes: 'Alpha batch PNG preview only.',
    detectedIntent: 'general planting',
    style: 'Border planting',
    gardenStyles: ['Low maintenance'],
    plantTypes: spec.plantTypes,
    conditions: {
      sun: ['full sun', 'part shade'],
      moisture: ['average'],
      drainage: ['average', 'well drained'],
      wind: ['moderate'],
    },
  }
}

export function getDevAlphaPreviewPlantOptions(): CreateVisualPlantOption[] {
  if (!isDevOverlaysEnabled()) return []

  const productionNames = new Set(PREVIEW_PLANT_OPTIONS.map((plant) => plant.name))

  return DEV_ALPHA_BATCH_SPECS.filter(
    (spec) =>
      GENERATED_DEV_ALPHA_BATCH_OVERLAYS.some((def) => def.file === spec.file) &&
      !productionNames.has(spec.label),
  ).map(genericDevPlantOption)
}

/** Warn once in the browser when a dev alpha PNG fails to load. */
export function warnMissingDevAlphaOverlay(label: string, src: string): void {
  console.warn(`[dev-alpha-overlay] Missing or failed PNG for "${label}" — expected ${src}`)
}
