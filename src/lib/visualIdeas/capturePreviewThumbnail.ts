import { DEFAULT_ROW_WIDTH, type OverlayAsset } from './plantOverlayAssets'
import { resolvePreviewAsset } from '../visualiser/devAlphaBatchOverlays'
import type { PreviewOverlay } from '../../types/garden'

const THUMB_MAX_WIDTH = 480
const ROW_TILE_OVERLAP_RATIO = 0.2

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

function overlayRect(
  overlay: PreviewOverlay,
  containerW: number,
  containerH: number,
  asset: OverlayAsset,
) {
  const isRow = overlay.mode === 'row'
  if (isRow) {
    const width = (overlay.width ?? DEFAULT_ROW_WIDTH) * containerW
    const segmentWidth = overlay.scale * containerW
    const height = segmentWidth / asset.aspect
    return {
      left: overlay.x * containerW - width / 2,
      top: overlay.y * containerH - height / 2,
      width,
      height,
      isRow: true,
      segmentWidth,
      aspect: asset.aspect,
    }
  }

  const width = overlay.scale * containerW
  const height = width / asset.aspect
  return {
    left: overlay.x * containerW - width / 2,
    top: overlay.y * containerH - height / 2,
    width,
    height,
    isRow: false,
    segmentWidth: width,
    aspect: asset.aspect,
  }
}

/** Render the current preview composition to a JPEG blob for list thumbnails. */
export async function capturePreviewThumbnail(
  backgroundUrl: string,
  overlays: PreviewOverlay[],
  containerW: number,
  containerH: number,
): Promise<Blob | null> {
  if (!containerW || !containerH || overlays.length === 0) return null

  try {
    const scale = THUMB_MAX_WIDTH / containerW
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(containerW * scale)
    canvas.height = Math.round(containerH * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const bg = await loadImage(backgroundUrl)
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    for (const overlay of overlays) {
      const asset = resolvePreviewAsset(overlay.assetKey)
      const img = await loadImage(asset.src)
      const rect = overlayRect(overlay, containerW, containerH, asset)

      if (rect.isRow) {
        const tileWidth = rect.segmentWidth
        const step = tileWidth * (1 - ROW_TILE_OVERLAP_RATIO)
        const count = Math.max(1, Math.ceil((rect.width - tileWidth) / step + 1))
        for (let i = 0; i < count; i += 1) {
          const left = rect.left + i * step
          ctx.drawImage(
            img,
            left * scale,
            rect.top * scale,
            tileWidth * scale,
            rect.height * scale,
          )
        }
      } else {
        ctx.drawImage(
          img,
          rect.left * scale,
          rect.top * scale,
          rect.width * scale,
          rect.height * scale,
        )
      }
    }

    return await new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.82)
    })
  } catch (err) {
    console.error('capturePreviewThumbnail failed:', err)
    return null
  }
}
