'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { createSupabaseBrowserClient } from '../../lib/supabaseClient'
import Link from 'next/link'
import { Pencil, Camera, ArrowRight, Check, AlertCircle, Search, X } from 'lucide-react'
import PlantThumbnail from '../../../components/PlantThumbnail'
import WelcomeOverlay from '../../../components/WelcomeOverlay'
import UpgradeButton from '../../../components/UpgradeButton'
import LockedProFeatureCard from '../../../components/LockedProFeatureCard'
import GardenAreaBadge from '../../../components/GardenAreaBadge'
import GardenAreaAssignSelect from '../../../components/GardenAreaAssignSelect'
import GardenAreaSummaryCard from '../../../components/GardenAreaSummaryCard'
import { resolveAreaName, GENERAL_GARDEN_LABEL } from '../../../lib/gardenAreas'
import type { UserPlant, PlantRemedy, GardenArea } from '../../../types/garden'

const STOP_WORDS = new Set([
  'my', 'the', 'a', 'an', 'is', 'are', 'was', 'were', 'has', 'have', 'had',
  'got', 'it', 'its', 'this', 'that', 'and', 'or', 'but', 'so', 'for', 'with',
  'of', 'in', 'on', 'at', 'to', 'by', 'from', 'up', 'into', 'be', 'been',
  'plant', 'plants',
])

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

  const [symptomQuery, setSymptomQuery] = useState('')
  const [allRemedies, setAllRemedies] = useState<PlantRemedy[] | null>(null)
  const [symptomLoading, setSymptomLoading] = useState(false)
  const [pendingSymptomRemedy, setPendingSymptomRemedy] = useState<PlantRemedy | null>(null)
  const [showPlantPicker, setShowPlantPicker] = useState(false)
  
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

  async function openIssueModalForPlant(item: UserPlant) {
    setSelectedUnhealthyPlant(item)
    setIssueSearchQuery("")
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
    setOwnedPlants((prev) =>
      prev.map((plant) => (plant.id === item.id ? { ...plant, is_sick: false } : plant))
    )
    getGarden()
  }
}

  async function handleSelectIssue(remedy: PlantRemedy, overridePlant?: UserPlant) {
    const targetPlant = overridePlant ?? selectedUnhealthyPlant
    if (!targetPlant) return

    setSavingIssue(true)

    const remedyText = remedy.remedy_title && remedy.remedy_description
      ? `${remedy.remedy_title}: ${remedy.remedy_description}`
      : remedy.remedy_description || remedy.remedy_title || null

    const { data: { user } } = await supabase.auth.getUser()

    const [updateRes, logRes] = await Promise.all([
      supabase
        .from('user_plants')
        .update({
          is_sick: true,
          current_issue: remedy.issue_type,
          current_remedy: remedyText,
          current_shopping_tags: remedy.shopping_tags || [],
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

  async function handleTrackSymptomIssue(remedy: PlantRemedy) {
    if (matchedPlantId !== null) {
      const plant = ownedPlants.find((p) => p.plant_id === matchedPlantId)
      if (plant) {
        await handleSelectIssue(remedy, plant)
        setSymptomQuery('')
        return
      }
    }
    setPendingSymptomRemedy(remedy)
    setShowPlantPicker(true)
  }

  async function handlePickPlantForSymptom(plant: UserPlant) {
    setShowPlantPicker(false)
    const remedy = pendingSymptomRemedy
    setPendingSymptomRemedy(null)
    if (!remedy) return
    await handleSelectIssue(remedy, plant)
    setSymptomQuery('')
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (!file) return;

    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser(); 
      if (!user) return;

      const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('weed-images').upload(`garden-photos/${fileName}`, file);
      const { data: { publicUrl } } = supabase.storage.from('weed-images').getPublicUrl(`garden-photos/${fileName}`);
      await supabase.auth.updateUser({ data: { garden_photo: publicUrl } });
      setGardenPhoto(publicUrl);
    } catch (err) { 
      alert("Error uploading photo"); 
    } finally { 
      setUploading(false); 
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

  // Detect a plant name in the query — lifted out so handlers can read it too.
  const matchedPlantId = useMemo(() => {
    if (!symptomQuery.trim()) return null
    const rawTokens = symptomQuery.toLowerCase().split(/\s+/).filter((t) => t.length >= 3)
    for (const plant of ownedPlants) {
      const nameText = [
        plant.nickname,
        plant.plants?.common_name,
        plant.plants?.scientific_name,
        plant.plants?.botanical_name,
      ].filter(Boolean).join(' ')
      const nameTokens = nameText.toLowerCase().split(/[\s\-\/]+/).filter((t) => t.length >= 3)
      const isMatch = nameTokens.some((nameToken) =>
        rawTokens.some(
          (qToken) =>
            nameToken === qToken ||
            (nameToken.length >= 4 && qToken.length >= 4 &&
              (nameToken.startsWith(qToken) || qToken.startsWith(nameToken)))
        )
      )
      if (isMatch) return plant.plant_id
    }
    return null
  }, [symptomQuery, ownedPlants])

  const symptomResults = useMemo(() => {
    if (!symptomQuery.trim() || !allRemedies) return []
    const tokens = symptomQuery
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
    if (tokens.length === 0) return []

    // Strip plant name tokens from scoring so "lemon tree bumpy fruit" only
    // scores on ["bumpy","fruit"], not on ["lemon","tree"].
    let symptomTokens = tokens
    if (matchedPlantId !== null) {
      const matchedPlant = ownedPlants.find((p) => p.plant_id === matchedPlantId)
      if (matchedPlant) {
        const plantNameSet = new Set(
          [
            matchedPlant.nickname,
            matchedPlant.plants?.common_name,
            matchedPlant.plants?.scientific_name,
            matchedPlant.plants?.botanical_name,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .split(/[\s\-\/]+/)
            .filter((t) => t.length > 1)
        )
        symptomTokens = tokens.filter((t) => !plantNameSet.has(t))
      }
    }
    // If stripping plant-name tokens leaves nothing, the query is plant-name only.
    // Fall back to the original tokens so plant-specific remedies still surface.
    if (symptomTokens.length === 0) symptomTokens = tokens

    const scored = allRemedies.map((r) => {
      const issueType  = (r.issue_type        || '').toLowerCase()
      const title      = (r.remedy_title       || '').toLowerCase()
      const desc       = (r.remedy_description || '').toLowerCase()
      const keywords   = (r.search_keywords    || '').toLowerCase()
      let score = 0
      for (const token of symptomTokens) {
        if (issueType.includes(token))  score += 3
        if (title.includes(token))      score += 2
        if (keywords.includes(token))   score += 2
        if (desc.includes(token))       score += 1
      }

      // Apply plant-context tier multiplier when a plant was detected in the query.
      if (matchedPlantId !== null) {
        const remedyPlantId = r.specific_plant_id ? Number(r.specific_plant_id) : null
        if (remedyPlantId === matchedPlantId) {
          score *= 100  // plant-specific for the matched plant — highest priority
        } else if (remedyPlantId === null) {
          score *= 10   // universal — second tier
        }
        // remedies specific to a different plant keep score × 1 — deprioritised
      }

      return { remedy: r, score }
    })

    const candidates = scored
      .filter((s) => {
        if (s.score === 0) return false
        // When a plant is detected, hard-exclude remedies specific to other plants.
        if (matchedPlantId !== null) {
          const rPlantId = s.remedy.specific_plant_id ? Number(s.remedy.specific_plant_id) : null
          if (rPlantId !== null && rPlantId !== matchedPlantId) return false
        }
        return true
      })
      .sort((a, b) => b.score - a.score)

    // If a plant was detected and at least one plant-specific result exists,
    // suppress universals — they would only dilute specific results.
    // If no plant-specific results survive, fall back to universals.
    let pool = candidates
    if (matchedPlantId !== null) {
      const hasSpecific = candidates.some(
        (s) => s.remedy.specific_plant_id !== null &&
               Number(s.remedy.specific_plant_id) === matchedPlantId
      )
      if (hasSpecific) {
        pool = candidates.filter(
          (s) => s.remedy.specific_plant_id !== null &&
                 Number(s.remedy.specific_plant_id) === matchedPlantId
        )
      }
    }

    const seen = new Set<string>()
    return pool
      .filter(({ remedy: r }) => {
        const key = r.issue_type
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .slice(0, 5)
      .map((s) => s.remedy)
  }, [symptomQuery, allRemedies, ownedPlants, matchedPlantId])

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

  const filteredRemedies = remedies.filter((r) => {
    if (!issueSearchQuery.trim()) return true
    const searchString = `${r.issue_type || ''} ${r.remedy_title || ''} ${r.remedy_description || ''} ${r.search_keywords || ''}`.toLowerCase()
    return searchString.includes(issueSearchQuery.toLowerCase())
  })

  const specificMatches = filteredRemedies.filter(
    (r) => Number(r.specific_plant_id) === Number(selectedUnhealthyPlant?.plant_id)
  )
  const universalMatches = filteredRemedies.filter(
    (r) => r.is_universal === true && Number(r.specific_plant_id) !== Number(selectedUnhealthyPlant?.plant_id)
  )

  async function fetchAllRemedies() {
    if (allRemedies !== null) return
    setSymptomLoading(true)
    const { data } = await supabase.from('plant_remedies').select('*')
    setAllRemedies((data ?? []) as PlantRemedy[])
    setSymptomLoading(false)
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

        {/* ── 1. Quick Actions row ─────────────────────────────────────── */}
        <nav aria-label="Quick actions" className="flex items-start gap-3">
          {([
            { icon: '🌿', label: 'Visualise', href: '/match' },
            { icon: '📅', label: 'Maintain',  href: '/calendar' },
            { icon: '📚', label: 'Learn',     href: '/guides' },
            { icon: '✨', label: 'Inspire',   href: '/feature' },
          ] as const).map(({ icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center gap-2 active:scale-90 transition-all"
            >
              <div className="w-full rounded-[1.125rem] bg-white shadow-sm border border-gray-100 py-4 flex items-center justify-center text-2xl">
                {icon}
              </div>
              <span className="text-[9px] font-black text-green-900/70 uppercase tracking-widest leading-none">
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* ── Visual Ideas CTA ──────────────────────────────────────────── */}
        <Link
          href="/visualise"
          className="block bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4 p-5">
            <div className="w-12 h-12 rounded-[1rem] bg-green-50 flex items-center justify-center text-2xl shrink-0">
              🎨
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-green-800/50 mb-0.5">
                Plan & Visualise
              </p>
              <h3 className="text-sm font-black text-green-950 uppercase leading-none">
                Visual Ideas
              </h3>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                Upload a photo · get plant ideas · see how it could look.
              </p>
            </div>
            <ArrowRight size={14} className="text-gray-300 shrink-0" strokeWidth={2.5} />
          </div>
        </Link>

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
                    Start by adding your garden spaces — like Front Boundary, Back Fence, Deck Pots, or Veggie Patch. Then add the plants you already have.
                  </p>
                  <Link
                    href="/match"
                    className="inline-block mt-2 bg-green-900 text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-full shadow-sm active:scale-95 transition-all"
                  >
                    Create My First Garden Space
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
                    You have {gardenAreas.length} garden {gardenAreas.length === 1 ? 'space' : 'spaces'} set up. Now add the plants you already have growing — or browse the Library to discover new ones.
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
                href="/match"
                className="text-[8px] font-black uppercase tracking-widest text-green-700"
              >
                {gardenAreas.length > 0 ? 'Manage spaces →' : 'Add spaces →'}
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

                    {item.current_shopping_tags && item.current_shopping_tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.current_shopping_tags.map((tag) => (
                          <span key={tag} className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

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
            {followUpAlerts.map((alert) => (
              <div key={alert.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-amber-100 shadow-xl shadow-amber-900/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
                <div className="flex gap-4 mb-4">
                  <PlantThumbnail plant={alert.user_plants?.plants} size="sm" />
                  <div>
                    <h3 className="text-sm font-black text-green-950 uppercase leading-tight">{alert.user_plants?.plants?.common_name}</h3>
                    <p className="text-[10px] text-amber-600 mt-1 font-black uppercase tracking-widest italic">{alert.issue_type} check-in</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleResolveIssue(alert.id, alert.user_plants?.plants?.common_name, alert.user_plant_id)} className="flex-1 bg-green-800 py-3 rounded-2xl text-[9px] font-black uppercase text-white shadow-lg active:scale-95 transition-all">
                    Recovered!
                  </button>
                  <Link href={`/plants/${alert.user_plants?.plants?.id}?mode=my-garden`} className="flex-1 bg-amber-400 py-3 rounded-2xl text-[9px] font-black uppercase text-green-950 text-center active:scale-95 shadow-lg transition-all">
                    Remedies
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── 6. Upcoming Projects ──────────────────────────────────────── */}
        {projectPlants.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 italic">
              Future Ideas — Planting you're considering
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
                              Future idea
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

        {/* ── 7. Symptom search ─────────────────────────────────────────── */}
        <section className="space-y-3">
          <p className="text-[10px] font-black text-green-800/50 uppercase tracking-[0.2em] px-1">
            🔍 Search plant problems
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="My lemon has bumpy fruit..."
              value={symptomQuery}
              onFocus={fetchAllRemedies}
              onChange={(e) => setSymptomQuery(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-full px-5 py-4 pr-12 text-sm font-bold text-gray-800 placeholder:text-gray-300 outline-none focus:border-green-200 shadow-sm transition-colors"
            />
            <Search size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
          </div>

          {symptomQuery.trim().length > 0 && (
            <div className="space-y-2 pt-1">
              {symptomLoading ? (
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 py-6">
                  Searching...
                </p>
              ) : symptomResults.length === 0 ? (
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-300 italic py-6">
                  {matchedPlantId !== null
                    ? "Add a symptom — e.g. 'lemon tree bumpy fruit'"
                    : 'No matches found. Try different symptoms.'}
                </p>
              ) : (
                <>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-1 pb-1">
                    Possible matches
                  </p>
                  {symptomResults.map((r) => (
                    <div
                      key={r.id}
                      className="bg-white rounded-[1.5rem] border border-gray-100 p-4 shadow-sm"
                    >
                      <p className="text-[11px] font-black text-orange-700 uppercase tracking-tight">
                        {r.issue_type}
                      </p>
                      {r.remedy_title && (
                        <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mt-1">
                          {r.remedy_title}
                        </p>
                      )}
                      {r.remedy_description && (
                        <p className="text-xs text-gray-500 italic leading-relaxed mt-1.5 line-clamp-2">
                          {r.remedy_description}
                        </p>
                      )}
                      {r.shopping_tags && r.shopping_tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {r.shopping_tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => handleTrackSymptomIssue(r)}
                        disabled={savingIssue}
                        className="mt-3 w-full bg-green-800 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white active:scale-[0.98] transition-all disabled:opacity-50"
                      >
                        Track Issue
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </section>

        {/* ── 8. Season Insight ─────────────────────────────────────────── */}
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
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-black text-green-950 uppercase tracking-tight">
                My Garden Areas
              </h2>
              {gardenAreas.length > 0 && (
                <Link
                  href="/match"
                  className="text-[8px] font-black uppercase tracking-widest text-green-700"
                >
                  Manage →
                </Link>
              )}
            </div>

            {gardenAreas.length === 0 ? (
              <div className="bg-white rounded-[2rem] border border-dashed border-gray-200 p-6 text-center space-y-3">
                <p className="text-2xl">🗺️</p>
                <p className="text-[12px] text-gray-500 font-black uppercase tracking-tight">
                  No garden areas yet
                </p>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                  Add the parts of your garden — Front Boundary, Deck Pots, Back Fence — then assign plants and get tailored recommendations for each spot.
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
                <LockedProFeatureCard
                  icon="🤖"
                  title="AI Garden Coach"
                  description="Planned Pro feature — personalised garden advice, on the way."
                  upgradeHref="#pro-upgrade"
                />
                <LockedProFeatureCard
                  icon="📊"
                  title="Monthly Garden Review"
                  description="Coming soon — a monthly snapshot of how your garden is tracking."
                  upgradeHref="#pro-upgrade"
                />
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
                  <p className="text-[10px] text-green-200/60 font-medium italic mb-6 px-4">Unlock identification, expert guides, and custom garden photos.</p>
                  <UpgradeButton />
                </div>
              </div>
            </section>
          </>
        )}

      </div>

      {showIssueModal && selectedUnhealthyPlant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em] mb-1">
                  Plant is unhealthy
                </p>
                <h3 className="text-lg font-black text-green-950 uppercase italic">
                  {selectedUnhealthyPlant.nickname || selectedUnhealthyPlant.plants?.common_name}
                </h3>
              </div>
              <button
                onClick={closeIssueModal}
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search issue or symptom..."
                  value={issueSearchQuery}
                  onChange={(e) => setIssueSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-full px-5 py-4 pr-12 text-sm font-bold outline-none focus:border-orange-200"
                />
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>

              {loadingRemedies ? (
                <div className="py-10 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Loading issues...
                </div>
              ) : (
                <>
                  {specificMatches.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em] px-1">
                        Plant specific
                      </div>
                      {specificMatches.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleSelectIssue(r)}
                          disabled={savingIssue}
                          className="w-full text-left p-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 active:scale-[0.98] transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-black text-orange-800 uppercase tracking-tight">
                                {r.issue_type}
                              </p>
                              {r.remedy_title && (
                                <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mt-1">
                                  {r.remedy_title}
                                </p>
                              )}
                              {r.remedy_description && (
                                <p className="text-xs text-gray-600 italic leading-relaxed mt-2">
                                  {r.remedy_description}
                                </p>
                              )}
                              {r.shopping_tags && r.shopping_tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {r.shopping_tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-orange-500 text-[10px] font-black uppercase tracking-widest shrink-0">
                              Start Treatment
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {universalMatches.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">
                        General issues
                      </div>
                      {universalMatches.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleSelectIssue(r)}
                          disabled={savingIssue}
                          className="w-full text-left p-4 rounded-[1.5rem] border border-gray-100 bg-white active:scale-[0.98] transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">
                                {r.issue_type}
                              </p>
                              {r.remedy_title && (
                                <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mt-1">
                                  {r.remedy_title}
                                </p>
                              )}
                              {r.remedy_description && (
                                <p className="text-xs text-gray-600 italic leading-relaxed mt-2">
                                  {r.remedy_description}
                                </p>
                              )}
                              {r.shopping_tags && r.shopping_tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {r.shopping_tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-orange-500 text-[10px] font-black uppercase tracking-widest shrink-0">
                              Start Treatment
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredRemedies.length === 0 && (
                    <div className="py-10 text-center text-[10px] font-black uppercase tracking-widest text-gray-300 italic">
                      No issue matches your search
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showPlantPicker && pendingSymptomRemedy && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                  Track Issue
                </p>
                <h3 className="text-lg font-black text-green-950 uppercase italic">
                  Which plant is affected?
                </h3>
              </div>
              <button
                onClick={() => { setShowPlantPicker(false); setPendingSymptomRemedy(null) }}
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {ownedPlants.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => handlePickPlantForSymptom(plant)}
                  disabled={savingIssue}
                  className="w-full flex items-center gap-3 p-4 rounded-[1.5rem] border border-gray-100 bg-gray-50/40 text-left active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <PlantThumbnail plant={plant.plants} size="sm" />
                  <span className="text-sm font-black text-green-950 uppercase">
                    {plant.nickname || plant.plants?.common_name || 'Unknown Plant'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  )
}
