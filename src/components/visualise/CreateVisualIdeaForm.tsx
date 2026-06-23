'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../app/lib/supabaseClient'
import { Upload, Loader2, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { GardenArea } from '../../types/garden'
import {
  PREVIEW_PLANT_OPTIONS,
  GARDEN_STYLE_FILTERS,
  PLANT_TYPE_FILTERS,
  createVisualPlantSuggestions,
  filterVisualPlantOptions,
  getCreateVisualPlantOption,
  type GardenStyleFilter,
  type PlantTypeFilter,
  type SpotConditions,
} from '../../lib/visualIdeas/plantOverlayAssets'

interface CreateVisualIdeaFormProps {
  initialAreaId?: string | null
}

const DEFAULT_SPOT: SpotConditions = {
  sun: 'not sure',
  moisture: 'not sure',
  drainage: 'not sure',
  wind: 'not sure',
}

function FilterChip({
  label,
  selected,
  onClick,
  disabled,
}: {
  label: string
  selected: boolean
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`text-[10px] font-black uppercase tracking-wide px-3.5 py-2 rounded-full border transition-all active:scale-95 ${
        selected
          ? 'bg-green-900 text-white border-green-900'
          : 'bg-white text-gray-500 border-gray-100 shadow-sm'
      } ${disabled ? 'opacity-60' : ''}`}
    >
      {label}
    </button>
  )
}

