'use client'

import { useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabaseClient'
import { ArrowLeft, Upload, Loader2, Leaf } from 'lucide-react'
import Link from 'next/link'
import type { GardenArea } from '../../../../types/garden'

type Step = 'form' | 'uploading' | 'suggesting'

export default function NewVisualIdeaPage() {
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<Step>('form')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [goalText, setGoalText] = useState('')
  const [gardenAreas, setGardenAreas] = useState<GardenArea[]>([])
  const [selectedAreaId, setSelectedAreaId] = useState<string>('')
  const [areasLoaded, setAreasLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useMemo(() => {
    async function loadAreas() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('garden_areas')
        .select('id, name')
        .eq('user_id', user.id)
        .order('name')
      setGardenAreas((data as GardenArea[]) ?? [])
      setAreasLoaded(true)
    }
    loadAreas()
  }, [supabase])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!photo) { setError('Please select a photo.'); return }
    if (!name.trim()) { setError('Please enter a name for this area.'); return }
    if (!goalText.trim()) { setError('Please describe your goal.'); return }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setError('You need to be logged in.'); return }

      // 1. Upload photo to Supabase storage
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

      // 2. Fetch suggestions
      setStep('suggesting')
      const suggestRes = await fetch('/api/visual-ideas/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalText }),
      })

      if (!suggestRes.ok) throw new Error('Could not fetch suggestions. Please try again.')
      const suggestions = await suggestRes.json()

      // 3. Create concept record in Supabase
      const { data: concept, error: insertError } = await supabase
        .from('garden_visual_concepts')
        .insert({
          user_id: user.id,
          name: name.trim(),
          goal_text: goalText.trim(),
          original_photo_url: publicUrl,
          garden_area_id: selectedAreaId || null,
          detected_intent: suggestions.detectedIntent,
          suggested_species: suggestions.suggestedSpecies,
          selected_species: [],
          status: 'draft',
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
          Upload a photo and describe what you want — we'll suggest plants.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 space-y-5">

        {/* Photo Upload */}
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
            Garden Photo
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
                    JPG, PNG, HEIC
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

        {/* Area Name */}
        <div>
          <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
            Area Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='e.g. "Driveway border" or "Back fence"'
            disabled={isBusy}
            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-300 shadow-sm transition-colors disabled:opacity-60"
          />
        </div>

        {/* Goal text */}
        <div>
          <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
            What do you want to achieve?
          </label>
          <textarea
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder='e.g. "I want a 2m hedge along this boundary for privacy"'
            rows={3}
            disabled={isBusy}
            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-300 shadow-sm transition-colors resize-none disabled:opacity-60"
          />
          <p className="text-[9px] text-gray-300 font-medium mt-1.5 px-1">
            Mention hedge, native, subtropical, colour, low maintenance, etc.
          </p>
        </div>

        {/* Garden area selector */}
        {areasLoaded && gardenAreas.length > 0 && (
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
              Link to Garden Area <span className="font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <select
              value={selectedAreaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              disabled={isBusy}
              className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 outline-none focus:border-green-300 shadow-sm transition-colors disabled:opacity-60 appearance-none"
            >
              <option value="">No area selected</option>
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
