'use client'

import type { ForegroundMask } from '../../types/garden'
import { MIN_FOREGROUND_MASK_POINTS } from '../../lib/visualIdeas/foregroundMasks'

interface ForegroundMaskControlsProps {
  maskDrawingMode: boolean
  draftPointCount: number
  hidePlantWhileTracing: boolean
  showForegroundMasks: boolean
  masks: ForegroundMask[]
  hasSelectedOverlay: boolean
  previewReady: boolean
  onStartDrawing: () => void
  onUndoPoint: () => void
  onFinishMask: () => void
  onCancelDrawing: () => void
  onDeleteMask: (maskId: string) => void
  onToggleHidePlant: () => void
  onToggleShowMasks: () => void
}

/** Controls for manual foreground masking — only rendered when the feature flag is enabled. */
export function ForegroundMaskControls({
  maskDrawingMode,
  draftPointCount,
  hidePlantWhileTracing,
  showForegroundMasks,
  masks,
  hasSelectedOverlay,
  previewReady,
  onStartDrawing,
  onUndoPoint,
  onFinishMask,
  onCancelDrawing,
  onDeleteMask,
  onToggleHidePlant,
  onToggleShowMasks,
}: ForegroundMaskControlsProps) {
  const canStart = previewReady && hasSelectedOverlay && !maskDrawingMode
  const canFinish = maskDrawingMode && draftPointCount >= MIN_FOREGROUND_MASK_POINTS

  return (
    <div className="space-y-3 rounded-[1.25rem] border border-green-100 bg-green-50/60 p-4">
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-green-800/50">
          Foreground masking
        </p>
        <p className="text-[11px] text-gray-600 font-medium mt-1 leading-relaxed">
          Trace around a tree trunk, post, or pot so plants appear behind it.
        </p>
      </div>

      {!maskDrawingMode ? (
        <div className="space-y-2">
          <button
            type="button"
            onClick={onStartDrawing}
            disabled={!canStart}
            className="w-full bg-white border border-green-200 text-green-900 py-3 rounded-[1rem] text-[10px] font-black uppercase tracking-widest disabled:opacity-40"
          >
            {hasSelectedOverlay ? 'Put behind object' : 'Select a plant first'}
          </button>

          {masks.length > 0 && (
            <div className="space-y-2">
              <label className="flex items-center justify-between gap-3 text-[11px] font-medium text-gray-600">
                <span>Show foreground masks</span>
                <input
                  type="checkbox"
                  checked={showForegroundMasks}
                  onChange={onToggleShowMasks}
                  className="accent-green-700"
                />
              </label>
              <div className="space-y-2">
                {masks.map((mask, index) => (
                  <div
                    key={mask.id}
                    className="flex items-center justify-between gap-2 bg-white border border-gray-100 rounded-[0.85rem] px-3 py-2"
                  >
                    <p className="text-[11px] font-bold text-green-950 truncate">
                      {mask.name ?? `Mask ${index + 1}`}
                      <span className="text-[10px] font-medium text-gray-400 ml-1">
                        ({mask.points.length} pts)
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => onDeleteMask(mask.id)}
                      className="text-[9px] font-black uppercase tracking-widest text-red-600 shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-green-900">
            Tap points around the foreground object ({draftPointCount} point{draftPointCount === 1 ? '' : 's'})
          </p>
          <label className="flex items-center justify-between gap-3 text-[11px] font-medium text-gray-600">
            <span>Hide plant while tracing</span>
            <input
              type="checkbox"
              checked={hidePlantWhileTracing}
              onChange={onToggleHidePlant}
              className="accent-green-700"
            />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onUndoPoint}
              disabled={draftPointCount === 0}
              className="bg-white border border-gray-100 text-green-900 py-2.5 rounded-[0.85rem] text-[10px] font-black uppercase tracking-widest disabled:opacity-40"
            >
              Undo point
            </button>
            <button
              type="button"
              onClick={onCancelDrawing}
              className="bg-white border border-gray-100 text-gray-600 py-2.5 rounded-[0.85rem] text-[10px] font-black uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>
          <button
            type="button"
            onClick={onFinishMask}
            disabled={!canFinish}
            className="w-full bg-green-900 text-white py-3 rounded-[1rem] text-[10px] font-black uppercase tracking-widest disabled:opacity-40"
          >
            Finish mask
          </button>
          {draftPointCount > 0 && draftPointCount < MIN_FOREGROUND_MASK_POINTS && (
            <p className="text-[10px] text-amber-700 font-medium">
              Add at least {MIN_FOREGROUND_MASK_POINTS} points to save a mask.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