export default function CreateVisualIdeaForm({ initialAreaId = null }: CreateVisualIdeaFormProps) {
  const router       = useRouter()
  const supabase     = useMemo(() => createSupabaseBrowserClient(), [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [photo,           setPhoto]           = useState<File | null>(null)
  const [photoPreview,    setPhotoPreview]    = useState<string | null>(null)
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)
  const [conceptName,     setConceptName]     = useState('')
  const [selectedAreaId,  setSelectedAreaId]  = useState(initialAreaId ?? '')
  const [gardenAreas,     setGardenAreas]     = useState<GardenArea[]>([])

  const [gardenStyleFilter, setGardenStyleFilter] = useState<GardenStyleFilter | 'Any'>('Any')
  const [plantTypeFilter,   setPlantTypeFilter]   = useState<PlantTypeFilter | 'Any'>('Any')
  const [spotConditions,    setSpotConditions]    = useState<SpotConditions>(DEFAULT_SPOT)

  const [submitting, setSubmitting] = useState(false)
  const [submitStep, setSubmitStep] = useState<'idle' | 'uploading' | 'saving'>('idle')
  const [error,      setError]      = useState<string | null>(null)

  const filteredPlants = useMemo(
    () => filterVisualPlantOptions(
      PREVIEW_PLANT_OPTIONS,
      gardenStyleFilter,
      plantTypeFilter,
      spotConditions,
    ),
    [gardenStyleFilter, plantTypeFilter, spotConditions],
  )

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

  useEffect(() => {
    if (selectedSpecies && !filteredPlants.some((p) => p.name === selectedSpecies)) {
      setSelectedSpecies(null)
    }
  }, [filteredPlants, selectedSpecies])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
    setError(null)
  }

  function handleSelectPlant(name: string) {
    setSelectedSpecies((prev) => (prev === name ? null : name))
    setConceptName((prev) => {
      if (prev.trim() === '' || PREVIEW_PLANT_OPTIONS.some((p) => prev === p.name || prev === `${p.name} preview`)) {
        return `${name} preview`
      }
      return prev
    })
  }

  async function handleCreate() {
    setError(null)
    if (!photo)           { setError('Upload a photo of your garden to continue.'); return }
    if (!selectedSpecies) { setError('Choose a plant to preview.'); return }

    const plantOption = getCreateVisualPlantOption(selectedSpecies)
    if (!plantOption) { setError('Choose a plant to preview.'); return }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setError('You need to be logged in.'); return }

      setSubmitting(true)
      setSubmitStep('uploading')

      const ext = photo.name.split('.').pop() ?? 'jpg'
      const uploadPath = `visual-ideas/uploads/${user.id}-${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('weed-images')
        .upload(uploadPath, photo, { upsert: false })
      if (uploadError) throw new Error(`Photo upload failed: ${uploadError.message}`)

      const { data: { publicUrl } } = supabase.storage
        .from('weed-images')
        .getPublicUrl(uploadPath)

      setSubmitStep('saving')

      const name = conceptName.trim() || `${selectedSpecies} preview`

      const { data: concept, error: insertError } = await supabase
        .from('garden_visual_concepts')
        .insert({
          user_id:            user.id,
          name,
          goal_text:          `Preview ${selectedSpecies} in garden photo`,
          original_photo_url: publicUrl,
          garden_area_id:     selectedAreaId || null,
          detected_intent:    plantOption.detectedIntent,
          suggested_species:  createVisualPlantSuggestions(),
          selected_species:   [selectedSpecies],
          style:              plantOption.style,
          status:             'draft',
          placement_point:    null,
          preview_mode:       null,
        })
        .select()
        .single()

      if (insertError || !concept) throw new Error('Could not save concept. Please try again.')

      router.push(`/visualise/${concept.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
      setSubmitStep('idle')
    }
  }

  const canCreate = !!photo && !!selectedSpecies && !submitting
  const filtersActive =
    gardenStyleFilter !== 'Any' ||
    plantTypeFilter !== 'Any' ||
    spotConditions.sun !== 'not sure' ||
    spotConditions.moisture !== 'not sure' ||
    spotConditions.drainage !== 'not sure' ||
    spotConditions.wind !== 'not sure'

  return (
    <div className="space-y-8">
      <section>
        <p className="text-[10px] font-black uppercase tracking-widest text-green-900 mb-3 px-1">
          1 · Upload your garden photo
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

      <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5 space-y-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-green-900">
            Find plants for your spot
          </p>
          <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed">
            Optional: add garden conditions to filter the preview plants.
          </p>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 mb-2 px-1">
            Style
          </p>
          <div className="flex flex-wrap gap-2">
            {GARDEN_STYLE_FILTERS.map((style) => (
              <FilterChip
                key={style}
                label={style}
                selected={gardenStyleFilter === style}
                onClick={() => setGardenStyleFilter(style)}
                disabled={submitting}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 mb-2 px-1">
            Plant type
          </p>
          <div className="flex flex-wrap gap-2">
            {PLANT_TYPE_FILTERS.map((type) => (
              <FilterChip
                key={type}
                label={type}
                selected={plantTypeFilter === type}
                onClick={() => setPlantTypeFilter(type)}
                disabled={submitting}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-green-800/40 mb-2 px-1">
            Garden conditions
          </p>
          <div className="grid grid-cols-1 gap-3">
            <label className="block">
              <span className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
                Sun
              </span>
              <select
                value={spotConditions.sun}
                onChange={(e) => setSpotConditions((prev) => ({ ...prev, sun: e.target.value as SpotConditions['sun'] }))}
                disabled={submitting}
                className="w-full bg-[#f0f4f1] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-green-300 transition-colors disabled:opacity-60 appearance-none"
              >
                <option value="not sure">Not sure</option>
                <option value="full sun">Full sun</option>
                <option value="part shade">Part shade</option>
                <option value="full shade">Full shade</option>
              </select>
            </label>

            <label className="block">
              <span className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
                Moisture
              </span>
              <select
                value={spotConditions.moisture}
                onChange={(e) => setSpotConditions((prev) => ({ ...prev, moisture: e.target.value as SpotConditions['moisture'] }))}
                disabled={submitting}
                className="w-full bg-[#f0f4f1] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-green-300 transition-colors disabled:opacity-60 appearance-none"
              >
                <option value="not sure">Not sure</option>
                <option value="dry">Dry</option>
                <option value="average">Average</option>
                <option value="moist">Moist</option>
              </select>
            </label>

            <label className="block">
              <span className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
                Drainage
              </span>
              <select
                value={spotConditions.drainage}
                onChange={(e) => setSpotConditions((prev) => ({ ...prev, drainage: e.target.value as SpotConditions['drainage'] }))}
                disabled={submitting}
                className="w-full bg-[#f0f4f1] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-green-300 transition-colors disabled:opacity-60 appearance-none"
              >
                <option value="not sure">Not sure</option>
                <option value="poor">Poor / stays wet</option>
                <option value="average">Average</option>
                <option value="well drained">Well drained</option>
              </select>
            </label>

            <label className="block">
              <span className="block text-[9px] font-black uppercase tracking-widest text-green-800/50 mb-2 px-1">
                Wind
              </span>
              <select
                value={spotConditions.wind}
                onChange={(e) => setSpotConditions((prev) => ({ ...prev, wind: e.target.value as SpotConditions['wind'] }))}
                disabled={submitting}
                className="w-full bg-[#f0f4f1] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-green-300 transition-colors disabled:opacity-60 appearance-none"
              >
                <option value="not sure">Not sure</option>
                <option value="sheltered">Sheltered</option>
                <option value="moderate">Moderate</option>
                <option value="exposed">Exposed</option>
              </select>
            </label>
          </div>
        </div>

        {filtersActive && (
          <p className="text-[10px] text-gray-400 font-medium px-1">
            Showing {filteredPlants.length} of {PREVIEW_PLANT_OPTIONS.length} preview plants
          </p>
        )}

        <details className="group">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-3 active:opacity-70">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              More options
            </span>
            <span className="text-[10px] text-gray-300 font-medium group-open:hidden">Show</span>
            <span className="text-[10px] text-gray-300 font-medium hidden group-open:inline">Hide</span>
          </summary>

          <div className="pt-4 space-y-4">
            {gardenAreas.length > 0 && (
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
                  <option value="">No space selected</option>
                  {gardenAreas.map((area) => (
                    <option key={area.id} value={area.id}>{area.name}</option>
                  ))}
                </select>
              </div>
            )}

            <p className="text-center text-[10px] text-gray-400 font-medium">
              <Link href="/match" className="text-green-700 font-black uppercase tracking-widest active:opacity-70">
                Open full plant finder
              </Link>
            </p>
          </div>
        </details>
      </section>

      <section>
        <div className="mb-3 px-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-green-900">
            2 · Choose a plant to preview
          </p>
          <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed">
            Preview plants available now
          </p>
        </div>

        {filteredPlants.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 text-center">
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
              No preview plants match those filters. Try broader style, type, or condition settings.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPlants.map((species) => {
              const isSelected = selectedSpecies === species.name
              return (
                <button
                  key={species.name}
                  type="button"
                  onClick={() => handleSelectPlant(species.name)}
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
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <div className="mb-3 px-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-green-900">
            3 · Name this idea <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
          </p>
        </div>
        <input
          type="text"
          value={conceptName}
          onChange={(e) => setConceptName(e.target.value)}
          placeholder={selectedSpecies ? `${selectedSpecies} preview` : 'e.g. Front hedge preview'}
          disabled={submitting}
          className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-300 shadow-sm transition-colors disabled:opacity-60"
        />
      </section>

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
          <p className="text-center text-[9px] text-gray-300 font-medium">
            {!photo
              ? 'Upload a photo to continue.'
              : !selectedSpecies
              ? 'Choose a plant to continue.'
              : `Next: place ${selectedSpecies} in Quick Preview`}
          </p>
        )}
      </div>
    </div>
  )
}
