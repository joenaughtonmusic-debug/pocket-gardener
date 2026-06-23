'use client'

import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabaseClient'
import Link from 'next/link'
import {
  ArrowLeft, Loader2, Check, ExternalLink,
} from 'lucide-react'
import type { VisualConcept, SuggestedSpecies } from '../../../../types/garden'
import {
  resolveOverlayAsset,
  PREVIEW_PLANT_OPTIONS,
  type OverlayAsset,
} from '../../../../lib/visualIdeas/plantOverlayAssets'

const PREVIEW_PLANT_NAMES = new Set(PREVIEW_PLANT_OPTIONS.map((p) => p.name))

interface Pos { x: number; y: number }

// ---------------------------------------------------------------------------
// Quick Preview helpers
// ---------------------------------------------------------------------------

function calcInitialOverlay(
  containerW: number,
  containerH: number,
  asset: OverlayAsset,
  placementPoint: Pos | null,
  savedPos: Pos | null,
  savedScale: number | null,
): { pos: Pos; width: number } {
  const width = savedScale && savedScale > 0
    ? Math.round(savedScale * containerW)
    : Math.round(asset.defaultWidthFraction * containerW)
  const height = width / asset.aspect

  let x: number
  let y: number

  if (savedPos) {
    x = Math.round(savedPos.x * containerW - width / 2)
    y = Math.round(savedPos.y * containerH - height / 2)
  } else if (placementPoint) {
    x = Math.round(placementPoint.x * containerW - width / 2)
    y = Math.round(placementPoint.y * containerH - height / 2)
  } else {
    x = Math.round((containerW - width) / 2)
    y = Math.round((containerH - height) / 2)
  }

  return { pos: { x, y }, width }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function VisualConceptDetailPage() {
  const { id } = useParams<{ id: string }>()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const [concept,    setConcept]    = useState<VisualConcept | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [notFound,   setNotFound]   = useState(false)

  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([])
  const [addingPlants,    setAddingPlants]    = useState(false)
  const [addPlantsResult, setAddPlantsResult] = useState<string | null>(null)

  // ── Quick Preview state ─────────────────────────────────────────────────
  const previewContainerRef               = useRef<HTMLDivElement>(null)
  const [previewDims, setPreviewDims]     = useState<{ w: number; h: number }>({ w: 0, h: 0 })
  const [previewReady, setPreviewReady]   = useState(false)
  const currentAssetKeyRef                = useRef<string>('')
  const [overlayPos, setOverlayPos]       = useState<Pos>({ x: 0, y: 0 })
  const [overlayWidth, setOverlayWidth]   = useState(120)
  const [isDraggingOverlay, setIsDraggingOverlay] = useState(false)
  const overlayDragOrigin                 = useRef<{ clientX: number; clientY: number; posX: number; posY: number }>({ clientX: 0, clientY: 0, posX: 0, posY: 0 })
  const [savingPreview, setSavingPreview] = useState(false)
  const [showFuturePlantsModal, setShowFuturePlantsModal] = useState(false)
  const [futurePlantsSaved, setFuturePlantsSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('garden_visual_concepts')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error || !data) { setNotFound(true); setLoading(false); return }

      const c = data as VisualConcept
      setConcept(c)
      setSelectedSpecies(c.selected_species ?? [])
      setLoading(false)
    }
    load()
  }, [id, supabase])

  function toggleSpecies(name: string) {
    setSelectedSpecies((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    )
  }

  // ── Overlay asset: derived from selected species / intent ────────────────
  const suggestedNames = useMemo(
    () => ((concept?.suggested_species ?? []) as SuggestedSpecies[]).map((s) => s.name),
    [concept?.suggested_species],
  )

  const overlayAsset: OverlayAsset = useMemo(
    () => resolveOverlayAsset(
      selectedSpecies,
      concept?.detected_intent ?? null,
      suggestedNames,
    ),
    [selectedSpecies, concept?.detected_intent, suggestedNames],
  )

  // ── Initialize / reinitialize overlay when asset key changes ────────────
  useEffect(() => {
    if (!previewReady || previewDims.w === 0) return
    if (overlayAsset.key === currentAssetKeyRef.current) return
    currentAssetKeyRef.current = overlayAsset.key

    const { pos, width } = calcInitialOverlay(
      previewDims.w, previewDims.h,
      overlayAsset,
      concept?.placement_point ?? null,
      null, // no saved state when asset changes mid-session
      null,
    )
    setOverlayWidth(width)
    setOverlayPos(pos)
  }, [overlayAsset, previewReady, previewDims, concept?.placement_point])

  // ── Background image load — first-time initialization ───────────────────
  function handleBgImageLoad() {
    if (previewReady) return // already initialized
    const container = previewContainerRef.current
    if (!container) return

    const w = container.offsetWidth
    const h = container.offsetHeight
    if (!w || !h) return

    setPreviewDims({ w, h })
    currentAssetKeyRef.current = overlayAsset.key

    const { pos, width } = calcInitialOverlay(
      w, h,
      overlayAsset,
      concept?.placement_point ?? null,
      concept?.overlay_position ?? null,
      concept?.overlay_scale ?? null,
    )
    setOverlayWidth(width)
    setOverlayPos(pos)
    setPreviewReady(true)
  }

  // ── Drag handlers ────────────────────────────────────────────────────────
  const handleOverlayPointerDown = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      setIsDraggingOverlay(true)
      overlayDragOrigin.current = {
        clientX: e.clientX, clientY: e.clientY,
        posX: overlayPos.x, posY: overlayPos.y,
      }
    },
    [overlayPos],
  )

  const handleOverlayPointerMove = useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      if (!isDraggingOverlay) return
      setOverlayPos({
        x: overlayDragOrigin.current.posX + e.clientX - overlayDragOrigin.current.clientX,
        y: overlayDragOrigin.current.posY + e.clientY - overlayDragOrigin.current.clientY,
      })
    },
    [isDraggingOverlay],
  )

  const handleOverlayPointerUp = useCallback(() => setIsDraggingOverlay(false), [])

  // ── Reset overlay to default position for current asset ─────────────────
  function handleResetOverlay() {
    if (!previewDims.w) return
    const { pos, width } = calcInitialOverlay(
      previewDims.w, previewDims.h,
      overlayAsset,
      concept?.placement_point ?? null,
      null, null,
    )
    setOverlayWidth(width)
    setOverlayPos(pos)
  }

  // ── Save Quick Preview ───────────────────────────────────────────────────
  async function handleSavePreview() {
    if (!concept || !previewDims.w) return
    setSavingPreview(true)

    const { w, h } = previewDims
    const normalizedPos = {
      x: (overlayPos.x + overlayWidth / 2) / w,
      y: (overlayPos.y + (overlayWidth / overlayAsset.aspect) / 2) / h,
    }
    const normalizedScale = overlayWidth / w

    const { error } = await supabase
      .from('garden_visual_concepts')
      .update({
        overlay_asset_key: overlayAsset.key,
        overlay_position:  normalizedPos,
        overlay_scale:     normalizedScale,
        preview_mode:      'overlay',
        selected_species:  selectedSpecies,
        updated_at:        new Date().toISOString(),
      })
      .eq('id', concept.id)

    if (!error) {
      setConcept((prev) => prev ? {
        ...prev,
        overlay_asset_key: overlayAsset.key,
        overlay_position:  normalizedPos,
        overlay_scale:     normalizedScale,
        preview_mode:      'overlay',
        selected_species:  selectedSpecies,
      } : prev)
      setFuturePlantsSaved(false)
      setAddPlantsResult(null)
      setShowFuturePlantsModal(true)
    }
    setSavingPreview(false)
  }

  async function handleSaveToFuturePlants() {
    if (!concept || selectedSpecies.length === 0) return
    setAddingPlants(true)
    setAddPlantsResult(null)

    const res = await fetch('/api/visual-ideas/add-planned-plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selectedSpecies,
        gardenAreaId: concept.garden_area_id || null,
      }),
    })

    const json = await res.json()
    if (!res.ok) {
      setAddPlantsResult(json.error || 'Could not save to Future Plants.')
    } else {
      setFuturePlantsSaved(true)
      setAddPlantsResult('Saved to Future Plants')
    }
    setAddingPlants(false)
  }

  // ── Loading / not-found states ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-green-800/20 border-t-green-800 rounded-full animate-spin" />
          <p className="text-green-800 font-black uppercase text-[10px] tracking-widest">Loading…</p>
        </div>
      </div>
    )
  }

  if (notFound || !concept) {
    return (
      <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <p className="text-4xl">🌿</p>
          <p className="text-sm font-black text-green-950 uppercase">Concept not found</p>
          <Link href="/visualise" className="text-[10px] font-black uppercase tracking-widest text-green-700 underline">
            Back to Visualise
          </Link>
        </div>
      </div>
    )
  }

  const suggestedSpecies = ((concept.suggested_species ?? []) as SuggestedSpecies[])
    .filter((s) => PREVIEW_PLANT_NAMES.has(s.name))

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40">

      {/* Header */}
      <div className="bg-green-900 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-xl shadow-green-900/20 mb-6">
        <Link
          href="/visualise"
          className="inline-flex items-center gap-2 text-green-300 text-[10px] font-black uppercase tracking-widest mb-5 active:opacity-70"
        >
          <ArrowLeft size={12} strokeWidth={3} />
          Visualise
        </Link>
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none mb-1">
          {concept.name}
        </h1>
        {concept.detected_intent && (
          <p className="text-green-400 text-[10px] font-black uppercase tracking-widest">
            {concept.detected_intent}
          </p>
        )}
      </div>

      <div className="px-6 space-y-6">

        {/* ── Choose plant (preview-available only) ── */}
        {suggestedSpecies.length > 0 && (
          <section className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 px-1">
              Preview plant
            </p>
            {suggestedSpecies.map((species) => {
              const isSelected = selectedSpecies.includes(species.name)
              return (
                <button
                  key={species.name}
                  type="button"
                  onClick={() => toggleSpecies(species.name)}
                  className={`w-full text-left p-5 rounded-[2rem] border-2 transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'bg-green-900 border-green-800 text-white'
                      : 'bg-white border-gray-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-amber-400 border-amber-400'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      {isSelected && <Check size={11} strokeWidth={4} className="text-green-950" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-black uppercase tracking-tight leading-none mb-1.5 ${
                        isSelected ? 'text-white' : 'text-green-950'
                      }`}>
                        {species.name}
                      </p>
                      <p className={`text-[11px] font-medium leading-relaxed mb-2 ${
                        isSelected ? 'text-green-200' : 'text-gray-500'
                      }`}>
                        {species.description}
                      </p>
                      {species.notes && (
                        <p className={`text-[10px] italic leading-relaxed ${
                          isSelected ? 'text-green-300' : 'text-gray-400'
                        }`}>
                          {species.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </section>
        )}

        {/* ── Quick Preview (primary) ───────────────────────────────────────── */}
        {concept.original_photo_url && (
          <section className="space-y-4 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5">
            <div className="px-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-green-800">
                Quick Preview
              </p>
              <p className="text-[12px] text-gray-600 font-medium mt-1 leading-relaxed">
                Place a plant cut-out into your photo to test shape, scale, and position.
              </p>
            </div>

            {/* Photo canvas with draggable overlay */}
            <div
              ref={previewContainerRef}
              className="relative rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm bg-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={concept.original_photo_url}
                alt="Your garden"
                className="w-full h-auto block select-none pointer-events-none"
                draggable={false}
                onLoad={handleBgImageLoad}
              />

              {/* Plant overlay — only shown once container is measured */}
              {previewReady && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={overlayAsset.key}
                  src={overlayAsset.src}
                  alt={overlayAsset.key}
                  draggable={false}
                  style={{
                    position: 'absolute',
                    left: overlayPos.x,
                    top: overlayPos.y,
                    width: overlayWidth,
                    height: 'auto',
                    cursor: isDraggingOverlay ? 'grabbing' : 'grab',
                    userSelect: 'none',
                    touchAction: 'none',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.45))',
                    background: 'transparent',
                    zIndex: 10,
                  }}
                  onPointerDown={handleOverlayPointerDown}
                  onPointerMove={handleOverlayPointerMove}
                  onPointerUp={handleOverlayPointerUp}
                  onPointerCancel={handleOverlayPointerUp}
                />
              )}

              {/* Status bar */}
              {previewReady && (
                <div
                  className="absolute bottom-3 left-3 text-[10px] text-white/80 font-medium bg-black/40 rounded-full px-3 py-1 pointer-events-none"
                  style={{ zIndex: 20 }}
                >
                  {overlayAsset.key} · {overlayWidth}px · drag to move
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-3 px-1">
              {/* Size slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40">Size</p>
                  <p className="text-[9px] font-mono text-green-800/40">{overlayWidth}px</p>
                </div>
                <input
                  type="range"
                  min={30}
                  max={previewDims.w || 400}
                  value={overlayWidth}
                  onChange={(e) => setOverlayWidth(Number(e.target.value))}
                  className="w-full accent-green-700"
                />
              </div>

              {/* Save + Reset */}
              <div className="space-y-3">
                <button
                  onClick={handleSavePreview}
                  disabled={savingPreview}
                  className="w-full bg-green-900 text-white py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {savingPreview ? (
                    <Loader2 size={14} strokeWidth={3} className="animate-spin" />
                  ) : (
                    'Save Preview'
                  )}
                </button>
                <button
                  onClick={handleResetOverlay}
                  className="w-full bg-[#f0f4f1] border border-gray-100 text-green-800/60 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ── Disclaimer ── */}
        <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
            Visual ideas are for inspiration only. Plant spacing, mature size, and
            suitability should be confirmed before planting.
          </p>
        </div>

        {/* ── Pristine Gardens CTA ── */}
        <div className="bg-green-950 rounded-[2rem] p-6 text-center space-y-3 shadow-xl">
          <p className="text-[9px] font-black uppercase tracking-widest text-green-400">
            Professional help
          </p>
          <p className="text-white font-black text-[15px] leading-snug">
            Need help sourcing or planting this?
          </p>
          <p className="text-green-200/60 text-[11px] font-medium">
            Ask Pristine Gardens — Auckland's local planting specialists.
          </p>
          <a
            href="https://pristinegardens.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-400 text-green-950 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full shadow active:scale-95 transition-all"
          >
            Ask Pristine Gardens
            <ExternalLink size={11} strokeWidth={3} />
          </a>
        </div>

      </div>

      {showFuturePlantsModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 pb-8">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-xl space-y-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-green-800">
                Preview saved
              </p>
              {futurePlantsSaved ? (
                <p className="text-[13px] text-green-800 font-bold mt-2">
                  Saved to Future Plants
                </p>
              ) : (
                <>
                  <p className="text-[13px] text-gray-700 font-medium mt-2 leading-relaxed">
                    Would you like to save this plant to your Future Plants list?
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium mt-2">
                    Future Plants — plants you&apos;re considering
                  </p>
                </>
              )}
            </div>

            {addPlantsResult && !futurePlantsSaved && (
              <p className="text-[11px] text-red-600 font-medium">{addPlantsResult}</p>
            )}

            {!futurePlantsSaved ? (
              <div className="space-y-2">
                <button
                  onClick={handleSaveToFuturePlants}
                  disabled={addingPlants || selectedSpecies.length === 0}
                  className="w-full bg-green-900 text-white py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {addingPlants ? (
                    <Loader2 size={14} strokeWidth={3} className="animate-spin" />
                  ) : (
                    'Save to Future Plants'
                  )}
                </button>
                <button
                  onClick={() => setShowFuturePlantsModal(false)}
                  className="w-full bg-[#f0f4f1] text-green-800/60 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all"
                >
                  Not now
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowFuturePlantsModal(false)}
                className="w-full bg-green-900 text-white py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-all"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
