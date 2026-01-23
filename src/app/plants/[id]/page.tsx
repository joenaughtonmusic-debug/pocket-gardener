'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from "../../../components/Navigation"
import AddPlantButton from "../../../components/AddPlantButton"
import PlantThumbnail from "../../../components/PlantThumbnail"

export default function PlantDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const id = params?.id
  const mode = searchParams?.get('mode')
  
  const [plant, setPlant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false) // Combined loading state for buttons
  const [userPlantRecordId, setUserPlantRecordId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [activeRemedyId, setActiveRemedyId] = useState<string | null>(null)
  const [remedies, setRemedies] = useState<any[]>([]) 
  const [personalNote, setPersonalNote] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const getLevelStyles = (level: string) => {
    const l = level?.toLowerCase();
    if (l === 'hardy' || l === 'high') return { bg: 'bg-[#1B5E20]', text: 'text-white' };
    if (l === 'semi-hardy' || l === 'medium') return { bg: 'bg-[#4CAF50]', text: 'text-white' };
    return { bg: 'bg-[#C8E6C9]', text: 'text-[#1B5E20]' }; 
  }

  useEffect(() => {
    async function fetchPlantAndStatus() {
      if (!id) return
      
      const { data: plantData } = await supabase.from("plants").select("*").eq('id', id).single()
      if (plantData) setPlant(plantData)

      const { data: remedyData } = await supabase
        .from('plant_remedies')
        .select('*')
        .or(`specific_plant_id.eq.${id},plant_type_fallback.eq.General`)
      
      if (remedyData) setRemedies(remedyData)

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: userPlantRecord } = await supabase
          .from('user_plants')
          .select('id, personal_notes')
          .eq('user_id', user.id)
          .eq('plant_id', Number(id))
          .single()
        
        if (userPlantRecord) {
          setUserPlantRecordId(userPlantRecord.id)
          setPersonalNote(userPlantRecord.personal_notes || plantData?.pro_tip || "")
        }
      }
      setLoading(false)
    }
    fetchPlantAndStatus()
  }, [id, supabase])

  async function handleRemove() {
    if (!userPlantRecordId || !window.confirm(`Remove ${plant.common_name}?`)) return
    setIsDeleting(true)
    const { error } = await supabase.from('user_plants').delete().eq('id', userPlantRecordId)
    if (!error) router.push('/dashboard')
    setIsDeleting(false)
  }

  // UPDATED: Standard Project Add
  async function handleAddToProject() {
    setIsProcessing(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return alert("Please log in first!")
    
    const { error } = await supabase
      .from('user_plants')
      .insert([{ 
        user_id: session.user.id, 
        plant_id: Number(id), 
        is_project: true, 
        status: 'Planning' 
      }])
    
    if (!error) router.push('/dashboard')
    setIsProcessing(false)
  }

  // NEW: Direct Add Shortcut
  async function handleDirectAdd() {
    setIsProcessing(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return alert("Please log in first!")
    
    const { error } = await supabase
      .from('user_plants')
      .insert([{ 
        user_id: session.user.id, 
        plant_id: Number(id), 
        is_project: false, 
        status: 'Ongoing' 
      }])
    
    if (!error) router.push('/dashboard')
    setIsProcessing(false)
  }

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-gray-400 uppercase tracking-widest text-xs">Loading...</div>
  if (!plant) return <div className="p-20 text-center">Plant not found.</div>

  const hardinessStyle = getLevelStyles(plant.hardiness_level);
  const maintenanceStyle = getLevelStyles(plant.maintenance_level);

  return (
    <main className="min-h-screen bg-white pb-40 text-gray-900">
      
      <div className="h-[45vh] bg-[#f0f7f3] relative flex items-center justify-center pt-8 pb-16">
        <button 
          onClick={() => router.back()} 
          className="absolute top-12 left-6 z-30 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-gray-400 active:scale-95 transition-all"
        >
          ←
        </button>

        <div className="relative z-10 w-48 h-48 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <PlantThumbnail plant={plant} size="lg" />
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-0 w-48 h-48 bg-white/60 rounded-full blur-2xl"></div>
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
            <h1 className="text-3xl font-black text-green-900 tracking-tight mb-1 uppercase italic">{plant.common_name}</h1>
            <p className="text-sm font-medium italic text-gray-400">{plant.scientific_name}</p>
          </div>
        </header>

        {/* UPDATED ACTION SECTION */}
        <div className="mb-10 flex flex-col items-center gap-4">
          {!mode && !userPlantRecordId && <AddPlantButton plantId={Number(id)} />}
          
          {userPlantRecordId && !mode && (
            <div className="w-full text-center py-4 bg-green-50 rounded-2xl border border-green-100 text-[10px] font-black text-green-700 uppercase tracking-widest italic">In Your Garden</div>
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
                onClick={handleDirectAdd}
                disabled={isProcessing}
                className="text-[10px] font-black text-green-700/50 uppercase tracking-[0.2em] border-b border-green-700/20 pb-1 italic hover:text-green-700 transition-colors"
              >
                or add directly to current garden
              </button>
            </>
          )}
        </div>

        {/* CARE REQUIREMENTS SECTION */}
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

        <section className="mb-10 px-2 border-t border-gray-50 pt-8">
          <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-4">About this plant</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{plant.description || `The ${plant.common_name} thrives in Auckland.`}</p>
        </section>

        {/* PRO TIP BOX */}
        {userPlantRecordId && (
          <div className="mb-10 p-7 bg-amber-50/40 rounded-[2.5rem] border-2 border-red-200">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-[0.2em]">💡 Gardener's Pro Tip</h4>
            </div>
            <p className="w-full text-[13px] text-gray-700 leading-relaxed font-medium italic">
              {personalNote}
            </p>
          </div>
        )}

        {/* COMMON ISSUES ACCORDION */}
        {userPlantRecordId && (
          <div className="mb-10 px-2">
            <h4 className="text-[14px] font-black text-black-800 uppercase tracking-[0.2em] mb-4">⚠️ Common Issues</h4>
            
            <div className="space-y-3">
              {remedies.length > 0 ? (
                remedies.map((r) => (
                  <div key={r.id} className="overflow-hidden">
                    <button 
                      onClick={() => setActiveRemedyId(activeRemedyId === r.id ? null : r.id)}
                      className={`w-full py-4 px-6 rounded-2xl border flex items-center justify-between transition-all ${activeRemedyId === r.id ? 'bg-white border-orange-400 shadow-sm' : 'bg-gray-50 border-gray-100'}`}
                    >
                      <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{r.issue_type}</span>
                      <span className={`text-orange-400 font-bold transition-transform ${activeRemedyId === r.id ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {activeRemedyId === r.id && (
                      <div className="p-4 mt-1 bg-white rounded-2xl border border-orange-100 animate-in fade-in slide-in-from-top-1">
                        <p className="text-[10px] font-black text-orange-800 uppercase mb-1">{r.remedy_title}</p>
                        <p className="text-xs text-gray-600 italic leading-relaxed">"{r.remedy_description}"</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 opacity-40 italic text-[11px] text-orange-800 font-bold uppercase tracking-widest">
                  No issues reported for this plant
                </div>
              )}
            </div>
          </div>
        )}

        {userPlantRecordId && (
          <div className="mt-8 text-center pb-20">
            <button 
              onClick={handleRemove} 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-red-200 hover:text-red-400 transition-colors italic"
            >
              × Remove from My Garden
            </button>
          </div>
        )}
      </div>
      <Navigation />
    </main>
  )
}