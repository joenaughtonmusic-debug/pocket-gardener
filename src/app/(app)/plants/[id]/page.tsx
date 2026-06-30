'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '../../../lib/supabaseClient'
import PlantThumbnail from "../../../../components/PlantThumbnail"
import GardenAreaBadge from "../../../../components/GardenAreaBadge"
import GardenAreaAssignSelect from "../../../../components/GardenAreaAssignSelect"
import { resolveAreaName } from '../../../../lib/gardenAreas'
import { isAtFreePlantLimit, PLANT_LIMIT_MESSAGE } from '../../../../lib/pro/plantLimit'
import { enrichShoppingForIssue } from '../../../../lib/taskSupplies'
import { trackEvent } from '../../../../lib/analytics/trackEvent'
import { Check, Search, Sparkles, Quote } from 'lucide-react'

export default function PlantDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const id = params?.id
  const mode = searchParams?.get('mode')

  const [plant, setPlant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [userPlantRecordId, setUserPlantRecordId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [activeRemedyId, setActiveRemedyId] = useState<string | null>(null)
  const [remedies, setRemedies] = useState<any[]>([])
  const [personalNote, setPersonalNote] = useState("")
  const [nickname, setNickname] = useState<string | null>(null)
  const [plantPhotos, setPlantPhotos] = useState<any[]>([])
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [issueHistory, setIssueHistory] = useState<any[]>([])

  const [quantity, setQuantity] = useState<number>(1)
  const [lengthMetres, setLengthMetres] = useState<string>("")
  const [gardenAreaId, setGardenAreaId] = useState<string | null>(null)
  const [gardenAreas, setGardenAreas] = useState<{ id: string; name: string }[]>([])
  const [assigningArea, setAssigningArea] = useState(false)
  const [showAreaPicker, setShowAreaPicker] = useState(false)

  // --- SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const getLevelStyles = (level: string) => {
    const l = level?.toLowerCase();
    if (l === 'hardy' || l === 'high') return { bg: 'bg-[#1B5E20]', text: 'text-white' };
    if (l === 'semi-hardy' || l === 'medium') return { bg: 'bg-[#4CAF50]', text: 'text-white' };
    return { bg: 'bg-[#C8E6C9]', text: 'text-[#1B5E20]' };
  }

  const isHedgePlant = (plant?.task_category || plant?.plant_type || '').toLowerCase() === 'hedge'

  async function fetchIssueHistory(userPlantId: string) {
    const { data } = await supabase
      .from('plant_logs')
      .select('*')
      .eq('user_plant_id', userPlantId)
      .order('created_at', { ascending: false })
    if (data) setIssueHistory(data)
  }

  async function handleResolveIssue(logId: string) {
    setIsProcessing(true)
    const { error } = await supabase
      .from('plant_logs')
      .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
      .eq('id', logId)

    if (!error) {
      if (userPlantRecordId) {
        await supabase
          .from('user_plants')
          .update({
            is_sick: false,
            current_issue: null,
            current_remedy: null,
            current_shopping_tags: null,
          })
          .eq('id', userPlantRecordId)
      }

      if (userPlantRecordId) fetchIssueHistory(userPlantRecordId)
    }
    setIsProcessing(false)
  }

  async function fetchPlantPhotos(userPlantId: string) {
    const { data } = await supabase
      .from('plant_photos')
      .select('*')
      .eq('user_plant_id', userPlantId)
      .order('created_at', { ascending: false })
    if (data) setPlantPhotos(data)
  }

  async function handleAddPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !userPlantRecordId) return

    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
    const MAX_BYTES = 5 * 1024 * 1024 // 5 MB
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Please use a JPEG, PNG, or WebP image.')
      return
    }
    if (file.size > MAX_BYTES) {
      alert('Image must be under 5 MB.')
      return
    }

    try {
      setUploadingPhoto(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const fileExt = file.name.split('.').pop() ?? 'jpg'
      const filePath = `${user.id}/${userPlantRecordId}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('user-plant-photos')
        .upload(filePath, file, { upsert: false })
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('user-plant-photos')
        .getPublicUrl(filePath)

      const { error } = await supabase
        .from('plant_photos')
        .insert([{ user_plant_id: userPlantRecordId, photo_url: publicUrl }])
      if (!error) fetchPlantPhotos(userPlantRecordId)
    } catch (err) {
      console.error('Photo upload failed:', err)
      alert('Could not upload photo. Please try again.')
    } finally {
      setUploadingPhoto(false)
    }
  }

  async function handleUpdateNickname() {
    if (!userPlantRecordId) return
    const newNickname = window.prompt(`Give your ${plant.common_name} a nickname:`, nickname || "")
    if (newNickname !== null) {
      const { error } = await supabase.from('user_plants').update({ nickname: newNickname }).eq('id', userPlantRecordId)
      if (!error) setNickname(newNickname)
    }
  }

  async function handleSaveLengthMetres() {
    if (!userPlantRecordId) return
    const parsed = parseFloat(lengthMetres)
    const safe = !Number.isNaN(parsed) && parsed >= 0 ? parsed : null
    const { error } = await supabase
      .from('user_plants')
      .update({ length_metres: safe })
      .eq('id', userPlantRecordId)
    if (error) {
      console.error('Error saving hedge length:', error)
      alert('Could not save hedge length. Please try again.')
    }
  }

  useEffect(() => {
    async function fetchPlantAndStatus() {
      if (!id) return

      const { data: plantData } = await supabase.from("plants").select("*").eq('id', id).single()
      if (plantData) setPlant(plantData)

      const { data: remedyData } = await supabase
        .from('plant_remedies')
        .select('*')
        .or(`specific_plant_id.eq.${id},is_universal.eq.true`)

      if (remedyData) setRemedies(remedyData)

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const [userPlantRes, areasRes] = await Promise.all([
          supabase
            .from('user_plants')
            .select('id, personal_notes, nickname, quantity, length_metres, garden_area_id')
            .eq('user_id', user.id)
            .eq('plant_id', Number(id))
            .maybeSingle(),
          supabase
            .from('garden_areas')
            .select('id, name')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true }),
        ])

        if (areasRes.data) setGardenAreas(areasRes.data)

        const userPlantRecord = userPlantRes.data
        if (userPlantRecord) {
          setUserPlantRecordId(userPlantRecord.id)
          setPersonalNote(userPlantRecord.personal_notes || plantData?.pro_tip || "")
          setNickname(userPlantRecord.nickname)
          setQuantity(userPlantRecord.quantity || 1)
          setGardenAreaId(userPlantRecord.garden_area_id ?? null)
          setLengthMetres(
            userPlantRecord.length_metres !== null && userPlantRecord.length_metres !== undefined
              ? String(userPlantRecord.length_metres)
              : ""
          )
          fetchIssueHistory(userPlantRecord.id)
          fetchPlantPhotos(userPlantRecord.id)
        } else {
          setQuantity(1)
          setLengthMetres("")
          setGardenAreaId(null)
        }
      }

      setLoading(false)
    }

    fetchPlantAndStatus()
  }, [id, supabase])

 async function handleLogIssue(
  issueType: string,
  remedyTitle?: string,
  shoppingTags?: string[] | null,
) {
  if (!userPlantRecordId) return
  setIsProcessing(true)

  const enrichedShopping = enrichShoppingForIssue({
    issue: issueType,
    remedy: remedyTitle ?? null,
    plantName: plant?.common_name,
    existing: shoppingTags ?? [],
  })

  const { data: { user } } = await supabase.auth.getUser()

  // Close any prior Ongoing logs so we don't accumulate duplicates for the same plant.
  await supabase
    .from('plant_logs')
    .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
    .eq('user_plant_id', userPlantRecordId)
    .eq('status', 'Ongoing')

  const { error } = await supabase.from('plant_logs').insert([{
    user_id: user?.id,
    user_plant_id: userPlantRecordId,
    issue_type: issueType,
    status: 'Ongoing'
  }])

  if (!error) {
    await supabase
      .from('user_plants')
      .update({
        is_sick: true,
        current_issue: issueType,
        current_remedy: remedyTitle || null,
        current_shopping_tags: enrichedShopping,
      })
      .eq('id', userPlantRecordId)

    alert(`Logged: ${issueType}. I'll check back in with you in 30 days!`)
    fetchIssueHistory(userPlantRecordId)
  }

  setIsProcessing(false)
}

  async function handleAssignGardenArea(areaId: string | null) {
    if (!userPlantRecordId) return
    setAssigningArea(true)
    const { error } = await supabase
      .from('user_plants')
      .update({ garden_area_id: areaId })
      .eq('id', userPlantRecordId)
    if (!error) setGardenAreaId(areaId)
    setAssigningArea(false)
  }

  async function handleRemove() {
    if (!userPlantRecordId || !window.confirm(`Remove ${plant.common_name}?`)) return
    setIsDeleting(true)
    const { error } = await supabase.from('user_plants').delete().eq('id', userPlantRecordId)
    if (!error) router.push('/dashboard')
    setIsDeleting(false)
  }

  async function handleAddToProject() {
    setIsProcessing(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      setIsProcessing(false)
      alert("Please log in first!")
      return
    }

    const { data: existingProject } = await supabase
      .from('user_plants')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('plant_id', Number(id))
      .eq('is_project', true)
      .maybeSingle()

    if (existingProject) {
      setIsProcessing(false)
      alert('Already in your project list.')
      return
    }

    const safeQuantity = isHedgePlant
  ? null
  : Number.isFinite(quantity) && quantity > 0
  ? quantity
  : 1

const safeLengthMetres =
  isHedgePlant && lengthMetres.trim() !== '' && !Number.isNaN(Number(lengthMetres))
    ? Number(lengthMetres)
    : null

const { error } = await supabase.from('user_plants').insert([{
  user_id: session.user.id,
  plant_id: Number(id),
  is_project: true,
  status: 'Planning',
  quantity: safeQuantity,
  length_metres: safeLengthMetres,
}])

    if (!error) {
      trackEvent('future_plant_saved', {
        plant_name: plant?.common_name ?? undefined,
        source:     'plant_detail',
        route:      `/plants/${id}`,
      })
      router.push('/dashboard')
    }
    setIsProcessing(false)
  }

  async function handleDirectAdd(areaId?: string | null) {
    setShowAreaPicker(false)
    setIsProcessing(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      setIsProcessing(false)
      alert("Please log in first!")
      return
    }

    const { data: existing } = await supabase
      .from('user_plants')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('plant_id', Number(id))
      .eq('is_project', false)
      .maybeSingle()

    if (existing) {
      setIsProcessing(false)
      alert('Already in your garden.')
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    const { data: profileData } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', user?.id)
      .maybeSingle()

    if (!profileData?.is_pro) {
      const { count } = await supabase
        .from('user_plants')
        .select('id', { count: 'exact' })
        .eq('user_id', session.user.id)
        .eq('is_project', false)

      if (isAtFreePlantLimit(count, false)) {
        setIsProcessing(false)
        alert(`${PLANT_LIMIT_MESSAGE} Visit Dashboard → Pro to upgrade.`)
        return
      }
    }

    const safeQuantity = isHedgePlant
      ? null
      : Number.isFinite(quantity) && quantity > 0
      ? quantity
      : 1

    const safeLengthMetres =
      isHedgePlant && lengthMetres.trim() !== '' && !Number.isNaN(Number(lengthMetres))
        ? Number(lengthMetres)
        : null

    const { error } = await supabase.from('user_plants').insert([{
      user_id: session.user.id,
      plant_id: Number(id),
      is_project: false,
      status: 'Ongoing',
      quantity: safeQuantity,
      length_metres: safeLengthMetres,
      garden_area_id: areaId ?? null,
    }])

    if (!error) {
      trackEvent('plant_added_to_garden', {
        plant_name: plant?.common_name ?? undefined,
        source:     'plant_detail',
        route:      `/plants/${id}`,
      })
      router.push('/dashboard')
    }
    setIsProcessing(false)
  }

  const filteredRemedies = remedies.filter(r => {
    if (!isSearching) return r.specific_plant_id === Number(id)
    const searchString = (r.issue_type + (r.search_keywords || "") + r.remedy_title).toLowerCase()
    return searchString.includes(searchQuery.toLowerCase())
  })

  const specificMatches = filteredRemedies.filter(r => r.specific_plant_id === Number(id))
  const universalMatches = filteredRemedies.filter(r => r.is_universal === true && r.specific_plant_id !== Number(id))

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-gray-400 uppercase tracking-widest text-xs">Loading...</div>
  if (!plant) return <div className="p-20 text-center">Plant not found.</div>

  const hardinessStyle = getLevelStyles(plant.hardiness_level)
  const maintenanceStyle = getLevelStyles(plant.maintenance_level)
  const areaMap = new Map(gardenAreas.map((a) => [a.id, a.name]))

  return (
    <main className="min-h-screen bg-white pb-40 text-gray-900">
      <div className="h-[45vh] bg-[#f0f7f3] relative flex items-center justify-center pt-8 pb-16">
        <button onClick={() => router.back()} className="absolute top-12 left-6 z-30 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-gray-400">←</button>
        <div className="relative z-10 w-48 h-48 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white group">
          <PlantThumbnail
            plant={plantPhotos[0] ? { ...plant, image_url: plantPhotos[0].photo_url } : plant}
            size="lg"
          />
          {userPlantRecordId && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md py-3 text-[8px] font-black text-white uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {uploadingPhoto ? 'Uploading...' : 'Update Main Photo'}
            </button>
          )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="px-8 -mt-10 bg-white rounded-t-[3.5rem] relative z-20 border-t border-gray-100">
        <header className="pt-10 mb-8 relative">
          <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>

          <div className="absolute top-14 right-0 flex flex-col gap-3 items-end">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 italic lowercase">{plant.hardiness_level}</span>
              <div className={`w-8 h-8 rounded-lg ${hardinessStyle.bg} flex items-center justify-center shadow-sm`}>
                <span className={`text-[10px] font-black ${hardinessStyle.text}`}>{plant.hardiness_level?.[0]}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 italic lowercase">
                {plant.maintenance_level === 'Medium' ? 'moderate care' : `${plant.maintenance_level?.toLowerCase()} care`}
              </span>
              <div className={`w-8 h-8 rounded-lg ${maintenanceStyle.bg} flex items-center justify-center shadow-sm`}>
                <span className={`text-[10px] font-black ${maintenanceStyle.text}`}>{plant.maintenance_level?.[0]}</span>
              </div>
            </div>
          </div>

          <div className="pr-32">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-black text-green-900 tracking-tight uppercase italic leading-tight">
                {nickname || plant.common_name}
              </h1>
              {userPlantRecordId && (
                <button onClick={handleUpdateNickname} className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 active:scale-90 transition-all">
                  <span className="text-[10px] text-gray-400">✎</span>
                </button>
              )}
            </div>
            {nickname && <p className="text-[10px] font-black text-green-700/50 uppercase tracking-[0.2em] mb-1 italic">{plant.common_name}</p>}
            <p className="text-sm font-medium italic text-gray-400">{plant.scientific_name}</p>
          </div>
        </header>

        <section className="mb-10 relative">
          <div className="bg-green-900 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
            <Quote className="absolute -top-2 -left-2 text-white/5 w-24 h-24 rotate-12" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">The Gardener's View</span>
              </div>
              <p className="text-white text-[15px] font-medium italic leading-relaxed">
                {plant.description || plant.overview || "This plant is a hardy addition to the New Zealand landscape, known for its resilience and unique aesthetic."}
              </p>
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleAddPhoto} className="hidden" accept="image/*" />
        </section>

        <div className="mb-10 flex flex-col items-center gap-4">
          {userPlantRecordId && !mode && (
            <div className="w-full bg-green-50 rounded-2xl border border-green-100 p-5 space-y-3">
              <div className="text-center text-[10px] font-black text-green-700 uppercase tracking-widest italic">
                In Your Garden
              </div>
              <div className="flex justify-center">
                <GardenAreaBadge name={resolveAreaName(gardenAreaId, areaMap)} />
              </div>
              <GardenAreaAssignSelect
                value={gardenAreaId}
                areas={gardenAreas}
                onChange={handleAssignGardenArea}
                disabled={assigningArea}
              />
              {gardenAreas.length === 0 && (
                <p className="text-[10px] text-gray-400 text-center font-medium leading-snug">
                  <a href="/match" className="text-green-700 font-black uppercase tracking-wide">
                    Open Garden Planner
                  </a>
                  {' '}to add areas and organise your plants by location.
                </p>
              )}
              {isHedgePlant && (
                <div className="pt-2 border-t border-green-100">
                  <label className="block text-[10px] font-black text-green-700/60 uppercase tracking-[0.2em] mb-2">
                    Hedge Length (Lineal Metres)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      step="0.1"
                      value={lengthMetres}
                      onChange={(e) => setLengthMetres(e.target.value)}
                      placeholder="e.g. 5"
                      className="flex-1 p-3 bg-white border border-green-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-300"
                    />
                    <button
                      onClick={handleSaveLengthMetres}
                      className="px-4 py-3 bg-green-800 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl active:scale-95 transition-all"
                    >
                      Save
                    </button>
                  </div>
                  <p className="mt-1.5 text-[10px] font-bold text-green-700/40 italic">
                    Used to calculate hedge trim time in your calendar.
                  </p>
                </div>
              )}
            </div>
          )}

          {((mode === 'builder') || (!mode && !userPlantRecordId)) && (
            <div className="w-full bg-gray-50 rounded-[2rem] border border-gray-100 p-5">
              <div className="grid grid-cols-1 gap-4">
  {isHedgePlant ? (
    <div>
      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
        Hedge Length (Lineal Metres)
      </label>
      <input
        type="number"
        min={0}
        step="0.1"
        value={lengthMetres}
        onChange={(e) => setLengthMetres(e.target.value)}
        placeholder="Enter hedge length"
        className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-300"
      />
      <p className="mt-2 text-[10px] font-bold text-gray-400 italic">
        Hedge tasks use lineal metres rather than plant count.
      </p>
    </div>
  ) : (
    <div>
      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
        Quantity
      </label>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
        className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-300"
      />
    </div>
  )}

                {!mode && !userPlantRecordId && (
                  <button
                    onClick={() => setShowAreaPicker(true)}
                    disabled={isProcessing}
                    className="w-full py-6 rounded-[2.5rem] bg-[#2d5a3f] text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl active:scale-95 transition-all mt-2"
                  >
                    {isProcessing ? 'Adding...' : 'Add to My Garden'}
                  </button>
                )}

                {mode === 'builder' && (
                  <>
                    <button
                      onClick={handleAddToProject}
                      disabled={isProcessing}
                      className="w-full py-6 rounded-[2.5rem] bg-[#2d5a3f] text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl active:scale-95 transition-all"
                    >
                      {isProcessing ? 'Adding...' : 'Add to Project List'}
                    </button>

                    <button
                      onClick={() => setShowAreaPicker(true)}
                      disabled={isProcessing}
                      className="text-[10px] font-black text-green-700/50 uppercase tracking-[0.2em] border-b border-green-700/20 pb-1 italic hover:text-green-700 transition-colors"
                    >
                      or add directly to current garden
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <section className="mb-10 px-2">
          <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 underline decoration-green-200 decoration-4 underline-offset-4">Care Requirements</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-2xl pt-1">✂️</span>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Trimming</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{plant.trim_notes || 'Trim on a seasonal basis or as needed.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl pt-1">🧪</span>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Feeding</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{plant.feed_notes || 'Liquid and granular feed following trim.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl pt-1">🩺</span>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Health</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{plant.health_notes || 'Check for signs of wilting or browning (see issues below).'}</p>
              </div>
            </div>
          </div>
        </section>

        {userPlantRecordId && personalNote && (
          <div className="mb-10 p-7 bg-amber-50/40 rounded-[2.5rem] border-2 border-red-200">
            <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-[0.2em] mb-3">💡 Gardener's Pro Tip</h4>
            <p className="w-full text-[13px] text-gray-700 leading-relaxed font-medium italic">{personalNote}</p>
          </div>
        )}

        {userPlantRecordId && (
          <div className="mb-10 px-2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[14px] font-black text-black-800 uppercase tracking-[0.2em]">⚠️ Common Issues</h4>
              {isSearching && (
                <button onClick={() => { setIsSearching(false); setSearchQuery("") }} className="text-[10px] font-bold text-orange-500 uppercase">Clear</button>
              )}
            </div>

            {isSearching && (
              <div className="mb-4 relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search symptoms (e.g. brown leaf, bugs)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 bg-orange-50 border border-orange-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 ring-orange-400"
                />
              </div>
            )}

            <div className="space-y-3">
              {!isSearching && specificMatches.length > 0 ? (
                specificMatches.slice(0, 3).map((r) => (
                  <div key={r.id} className="overflow-hidden">
                    <button onClick={() => setActiveRemedyId(activeRemedyId === r.id ? null : r.id)} className={`w-full py-4 px-6 rounded-2xl border flex items-center justify-between transition-all ${activeRemedyId === r.id ? 'bg-white border-orange-400 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{r.issue_type}</span>
                        <span className="text-[7px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Plant Specific</span>
                      </div>
                      <span className={`text-orange-400 font-bold transition-transform ${activeRemedyId === r.id ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {activeRemedyId === r.id && (
                      <div className="p-4 mt-1 bg-white rounded-2xl border border-orange-100 animate-in fade-in">
                        <p className="text-[10px] font-black text-orange-800 uppercase mb-1">{r.remedy_title}</p>
                        <p className="text-xs text-gray-600 italic leading-relaxed mb-4">"{r.remedy_description}"</p>
                        <button
  onClick={() =>
  handleLogIssue(
    r.issue_type,
    `${(r as any).remedy_title}: ${(r as any).remedy_description}`,
    (r as any).shopping_tags,
  )
}
  disabled={isProcessing}
  className="w-full py-2 bg-orange-50 text-orange-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100 active:scale-95 transition-all"
>
  Log this issue
</button>
                      </div>
                    )}
                  </div>
                ))
              ) : !isSearching && (
                <div className="text-center py-4 opacity-40 italic text-[11px] text-orange-800 font-bold uppercase tracking-widest">No specific issues listed</div>
              )}

              {isSearching && universalMatches.length > 0 && (
                <>
                  <div className="pt-4 pb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Global Database Results</div>
                  {Array.from(new Map(universalMatches.map(item => [item.issue_type, item])).values()).map((r: any) => (
                    <div key={r.id} className="overflow-hidden">
                      <button onClick={() => setActiveRemedyId(activeRemedyId === r.id ? null : r.id)} className={`w-full py-4 px-6 rounded-2xl border flex items-center justify-between transition-all ${activeRemedyId === r.id ? 'bg-white border-orange-400 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex flex-col items-start">
                          <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{r.issue_type}</span>
                          <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{r.category || 'General'}</span>
                        </div>
                        <span className={`text-orange-400 font-bold transition-transform ${activeRemedyId === r.id ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      {activeRemedyId === r.id && (
                        <div className="p-4 mt-1 bg-white rounded-2xl border border-orange-100">
                          <p className="text-[10px] font-black text-orange-800 uppercase mb-1">{r.remedy_title}</p>
                          <p className="text-xs text-gray-600 italic leading-relaxed mb-4">"{r.remedy_description}"</p>
                          <button
  onClick={() =>
  handleLogIssue(
    r.issue_type,
    `${(r as any).remedy_title}: ${(r as any).remedy_description}`,
    (r as any).shopping_tags,
  )
}
  disabled={isProcessing}
  className="w-full py-2 bg-orange-50 text-orange-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100 active:scale-95 transition-all"
>
  Log this issue
</button>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {!isSearching && (
                <div className="mt-6 p-6 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 italic">Can't see the issue here?</p>
                  <button
                    onClick={() => {
                      setIsSearching(true)
                      trackEvent('plant_problem_searched', {
                        plant_name: plant?.common_name ?? undefined,
                        source:     'common_issues',
                        route:      `/plants/${id}`,
                      })
                    }}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-white border border-gray-100 rounded-full shadow-sm text-[10px] font-black text-green-800 uppercase tracking-widest active:scale-95 transition-all"
                  >
                    <Search size={12} />
                    Search Global Database
                  </button>
                </div>
              )}

              {isSearching && filteredRemedies.length === 0 && (
                <div className="text-center py-10 text-[11px] text-gray-400 font-bold uppercase italic">No matches found for "{searchQuery}"</div>
              )}
            </div>
          </div>
        )}

        {userPlantRecordId && issueHistory.length > 0 && (
          <div className="mb-10 px-2 border-t border-gray-50 pt-8">
            <h4 className="text-[14px] font-black text-black-800 uppercase tracking-[0.2em] mb-4">📜 Issue History</h4>
            <div className="space-y-4">
              {issueHistory.map((log) => (
                <div key={log.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex-grow">
                    <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{log.issue_type}</p>
                    <p className="text-[10px] text-gray-400 italic">Logged: {new Date(log.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {log.status === 'Ongoing' && (
                      <button
                        onClick={() => handleResolveIssue(log.id)}
                        disabled={isProcessing}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-800 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all"
                      >
                        <Check size={10} strokeWidth={4} />
                        Resolve
                      </button>
                    )}
                    <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${log.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {log.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {userPlantRecordId && (
          <div className="mt-8 text-center pb-20">
            <button onClick={handleRemove} className="text-[10px] font-black uppercase tracking-[0.2em] text-red-200 hover:text-red-400 transition-colors italic">
              × Remove from My Garden
            </button>
          </div>
        )}
      </div>

      {/* ── Garden Area Picker Sheet ──────────────────────────────────────── */}
      {showAreaPicker && (
        <div className="fixed inset-0 z-[200] flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAreaPicker(false)}
          />
          {/* Sheet */}
          <div className="relative bg-white rounded-t-[2.5rem] p-6 pb-10 space-y-5 shadow-2xl">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
            <div>
              <h3 className="text-lg font-black uppercase italic tracking-tighter text-green-950 leading-none">
                Where is this plant going?
              </h3>
              <p className="text-[11px] text-gray-400 font-medium mt-1 leading-snug">
                Choose a Garden Area so Pocket Gardener can organise your plants and reminders.
              </p>
            </div>

            <div className="space-y-2">
              {gardenAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => handleDirectAdd(area.id)}
                  disabled={isProcessing}
                  className="w-full text-left px-5 py-4 bg-[#f0f4f1] rounded-2xl font-black uppercase text-[11px] tracking-widest text-green-950 active:bg-green-100 transition-colors flex items-center justify-between"
                >
                  <span>{area.name}</span>
                  <span className="text-gray-300 text-base">→</span>
                </button>
              ))}

              <Link
                href="/dashboard#garden-areas"
                onClick={() => setShowAreaPicker(false)}
                className="block w-full text-center px-5 py-4 border border-dashed border-green-200 rounded-2xl font-black uppercase text-[11px] tracking-widest text-green-700 active:bg-green-50 transition-colors"
              >
                {gardenAreas.length > 0 ? '+ Create new Garden Area' : '+ Create your first Garden Area'}
              </Link>

              <button
                onClick={() => handleDirectAdd(null)}
                disabled={isProcessing}
                className="w-full text-left px-5 py-4 bg-gray-50 rounded-2xl font-black uppercase text-[11px] tracking-widest text-gray-500 active:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span>Not sure yet</span>
                <span className="text-gray-300 text-base">→</span>
              </button>
            </div>

            <button
              onClick={() => setShowAreaPicker(false)}
              className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
