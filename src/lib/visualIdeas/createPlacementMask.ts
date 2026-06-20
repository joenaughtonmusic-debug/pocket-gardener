import sharp from 'sharp'

/**
 * Generates a black-and-white PNG mask matching the input image dimensions.
 *
 * White area  = region to inpaint (where the model should draw the new plant).
 * Black area  = everything outside — must be preserved exactly.
 *
 * Mask oval sizes are expressed as fractions of image width / height so they
 * scale correctly regardless of the original photo resolution.
 */

interface OvalSpec {
  /** Horizontal radius as a fraction of image width  (0–1) */
  rxFrac: number
  /** Vertical radius as a fraction of image height   (0–1) */
  ryFrac: number
  /**
   * Vertical offset fraction applied to the oval centre before placing on the
   * tap point.  Positive = shift the oval DOWN from the tap point.
   * For feature trees the tap represents the trunk base, so we shift UP (negative).
   */
  cyCorrectionFrac: number
}

function getOvalSpec(plantingType: string | null | undefined): OvalSpec {
  const t = (plantingType ?? '').toLowerCase()

  if (t === 'feature tree') {
    // Tall oval; tap is at the base/trunk → shift centre upward
    return { rxFrac: 0.10, ryFrac: 0.175, cyCorrectionFrac: -0.175 }
  }
  if (t === 'hedge' || t === 'screening' || t === 'border planting') {
    // Wide horizontal ribbon
    return { rxFrac: 0.175, ryFrac: 0.08, cyCorrectionFrac: 0 }
  }
  if (t === 'groundcovers') {
    // Low and wide
    return { rxFrac: 0.11, ryFrac: 0.04, cyCorrectionFrac: 0 }
  }
  if (t === 'shrubs') {
    return { rxFrac: 0.07, ryFrac: 0.05, cyCorrectionFrac: 0 }
  }
  // fallback
  return { rxFrac: 0.08, ryFrac: 0.06, cyCorrectionFrac: 0 }
}

/**
 * @param originalImageBuffer  Raw bytes of the original garden photo.
 * @param placementPoint       Normalised tap coordinates {x, y} in [0, 1].
 * @param plantingType         One of the known planting type strings (or null).
 * @returns PNG Buffer of the mask — same pixel dimensions as the original image.
 */
export async function createPlacementMask(
  originalImageBuffer: Buffer,
  placementPoint: { x: number; y: number },
  plantingType: string | null | undefined,
): Promise<Buffer> {
  const meta = await sharp(originalImageBuffer).metadata()
  const width = meta.width ?? 1024
  const height = meta.height ?? 1024

  const spec = getOvalSpec(plantingType)

  const rx = Math.round(spec.rxFrac * width)
  const ry = Math.round(spec.ryFrac * height)

  const cx = Math.round(placementPoint.x * width)
  // Apply vertical correction so the tap point aligns with e.g. the trunk base
  const cy = Math.round(placementPoint.y * height + spec.cyCorrectionFrac * height)

  // Clamp centre so the oval never goes out of bounds
  const clampedCx = Math.min(Math.max(cx, rx), width - rx)
  const clampedCy = Math.min(Math.max(cy, ry), height - ry)

  const svg = [
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`,
    `  <rect width="${width}" height="${height}" fill="black"/>`,
    `  <ellipse cx="${clampedCx}" cy="${clampedCy}" rx="${rx}" ry="${ry}" fill="white"/>`,
    `</svg>`,
  ].join('\n')

  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
    },
  })
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer()
}

/**
 * Fallback mask: white oval centred in the image, used when no placement point
 * is available and the caller opts not to abort.
 */
export async function createCentralMask(
  originalImageBuffer: Buffer,
  plantingType: string | null | undefined,
): Promise<Buffer> {
  const meta = await sharp(originalImageBuffer).metadata()
  const width = meta.width ?? 1024
  const height = meta.height ?? 1024

  return createPlacementMask(
    originalImageBuffer,
    { x: 0.5, y: 0.5 },
    plantingType,
  )
}
