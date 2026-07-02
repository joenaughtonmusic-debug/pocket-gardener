'use client'

import type { ForegroundMask, ForegroundMaskPoint } from '../../types/garden'
import {
  clampMaskPoint,
  maskPolygonPixelPoints,
  maskToClipPath,
} from '../../lib/visualIdeas/foregroundMasks'

interface ForegroundMaskLayersProps {
  photoUrl: string
  masks: ForegroundMask[]
  visible: boolean
  containerW: number
  containerH: number
}

/** Clipped duplicates of the garden photo — one layer per saved mask, above plant overlays. */
export function ForegroundMaskLayers({
  photoUrl,
  masks,
  visible,
  containerW,
  containerH,
}: ForegroundMaskLayersProps) {
  if (!visible || masks.length === 0 || !containerW || !containerH) return null

  return (
    <>
      {masks.map((mask) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={mask.id}
          src={photoUrl}
          alt=""
          draggable={false}
          className="absolute left-0 top-0 w-full h-full block select-none pointer-events-none"
          style={{
            clipPath: maskToClipPath(mask.points),
            zIndex: 25,
          }}
        />
      ))}
    </>
  )
}

interface ForegroundMaskDrawingLayerProps {
  draftPoints: ForegroundMaskPoint[]
  containerW: number
  containerH: number
  onAddPoint: (point: ForegroundMaskPoint) => void
}

/** Interactive polygon tracing layer while the user draws a foreground mask. */
export function ForegroundMaskDrawingLayer({
  draftPoints,
  containerW,
  containerH,
  onAddPoint,
}: ForegroundMaskDrawingLayerProps) {
  if (!containerW || !containerH) return null

  function handlePointerDown(e: React.PointerEvent<SVGSVGElement>) {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)

    const rect = e.currentTarget.getBoundingClientRect()
    onAddPoint(clampMaskPoint({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }))
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${containerW} ${containerH}`}
      preserveAspectRatio="none"
      style={{ zIndex: 40, touchAction: 'none', cursor: 'crosshair' }}
      onPointerDown={handlePointerDown}
      onClick={(e) => e.stopPropagation()}
    >
      {draftPoints.length >= 2 && (
        <polygon
          points={maskPolygonPixelPoints(draftPoints, containerW, containerH)}
          fill="rgba(74, 222, 128, 0.18)"
          stroke="rgba(74, 222, 128, 0.95)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      )}
      {draftPoints.map((point, index) => (
        <circle
          key={`${index}-${point.x}-${point.y}`}
          cx={point.x * containerW}
          cy={point.y * containerH}
          r={6}
          fill="rgba(74, 222, 128, 0.95)"
          stroke="white"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

export const FOREGROUND_MASK_TRACE_PLANT_OPACITY = 0.25
