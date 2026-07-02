import type { ForegroundMask, ForegroundMaskPoint } from '../../types/garden'

export const MIN_FOREGROUND_MASK_POINTS = 3

/** Opacity for the selected plant while tracing a foreground mask. */
export const FOREGROUND_MASK_TRACE_PLANT_OPACITY = 0.25

/**
 * Manual foreground masking in Quick Preview.
 * Set NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS=true locally to enable; off/undefined = unchanged behaviour.
 */
export function isForegroundMasksEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS === 'true'
}

export function clampMaskPoint(point: ForegroundMaskPoint): ForegroundMaskPoint {
  return {
    x: Math.min(1, Math.max(0, point.x)),
    y: Math.min(1, Math.max(0, point.y)),
  }
}

/** Convert a pointer/touch position to normalised image coordinates (0–1). */
export function pointerToImageRelative(
  clientX: number,
  clientY: number,
  containerRect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
): ForegroundMaskPoint {
  if (!containerRect.width || !containerRect.height) {
    return { x: 0, y: 0 }
  }
  return clampMaskPoint({
    x: (clientX - containerRect.left) / containerRect.width,
    y: (clientY - containerRect.top) / containerRect.height,
  })
}

export function maskToClipPath(points: ForegroundMaskPoint[]): string {
  if (points.length < MIN_FOREGROUND_MASK_POINTS) return 'none'
  const coords = points
    .map((point) => `${point.x * 100}% ${point.y * 100}%`)
    .join(', ')
  return `polygon(${coords})`
}

export function createForegroundMask(
  points: ForegroundMaskPoint[],
  name?: string,
): ForegroundMask | null {
  if (points.length < MIN_FOREGROUND_MASK_POINTS) return null
  return {
    id: crypto.randomUUID(),
    points: points.map(clampMaskPoint),
    name,
    createdAt: new Date().toISOString(),
  }
}

export function parseForegroundMasks(raw: unknown): ForegroundMask[] {
  if (!Array.isArray(raw)) return []

  const masks: ForegroundMask[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const record = item as Record<string, unknown>
    if (typeof record.id !== 'string' || typeof record.createdAt !== 'string') continue
    if (!Array.isArray(record.points)) continue

    const points = record.points
      .map((value) => {
        if (!value || typeof value !== 'object') return null
        const point = value as Record<string, unknown>
        if (typeof point.x !== 'number' || typeof point.y !== 'number') return null
        return clampMaskPoint({ x: point.x, y: point.y })
      })
      .filter((point): point is ForegroundMaskPoint => point !== null)

    if (points.length < MIN_FOREGROUND_MASK_POINTS) continue

    masks.push({
      id: record.id,
      points,
      name: typeof record.name === 'string' ? record.name : undefined,
      createdAt: record.createdAt,
    })
  }

  return masks
}

export function maskPolygonPixelPoints(
  points: ForegroundMaskPoint[],
  containerW: number,
  containerH: number,
): string {
  return points
    .map((point) => `${point.x * containerW},${point.y * containerH}`)
    .join(' ')
}
