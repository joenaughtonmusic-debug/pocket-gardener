'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { createSupabaseBrowserClient } from '../../lib/supabaseClient'
import Link from 'next/link'
import { Pencil, Camera, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react'
import PlantThumbnail from '../../../components/PlantThumbnail'
import WelcomeOverlay from '../../../components/WelcomeOverlay'
import UpgradeButton from '../../../components/UpgradeButton'
import LockedProFeatureCard from '../../../components/LockedProFeatureCard'
import GardenAreaBadge from '../../../components/GardenAreaBadge'
import GardenAreaAssignSelect from '../../../components/GardenAreaAssignSelect'
import GardenAreaSummaryCard from '../../../components/GardenAreaSummaryCard'
import DiagnoseProblemModal from '../../../components/DiagnoseProblemModal'
import { resolveAreaName, GENERAL_GARDEN_LABEL } from '../../../lib/gardenAreas'
import type { UserPlant, PlantRemedy, GardenArea } from '../../../types/garden'
import { trackEvent } from '../../../lib/analytics/trackEvent'
import { enrichShoppingForIssue, prettySupplyTag } from '../../../lib/taskSupplies'

// ── Garden Coach types ────────────────────────────────────────────────────────
interface CoachAction {
  label: string
  description?: string
  href: string
  initialSearch?: string
  plantName?: string
}
interface CoachResult {
  reply: string
  intent: string
  actions: CoachAction[]
  outOfScope: boolean
}

const COACH_EXAMPLES = [
  "What should I plant by my fence?",
  "Why are my lemon leaves yellow?",
  "Can I plant camellia in full sun?",
  "When should I trim griselinia?",
]


/**
 * Normalise plant name variants so "ficus tuffi" and "ficus tuffy" both map to
 * the same token, "lemon" and "citrus" both collapse to "lemon tree", etc.
 * This is applied to both the needle (API-returned plantName) and the haystack
 * (ownedPlants common_name / nickname) before the containment check.
 */
function normalisePlantName(s: string): string {
  return s
    .toLowerCase()
    .replace(/\bficus\s+tuffy?\b/g,  'ficus tuffy')
    .replace(/\bficus\s+tuffi\b/g,   'ficus tuffy')
    .replace(/\bbox\s+hedge\b/g,     'buxus')
    .replace(/\bboxwood\b/g,         'buxus')
    .replace(/\bcitrus\b/g,          'lemon tree')
    .replace(/\bphormium\b/g,        'flax')
    .replace(/\bharakeke\b/g,        'flax')
    .replace(/\btree\s+fern\b/g,     'ponga')
    .replace(/\bstrelitzia\b/g,      'bird of paradise')
    .replace(/\btrachelospermum\b/g, 'star jasmine')
    .trim()
}

/**
 * Try to find a plant in the user's garden that matches the given plant name.
 * Matching is case-insensitive and handles common name variants / aliases.
 */
function findOwnedPlantByName(plantName: string, plants: UserPlant[]): UserPlant | undefined {
  const needle = normalisePlantName(plantName)
  if (!needle) return undefined
  return plants.find((p) => {
    const candidates = [p.nickname, p.plants?.common_name]
      .filter((n): n is string => Boolean(n))
      .map(normalisePlantName)
    return candidates.some((c) => c.includes(needle) || needle.includes(c))
  })
}

export default function MyGardenDashboard() {
  const [ownedPlants, setOwnedPlants] = useState<UserPlant[]>([])
  const [projectPlants, setProjectPlants] = useState<UserPlant[]>([])
  const [gardenAreas, setGardenAreas] = useState<GardenArea[]>([])
  const [followUpAlerts, setFollowUpAlerts] = useState<any[]>([])
  const [featuredTip, setFeaturedTip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [userName, setUserName] = useState<string>("Gardener")
  const [gardenPhoto, setGardenPhoto] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isPro, setIsPro] = useState(false)

  const [showIssueModal, setShowIssueModal] = useState(false)
  const [issueSearchQuery, setIssueSearchQuery] = useState("")
  const [selectedUnhealthyPlant, setSelectedUnhealthyPlant] = useState<UserPlant | null>(null)
  const [remedies, setRemedies] = useState<PlantRemedy[]>([])
  const [loadingRemedies, setLoadingRemedies] = useState(false)
  const [savingIssue, setSavingIssue] = useState(false)

  const [allRemedies, setAllRemedies] = useState<PlantRemedy[] | null>(null)
  const [symptomLoading, setSymptomLoading] = useState(false)

  const [coachInput,   setCoachInput]   = useState('')
  const [coachLoading, setCoachLoading] = useState(false)
  const [coachResult,  setCoachResult]  = useState<CoachResult | null>(null)
  const [coachError,   setCoachError]   = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = months[new Date().getMonth()];

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'Summer': return '☀️';
      case 'Autumn': return '🍂';
      case 'Winter': return '❄️';
      case 'Spring': return '🌱';
      default: return '💡';
    }
  };

  const getSeasonName = (m: number) => {
    if ([7, 8, 9].includes(m)) return 'Spring';
    if ([10, 11, 0].includes(m)) return 'Summer';
    if ([1, 2, 3].includes(m)) return 'Autumn';
    return 'Winter';
  };

  async function getGarden() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUserName(user.user_metadata?.display_name || "Gardener")
        setGardenPhoto(user.user_metadata?.garden_photo || null)

        const [profileRes, plantsRes, areasRes] = await Promise.all([
          supabase.from('profiles').select('is_pro').eq('id', user.id).maybeSingle(),
          supabase
            .from('user_plants')
            .select(`id, plant_id, is_project, garden_area_id, nickname, is_sick, current_issue, current_remedy, current_shopping_tags, plants (*)`)
            .eq('user_id', user.id),
          supabase
            .from('garden_areas')
            .select('id, name')
            .eq('user_id', user.id),
        ]);

        if (areasRes.data) setGardenAreas(areasRes.data as GardenArea[]);

        if (profileRes.data) setIsPro(profileRes.data.is_pro);

        if (plantsRes.data) {
          const plants = plantsRes.data as any[];
          const sorted = [...plants].sort((a, b) => 
            (a.plants?.common_name || "").localeCompare(b.plants?.common_name || "")
          );

          setOwnedPlants(sorted.filter(p => !p.is_project));
          setProjectPlants(sorted.filter(p => p.is_project));

          const ownedIds = plants.filter(p => !p.is_project).map(p => p.plant_id);
          if (ownedIds.length > 0) {
            const season = getSeasonName(new Date().getMonth());
            supabase.from('expert_tips')
              .select('*, plants(common_name)')
              .in('plant_id', ownedIds)
              .or(`season.eq.${season},season.eq.Any`)
              .limit(1)
              .maybeSingle()
              .then(({ data }) => { if (data) setFeaturedTip(data); });
          }
        }

        const thirtyDaysAgo = new Date(); 
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: logs } = await supabase.from('plant_logs')
          .select(`*, user_plants (plants (common_name, id, image_url, plant_type))`)
          .eq('user_id', user.id)
          .eq('status', 'Ongoing')
          .lte('created_at', thirtyDaysAgo.toISOString());

        if (logs) setFollowUpAlerts(logs);
      }
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    getGarden(); 
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#diagnose') return
    setSelectedUnhealthyPlant(null)
    setIssueSearchQuery('')
    supabase.from('plant_remedies').select('*').then(({ data }) => {
      setAllRemedies((data ?? []) as PlantRemedy[])
      setShowIssueModal(true)
    })
  }, [supabase])

  async function handleAssignPlantArea(userPlantId: string, areaId: string | null) {
    const { error } = await supabase
      .from('user_plants')
      .update({ garden_area_id: areaId })
      .eq('id', userPlantId)

    if (error) {
      console.error('Error assigning garden area:', error)
      return
    }

    const patch = { garden_area_id: areaId }
    setOwnedPlants((prev) =>
      prev.map((p) => (p.id === userPlantId ? { ...p, ...patch } : p)),
    )
    setProjectPlants((prev) =>
      prev.map((p) => (p.id === userPlantId ? { ...p, ...patch } : p)),
    )
  }

  async function handleResolveIssue(logId: string | null, plantName: string, userPlantId?: string) {
    if (logId) {
      await supabase
        .from('plant_logs')
        .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
        .eq('id', logId)
    }

    if (userPlantId) {
      const { error: plantError } = await supabase
        .from('user_plants')
        .update({
          is_sick: false,
          current_issue: null,
          current_remedy: null,
          current_shopping_tags: null,
        })
        .eq('id', userPlantId)

      if (!plantError) {
        setOwnedPlants((prev) =>
          prev.map((plant) =>
            plant.id === userPlantId ? { ...plant, is_sick: false } : plant
          )
        )
      }
    }

    alert(`Great news about your ${plantName}!`)
    setFollowUpAlerts((prev) => prev.filter((alert) => alert.id !== logId))
    getGarden()
  }

  async function openIssueModalForPlant(item: UserPlant, initialSearch?: string) {
    setSelectedUnhealthyPlant(item)
    setIssueSearchQuery(initialSearch ?? "")
    setShowIssueModal(true)
    setLoadingRemedies(true)

    const { data, error } = await supabase
      .from('plant_remedies')
      .select('*')
      .or(`specific_plant_id.eq.${item.plant_id},is_universal.eq.true`)

    if (error) {
      console.error('Error loading remedies:', error)
      setRemedies([])
    } else {
      setRemedies((data ?? []) as PlantRemedy[])
    }

    setLoadingRemedies(false)
  }

  function closeIssueModal() {
    setShowIssueModal(false)
    setIssueSearchQuery("")
    setSelectedUnhealthyPlant(null)
    setRemedies([])
  }

  async function handleToggleUnhealthy(item: UserPlant, checked: boolean) {
  if (checked) {
    // Do not mark the plant as sick yet.
    // Only open the issue picker.
    await openIssueModalForPlant(item)
    return
  }

  const { error } = await supabase
    .from('user_plants')
    .update({
      is_sick: false,
      current_issue: null,
      current_remedy: null,
      current_shopping_tags: null,
    })
    .eq('id', item.id)

  if (!error) {
    // Resolve Ongoing logs so the sick-followup cron won't ping for this plant.
    await supabase
      .from('plant_logs')
      .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
      .eq('user_plant_id', item.id)
      .eq('status', 'Ongoing')

    setOwnedPlants((prev) =>
      prev.map((plant) => (plant.id === item.id ? { ...plant, is_sick: false } : plant))
    )
    getGarden()
  }
}

  async function handleSelectIssue(remedy: PlantRemedy, targetPlant: UserPlant) {
    setSavingIssue(true)

    const remedyText = remedy.remedy_title && remedy.remedy_description
      ? `${remedy.remedy_title}: ${remedy.remedy_description}`
      : remedy.remedy_description || remedy.remedy_title || null

    const enrichedShopping = enrichShoppingForIssue({
      issue: remedy.issue_type,
      remedy: remedyText,
      plantName: targetPlant.plants?.common_name,
      existing: remedy.shopping_tags ?? [],
    })

    const { data: { user } } = await supabase.auth.getUser()

    // Close any prior Ongoing logs before opening a new one — prevents duplicate
    // plant_logs rows accumulating when the user re-diagnoses the same plant.
    await supabase
      .from('plant_logs')
      .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
      .eq('user_plant_id', targetPlant.id)
      .eq('status', 'Ongoing')

    const [updateRes, logRes] = await Promise.all([
      supabase
        .from('user_plants')
        .update({
          is_sick: true,
          current_issue: remedy.issue_type,
          current_remedy: remedyText,
          current_shopping_tags: enrichedShopping,
        })
        .eq('id', targetPlant.id),
      supabase
        .from('plant_logs')
        .insert([{
          user_id: user?.id,
          user_plant_id: targetPlant.id,
          issue_type: remedy.issue_type,
          status: 'Ongoing',
        }])
    ])

    if (updateRes.error) {
      console.error('Error updating unhealthy plant:', updateRes.error)
    } else {
      setOwnedPlants((prev) =>
        prev.map((plant) =>
          plant.id === targetPlant.id ? { ...plant, is_sick: true } : plant
        )
      )
    }
    if (logRes.error) {
      console.error('Error inserting plant log:', logRes.error)
    }

    setSavingIssue(false)
    closeIssueModal()
    getGarden()
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

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
      setUploading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const ext = file.name.split('.').pop() ?? 'jpg'
      const filePath = `${user.id}/garden-${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('user-plant-photos')
        .upload(filePath, file, { upsert: false })
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('user-plant-photos')
        .getPublicUrl(filePath)

      await supabase.auth.updateUser({ data: { garden_photo: publicUrl } })
      setGardenPhoto(publicUrl)
    } catch (err) {
      alert('Error uploading photo')
    } finally {
      setUploading(false)
    }
  };

  const handleBulkMove = async () => {
    const { error } = await supabase
      .from('user_plants')
      .update({ is_project: false })
      .in('id', selectedIds)

    if (!error) { 
      setSelectedIds([]); 
      getGarden(); 
    }
  }


  if (loading) return (
    <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-20 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-green-800/20 border-t-green-800 rounded-full animate-spin"></div>
        <p className="text-green-800 font-black uppercase text-[10px] tracking-widest">Loading Your Garden...</p>
      </div>
    </div>
  )

  const areaMap = new Map(gardenAreas.map((a) => [a.id, a.name]));

  // Group owned plants by Garden Area.
  // When areas exist: one group per area (plants-only, skipping empty areas),
  // then a "General Garden" group for any unassigned plants.
  // When no areas: single flat group so the render path stays uniform.
  interface AreaGroup { areaId: string | null; areaName: string; plants: typeof ownedPlants }
  const plantsByArea: AreaGroup[] = gardenAreas.length > 0
    ? [
        ...gardenAreas
          .map(area => ({
            areaId: area.id,
            areaName: area.name,
            plants: ownedPlants.filter(p => p.garden_area_id === area.id),
          }))
          .filter(g => g.plants.length > 0),
        ...(ownedPlants.some(p => !p.garden_area_id)
          ? [{ areaId: null, areaName: GENERAL_GARDEN_LABEL, plants: ownedPlants.filter(p => !p.garden_area_id) }]
          : []),
      ]
    : [{ areaId: null, areaName: GENERAL_GARDEN_LABEL, plants: ownedPlants }];

  // Same grouping for project plants.
  const projectsByArea: AreaGroup[] = gardenAreas.length > 0
    ? [
        ...gardenAreas
          .map(area => ({
            areaId: area.id,
            areaName: area.name,
            plants: projectPlants.filter(p => p.garden_area_id === area.id),
          }))
          .filter(g => g.plants.length > 0),
        ...(projectPlants.some(p => !p.garden_area_id)
          ? [{ areaId: null, areaName: GENERAL_GARDEN_LABEL, plants: projectPlants.filter(p => !p.garden_area_id) }]
          : []),
      ]
    : [{ areaId: null, areaName: GENERAL_GARDEN_LABEL, plants: projectPlants }];

  async function fetchAllRemedies() {
    if (allRemedies !== null) return
    setSymptomLoading(true)
    const { data } = await supabase.from('plant_remedies').select('*')
    setAllRemedies((data ?? []) as PlantRemedy[])
    setSymptomLoading(false)
  }

  function openGenericDiagnoseModal(initialSearch?: string) {
    setSelectedUnhealthyPlant(null)
    setIssueSearchQuery(initialSearch ?? '')
    fetchAllRemedies()
    setShowIssueModal(true)
  }

  /**
   * Open the diagnosis modal from a Garden Coach action.
   * When plantName is provided, try to match an owned plant and open in plant mode.
   * Falls back to generic mode with an optional initialSearch if no match is found.
   */
  async function openDiagnoseFromCoach(opts: { initialSearch?: string; plantName?: string }) {
    const { initialSearch, plantName } = opts
    if (plantName) {
      const match = findOwnedPlantByName(plantName, ownedPlants)
      if (match) {
        await openIssueModalForPlant(match, initialSearch)
        return
      }
    }
    openGenericDiagnoseModal(initialSearch)
  }

  async function handleCoachSubmit() {
    const message = coachInput.trim()
    if (!message || coachLoading) return

    setCoachLoading(true)
    setCoachError(null)
    setCoachResult(null)

    try {
      const res = await fetch('/api/garden-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const data: CoachResult = await res.json()

      if (!res.ok) {
        setCoachError('Something went wrong. Please try again.')
        return
      }

      setCoachResult(data)
      trackEvent('garden_coach_question_submitted', {
        intent: data.intent,
        source: 'dashboard',
      })
    } catch {
      setCoachError('Something went wrong. Please try again.')
    } finally {
      setCoachLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40 text-gray-900">
      <WelcomeOverlay />

      <section className="relative h-[47vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl shadow-green-900/20 mb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-10" />

        <img
          src={gardenPhoto || "https://pristinegardens.co.nz/wp-content/uploads/2022/07/20220115_152342.jpg"}
          alt="My Garden"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 pt-10">
          <div className="flex justify-end">
            <Link href="/about" className="group flex flex-col items-center gap-1.5 active:scale-95 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl border-2 border-white/50 shadow-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                <img 
                  src="/pglogo.png" 
                  alt="Pocket Gardener Logo"
                  className="w-9 h-9 object-contain" 
                />
              </div>
              <span className="text-[7px] font-black text-white uppercase tracking-[0.2em] [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                Profile
              </span>
            </Link>
          </div>

          <div className="pb-4">
            <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase leading-none mb-3 [text-shadow:_0_2px_10px_rgb(0_0_0_/_30%)]">
              My Garden
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/90">
                  {userName}
                </p>
                <button 
                  onClick={async () => {
                    const n = window.prompt("Name:", userName); 
                    if (n) { 
                      await supabase.auth.updateUser({ data: { display_name: n } }); 
                      getGarden(); 
                    }
                  }} 
                  className="text-green-400 hover:scale-110 transition-transform"
                >
                  <Pencil size={10} strokeWidth={3} />
                </button>
              </div>

              {isPro && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-green-500 p-2.5 rounded-full text-white shadow-lg active:scale-90 transition-all border border-green-400"
                >
                  <Camera size={14} strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </div>

        <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
        
        {uploading && (
          <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-3">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Saving View...</span>
          </div>
        )}
      </section>

      <div className="px-6 space-y-8">

        {/* ── 1. Garden Coach ──────────────────────────────────────────── */}
        <section id="diagnose" className="space-y-3 scroll-mt-24">
          <div className="px-1">
            <h2 className="text-xl font-black text-green-950 uppercase italic tracking-tighter leading-none">
              Garden Coach
            </h2>
            <p className="text-[12px] text-gray-500 font-medium mt-1">
              Ask what to plant, what&apos;s wrong, or what to do next.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5 space-y-4">
            {/* Input row */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. What should I plant along my fence?"
                value={coachInput}
                onChange={(e) => setCoachInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCoachSubmit() }}
                disabled={coachLoading}
                className="flex-1 min-w-0 bg-[#f0f4f1] border border-transparent rounded-full px-5 py-3 text-[13px] font-medium text-gray-800 placeholder:text-gray-400 outline-none focus:border-green-200 transition-colors disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleCoachSubmit}
                disabled={coachLoading || !coachInput.trim()}
                className="shrink-0 bg-green-900 text-white px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest active:scale-[0.97] transition-all disabled:opacity-40 flex items-center gap-2"
              >
                {coachLoading
                  ? <Loader2 size={13} strokeWidth={3} className="animate-spin" />
                  : 'Ask'}
              </button>
            </div>

            {/* Example prompt chips — shown before first submit */}
            {!coachResult && !coachLoading && (
              <div className="flex flex-wrap gap-2">
                {COACH_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setCoachInput(ex)}
                    className="text-[10px] font-bold text-green-800/70 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full active:bg-green-100 transition-colors leading-none"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            )}

            {/* Error state */}
            {coachError && (
              <p className="text-[11px] text-red-500 font-medium px-1">{coachError}</p>
            )}

            {/* Loading skeleton */}
            {coachLoading && (
              <div className="space-y-2 pt-1">
                <div className="h-3 bg-gray-100 rounded-full w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded-full w-1/2 animate-pulse" />
              </div>
            )}

            {/* Response */}
            {coachResult && !coachLoading && (
              <div className="space-y-4 border-t border-gray-50 pt-4">
                <p className={`text-[13px] font-medium leading-relaxed ${coachResult.outOfScope ? 'text-orange-700' : 'text-gray-700'}`}>
                  {coachResult.reply}
                </p>

                {coachResult.actions.length > 0 && (
                  <div className="space-y-2">
                    {coachResult.actions.map((action, i) => {
                      const isDiagnose =
                        action.href === '/dashboard#diagnose' ||
                        action.href === '#diagnose'
                      const cls = `flex items-center justify-between gap-3 w-full px-5 py-3.5 rounded-[1.25rem] text-[11px] font-black uppercase tracking-widest active:scale-[0.98] transition-all ${
                        i === 0
                          ? 'bg-green-900 text-white shadow-sm'
                          : 'bg-[#f0f4f1] text-green-900 border border-gray-100'
                      }`
                      const inner = (
                        <>
                          <span>{action.label}</span>
                          <ArrowRight size={12} strokeWidth={3} className={i === 0 ? 'text-green-300' : 'text-gray-400'} />
                        </>
                      )
                      if (isDiagnose) {
                        return (
                          <button
                            key={action.href + i}
                            type="button"
                            onClick={() => openDiagnoseFromCoach({ initialSearch: action.initialSearch, plantName: action.plantName })}
                            className={cls}
                          >
                            {inner}
                          </button>
                        )
                      }
                      return (
                        <Link key={action.href + i} href={action.href} className={cls}>
                          {inner}
                        </Link>
                      )
                    })}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => { setCoachResult(null); setCoachInput(''); setCoachError(null) }}
                  className="text-[10px] font-black uppercase tracking-widest text-gray-400 active:text-gray-600 transition-colors"
                >
                  Ask another question
                </button>
              </div>
            )}
          </div>

          {/* Fallback quick links — always visible */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-2">
            <Link href="/match" className="text-[10px] font-black uppercase tracking-widest text-green-700/60 active:text-green-800 transition-colors">
              Find plants
            </Link>
            <button
              type="button"
              onClick={() => openGenericDiagnoseModal()}
              className="text-[10px] font-black uppercase tracking-widest text-green-700/60 active:text-green-800 transition-colors"
            >
              Diagnose a problem
            </button>
            <Link href="/visualise" className="text-[10px] font-black uppercase tracking-widest text-green-700/60 active:text-green-800 transition-colors">
              Visualise
            </Link>
            <Link href="/calendar" className="text-[10px] font-black uppercase tracking-widest text-green-700/60 active:text-green-800 transition-colors">
              Calendar
            </Link>
          </div>
        </section>

        {/* ── 2. Empty state — no plants yet ────────────────────────────── */}
        {ownedPlants.length === 0 && !loading && (
          <section>
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm text-center space-y-3">
              <p className="text-2xl">🌱</p>
              <h3 className="text-sm font-black text-green-950 uppercase tracking-tight">
                Your garden starts here
              </h3>
              {gardenAreas.length === 0 ? (
                <>
                  <p className="text-[12px] text-gray-400 leading-relaxed font-medium max-w-xs mx-auto">
                    Create areas like Front Garden, Back Fence, Patio Pots or Veggie Patch. Add plants now, or come back later when you&apos;re ready.
                  </p>
                  <Link
                    href="/match"
                    className="inline-block mt-2 bg-green-900 text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-full shadow-sm active:scale-95 transition-all"
                  >
                    Create My First Garden Area
                  </Link>
                  <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest pt-1">
                    or{' '}
                    <Link href="/plants" className="underline underline-offset-2">
                      browse the plant library
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[12px] text-gray-400 leading-relaxed font-medium max-w-xs mx-auto">
                    You have {gardenAreas.length} garden {gardenAreas.length === 1 ? 'area' : 'areas'} set up. Now add the plants you already have growing — or browse the Library to discover new ones.
                  </p>
                  <Link
                    href="/plants"
                    className="inline-block mt-2 bg-green-900 text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-full shadow-sm active:scale-95 transition-all"
                  >
                    Browse the Plant Library
                  </Link>
                </>
              )}
            </div>
          </section>
        )}

        {/* ── 4. My Garden — area-grouped plant list ────────────────────── */}
        {ownedPlants.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[10px] font-black text-green-800/40 uppercase tracking-[0.2em]">
                My Garden
              </h2>
              <Link
                href="#garden-areas"
                className="text-[8px] font-black uppercase tracking-widest text-green-700"
              >
                {gardenAreas.length > 0 ? 'Manage areas →' : 'Add areas →'}
              </Link>
            </div>

            <div className="pt-2 space-y-10">
              {plantsByArea.map((group) => (
                <div key={group.areaId ?? 'general'} className="space-y-4">
                  <h3 className="text-[12px] font-black text-green-800/40 uppercase tracking-[0.3em] px-2 flex items-center gap-3">
                    <span>{group.areaName}</span>
                    <span className="h-[1px] bg-green-200 flex-grow" />
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {group.plants.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/60 p-4 rounded-[2rem] border border-white shadow-sm"
                      >
                        <Link
                          href={`/plants/${item.plants?.id}?mode=my-garden`}
                          className="flex items-center justify-between hover:bg-white transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <PlantThumbnail plant={item.plants} size="sm" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-s font-black text-green-950 uppercase leading-none truncate">
                                {item.nickname || item.plants?.common_name || 'Unknown Plant'}
                              </h4>
                              {item.plants?.plant_type && (
                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                                  {item.plants.plant_type}
                                </p>
                              )}
                            </div>
                          </div>
                          <ArrowRight size={12} className="text-gray-300" />
                        </Link>

                        <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                          <GardenAreaAssignSelect
                            value={item.garden_area_id}
                            areas={gardenAreas}
                            onChange={(areaId) => handleAssignPlantArea(item.id, areaId)}
                          />
                          <label
                            className={`flex items-center gap-2 text-[10px] uppercase tracking-wider rounded-full px-3 py-2 border transition-all active:scale-[0.98] cursor-pointer ${
                              item.is_sick
                                ? 'bg-red-50 border-red-100 text-red-600 font-black'
                                : 'bg-gray-50 border-gray-100 text-gray-400 font-bold active:bg-red-50 active:text-red-500'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={item.is_sick || false}
                              onChange={(e) => handleToggleUnhealthy(item, e.target.checked)}
                              className="accent-red-500"
                            />
                            Plant is unhealthy
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 5. Infirmary — sick plants ────────────────────────────────── */}
        {ownedPlants.some(p => p.is_sick) && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
              <span>Infirmary</span>
              <span className="text-gray-300 font-normal">—</span>
              <span className="text-gray-400">{ownedPlants.filter(p => p.is_sick).length} plants</span>
            </h2>
            <div className="space-y-3">
              {ownedPlants.filter(p => p.is_sick).map((item) => (
                <div key={item.id} className="bg-white rounded-[2.5rem] border-2 border-red-50 overflow-hidden">
                  <div className="h-1 w-full bg-red-300" />
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <PlantThumbnail plant={item.plants} size="sm" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-black text-green-950 uppercase leading-none truncate">
                          {item.nickname || item.plants?.common_name || 'Unknown Plant'}
                        </h3>
                        {item.current_issue && (
                          <span className="mt-1.5 inline-block text-[9px] font-black uppercase tracking-widest text-red-500 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full">
                            {item.current_issue}
                          </span>
                        )}
                        <div className="mt-1.5">
                          <GardenAreaBadge name={resolveAreaName(item.garden_area_id, areaMap)} />
                        </div>
                      </div>
                    </div>

                    {item.current_remedy && (
                      <p className="text-[11px] text-gray-600 leading-relaxed font-medium border-l-2 border-red-100 pl-3">
                        {item.current_remedy}
                      </p>
                    )}

                    {(() => {
                      const supplyTags = enrichShoppingForIssue({
                        issue: item.current_issue,
                        remedy: item.current_remedy,
                        plantName: item.plants?.common_name,
                        existing: item.current_shopping_tags ?? [],
                      })
                      if (supplyTags.length === 0) return null
                      return (
                        <div className="flex flex-wrap gap-2">
                          {supplyTags.map((tag) => (
                            <span key={tag} className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">
                              {prettySupplyTag(tag)}
                            </span>
                          ))}
                        </div>
                      )
                    })()}

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          const matchingAlert = followUpAlerts.find(a => a.user_plant_id === item.id)
                          handleResolveIssue(
                            matchingAlert?.id ?? null,
                            item.plants?.common_name || 'plant',
                            item.id
                          )
                        }}
                        className="flex-1 bg-green-800 py-3 rounded-2xl text-[9px] font-black uppercase text-white shadow-sm active:scale-95 transition-all"
                      >
                        Recovered
                      </button>
                      <Link
                        href={`/plants/${item.plants?.id}?mode=my-garden`}
                        className="flex-1 bg-red-50 border border-red-100 py-3 rounded-2xl text-[9px] font-black uppercase text-red-600 text-center active:scale-95 transition-all"
                      >
                        Remedies
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 5b. Priority Follow-up — overdue issue check-ins ─────────── */}
        {followUpAlerts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <AlertCircle size={14} className="text-amber-500" strokeWidth={3} />
              <h2 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">Priority Follow-up</h2>
            </div>
            {followUpAlerts.map((alert) => {
              const sickPlant = ownedPlants.find((p) => p.id === alert.user_plant_id)
              return (
              <div key={alert.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-amber-100 shadow-xl shadow-amber-900/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
                <div className="flex gap-4 mb-4">
                  <PlantThumbnail plant={alert.user_plants?.plants} size="sm" />
                  <div>
                    <h3 className="text-sm font-black text-green-950 uppercase leading-tight">{alert.user_plants?.plants?.common_name}</h3>
                    <p className="text-[10px] text-amber-600 mt-1 font-black uppercase tracking-widest italic">{alert.issue_type} check-in</p>
                  </div>
                </div>
                {sickPlant?.current_remedy && (
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium border-l-2 border-amber-100 pl-3 mb-4">
                    {sickPlant.current_remedy}
                  </p>
                )}
                <p className="text-[10px] text-gray-400 font-medium italic mb-4">
                  Check whether this plant has improved. Repeat treatment if needed, or mark as recovered.
                </p>
                <div className="flex gap-2">
                  <button onClick={() => handleResolveIssue(alert.id, alert.user_plants?.plants?.common_name, alert.user_plant_id)} className="flex-1 bg-green-800 py-3 rounded-2xl text-[9px] font-black uppercase text-white shadow-lg active:scale-95 transition-all">
                    Recovered!
                  </button>
                  <Link href={`/plants/${alert.user_plants?.plants?.id}?mode=my-garden`} className="flex-1 bg-amber-400 py-3 rounded-2xl text-[9px] font-black uppercase text-green-950 text-center active:scale-95 shadow-lg transition-all">
                    Remedies
                  </Link>
                </div>
              </div>
            )})}
          </section>
        )}

        {/* ── 6. Upcoming Projects ──────────────────────────────────────── */}
        {projectPlants.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 italic">
              Future Plants — Planting you're considering
            </h2>
            <div className="space-y-6">
              {projectsByArea.map((group) => (
                <div key={group.areaId ?? 'general'} className="space-y-3">
                  {projectsByArea.length > 1 && (
                    <h3 className="text-[11px] font-black text-amber-600/60 uppercase tracking-[0.25em] px-1 flex items-center gap-2">
                      <span>{group.areaName}</span>
                      <span className="h-[1px] bg-amber-100 flex-grow" />
                    </h3>
                  )}
                  {group.plants.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedIds(prev =>
                            prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]
                          );
                        }}
                        className={`w-12 h-12 rounded-[1rem] border-2 flex items-center justify-center transition-all z-10 ${
                          selectedIds.includes(item.id)
                            ? 'bg-amber-400 border-amber-400 text-green-950'
                            : 'bg-white border-gray-200 text-transparent'
                        }`}
                      >
                        <Check size={24} strokeWidth={4} />
                      </button>
                      <Link
                        href={`/plants/${item.plants?.id}?mode=my-garden`}
                        className="flex-grow bg-white p-4 rounded-[1.5rem] border border-white flex items-center gap-4 active:scale-95 shadow-sm"
                      >
                        <PlantThumbnail plant={item.plants} size="sm" />
                        <div className="flex-grow">
                          <h3 className="text-s font-black text-green-950 uppercase leading-none">
                            {item.plants?.common_name || 'Unknown Plant'}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="text-[8px] font-black uppercase text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                              Future plant
                            </span>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-green-950 ml-auto" strokeWidth={3} />
                      </Link>
                    </div>
                  ))}
                </div>
              ))}

              {selectedIds.length > 0 && (
                <button
                  onClick={handleBulkMove}
                  className="w-full bg-green-900 text-amber-400 text-[11px] font-black py-5 rounded-3xl uppercase tracking-widest shadow-2xl mt-4 animate-in zoom-in-95 duration-200 flex items-center justify-center gap-2"
                >
                  <Check size={16} strokeWidth={4} />
                  Mark {selectedIds.length} as planted — move to My Garden
                </button>
              )}
            </div>
          </section>
        )}

        {/* ── 7. Season Insight ─────────────────────────────────────────── */}
        {featuredTip && (
          <section>
            <div className="bg-green-900 rounded-[2.5rem] shadow-2xl p-8 border-b-4 border-amber-400">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{getSeasonIcon(featuredTip.season)}</span>
                <div className="flex flex-col">
                  <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Season Insight</span>
                  <span className="text-white/60 text-[9px] font-black uppercase tracking-widest italic">{featuredTip.plants?.common_name}</span>
                </div>
              </div>
              <p className="text-white text-lg font-medium italic leading-relaxed">"{featuredTip.tip_text}"</p>
            </div>
          </section>
        )}

        {/* ── 9. My Garden Areas ────────────────────────────────────────── */}
        {!loading && (
          <section id="garden-areas" className="space-y-3 scroll-mt-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-black text-green-950 uppercase tracking-tight">
                My Garden Areas
              </h2>
              {gardenAreas.length > 0 && (
                <Link
                  href="/match"
                  className="text-[8px] font-black uppercase tracking-widest text-green-700"
                >
                  Add area →
                </Link>
              )}
            </div>

            {gardenAreas.length === 0 ? (
              <div className="bg-white rounded-[2rem] border border-dashed border-gray-200 p-6 text-center space-y-3">
                <p className="text-2xl">🪴</p>
                <p className="text-[12px] text-gray-500 font-black uppercase tracking-tight">
                  No garden areas yet
                </p>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                  Create areas like Front Garden, Back Fence, Patio Pots or Veggie Patch. Add plants now, or come back later when you&apos;re ready.
                </p>
                <Link
                  href="/match"
                  className="inline-block bg-green-900 text-white text-[10px] font-black uppercase tracking-widest px-7 py-3 rounded-full shadow-sm active:scale-95 transition-all"
                >
                  Add My First Area
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {gardenAreas.map((area) => {
                  const ownedInArea   = ownedPlants.filter(p => p.garden_area_id === area.id).length
                  const plannedInArea = projectPlants.filter(p => p.garden_area_id === area.id).length
                  return (
                    <GardenAreaSummaryCard
                      key={area.id}
                      area={area}
                      ownedCount={ownedInArea}
                      plannedCount={plannedInArea}
                    />
                  )
                })}
              </div>
            )}
          </section>
        )}

        {/* ── 10. Pro section (locked previews + upgrade CTA) ───────────── */}
        {!isPro && (
          <>
            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[10px] font-black text-green-900/40 uppercase tracking-[0.2em]">
                  Unlock with Pro
                </h2>
                <span className="text-[8px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                  Premium
                </span>
              </div>
              <div className="space-y-2">
                {/* TODO: Monthly Garden Report — Pro summary of completed tasks, resolved sick
                     plants, and upcoming planting windows for project/future plants. */}
                <LockedProFeatureCard
                  icon="📊"
                  title="Monthly Garden Review"
                  description="Coming soon — a monthly snapshot of how your garden is tracking."
                  upgradeHref="#pro-upgrade"
                />
                {/* TODO: Advanced Reminders — personalised push nudges when hedge trim is due,
                     sick plants need a follow-up, or a project plant enters its planting season. */}
                <LockedProFeatureCard
                  icon="🔔"
                  title="Advanced Reminders"
                  description="Coming soon — smarter nudges when tasks matter most."
                  upgradeHref="#pro-upgrade"
                />
                <LockedProFeatureCard
                  icon="📋"
                  title="Planting Plan Export"
                  description="Coming soon — export your areas and planting list as a shareable plan."
                  upgradeHref="#pro-upgrade"
                />
              </div>
            </section>

            <section id="pro-upgrade" className="pb-4">
              <div className="bg-green-950 rounded-[3rem] p-8 relative overflow-hidden flex flex-col items-center text-center shadow-2xl border-4 border-amber-400/20">
                <div className="relative z-10">
                  <div className="bg-amber-400 text-green-950 text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full mx-auto w-fit mb-4">
                    Pro Membership
                  </div>
                  <h2 className="text-xl font-black mb-2 uppercase tracking-tighter text-white italic leading-none">Unlimited Growth</h2>
                  <p className="text-[10px] text-green-200/60 font-medium italic mb-6 px-4">Unlimited plants in My Garden and a custom garden hero photo.</p>
                  <UpgradeButton />
                </div>
              </div>
            </section>
          </>
        )}

      </div>

      <DiagnoseProblemModal
        open={showIssueModal}
        onClose={closeIssueModal}
        plant={selectedUnhealthyPlant}
        remedies={selectedUnhealthyPlant ? remedies : (allRemedies ?? [])}
        loading={selectedUnhealthyPlant ? loadingRemedies : symptomLoading}
        saving={savingIssue}
        initialSearch={issueSearchQuery}
        onSelectIssue={handleSelectIssue}
        ownedPlants={ownedPlants}
      />

    </main>
  )
}
