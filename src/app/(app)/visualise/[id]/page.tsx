'use client'

import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabaseClient'
import Link from 'next/link'
import {
  ArrowLeft, ImageOff, Loader2, Check, Sparkles, Leaf, ExternalLink, MapPin,
} from 'lucide-react'
import type { VisualConcept, SuggestedSpecies } from '../../../../types/garden'
import {
  resolveOverlayAsset,
  type OverlayAsset,
} from '../../../../lib/visualIdeas/plantOverlayAssets'

const HEDGE_FORM_OPTIONS = [
  {
    value: 'full_coverage_from_ground',
    label: 'Full coverage from ground',
    description: 'Dense foliage right from soil level. Good for complete screening.',
  },
  {
    value: 'raised_or_pleached_screen',
    label: 'Raised / pleached screen',
    description: 'Foliage mainly above 50cm, with visible stems below. Lighter, more open look.',
  },
]

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
  const [hedgeForm,       setHedgeForm]       = useState<string>('')

  const [generating,      setGenerating]      = useState(false)
  const [saving,          setSaving]          = useState(false)
  const [addingPlants,    setAddingPlants]    = useState(false)

  const [generateError,   setGenerateError]   = useState<string | null>(null)
  const [addPlantsResult, setAddPlantsResult] = useState<string | null>(null)
  const [saveSuccess,     setSaveSuccess]     = useState(false)

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
  const [previewSaved,  setPreviewSaved]  = useState(false)

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
      setHedgeForm(c.hedge_form ?? '')
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
    setPreviewSaved(false)

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
      } : prev)
      setPreviewSaved(true)
      setTimeout(() => setPreviewSaved(false), 2500)
    }
    setSavingPreview(false)
  }

  // ── Hedge form visibility ─────────────────────────────────────────────────
  const showHedgeForm =
    concept?.detected_intent?.includes('hedge') ||
    (concept?.suggested_species as SuggestedSpecies[])?.some((s) =>
      ['Griselinia', 'Camellia', 'Titoki'].some((h) => s.name.includes(h))
    )

  // ── AI Blend: Edit Photo with Plants ────────────────────────────────────
  async function handleGenerateImage() {
    if (!concept) return
    setGenerateError(null)
    setGenerating(true)

    await supabase
      .from('garden_visual_concepts')
      .update({ selected_species: selectedSpecies, hedge_form: hedgeForm || null })
      .eq('id', concept.id)

    try {
      const res = await fetch('/api/visual-ideas/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conceptId:        concept.id,
          goalText:         concept.goal_text,
          detectedIntent:   concept.detected_intent,
          selectedSpecies,
          hedgeForm:        hedgeForm || null,
          originalPhotoUrl: concept.original_photo_url,
          placementPoint:   concept.placement_point ?? null,
          plantingType:     concept.style ?? null,
        }),
      })

      const json = await res.json()
      if (!res.ok) {
        setGenerateError(json.error || 'Image generation failed.')
        setConcept((prev) => prev
          ? { ...prev, status: 'error', error_message: json.error }
          : prev
        )
        return
      }

      setConcept((prev) => prev
        ? { ...prev, generated_image_url: json.imageUrl, status: 'complete', error_message: null }
        : prev
      )
    } catch {
      setGenerateError('Something went wrong. Please try again.')
      setConcept((prev) => prev ? { ...prev, status: 'error' } : prev)
    } finally {
      setGenerating(false)
    }
  }

  async function handleSave() {
    if (!concept) return
    setSaving(true)
    setSaveSuccess(false)
    const { error } = await supabase
      .from('garden_visual_concepts')
      .update({
        selected_species: selectedSpecies,
        hedge_form:       hedgeForm || null,
        updated_at:       new Date().toISOString(),
      })
      .eq('id', concept.id)

    if (!error) {
      setConcept((prev) => prev
        ? { ...prev, selected_species: selectedSpecies, hedge_form: hedgeForm || null }
        : prev
      )
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2500)
    }
    setSaving(false)
  }

  async function handleAddToGarden() {
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
      setAddPlantsResult(`Error: ${json.error}`)
    } else {
      const added    = json.results?.filter((r: { status: string }) => r.status === 'added').length ?? 0
      const existing = json.results?.filter((r: { status: string }) => r.status === 'already_planned').length ?? 0
      const nf       = json.notFound?.length ?? 0
      const parts    = []
      if (added    > 0) parts.push(`${added} saved as Future Plants`)
      if (existing > 0) parts.push(`${existing} already saved`)
      if (nf       > 0) parts.push(`${nf} not found in plant library`)
      setAddPlantsResult(parts.join(' · ') || 'Done.')
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
            Back to Visual Ideas
          </Link>
        </div>
      </div>
    )
  }

  const suggestedSpecies = (concept.suggested_species ?? []) as SuggestedSpecies[]
  const hasGenerated     = !!concept.generated_image_url

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40">

      {/* Header */}
      <div className="bg-green-900 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-xl shadow-green-900/20 mb-6">
        <Link
          href="/visualise"
          className="inline-flex items-center gap-2 text-green-300 text-[10px] font-black uppercase tracking-widest mb-5 active:opacity-70"
        >
          <ArrowLeft size={12} strokeWidth={3} />
          Saved Visual Ideas
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

        {/* ── Your photo (static) ── */}
        <section>
          <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 mb-2 px-1">
            Your photo
          </p>
          <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm relative">
            {concept.original_photo_url ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={concept.original_photo_url}
                  alt="Your garden"
                  className="w-full h-auto block"
                />
                {concept.placement_point && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: `${concept.placement_point.x * 100}%`,
                      top:  `${concept.placement_point.y * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-400 border-[3px] border-white shadow-xl flex items-center justify-center">
                      <MapPin size={13} strokeWidth={3} className="text-green-950" />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-44 flex items-center justify-center bg-gray-50">
                <ImageOff size={24} className="text-gray-300" />
              </div>
            )}
          </div>
          {concept.placement_point && (
            <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 px-1 mt-2 flex items-center gap-1.5">
              <MapPin size={9} strokeWidth={3} />
              Placement point selected
            </p>
          )}
        </section>

        {/* ── Choose plants ── */}
        {suggestedSpecies.length > 0 && (
          <section className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 px-1">
              Choose a plant to visualise — tap to select
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

        {/* ── Hedge form ── */}
        {showHedgeForm && (
          <section className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 px-1">
              Hedge form
            </p>
            <p className="text-[11px] text-gray-500 font-medium px-1 leading-relaxed">
              Coverage from the ground, or a raised/pleached screen with gaps underneath?
            </p>
            {HEDGE_FORM_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setHedgeForm((prev) => prev === opt.value ? '' : opt.value)}
                className={`w-full text-left p-5 rounded-[2rem] border-2 transition-all active:scale-[0.98] ${
                  hedgeForm === opt.value
                    ? 'bg-green-900 border-green-800'
                    : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      hedgeForm === opt.value
                        ? 'bg-amber-400 border-amber-400'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {hedgeForm === opt.value && <Check size={11} strokeWidth={4} className="text-green-950" />}
                  </div>
                  <div>
                    <p className={`text-[12px] font-black uppercase tracking-tight ${
                      hedgeForm === opt.value ? 'text-white' : 'text-green-950'
                    }`}>
                      {opt.label}
                    </p>
                    <p className={`text-[10px] font-medium mt-0.5 ${
                      hedgeForm === opt.value ? 'text-green-200' : 'text-gray-400'
                    }`}>
                      {opt.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </section>
        )}

        {/* ── Quick Preview ─────────────────────────────────────────────────── */}
        {concept.original_photo_url && (
          <section className="space-y-4">
            <div className="px-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40">
                Quick Preview
              </p>
              <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed">
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

              {/* Reset + Save */}
              <div className="flex gap-3">
                <button
                  onClick={handleResetOverlay}
                  className="flex-1 bg-white border border-gray-100 text-green-800/60 py-3.5 rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest shadow-sm active:scale-[0.98] transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={handleSavePreview}
                  disabled={savingPreview}
                  className="flex-1 bg-green-900 text-white py-3.5 rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest shadow-sm active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {savingPreview ? (
                    <Loader2 size={12} strokeWidth={3} className="animate-spin" />
                  ) : previewSaved ? (
                    <><Check size={12} strokeWidth={3} /> Saved</>
                  ) : (
                    'Save Preview'
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ── AI Blend — experimental ────────────────────────────────────────── */}
        <section className="space-y-3">

          <div className="bg-green-50 border border-green-100 rounded-[1.5rem] px-5 py-4 flex items-start gap-3">
            <Sparkles size={14} className="text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-green-700 mb-0.5">
                AI Blend — experimental
              </p>
              <p className="text-[11px] text-green-800/70 font-medium leading-relaxed">
                AI tries to merge the plant into your photo. Quick Preview above is more
                reliable for checking plant shape and scale.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateImage}
            disabled={generating || concept.status === 'generating' || selectedSpecies.length === 0}
            className="w-full bg-green-900 text-white py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {generating || concept.status === 'generating' ? (
              <>
                <Loader2 size={16} strokeWidth={3} className="animate-spin" />
                Blending…
              </>
            ) : (
              <>
                <Sparkles size={15} strokeWidth={2.5} />
                {hasGenerated ? 'Re-run AI Blend' : 'AI Blend — edit photo with AI'}
              </>
            )}
          </button>

          {selectedSpecies.length === 0 && !generating && (
            <p className="text-center text-[10px] text-gray-400 font-medium">
              Select a plant above to run AI Blend.
            </p>
          )}

          {(generateError || concept.error_message) && (
            <div className="bg-amber-50 border border-amber-100 rounded-[1.5rem] p-5 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                AI Blend error
              </p>
              <p className="text-[12px] text-amber-800 font-medium leading-relaxed">
                {generateError || concept.error_message}
              </p>
              {(generateError || concept.error_message || '').includes('not configured') && (
                <p className="text-[10px] text-amber-600 italic">
                  Add OPENAI_API_KEY to your environment to enable AI Blend.
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-white border border-gray-100 text-green-800/60 py-3.5 rounded-[2rem] text-[9px] font-black uppercase tracking-widest shadow-sm active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? (
              <Loader2 size={12} strokeWidth={3} className="animate-spin" />
            ) : saveSuccess ? (
              <>
                <Check size={12} strokeWidth={3} className="text-green-600" />
                Saved
              </>
            ) : (
              'Save plant selections'
            )}
          </button>
        </section>

        {/* ── AI Blend result ── */}
        {concept.generated_image_url && (
          <section className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 px-1">
              ✨ AI Blend result
            </p>
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={concept.generated_image_url}
                alt="AI Blend concept"
                className="w-full object-cover"
              />
            </div>

            {concept.original_photo_url && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={concept.original_photo_url}
                    alt="Before"
                    className="w-full h-32 object-cover"
                  />
                  <p className="text-center text-[9px] font-black uppercase tracking-widest text-gray-400 py-2">
                    Before
                  </p>
                </div>
                <div className="bg-white rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={concept.generated_image_url}
                    alt="AI Blend"
                    className="w-full h-32 object-cover"
                  />
                  <p className="text-center text-[9px] font-black uppercase tracking-widest text-green-700 py-2">
                    AI Blend
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ── Save as Future Plants ── */}
        {selectedSpecies.length > 0 && (
          <section className="space-y-3">
            <button
              onClick={handleAddToGarden}
              disabled={addingPlants}
              className="w-full bg-amber-400 text-green-950 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {addingPlants ? (
                <Loader2 size={16} strokeWidth={3} className="animate-spin" />
              ) : (
                <>
                  <Leaf size={15} strokeWidth={3} />
                  Save selected plants as Future Plants
                </>
              )}
            </button>

            {addPlantsResult && (
              <div className="bg-green-50 border border-green-100 rounded-[1.5rem] px-5 py-4">
                <p className="text-[11px] text-green-800 font-bold text-center leading-relaxed">
                  {addPlantsResult}
                </p>
              </div>
            )}
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
    </main>
  )
}
