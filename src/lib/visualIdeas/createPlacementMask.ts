import sharp from 'sharp'

/**
 * Maps any recognised planting type label to a canonical lowercase slug.
 *
 * Accepted inputs (case-insensitive, spaces or underscores or hyphens):
 *   "Hedge"          → "hedge"
 *   "Screening"      → "screening"
 *   "Border planting"→ "border_planting"
 *   "Feature tree"   → "feature_tree"
 *   "Shrubs"         → "shrubs"
 *   "Groundcovers"   → "groundcovers"
 *
 * Returns null for unrecognised values.
 */
export function normalizePlantingType(value: string | null | undefined): string | null {
  if (!value) return null
  const v = value.toLowerCase().replace(/[-_\s]+/g, ' ').trim()

  if (v === 'hedge') return 'hedge'
  if (v === 'screening') return 'screening'
  if (v === 'border planting' || v === 'border') return 'border_planting'
  if (v === 'feature tree' || v === 'feature') return 'feature_tree'
  if (v === 'shrubs' || v === 'shrub') return 'shrubs'
  if (v === 'groundcovers' || v === 'groundcover') return 'groundcovers'

  return null
}

// ---------------------------------------------------------------------------
// Oval geometry
// ---------------------------------------------------------------------------

interface OvalSpec {
  /** Horizontal radius as a fraction of image width  (0–1) */
  rxFrac: number
  /** Vertical radius as a fraction of image height   (0–1) */
  ryFrac: number
  /**
   * Vertical offset fraction applied to the oval centre before placing on the
   * tap point.  Positive = shift DOWN.  Negative = shift UP.
   * For feature trees the tap represents the trunk base, so we shift UP.
   */
  cyCorrectionFrac: number
}

function getOvalSpec(plantingType: string | null | undefined): OvalSpec {
  const t = normalizePlantingType(plantingType)

  if (t === 'feature_tree') {
    return { rxFrac: 0.10, ryFrac: 0.175, cyCorrectionFrac: -0.175 }
  }
  if (t === 'hedge' || t === 'screening' || t === 'border_planting') {
    return { rxFrac: 0.175, ryFrac: 0.08, cyCorrectionFrac: 0 }
  }
  if (t === 'groundcovers') {
    return { rxFrac: 0.11, ryFrac: 0.04, cyCorrectionFrac: 0 }
  }
  if (t === 'shrubs') {
    return { rxFrac: 0.09, ryFrac: 0.10, cyCorrectionFrac: 0 }
  }
  return { rxFrac: 0.08, ryFrac: 0.06, cyCorrectionFrac: 0 }
}

// ---------------------------------------------------------------------------
// Public geometry type — returned alongside every mask buffer
// ---------------------------------------------------------------------------

export interface MaskGeometry {
  imageWidth: number
  imageHeight: number
  /** Placement tap point in normalised [0,1] coordinates */
  tapX: number
  tapY: number
  /** Final oval centre in pixels (after clamping) */
  maskCx: number
  maskCy: number
  /** Oval radii in pixels */
  maskRx: number
  maskRy: number
  /** Oval diameter as % of image (for quick sanity checks in logs) */
  maskWidthPct: number
  maskHeightPct: number
  normalizedPlantingType: string | null
}

export interface MaskResult {
  maskBuffer: Buffer
  geometry: MaskGeometry
}

// ---------------------------------------------------------------------------
// Core mask generator
// ---------------------------------------------------------------------------

/**
 * Generates a black-and-white PNG mask matching the original image dimensions.
 *
 * White = region to inpaint.  Black = preserve exactly.
 *
 * @returns `{ maskBuffer, geometry }` — geometry contains all pixel-level
 *          details needed for debug logging and overlay generation.
 */
export async function createPlacementMask(
  originalImageBuffer: Buffer,
  placementPoint: { x: number; y: number },
  plantingType: string | null | undefined,
): Promise<MaskResult> {
  const meta = await sharp(originalImageBuffer).metadata()
  const width = meta.width ?? 1024
  const height = meta.height ?? 1024

  const spec = getOvalSpec(plantingType)

  const rx = Math.round(spec.rxFrac * width)
  const ry = Math.round(spec.ryFrac * height)

  const cx = Math.round(placementPoint.x * width)
  const cy = Math.round(placementPoint.y * height + spec.cyCorrectionFrac * height)

  // Clamp so the oval never goes out of bounds
  const clampedCx = Math.min(Math.max(cx, rx), width - rx)
  const clampedCy = Math.min(Math.max(cy, ry), height - ry)

  const svg = [
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`,
    `  <rect width="${width}" height="${height}" fill="black"/>`,
    `  <ellipse cx="${clampedCx}" cy="${clampedCy}" rx="${rx}" ry="${ry}" fill="white"/>`,
    `</svg>`,
  ].join('\n')

  const maskBuffer = await sharp({
    create: { width, height, channels: 3, background: { r: 0, g: 0, b: 0 } },
  })
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer()

  const geometry: MaskGeometry = {
    imageWidth: width,
    imageHeight: height,
    tapX: placementPoint.x,
    tapY: placementPoint.y,
    maskCx: clampedCx,
    maskCy: clampedCy,
    maskRx: rx,
    maskRy: ry,
    maskWidthPct: Math.round((rx * 2 / width) * 100),
    maskHeightPct: Math.round((ry * 2 / height) * 100),
    normalizedPlantingType: normalizePlantingType(plantingType),
  }

  return { maskBuffer, geometry }
}

/**
 * Fallback mask: white oval centred in the image.
 * Used when no placement point is available.
 */
export async function createCentralMask(
  originalImageBuffer: Buffer,
  plantingType: string | null | undefined,
): Promise<MaskResult> {
  return createPlacementMask(originalImageBuffer, { x: 0.5, y: 0.5 }, plantingType)
}

// ---------------------------------------------------------------------------
// Debug overlay
// ---------------------------------------------------------------------------

/**
 * Composites a semi-transparent amber ellipse onto the original image at the
 * exact mask position, producing a visual debug overlay PNG.
 *
 * Only called when VISUAL_IDEAS_DEBUG_MASK=true.
 */
export async function createDebugOverlay(
  originalImageBuffer: Buffer,
  geometry: MaskGeometry,
): Promise<Buffer> {
  const { imageWidth, imageHeight, maskCx, maskCy, maskRx, maskRy } = geometry

  const svg = [
    `<svg width="${imageWidth}" height="${imageHeight}" xmlns="http://www.w3.org/2000/svg">`,
    `  <ellipse cx="${maskCx}" cy="${maskCy}" rx="${maskRx}" ry="${maskRy}"`,
    `           fill="rgba(255,120,0,0.55)" stroke="red" stroke-width="3"/>`,
    `</svg>`,
  ].join('\n')

  return sharp(originalImageBuffer)
    .png()
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer()
}
