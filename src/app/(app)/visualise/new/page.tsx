'use client'

import { useState, useRef, useMemo, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabaseClient'
import { ArrowLeft, Upload, Loader2, Leaf } from 'lucide-react'
import Link from 'next/link'
import type { GardenArea } from '../../../../types/garden'

// Structured input options
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

type Step = 'form' | 'uploading' | 'suggesting'

function ChipSelector<T extends string>({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string
  options: readonly T[]
  value: T | null
  onChange: (v: T | null) => void
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(selected ? null : opt)}
              className={`text-[10px] font-black uppercase tracking-wide px-3.5 py-2 rounded-full border transition-all active:scale-95 ${
                selected
                  ? 'bg-green-900 text-white border-green-900'
                  : 'bg-white text-gray-500 border-gray-100 shadow-sm'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function NewVisualIdeaPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<Step>('form')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [plantingType, setPlantingType] = useState<typeof PLANTING_TYPES[number] | null>(null)
  const [placementArea, setPlacementArea] = useState<typeof PLACEMENT_OPTIONS[number] | null>(null)
  const [extraNotes, setExtraNotes] = useState('')
  const [gardenAreas, setGardenAreas] = useState<GardenArea[]>([])
  const [selectedAreaId, setSelectedAreaId] = useState<string>('')
  const [areasLoaded, setAreasLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pre-fill area from ?areaId= URL param (e.g. coming from Plan & Visualise)
  const areaIdParam = searchParams.get('areaId')

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
      setAreasLoaded(true)
      // Pre-select area from URL param
      if (areaIdParam && loaded.find((a) => a.id === areaIdParam)) {
        setSelectedAreaId(areaIdParam)
      }
    }
    loadAreas()
  }, [supabase, areaIdParam])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
    setError(null)
  }

  // Build goal text from structured inputs for suggestions + image prompt
  function buildGoalText(): string {
    const parts: string[] = []
    if (plantingType) parts.push(plantingType)
    if (placementArea) parts.push(`along/near: ${placementArea}`)
    if (extraNotes.trim()) parts.push(extraNotes.trim())
    return parts.join('. ')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!photo) { setError('Please select a photo of your garden.'); return }
    if (!name.trim()) { setError('Please enter a name for this space.'); return }
    if (!plantingType) { setError('Please choose what you want to add.'); return }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setError('You need to be logged in.'); return }

      // 1. Upload photo
      setStep('uploading')
      const ext = photo.name.split('.').pop() ?? 'jpg'
      const uploadPath = `visual-ideas/uploads/${user.id}-${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('weed-images')
        .upload(uploadPath, photo, { upsert: false })

      if (uploadError) throw new Error(`Photo upload failed: ${uploadError.message}`)

      const { data: { publicUrl } } = supabase.storage
        .from('weed-images')
        .getPublicUrl(uploadPath)

      const goalText = buildGoalText()

      // 2. Fetch plant suggestions using structured inputs
      setStep('suggesting')
      const suggestRes = await fetch('/api/visual-ideas/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goalText,
          plantingType,
          placementArea: placementArea ?? null,
        }),
      })

      if (!suggestRes.ok) throw new Error('Could not fetch suggestions. Please try again.')
      const suggestions = await suggestRes.json()

      // 3. Create the concept record
      const { data: concept, error: insertError } = await supabase
        .from('garden_visual_concepts')
        .insert({
          user_id:           user.id,
          name:              name.trim(),
          goal_text:         goalText,
          original_photo_url: publicUrl,
          garden_area_id:    selectedAreaId || null,
          detected_intent:   suggestions.detectedIntent,
          suggested_species: suggestions.suggestedSpecies,
          selected_species:  [],
          // Store planting type in the style column for use in image prompts
          style:             plantingType,
          status:            'draft',
        })
        .select()
        .single()

      if (insertError || !concept) throw new Error('Could not save concept. Please try again.')

      router.push(`/visualise/${concept.id}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStep('form')
    }
  }

  const isBusy = step !== 'form'

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40">
      {/* Header */}
      <div className="bg-green-900 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-xl shadow-green-900/20 mb-8">
        <Link
          href="/visualise"
          className="inline-flex items-center gap-2 text-green-300 text-[10px] font-black uppercase tracking-widest mb-5 active:opacity-70"
        >
          <ArrowLeft size={12} strokeWidth={3} />
          Visual Ideas
        </Link>
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none mb-2">
          New Visual Idea
        </h1>
        <p className="text-green-200/60 text-[11px] font-medium">
          Upload a photo, choose what to add, and we'll suggest plants.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 space-y-6">

        {/* Photo Upload */}
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
            Garden photo <span className="text-red-400">*</span>
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isBusy}
            className={`w-full rounded-[2rem] overflow-hidden border-2 border-dashed transition-all active:scale-[0.98] ${
              photoPreview
                ? 'border-green-200 bg-white'
                : 'border-gray-200 bg-white hover:border-green-300'
            } ${isBusy ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Selected garden photo"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  Tap to change
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center gap-3 text-gray-400">
                <div className="w-14 h-14 rounded-[1.25rem] bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <Upload size={22} className="text-gray-300" strokeWidth={2} />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-black uppercase tracking-tight text-gray-500">
                    Upload garden photo
                  </p>
                  <p className="text-[10px] text-gray-300 font-medium mt-0.5">
                    JPG, PNG, HEIC — the AI will edit this photo
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
        </div>

        {/* Space / Area Name */}
        <div>
          <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
            Name this idea <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='e.g. "Driveway border" or "Back fence hedge"'
            disabled={isBusy}
            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-300 shadow-sm transition-colors disabled:opacity-60"
          />
        </div>

        {/* What to add — planting type */}
        <ChipSelector
          label="What do you want to add?"
          options={PLANTING_TYPES}
          value={plantingType}
          onChange={setPlantingType}
          required
        />

        {/* Where — placement */}
        <ChipSelector
          label="Where?"
          options={PLACEMENT_OPTIONS}
          value={placementArea}
          onChange={setPlacementArea}
        />

        {/* Extra notes */}
        <div>
          <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
            Extra notes <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            value={extraNotes}
            onChange={(e) => setExtraNotes(e.target.value)}
            placeholder='e.g. "Prefer native species, about 2m tall, needs to block noise from road"'
            rows={3}
            disabled={isBusy}
            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-300 shadow-sm transition-colors resize-none disabled:opacity-60"
          />
        </div>

        {/* Link to garden space */}
        {areasLoaded && gardenAreas.length > 0 && (
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
              Link to garden space <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
            </label>
            <select
              value={selectedAreaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              disabled={isBusy}
              className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 outline-none focus:border-green-300 shadow-sm transition-colors disabled:opacity-60 appearance-none"
            >
              <option value="">No space selected</option>
              {gardenAreas.map((area) => (
                <option key={area.id} value={area.id}>{area.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
            <p className="text-[11px] text-red-600 font-bold">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isBusy}
          className="w-full bg-green-900 text-white py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {isBusy ? (
            <>
              <Loader2 size={16} strokeWidth={3} className="animate-spin" />
              {step === 'uploading' ? 'Uploading photo…' : 'Suggesting plants…'}
            </>
          ) : (
            <>
              <Leaf size={15} strokeWidth={3} />
              Suggest Plants
            </>
          )}
        </button>

        <p className="text-center text-[9px] text-gray-300 font-medium leading-relaxed pb-2">
          Visual ideas are for inspiration only. Plant spacing, mature size, and
          suitability should be confirmed before planting.
        </p>
      </form>
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
