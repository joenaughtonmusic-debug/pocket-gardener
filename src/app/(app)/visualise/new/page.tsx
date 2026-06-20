'use client'

import { useState, useRef, useMemo, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabaseClient'
import { ArrowLeft, Upload, Loader2, Sparkles, Check } from 'lucide-react'
import Link from 'next/link'
import type { GardenArea } from '../../../../types/garden'
import {
  suggestPlants,
  type SuggestedSpecies,
} from '../../../../lib/visualIdeas/suggestPlants'

// ─── Options ──────────────────────────────────────────────────────────────────
const PLANTING_TYPES = [
  'Hedge',
  'Screening',
  'Border planting',
  'Feature tree',
  'Shrubs',
  'Groundcovers',
] as const

const PLACEMENT_OPTIONS = [
  'Left boundary',
  'Right boundary',
  'Along fence',
  'Along path',
  'Around existing tree',
  'Around deck',
  'Front entrance',
  'Other',
] as const

type PlantingType  = typeof PLANTING_TYPES[number]
type PlacementOption = typeof PLACEMENT_OPTIONS[number]

function buildAutoName(type: PlantingType | null, place: PlacementOption | null): string {
  if (!type) return ''
  return place ? `${type} — ${place}` : type
}

// ─── Wizard page ──────────────────────────────────────────────────────────────
function NewVisualIdeaPageInner() {
  const router      = useRouter()
  const searchParams = useSearchParams()
  const supabase    = useMemo(() => createSupabaseBrowserClient(), [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Core form state
  const [photo,          setPhoto]          = useState<File | null>(null)
  const [photoPreview,   setPhotoPreview]   = useState<string | null>(null)
  const [plantingType,   setPlantingType]   = useState<PlantingType | null>(null)
  const [placementArea,  setPlacementArea]  = useState<PlacementOption | null>(null)
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)

  // Suggestions — computed client-side (no network call)
  const [suggestions,    setSuggestions]    = useState<SuggestedSpecies[]>([])
  const [detectedIntent, setDetectedIntent] = useState('')

  // Optional / advanced
  const [conceptName,   setConceptName]   = useState('')
  const [extraNotes,    setExtraNotes]    = useState('')
  const [selectedAreaId, setSelectedAreaId] = useState('')
  const [gardenAreas,   setGardenAreas]   = useState<GardenArea[]>([])

  // Submission
  const [submitting,  setSubmitting]  = useState(false)
  const [submitStep,  setSubmitStep]  = useState<'idle' | 'uploading' | 'saving'>('idle')
  const [error,       setError]       = useState<string | null>(null)

  const areaIdParam = searchParams.get('areaId')

  // ── Load garden areas (for optional link) ─────────────────────────────────
  useEffect(() => {
    async function loadAreas() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('garden_areas')
        .select('id, name')
        .eq('user_id', user.id)
        .order('name')
      const loaded = (data as GardenArea[]) ?? []
      setGardenAreas(loaded)
      if (areaIdParam && loaded.find((a) => a.id === areaIdParam)) {
        setSelectedAreaId(areaIdParam)
      }
    }
    loadAreas()
  }, [supabase, areaIdParam])

  // ── Auto-compute suggestions whenever planting type or placement changes ──
  useEffect(() => {
    if (!plantingType) {
      setSuggestions([])
      setSelectedSpecies(null)
      setDetectedIntent('')
      return
    }
    const result = suggestPlants('', plantingType, placementArea ?? null)
    setSuggestions(result.suggestedSpecies)
    setDetectedIntent(result.detectedIntent)
    // Auto-select first species
    setSelectedSpecies(result.suggestedSpecies[0]?.name ?? null)
    // Auto-generate name (only if user hasn't manually edited it)
    setConceptName((prev) => {
      const auto = buildAutoName(plantingType, placementArea)
      // If prev matches any auto-generated pattern, overwrite; else leave user's value
      const prevIsAuto = PLANTING_TYPES.some((t) =>
        prev === t || PLACEMENT_OPTIONS.some((p) => prev === `${t} — ${p}`)
      )
      return prevIsAuto || prev === '' ? auto : prev
    })
  }, [plantingType, placementArea])

  // ── Photo selection ───────────────────────────────────────────────────────
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
    setError(null)
  }

  // ── Create the concept ────────────────────────────────────────────────────
  async function handleCreate() {
    setError(null)
    if (!photo)          { setError('Upload a photo of your garden to continue.'); return }
    if (!plantingType)   { setError('Choose what you want to add.'); return }
    if (!selectedSpecies){ setError('Select a plant to visualise.'); return }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setError('You need to be logged in.'); return }

      setSubmitting(true)
      setSubmitStep('uploading')

      // Upload photo
      const ext = photo.name.split('.').pop() ?? 'jpg'
      const uploadPath = `visual-ideas/uploads/${user.id}-${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('weed-images')
        .upload(uploadPath, photo, { upsert: false })
      if (uploadError) throw new Error(`Photo upload failed: ${uploadError.message}`)
      const { data: { publicUrl } } = supabase.storage
        .from('weed-images')
        .getPublicUrl(uploadPath)

      // Build goal text
      const parts: string[] = [plantingType]
      if (placementArea)    parts.push(`along/near: ${placementArea}`)
      if (extraNotes.trim()) parts.push(extraNotes.trim())
      const goalText = parts.join('. ')

      setSubmitStep('saving')

      const name = conceptName.trim() || buildAutoName(plantingType, placementArea) || plantingType

      const { data: concept, error: insertError } = await supabase
        .from('garden_visual_concepts')
        .insert({
          user_id:            user.id,
          name,
          goal_text:          goalText,
          original_photo_url: publicUrl,
          garden_area_id:     selectedAreaId || null,
          detected_intent:    detectedIntent,
          suggested_species:  suggestions,
          selected_species:   [selectedSpecies],
          style:              plantingType,
          status:             'draft',
        })
        .select()
        .single()

      if (insertError || !concept) throw new Error('Could not save concept. Please try again.')

      router.push(`/visualise/${concept.id}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
      setSubmitStep('idle')
    }
  }

  const canCreate = !!photo && !!plantingType && !!selectedSpecies && !submitting

  // ── Helper to render step number ──────────────────────────────────────────
  function StepBadge({ n, active }: { n: number; active?: boolean }) {
    return (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
        active ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-400'
      }`}>
        {n}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40">

      {/* Header */}
      <div className="bg-green-900 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-xl shadow-green-900/20 mb-6">
        <Link
          href="/visualise"
          className="inline-flex items-center gap-2 text-green-300 text-[10px] font-black uppercase tracking-widest mb-5 active:opacity-70"
        >
          <ArrowLeft size={12} strokeWidth={3} />
          Visual Ideas
        </Link>
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none mb-2">
          Create a Visual Idea
        </h1>
        <p className="text-green-200/60 text-[11px] font-medium">
          Upload a photo · choose what to add · pick a plant · see how it could look.
        </p>
      </div>

      <div className="px-6 space-y-8">

        {/* ── Walkthrough card ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 space-y-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40">
              How it works
            </p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { n: 1, label: 'Upload photo' },
                { n: 2, label: 'What to add' },
                { n: 3, label: 'Pick a plant' },
                { n: 4, label: 'See it in your garden' },
              ].map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                    {s.n}
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-tight text-gray-400 leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 border-t border-gray-100 px-5 py-3">
            <p className="text-[9px] text-gray-400 font-medium leading-relaxed">
              Visual ideas are for inspiration only. Confirm plant suitability, mature size,
              and spacing before planting.
            </p>
          </div>
        </div>

        {/* ── Step 1: Upload photo ─────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <StepBadge n={1} active />
            <p className="text-[10px] font-black uppercase tracking-widest text-green-900">
              Upload your garden photo
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={submitting}
            className={`w-full rounded-[2rem] overflow-hidden border-2 border-dashed transition-all active:scale-[0.98] ${
              photoPreview
                ? 'border-green-200 bg-white'
                : 'border-gray-200 bg-white hover:border-green-300'
            } ${submitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Your garden"
                  className="w-full h-52 object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  Tap to change
                </div>
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center gap-3 text-gray-400">
                <div className="w-12 h-12 rounded-[1.25rem] bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <Upload size={20} className="text-gray-300" strokeWidth={2} />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-black uppercase tracking-tight text-gray-500">
                    Upload garden photo
                  </p>
                  <p className="text-[10px] text-gray-300 font-medium mt-0.5">
                    JPG · PNG · HEIC — the AI edits this photo directly
                  </p>
                </div>
              </div>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </section>

        {/* ── Step 2: What to add ──────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <StepBadge n={2} active />
            <p className="text-[10px] font-black uppercase tracking-widest text-green-900">
              What would you like to add?
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PLANTING_TYPES.map((type) => {
              const selected = plantingType === type
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPlantingType(selected ? null : type)}
                  disabled={submitting}
                  className={`text-[10px] font-black uppercase tracking-wide px-4 py-2.5 rounded-full border transition-all active:scale-95 ${
                    selected
                      ? 'bg-green-900 text-white border-green-900'
                      : 'bg-white text-gray-500 border-gray-100 shadow-sm'
                  }`}
                >
                  {type}
                </button>
              )
            })}
          </div>
        </section>

        {/* ── Step 3: Where (shown after step 2 chosen) ────────────────────── */}
        {plantingType && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <StepBadge n={3} active />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-green-900">
                  Where should it go?
                </p>
                <p className="text-[9px] text-gray-300 font-medium mt-0.5">
                  Optional — helps us suggest the right plants
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {PLACEMENT_OPTIONS.map((place) => {
                const selected = placementArea === place
                return (
                  <button
                    key={place}
                    type="button"
                    onClick={() => setPlacementArea(selected ? null : place)}
                    disabled={submitting}
                    className={`text-[10px] font-black uppercase tracking-wide px-3.5 py-2 rounded-full border transition-all active:scale-95 ${
                      selected
                        ? 'bg-green-800 text-white border-green-800'
                        : 'bg-white text-gray-500 border-gray-100 shadow-sm'
                    }`}
                  >
                    {place}
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Step 3 → 4 bridge: Choose a plant ───────────────────────────── */}
        {suggestions.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <StepBadge n={4} active />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-green-900">
                  Choose a plant to visualise
                </p>
                <p className="text-[9px] text-gray-300 font-medium mt-0.5">
                  The first one is pre-selected — tap another to change
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {suggestions.map((species) => {
                const isSelected = selectedSpecies === species.name
                return (
                  <button
                    key={species.name}
                    type="button"
                    onClick={() => setSelectedSpecies(isSelected ? null : species.name)}
                    disabled={submitting}
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
                        <p className={`text-[11px] font-medium leading-relaxed ${
                          isSelected ? 'text-green-200' : 'text-gray-500'
                        }`}>
                          {species.description}
                        </p>
                        {species.notes && (
                          <p className={`text-[10px] italic leading-relaxed mt-1.5 ${
                            isSelected ? 'text-green-300' : 'text-gray-400'
                          }`}>
                            {species.notes}
                          </p>
                        )}
                        {isSelected && (
                          <span className="inline-flex items-center gap-1.5 mt-3 text-[8px] font-black uppercase tracking-widest text-green-950 bg-amber-400 px-3 py-1 rounded-full">
                            <Check size={8} strokeWidth={4} />
                            Using this plant
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {/* ── More options (collapsed, secondary) ──────────────────────────── */}
        {plantingType && (
          <details className="group">
            <summary className="list-none flex items-center gap-3 cursor-pointer select-none active:opacity-70">
              <div className="h-px bg-gray-100 flex-1" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 group-open:text-gray-400 whitespace-nowrap">
                More options
              </span>
              <div className="h-px bg-gray-100 flex-1" />
            </summary>

            <div className="pt-5 space-y-5">
              {/* Concept name */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
                  Name this idea
                </label>
                <input
                  type="text"
                  value={conceptName}
                  onChange={(e) => setConceptName(e.target.value)}
                  placeholder={buildAutoName(plantingType, placementArea) || 'e.g. Front boundary hedge'}
                  disabled={submitting}
                  className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-300 shadow-sm transition-colors disabled:opacity-60"
                />
              </div>

              {/* Extra notes */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
                  Extra notes{' '}
                  <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  value={extraNotes}
                  onChange={(e) => setExtraNotes(e.target.value)}
                  placeholder='e.g. "About 2m tall, needs to block road noise, prefer native"'
                  rows={3}
                  disabled={submitting}
                  className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-300 shadow-sm transition-colors resize-none disabled:opacity-60"
                />
              </div>

              {/* Garden space link */}
              {gardenAreas.length > 0 && (
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
                    Optional: link to a garden space
                  </label>
                  <select
                    value={selectedAreaId}
                    onChange={(e) => setSelectedAreaId(e.target.value)}
                    disabled={submitting}
                    className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 outline-none focus:border-green-300 shadow-sm transition-colors disabled:opacity-60 appearance-none"
                  >
                    <option value="">No space selected</option>
                    {gardenAreas.map((area) => (
                      <option key={area.id} value={area.id}>{area.name}</option>
                    ))}
                  </select>
                  <p className="text-[9px] text-gray-300 font-medium mt-1.5 px-1">
                    Links this idea to a garden space in Plan & Visualise.
                  </p>
                </div>
              )}
            </div>
          </details>
        )}

        {/* ── Error ────────────────────────────────────────────────────────── */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
            <p className="text-[11px] text-red-600 font-bold">{error}</p>
          </div>
        )}

        {/* ── Create Visual Idea — main CTA ─────────────────────────────────── */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleCreate}
            disabled={!canCreate}
            className="w-full bg-green-900 text-white py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all disabled:opacity-40 flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <Loader2 size={16} strokeWidth={3} className="animate-spin" />
                {submitStep === 'uploading' ? 'Uploading photo…' : 'Creating your idea…'}
              </>
            ) : (
              <>
                <Sparkles size={15} strokeWidth={2.5} />
                Create Visual Idea
              </>
            )}
          </button>

          {/* Contextual progress hint */}
          {!submitting && (
            <p className="text-center text-[9px] text-gray-300 font-medium">
              {!photo
                ? 'Upload a photo above to continue.'
                : !plantingType
                ? 'Choose what to add above.'
                : !selectedSpecies
                ? 'Select a plant above.'
                : `${selectedSpecies} · ${plantingType}${placementArea ? ` · ${placementArea}` : ''}`}
            </p>
          )}
        </div>

      </div>
    </main>
  )
}

export default function NewVisualIdeaPage() {
  return (
    <Suspense>
      <NewVisualIdeaPageInner />
    </Suspense>
  )
}
