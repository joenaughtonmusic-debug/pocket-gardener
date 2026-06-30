'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../app/lib/supabaseClient'
import { Upload, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { GardenArea } from '../../types/garden'
import { trackEvent } from '../../lib/analytics/trackEvent'

interface CreateVisualIdeaFormProps {
  initialAreaId?: string | null
}

export default function CreateVisualIdeaForm({ initialAreaId = null }: CreateVisualIdeaFormProps) {
  const router       = useRouter()
  const supabase     = useMemo(() => createSupabaseBrowserClient(), [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [photo,          setPhoto]          = useState<File | null>(null)
  const [photoPreview,   setPhotoPreview]   = useState<string | null>(null)
  const [conceptName,    setConceptName]    = useState('')
  const [selectedAreaId, setSelectedAreaId] = useState(initialAreaId ?? '')
  const [gardenAreas,    setGardenAreas]    = useState<GardenArea[]>([])

  const [submitting, setSubmitting] = useState(false)
  const [submitStep, setSubmitStep] = useState<'idle' | 'uploading' | 'saving'>('idle')
  const [error,      setError]      = useState<string | null>(null)

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
      if (initialAreaId && loaded.find((a) => a.id === initialAreaId)) {
        setSelectedAreaId(initialAreaId)
      }
    }
    loadAreas()
  }, [supabase, initialAreaId])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
    setError(null)
  }

  async function handleCreate() {
    setError(null)
    if (!photo) { setError('Upload a photo of your garden to continue.'); return }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setError('You need to be logged in.'); return }

      setSubmitting(true)
      setSubmitStep('uploading')

      const ext = photo.name.split('.').pop() ?? 'jpg'
      const uploadPath = `visual-ideas/uploads/${user.id}/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('weed-images')
        .upload(uploadPath, photo, { upsert: false })
      if (uploadError) throw new Error(`Photo upload failed: ${uploadError.message}`)

      const { data: { publicUrl } } = supabase.storage
        .from('weed-images')
        .getPublicUrl(uploadPath)

      setSubmitStep('saving')

      const name = conceptName.trim() || 'Garden preview'

      const { data: concept, error: insertError } = await supabase
        .from('garden_visual_concepts')
        .insert({
          user_id:            user.id,
          name,
          goal_text:          null,
          original_photo_url: publicUrl,
          garden_area_id:     selectedAreaId || null,
          detected_intent:    null,
          suggested_species:  [],
          selected_species:   [],
          style:              null,
          status:             'draft',
          placement_point:    null,
          preview_mode:       null,
        })
        .select()
        .single()

      if (insertError || !concept) throw new Error('Could not save concept. Please try again.')

      trackEvent('visualise_created', { route: '/visualise' })
      router.push(`/visualise/${concept.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
      setSubmitStep('idle')
    }
  }

  const canCreate = !!photo && !submitting

  return (
    <div className="space-y-8">
      <section>
        <p className="text-[10px] font-black uppercase tracking-widest text-green-900 mb-3 px-1">
          Upload your garden photo
        </p>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  JPG · PNG · HEIC
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

      <section>
        <div className="mb-3 px-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-green-900">
            Name this idea <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
          </p>
        </div>
        <input
          type="text"
          value={conceptName}
          onChange={(e) => setConceptName(e.target.value)}
          placeholder="e.g. Front garden preview"
          disabled={submitting}
          className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-300 shadow-sm transition-colors disabled:opacity-60"
        />
      </section>

      {gardenAreas.length > 0 && (
        <details className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between gap-3 active:bg-gray-50">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              More options
            </span>
            <span className="text-[10px] text-gray-300 font-medium group-open:hidden">Show</span>
            <span className="text-[10px] text-gray-300 font-medium hidden group-open:inline">Hide</span>
          </summary>

          <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
                Link to a garden area <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
              </label>
              <select
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                disabled={submitting}
                className="w-full bg-[#f0f4f1] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-green-300 transition-colors disabled:opacity-60 appearance-none"
              >
                <option value="">No area selected</option>
                {gardenAreas.map((area) => (
                  <option key={area.id} value={area.id}>{area.name}</option>
                ))}
              </select>
            </div>

            <p className="text-center text-[10px] text-gray-400 font-medium">
              <Link href="/match" className="text-green-700 font-black uppercase tracking-widest active:opacity-70">
                Open full plant finder
              </Link>
            </p>
          </div>
        </details>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
          <p className="text-[11px] text-red-600 font-bold">{error}</p>
        </div>
      )}

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

        {!submitting && (
          <p className="text-center text-[10px] text-gray-400 font-medium leading-relaxed px-4">
            {photo
              ? 'Start with a garden photo. You’ll add plants on the next screen.'
              : 'Upload a photo to continue.'}
          </p>
        )}
      </div>
    </div>
  )
}
