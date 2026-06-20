'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabaseClient'
import Link from 'next/link'
import {
  ArrowLeft, ImageOff, Loader2, Check, Sparkles, Leaf, ExternalLink, MapPin,
} from 'lucide-react'
import type { VisualConcept, SuggestedSpecies } from '../../../../types/garden'

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

  const showHedgeForm =
    concept?.detected_intent?.includes('hedge') ||
    (concept?.suggested_species as SuggestedSpecies[])?.some((s) =>
      ['Griselinia', 'Camellia', 'Titoki'].some((h) => s.name.includes(h))
    )

  async function handleGenerateImage() {
    if (!concept) return
    setGenerateError(null)
    setGenerating(true)

    // Auto-save selections before generating
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
      const added    = json.results?.filter((r: any) => r.status === 'added').length ?? 0
      const existing = json.results?.filter((r: any) => r.status === 'already_planned').length ?? 0
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

        {/* Original photo with optional placement marker */}
        <section>
          <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 mb-2 px-1">
            Your photo
          </p>
          <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm relative">
            {concept.original_photo_url ? (
              <>
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

        {/* Photo editing info */}
        <div className="bg-green-50 border border-green-100 rounded-[1.5rem] px-5 py-4 flex items-start gap-3">
          <Sparkles size={14} className="text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-green-700 mb-0.5">
              Photo editing mode
            </p>
            <p className="text-[11px] text-green-800/70 font-medium leading-relaxed">
              Your original photo is sent to AI — it edits the image to add the selected
              planting. Existing trees, paths, and structures are preserved.
            </p>
          </div>
        </div>

        {/* Choose plants to visualise */}
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

        {/* Hedge form selector */}
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

        {/* ── Primary CTA: Edit Photo with Plants ────────────────────────── */}
        <section className="space-y-3">
          <button
            onClick={handleGenerateImage}
            disabled={generating || concept.status === 'generating' || selectedSpecies.length === 0}
            className="w-full bg-green-900 text-white py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {generating || concept.status === 'generating' ? (
              <>
                <Loader2 size={16} strokeWidth={3} className="animate-spin" />
                Editing your photo…
              </>
            ) : (
              <>
                <Sparkles size={15} strokeWidth={2.5} />
                {hasGenerated ? 'Re-edit Photo with Plants' : 'Edit Photo with Plants'}
              </>
            )}
          </button>

          {selectedSpecies.length === 0 && !generating && (
            <p className="text-center text-[10px] text-gray-400 font-medium">
              Select a plant above to edit the photo.
            </p>
          )}

          {/* Error state */}
          {(generateError || concept.error_message) && (
            <div className="bg-amber-50 border border-amber-100 rounded-[1.5rem] p-5 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                Photo editing
              </p>
              <p className="text-[12px] text-amber-800 font-medium leading-relaxed">
                {generateError || concept.error_message}
              </p>
              {(generateError || concept.error_message || '').includes('not configured') && (
                <p className="text-[10px] text-amber-600 italic">
                  Add OPENAI_API_KEY to your environment to enable AI photo editing.
                </p>
              )}
            </div>
          )}

          {/* Secondary: Save selections */}
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
              'Save selections without editing'
            )}
          </button>
        </section>

        {/* Generated image */}
        {concept.generated_image_url && (
          <section className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 px-1">
              ✨ Your visual concept
            </p>
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={concept.generated_image_url}
                alt="Generated garden concept"
                className="w-full object-cover"
              />
            </div>

            {/* Before / After */}
            {concept.original_photo_url && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-sm">
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
                  <img
                    src={concept.generated_image_url}
                    alt="Concept"
                    className="w-full h-32 object-cover"
                  />
                  <p className="text-center text-[9px] font-black uppercase tracking-widest text-green-700 py-2">
                    Concept
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Save as Future Plants (planned plants) */}
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

        {/* Disclaimer */}
        <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
            Visual ideas are for inspiration only. Plant spacing, mature size, and
            suitability should be confirmed before planting.
          </p>
        </div>

        {/* Pristine Gardens CTA */}
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
