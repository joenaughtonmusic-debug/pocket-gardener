'use client'

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import type { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../lib/supabaseClient'
import {
  Sun, Droplets, Ruler, ChevronRight, Plus, X,
  Shovel, TrendingUp, Pencil, Trash2,
} from 'lucide-react'
import PlantThumbnail from '../../../components/PlantThumbnail'
import PageHelp from '../../../components/PageHelp'
import LockedProFeatureCard from '../../../components/LockedProFeatureCard'
import type { GardenArea } from '../../../types/garden'
import {
  GARDEN_AREA_STYLE_OPTIONS,
  GARDEN_AREA_GOAL_OPTIONS,
  rankPlantsForArea,
  type RankedPlantMatch,
} from '../../../lib/gardenAreaRecommendations'
import type { Plant } from '../../../types/plants'

// ─── Slider option constants ──────────────────────────────────────────────────
const SUN_OPTIONS   = ['Full Sun', 'Part Shade', 'Full Shade']
const SOIL_OPTIONS  = ['Healthy/loam', 'Clay', 'Sandy', 'Potting Mix']
const WATER_OPTIONS = ['Holds Water', 'Drains Well', 'Dry', 'Under a Roof']
const SIZE_OPTIONS  = ['<1m', '1-2m', '2-4m', '4m+']
const SLOPE_OPTIONS = ['flat', 'gentle', 'moderate', 'steep']
const SLOPE_LABELS  = ['Flat', 'Gentle Slope', 'Moderate Slope', 'Steep Slope']

// ─── Image assets (unchanged) ────────────────────────────────────────────────
const SUN_IMAGES = [
  'https://img.freepik.com/free-photo/penang-malaysia-march-25-2024_58702-16918.jpg?semt=ais_incoming&w=740&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80',
  'https://www.juliebawdendavis.com/wp-content/uploads/2024/05/Shade-Garden-plant-and-flower-in-garden-zone-at-coffee-cafe-ou-2023-11-27-05-18-40-utc-1024x683.jpg',
]
const SOIL_IMAGES = [
  'https://www.familyhandyman.com/wp-content/uploads/2021/12/GettyImages-1411589688.jpg?fit=700,700',
  'https://www.telegraph.co.uk/content/dam/gardening/2016/03/02/clay_trans_NvBQzQNjv4Bq2tiKoEXXnMogTwbjBHNCEqNpFR3XzR3Ec7ZpvUpPAOA.jpg?imwidth=640',
  'https://images.ctfassets.net/3s5io6mnxfqz/2NtZAbCMNH8DDAY7GQz2Gu/83ae589dc93ee115cc1b74bfb7c1db99/AdobeStock_271102263_2.jpeg',
  'https://www.marthastewart.com/thmb/9L878wbTxNsqMSkH1BXUlpmcZH4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-22093204211-c155b91cf01d45168b0170cbf938368d.jpg',
]
const WATER_IMAGES = [
  'https://www.saga.co.uk/helix-contentlibrary/saga/magazine/articles/2024/july/gettyimages-945124834-how-to-cope-with-waterlogged-soil_hero.jpg',
  'https://extension.umd.edu/sites/extension.umd.edu/files/styles/optimized/public/2021-03/hgic_soils_soil_cross_section_1600.jpg?itok=B6yNaByH',
  'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2010/04/dry_soil/9670553-3-eng-GB/Dry_soil_pillars.jpg',
  'https://www.thespruce.com/thmb/Z4V-26SsiT_2Qul7tsZya5XeZPg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1198218813-e5051f347a814c2ab5d6129b2cdc2ead.jpg',
]
const SIZE_IMAGES = [
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20small.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20mdeiium.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20hedge.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20tree.png',
]
const SLOPE_IMAGES = [
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Slope%20files/slope_flat%20v1.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Slope%20files/slope_gentle%20%20v1.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Slope%20files/slope_moderate%20v1.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Slope%20files/slope_steep%20v1.png',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Return the array index for a stored condition string, defaulting to 0. */
function idxFromOption(options: string[], value: string | null | undefined): number {
  if (!value) return 0
  const i = options.indexOf(value)
  return i >= 0 ? i : 0
}

// ─── Reusable slider for the area creation/edit form ─────────────────────────
// Only used inside the form overlay — does NOT replace the existing matchmaker sliders.
function FormSlider({
  label,
  icon,
  options,
  optionLabels,
  images,
  value,
  onChange,
  imgContain = false,
}: {
  label: string
  icon: ReactNode
  options: string[]
  optionLabels?: string[]
  images: string[]
  value: number
  onChange: (v: number) => void
  imgContain?: boolean
}) {
  const display = optionLabels ? optionLabels[value] : options[value]
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end px-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
          {icon} {label}
        </label>
        <span className="text-xs font-black italic uppercase text-green-950">{display}</span>
      </div>
      <div
        className={`relative h-36 w-full rounded-[2rem] overflow-hidden border-4 border-white ${
          imgContain ? 'bg-white' : 'bg-gray-100'
        }`}
      >
        {images.map((url, i) => (
          <div
            key={i}
            className={`absolute inset-0 ${
              imgContain ? 'bg-contain bg-no-repeat' : 'bg-cover'
            } bg-center transition-opacity duration-500`}
            style={{ backgroundImage: `url("${url}")`, opacity: value === i ? 1 : 0 }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
        <input
          type="range"
          min="0"
          max={options.length - 1}
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10"
        />
      </div>
    </div>
  )
}

// ─── Condition pill ───────────────────────────────────────────────────────────
function ConditionPill({
  icon,
  value,
  displayMap,
  variant = 'condition',
}: {
  icon?: ReactNode
  value: string | null | undefined
  displayMap?: Record<string, string>
  variant?: 'condition' | 'planning'
}) {
  if (!value) return null
  const label = displayMap ? (displayMap[value] ?? value) : value
  const styles =
    variant === 'planning'
      ? 'bg-green-50 text-green-700 border-green-100'
      : 'bg-gray-50 text-gray-500 border-gray-100'
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wide border px-2 py-1 rounded-full ${styles}`}>
      {icon} {label}
    </span>
  )
}

function OptionChips({
  label,
  optional,
  options,
  value,
  onChange,
}: {
  label: string
  optional?: boolean
  options: readonly string[]
  value: string | null
  onChange: (v: string | null) => void
}) {
  return (
    <div>
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
        {label}{' '}
        {optional && (
          <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
        )}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(selected ? null : opt)}
              className={`text-[9px] font-black uppercase tracking-wide px-3 py-2 rounded-full border transition-all active:scale-95 ${
                selected
                  ? 'bg-green-900 text-white border-green-900'
                  : 'bg-gray-50 text-gray-500 border-gray-100'
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

function areaPlanningHint(area: GardenArea): string | null {
  const parts = [area.style, area.goal].filter((v) => v && v !== 'Not Sure') as string[]
  if (parts.length === 0) return null
  return `Matched to conditions, prioritised for ${parts.join(' · ').toLowerCase()}.`
}

// ─── Main page component ──────────────────────────────────────────────────────
function MatchPageInner() {
  // ── Existing matchmaker state ──────────────────────────────────────────────
  const [sunIdx,        setSunIdx]        = useState(0)
  const [soilIdx,       setSoilIdx]       = useState(0)
  const [waterIdx,      setWaterIdx]      = useState(1)
  const [sizeIdx,       setSizeIdx]       = useState(1)
  const [slopeIdx,      setSlopeIdx]      = useState(0)
  const [matches,       setMatches]       = useState<any[]>([])
  const [loading,       setLoading]       = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<any | null>(null)

  // ── Garden Areas state ────────────────────────────────────────────────────
  const [areas,           setAreas]           = useState<GardenArea[]>([])
  const [areaMatches,     setAreaMatches]     = useState<Record<string, RankedPlantMatch[]>>({})
  const [areasLoading,    setAreasLoading]    = useState(true)
  const [projectPlantIds, setProjectPlantIds] = useState<number[]>([])
  const [showAreaForm,    setShowAreaForm]    = useState(false)
  const [editingArea,     setEditingArea]     = useState<GardenArea | null>(null)
  const [deletingAreaId,  setDeletingAreaId]  = useState<string | null>(null)
  const [addingToArea,    setAddingToArea]    = useState<string | null>(null)
  const [isPro,           setIsPro]           = useState(false)

  // Area form fields
  const [formName,      setFormName]      = useState('')
  const [formSunIdx,    setFormSunIdx]    = useState(0)
  const [formSoilIdx,   setFormSoilIdx]   = useState(0)
  const [formWaterIdx,  setFormWaterIdx]  = useState(1)
  const [formSizeIdx,   setFormSizeIdx]   = useState(1)
  const [formSlopeIdx,  setFormSlopeIdx]  = useState(0)
  const [formNotes,     setFormNotes]     = useState('')
  const [formStyle,     setFormStyle]     = useState<string | null>(null)
  const [formGoal,      setFormGoal]      = useState<string | null>(null)
  const [savingArea,    setSavingArea]    = useState(false)

  const supabase      = useMemo(() => createSupabaseBrowserClient(), [])
  const searchParams  = useSearchParams()

  // Pre-fill style from ?style= URL param (e.g. from Feature Garden "Use This Style")
  const styleParam = searchParams.get('style')
  const initialStyle = useMemo(() => {
    if (!styleParam) return null
    return GARDEN_AREA_STYLE_OPTIONS.includes(styleParam as any) ? styleParam : null
  }, [styleParam])

  // ── Shared matchmaker query helper ────────────────────────────────────────
  const fetchMatchesForConditions = useCallback(
    async (
      sun: string,
      soil: string,
      water: string,
      size: string,
      slope: string,
    ): Promise<any[]> => {
      const { data } = await supabase
        .from('plants')
        .select('*')
        .contains('sun_requirement',   [sun])
        .contains('soil_type',         [soil])
        .contains('water_behavior',    [water])
        .contains('mature_size',       [size])
        .contains('slope_suitability', [slope])
      return (data || []).sort((a, b) =>
        (a.common_name || '').localeCompare(b.common_name || ''),
      )
    },
    [supabase],
  )

  // ── Load areas + their recommendations ───────────────────────────────────
  const loadAreas = useCallback(async () => {
    setAreasLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setAreasLoading(false); return }

    const [areasRes, projectRes, profileRes] = await Promise.all([
      supabase
        .from('garden_areas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true }),
      supabase
        .from('user_plants')
        .select('plant_id')
        .eq('user_id', user.id)
        .eq('is_project', true),
      supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', user.id)
        .maybeSingle(),
    ])

    if (profileRes.data) setIsPro(profileRes.data.is_pro)

    const loadedAreas = (areasRes.data || []) as GardenArea[]
    setAreas(loadedAreas)
    setProjectPlantIds(
      (projectRes.data || []).map((p: any) => Number(p.plant_id)),
    )

    // Fetch up to 5 recommendations per area in parallel
    const matchMap: Record<string, RankedPlantMatch[]> = {}
    await Promise.all(
      loadedAreas.map(async (area) => {
        if (
          area.sun_condition &&
          area.soil_condition &&
          area.water_condition &&
          area.size_condition &&
          area.slope_condition
        ) {
          const all = await fetchMatchesForConditions(
            area.sun_condition,
            area.soil_condition,
            area.water_condition,
            area.size_condition,
            area.slope_condition,
          )
          matchMap[area.id] = rankPlantsForArea(all as Plant[], area.style, area.goal).slice(0, 5)
        } else {
          matchMap[area.id] = []
        }
      }),
    )
    setAreaMatches(matchMap)
    setAreasLoading(false)
  }, [supabase, fetchMatchesForConditions])

  useEffect(() => { loadAreas() }, [loadAreas])

  // Auto-open the create form when arriving via ?style= from Feature Garden
  useEffect(() => {
    if (initialStyle && !areasLoading) {
      openCreateForm()
    }
    // Only runs once after areas have loaded and a style param is present
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areasLoading])

  // ── Area form helpers ──────────────────────────────────────────────────────
  function openCreateForm() {
    setEditingArea(null)
    setFormName('')
    setFormSunIdx(0)
    setFormSoilIdx(0)
    setFormWaterIdx(1)
    setFormSizeIdx(1)
    setFormSlopeIdx(0)
    setFormNotes('')
    // Pre-fill style from URL param if present (e.g. Feature Garden "Use This Style")
    setFormStyle(initialStyle)
    setFormGoal(null)
    setShowAreaForm(true)
  }

  function openEditForm(area: GardenArea) {
    setEditingArea(area)
    setFormName(area.name)
    setFormSunIdx(idxFromOption(SUN_OPTIONS,   area.sun_condition))
    setFormSoilIdx(idxFromOption(SOIL_OPTIONS,  area.soil_condition))
    setFormWaterIdx(idxFromOption(WATER_OPTIONS, area.water_condition))
    setFormSizeIdx(idxFromOption(SIZE_OPTIONS,  area.size_condition))
    setFormSlopeIdx(idxFromOption(SLOPE_OPTIONS, area.slope_condition))
    setFormNotes(area.notes || '')
    setFormStyle(area.style || null)
    setFormGoal(area.goal || null)
    setShowAreaForm(true)
  }

  async function handleSaveArea() {
    if (!formName.trim()) return
    setSavingArea(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSavingArea(false); return }

    const conditions = {
      name:            formName.trim(),
      sun_condition:   SUN_OPTIONS[formSunIdx],
      soil_condition:  SOIL_OPTIONS[formSoilIdx],
      water_condition: WATER_OPTIONS[formWaterIdx],
      size_condition:  SIZE_OPTIONS[formSizeIdx],
      slope_condition: SLOPE_OPTIONS[formSlopeIdx],
      notes:           formNotes.trim() || null,
      style:           formStyle || null,
      goal:            formGoal || null,
    }

    if (editingArea) {
      await supabase.from('garden_areas').update(conditions).eq('id', editingArea.id)
    } else {
      await supabase.from('garden_areas').insert([{ user_id: user.id, ...conditions }])
    }

    setSavingArea(false)
    setShowAreaForm(false)
    await loadAreas()
  }

  async function handleDeleteArea(areaId: string, areaName: string) {
    if (
      !window.confirm(
        `Delete "${areaName}"?\n\nPlants already added to your projects will not be removed.`,
      )
    ) return

    setDeletingAreaId(areaId)
    await supabase.from('garden_areas').delete().eq('id', areaId)
    setDeletingAreaId(null)
    setAreas((prev) => prev.filter((a) => a.id !== areaId))
    setAreaMatches((prev) => {
      const next = { ...prev }
      delete next[areaId]
      return next
    })
  }

  // ── Add a recommended plant to plan with area linkage ────────────────────
  async function handleAddToAreaPlan(plantId: number, areaId: string) {
    const key = `${plantId}-${areaId}`
    setAddingToArea(key)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) { setAddingToArea(null); return }

    // Only insert if not already in any project
    const { data: existing } = await supabase
      .from('user_plants')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('plant_id', plantId)
      .eq('is_project', true)
      .maybeSingle()

    if (!existing) {
      const { error } = await supabase.from('user_plants').insert([{
        user_id:        session.user.id,
        plant_id:       plantId,
        is_project:     true,
        status:         'Planning',
        garden_area_id: areaId,
      }])
      if (!error) {
        setProjectPlantIds((prev) => [...prev, plantId])
      }
    } else {
      // Reflect existing state without a second DB trip
      setProjectPlantIds((prev) => (prev.includes(plantId) ? prev : [...prev, plantId]))
    }

    setAddingToArea(null)
  }

  // ── Existing matchmaker: add to project (no area) ─────────────────────────
  const handleAddToProject = async (plantId: string) => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session?.user) {
      alert('Please log in first!')
      return
    }

    const { data: existingProject } = await supabase
      .from('user_plants')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('plant_id', Number(plantId))
      .eq('is_project', true)
      .maybeSingle()

    if (existingProject) {
      alert('Already in your project list.')
      return
    }

    const { error } = await supabase.from('user_plants').insert([{
      user_id:    session.user.id,
      plant_id:   Number(plantId),
      is_project: true,
      status:     'Planning',
    }])

    if (!error) { alert('Added to your project!'); setSelectedPlant(null) }
  }

  // ── Existing matchmaker: live query (unchanged) ───────────────────────────
  useEffect(() => {
    async function getLiveMatches() {
      setLoading(true)
      const { data } = await supabase
        .from('plants')
        .select('*')
        .contains('sun_requirement',   [SUN_OPTIONS[sunIdx]])
        .contains('soil_type',         [SOIL_OPTIONS[soilIdx]])
        .contains('water_behavior',    [WATER_OPTIONS[waterIdx]])
        .contains('mature_size',       [SIZE_OPTIONS[sizeIdx]])
        .contains('slope_suitability', [SLOPE_OPTIONS[slopeIdx]])
      if (data) {
        setMatches(
          [...data].sort((a, b) => (a.common_name || '').localeCompare(b.common_name || '')),
        )
      }
      setLoading(false)
    }
    getLiveMatches()
  }, [sunIdx, soilIdx, waterIdx, sizeIdx, slopeIdx, supabase])

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#f0f4f1] text-gray-900 pb-40">
      <div className="max-w-2xl mx-auto p-6">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <header className="mb-8 pt-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-green-950 tracking-tighter italic uppercase leading-none">
              Garden Planner
            </h1>
            <p className="text-[10px] text-green-700/60 font-black uppercase tracking-[0.2em] mt-2">
              Plan each part of your garden — areas, conditions, and plant ideas.
            </p>
          </div>
          <PageHelp
            title="Garden Planner"
            description="Start with garden areas — name each part of your section, set conditions, and get plant suggestions. Use the plant finder below to explore more options."
            bullets={[
              'Add areas like Front Boundary, Back Fence, or Shady Corner',
              'Set sun, soil, style, and goals for each area',
              'Add suggested plants to your project list',
            ]}
          />
        </header>

        {/* ══ GARDEN AREAS ════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-[10px] font-black text-green-900 uppercase tracking-[0.2em]">
              Plan My Garden
            </h2>
            <button
              onClick={openCreateForm}
              className="flex items-center gap-1.5 bg-green-900 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all"
            >
              <Plus size={12} strokeWidth={3} /> New Area
            </button>
          </div>
          <p className="text-[11px] text-gray-400 font-medium leading-snug mb-5 px-1">
            Break your garden into areas, save their conditions, and see plants suited to each spot.
          </p>

          {areasLoading ? (
            <div className="py-8 text-center text-[10px] font-black uppercase tracking-widest text-gray-300 animate-pulse">
              Loading areas...
            </div>
          ) : areas.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] border border-dashed border-gray-200 p-8 text-center">
              <p className="text-sm font-black text-green-950 uppercase tracking-tight mb-2">
                No areas yet
              </p>
              <p className="text-[12px] text-gray-400 leading-relaxed font-medium max-w-xs mx-auto mb-6">
                Start by adding an area like{' '}
                <span className="text-green-700 font-black">Front Boundary</span>,{' '}
                <span className="text-green-700 font-black">Back Fence</span>,{' '}
                <span className="text-green-700 font-black">Shady Corner</span>, or{' '}
                <span className="text-green-700 font-black">Balcony Pots</span>.
              </p>
              <button
                onClick={openCreateForm}
                className="inline-flex items-center gap-2 bg-green-900 text-white text-[10px] font-black uppercase tracking-widest px-7 py-3 rounded-full shadow-sm active:scale-95 transition-all"
              >
                <Plus size={14} strokeWidth={3} /> Add First Area
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {areas.map((area) => {
                const recs = areaMatches[area.id] ?? []
                const isDeleting = deletingAreaId === area.id

                return (
                  <div
                    key={area.id}
                    className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
                  >
                    {/* Area header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-black text-green-950 uppercase text-sm tracking-tight leading-tight">
                          {area.name}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => openEditForm(area)}
                            title="Edit area"
                            className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 active:scale-90 transition-all"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteArea(area.id, area.name)}
                            disabled={isDeleting}
                            title="Delete area"
                            className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 active:scale-90 transition-all disabled:opacity-40"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Condition pills */}
                      <div className="flex flex-wrap gap-1.5">
                        <ConditionPill icon={<Sun size={9} />} value={area.sun_condition} />
                        <ConditionPill icon={<Shovel size={9} />} value={area.soil_condition} />
                        <ConditionPill icon={<Droplets size={9} />} value={area.water_condition} />
                        <ConditionPill icon={<Ruler size={9} />} value={area.size_condition} />
                        <ConditionPill
                          icon={<TrendingUp size={9} />}
                          value={area.slope_condition}
                          displayMap={{ flat: 'Flat', gentle: 'Gentle', moderate: 'Moderate', steep: 'Steep' }}
                        />
                      </div>

                      {(area.style || area.goal) && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <ConditionPill value={area.style} variant="planning" />
                          <ConditionPill value={area.goal} variant="planning" />
                        </div>
                      )}

                      {area.notes && (
                        <p className="mt-3 text-[11px] text-gray-400 italic leading-snug border-t border-gray-50 pt-3">
                          {area.notes}
                        </p>
                      )}
                    </div>

                    {/* Recommendations */}
                    <div className="border-t border-gray-50 px-6 pb-6 pt-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                        Suggested Plants{recs.length > 0 ? ` (${recs.length})` : ''}
                      </p>
                      {areaPlanningHint(area) && (
                        <p className="text-[10px] text-gray-400 font-medium italic leading-snug -mt-2 mb-3">
                          {areaPlanningHint(area)}
                        </p>
                      )}

                      {recs.length === 0 ? (
                        <p className="text-[11px] text-gray-300 italic">
                          No exact matches yet. Try adjusting this area's conditions.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {recs.map(({ plant, matchLabel }) => {
                            const inPlan  = projectPlantIds.includes(plant.id)
                            const addKey  = `${plant.id}-${area.id}`
                            const isAdding = addingToArea === addKey

                            return (
                              <div
                                key={plant.id}
                                className="flex items-center gap-3 p-3 bg-gray-50/60 rounded-2xl border border-gray-100"
                              >
                                <div className="w-10 h-10 flex-shrink-0">
                                  <PlantThumbnail plant={plant} size="sm" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-black uppercase text-green-950 leading-none truncate">
                                    {plant.common_name}
                                  </p>
                                  <p className="text-[9px] text-gray-400 font-bold uppercase italic mt-0.5">
                                    {matchLabel || plant.plant_type}
                                  </p>
                                </div>

                                {inPlan ? (
                                  <span className="text-[8px] font-black uppercase tracking-widest text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full shrink-0">
                                    In Plan
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleAddToAreaPlan(plant.id, area.id)}
                                    disabled={isAdding}
                                    className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-white bg-green-800 px-3 py-1.5 rounded-full shrink-0 active:scale-95 transition-all disabled:opacity-50"
                                  >
                                    {isAdding ? '…' : <><Plus size={9} strokeWidth={3} /> Plan</>}
                                  </button>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {!isPro && (
          <section className="mb-10">
            <LockedProFeatureCard
              icon="📋"
              title="Planting Plan Export"
              description="Coming soon — export your garden areas and plans as a shareable PDF."
            />
          </section>
        )}

        {/* Section divider before standalone matchmaker */}
        <div className="border-t border-green-900/5 mb-10" />
        <div className="mb-8 text-center space-y-1">
          <p className="text-[10px] font-black text-green-900/30 uppercase tracking-[0.3em]">
            Plant Finder
          </p>
          <p className="text-[11px] text-gray-400 font-medium max-w-xs mx-auto leading-snug">
            Explore plants by conditions — a quick tool alongside your garden areas.
          </p>
        </div>

        {/* ══ EXISTING MATCHMAKER SLIDERS (unchanged) ═════════════════════════ */}
        <div className="space-y-10 mb-12">

          {/* SUN */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <Sun size={14} /> Sun Exposure
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {SUN_OPTIONS[sunIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SUN_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{ backgroundImage: `url("${url}")`, opacity: sunIdx === i ? 1 : 0 }} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
              <input type="range" min="0" max="2" step="1" value={sunIdx}
                onChange={(e) => setSunIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* SOIL */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <Shovel size={14} /> Soil Type
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {SOIL_OPTIONS[soilIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SOIL_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{ backgroundImage: `url("${url}")`, opacity: soilIdx === i ? 1 : 0 }} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
              <input type="range" min="0" max="3" step="1" value={soilIdx}
                onChange={(e) => setSoilIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* DRAINAGE */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <Droplets size={14} /> Drainage
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {WATER_OPTIONS[waterIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {WATER_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{ backgroundImage: `url("${url}")`, opacity: waterIdx === i ? 1 : 0 }} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
              <input type="range" min="0" max="3" step="1" value={waterIdx}
                onChange={(e) => setWaterIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* MATURE SIZE */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <Ruler size={14} /> Mature Size
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {SIZE_OPTIONS[sizeIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-white">
              {SIZE_IMAGES.map((url, i) => (
                <div key={i}
                  className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-all duration-500 ease-out"
                  style={{
                    backgroundImage: `url("${url}")`,
                    opacity: sizeIdx === i ? 1 : 0,
                    transform: sizeIdx === i ? 'scale(1)' : 'scale(0.9)',
                  }}
                />
              ))}
              <input type="range" min="0" max="3" step="1" value={sizeIdx}
                onChange={(e) => setSizeIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-green-900/10 rounded-full appearance-none cursor-pointer accent-green-900 z-10" />
            </div>
          </div>

          {/* SLOPE */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <TrendingUp size={14} /> Slope
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {SLOPE_LABELS[slopeIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SLOPE_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{ backgroundImage: `url("${url}")`, opacity: slopeIdx === i ? 1 : 0 }} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
              <input type="range" min="0" max="3" step="1" value={slopeIdx}
                onChange={(e) => setSlopeIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>
        </div>

        {/* ── Results list (unchanged) ─────────────────────────────────────── */}
        <section className="relative pt-8 border-t border-green-900/5">
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-[10px] font-black text-green-900 uppercase tracking-[0.2em]">
              All Matches ({matches.length})
            </h3>
            {loading && (
              <div className="w-4 h-4 border-2 border-green-900/20 border-t-green-900 rounded-full animate-spin" />
            )}
          </div>
          <div className="space-y-3">
            {matches.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlant(p)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-[2rem] border border-transparent shadow-sm active:scale-[0.98] transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0">
                    <PlantThumbnail plant={p} size="sm" />
                  </div>
                  <div>
                    <span className="font-black text-green-950 text-sm uppercase block leading-none mb-1">
                      {p.common_name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase italic">
                      {p.plant_type}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* ── Existing plant detail modal (unchanged) ──────────────────────────── */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          <div
            className="absolute inset-0 bg-green-950/60 backdrop-blur-sm"
            onClick={() => setSelectedPlant(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-8 overflow-hidden animate-in slide-in-from-bottom-10">
            <button
              onClick={() => setSelectedPlant(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-400"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden mb-4 shadow-xl">
                <PlantThumbnail plant={selectedPlant} size="lg" />
              </div>
              <h2 className="text-2xl font-black text-green-950 uppercase italic leading-none">
                {selectedPlant.common_name}
              </h2>
              <p className="text-xs font-bold text-gray-400 uppercase italic mt-2">
                {selectedPlant.botanical_name}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#f0f4f1] p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Growth</p>
                <p className="text-sm font-bold text-green-950">
                  {selectedPlant.mature_size?.[0] || SIZE_OPTIONS[sizeIdx]}
                </p>
              </div>
              <div className="bg-[#f0f4f1] p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Type</p>
                <p className="text-sm font-bold text-green-950">
                  {selectedPlant.plant_type || 'Shrub'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAddToProject(selectedPlant.id)}
              className="w-full bg-amber-400 text-green-950 font-black uppercase py-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
              <Plus size={16} strokeWidth={3} /> Add to Project
            </button>
          </div>
        </div>
      )}

      {/* ── Garden Area form overlay ─────────────────────────────────────────── */}
      {showAreaForm && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
          <div
            className="absolute inset-0 bg-green-950/60 backdrop-blur-sm"
            onClick={() => { if (!savingArea) setShowAreaForm(false) }}
          />
          <div className="relative w-full max-w-lg bg-white rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl max-h-[95vh] overflow-y-auto animate-in slide-in-from-bottom-10">

            {/* Sticky header */}
            <div className="sticky top-0 bg-white z-10 px-7 pt-7 pb-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-black text-green-950 uppercase italic tracking-tight">
                {editingArea ? 'Edit Area' : 'New Garden Area'}
              </h2>
              <button
                onClick={() => { if (!savingArea) setShowAreaForm(false) }}
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 active:scale-90 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form body */}
            <div className="px-7 py-6 space-y-8">

              {/* Pre-fill notice when arriving from Feature Garden */}
              {initialStyle && !editingArea && (
                <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3 text-[11px] text-green-700 font-medium leading-snug">
                  Style pre-filled from a Feature Garden. Set conditions and give your area a name to save it.
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Area Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Back Fence, Shady Corner, Balcony Pots"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-200 transition-colors"
                />
              </div>

              {/* Condition sliders */}
              <FormSlider
                label="Sun Exposure" icon={<Sun size={12} />}
                options={SUN_OPTIONS} images={SUN_IMAGES}
                value={formSunIdx} onChange={setFormSunIdx}
              />
              <FormSlider
                label="Soil Type" icon={<Shovel size={12} />}
                options={SOIL_OPTIONS} images={SOIL_IMAGES}
                value={formSoilIdx} onChange={setFormSoilIdx}
              />
              <FormSlider
                label="Drainage" icon={<Droplets size={12} />}
                options={WATER_OPTIONS} images={WATER_IMAGES}
                value={formWaterIdx} onChange={setFormWaterIdx}
              />
              <FormSlider
                label="Mature Size" icon={<Ruler size={12} />}
                options={SIZE_OPTIONS} images={SIZE_IMAGES}
                value={formSizeIdx} onChange={setFormSizeIdx}
                imgContain
              />
              <FormSlider
                label="Slope" icon={<TrendingUp size={12} />}
                options={SLOPE_OPTIONS} optionLabels={SLOPE_LABELS} images={SLOPE_IMAGES}
                value={formSlopeIdx} onChange={setFormSlopeIdx}
              />

              <OptionChips
                label="Style"
                optional
                options={GARDEN_AREA_STYLE_OPTIONS}
                value={formStyle}
                onChange={setFormStyle}
              />

              <OptionChips
                label="Goal"
                optional
                options={GARDEN_AREA_GOAL_OPTIONS}
                value={formGoal}
                onChange={setFormGoal}
              />

              {/* Notes */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Notes{' '}
                  <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Currently overgrown, needs clearing first"
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium text-gray-700 placeholder:text-gray-300 outline-none focus:border-green-200 transition-colors resize-none"
                />
              </div>

              {/* Save */}
              <button
                onClick={handleSaveArea}
                disabled={savingArea || !formName.trim()}
                className="w-full bg-green-900 text-white font-black uppercase py-5 rounded-2xl text-[11px] tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                {savingArea
                  ? 'Saving…'
                  : editingArea
                  ? 'Save Changes'
                  : 'Create Area'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default function MatchPage() {
  return (
    <Suspense>
      <MatchPageInner />
    </Suspense>
  )
}
