'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from "../../../components/Navigation"
import AddPlantButton from "../../../components/AddPlantButton"
import PlantThumbnail from "../../../components/PlantThumbnail"

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

  async function fetchIssueHistory(userPlantId: string) {
    const { data } = await supabase
      .from('plant_logs')
      .select('*')
      .eq('user_plant_id', userPlantId)
      .order('created_at', { ascending: false })
    if (data) setIssueHistory(data)
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
    try {
      setUploadingPhoto(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${userPlantRecordId}-${Date.now()}.${fileExt}`
      const filePath = `plant-progress/${fileName}`
      await supabase.storage.from('weed-images').upload(filePath, file)
      const { data: { publicUrl } } = supabase.storage.from('weed-images').getPublicUrl(filePath)
      const { error } = await supabase.from('plant_photos').insert([{ user_plant_id: userPlantRecordId, photo_url: publicUrl }])
      if (!error) fetchPlantPhotos(userPlantRecordId)
    } catch (err) { console.error(err) } finally { setUploadingPhoto(false) }
  }

  async function handleUpdateNickname() {
    if (!userPlantRecordId) return
    const newNickname = window.prompt(`Give your ${plant.common_name} a nickname:`, nickname || "")
    if (newNickname !== null) {
      const { error } = await supabase.from('user_plants').update({ nickname: newNickname }).eq('id', userPlantRecordId)
      if (!error) setNickname(newNickname)
    }
  }

  useEffect(() => {
    async function fetchPlantAndStatus() {
      if (!id) return
      const { data: plantData } = await supabase.from("plants").select("*").eq('id', id).single()
      if (plantData) setPlant(plantData)
      const { data: remedyData } = await supabase.from('plant_remedies').select('*').or(`specific_plant_id.eq.${id},plant_type_fallback.eq.General`)
      if (remedyData) setRemedies(remedyData)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: userPlantRecord } = await supabase.from('user_plants').select('id, personal_notes, nickname').eq('user_id', user.id).eq('plant_id', Number(id)).single()
        if (userPlantRecord) {
          setUserPlantRecordId(userPlantRecord.id)
          setPersonalNote(userPlantRecord.personal_notes || plantData?.pro_tip || "")
          setNickname(userPlantRecord.nickname)
          fetchIssueHistory(userPlantRecord.id)
          fetchPlantPhotos(userPlantRecord.id)
        }
      }
      setLoading(false)
    }
    fetchPlantAndStatus()
  }, [id, supabase])

  async function handleLogIssue(issueType: string) {
    if (!userPlantRecordId) return
    setIsProcessing(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('plant_logs').insert([{ user_id: user?.id, user_plant_id: userPlantRecordId, issue_type: issueType, status: 'Ongoing' }])
    if (!error) {
      alert(`Logged: ${issueType}. I'll check back in with you in 30 days!`)
      fetchIssueHistory(userPlantRecordId)
    }
    setIsProcessing(false)
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
    if (!session?.user) return alert("Please log in first!")
    const { error } = await supabase.from('user_plants').insert([{ user_id: session.user.id, plant_id: Number(id), is_project: true, status: 'Planning' }])
    if (!error) router.push('/dashboard')
    setIsProcessing(false)
  }

  async function handleDirectAdd() {
    setIsProcessing(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return alert("Please log in first!")
    const { error } = await supabase.from('user_plants').insert([{ user_id: session.user.id, plant_id: Number(id), is_project: false, status: 'Ongoing' }])
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

        {userPlantRecordId && (
          <section className="mb-10 px-2">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest underline decoration-green-200 decoration-4 underline-offset-4">Growth Journey</h3>
               <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100 active:scale-95"
               >
                 {uploadingPhoto ? 'Uploading...' : 'Add Progress Photo'}
               </button>
               <input type="file" ref={fileInputRef} onChange={handleAddPhoto} className="hidden" accept="image/*" />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {plantPhotos.length === 0 ? (
                <div className="w-full py-8 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex items-center justify-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                  Start your visual timeline
                </div>
              ) : (
                plantPhotos.map((photo) => (
                  <div key={photo.id} className="flex-shrink-0 w-32 h-32 rounded-3xl overflow-hidden border border-gray-100 relative shadow-sm">
                    <img src={photo.photo_url} className="w-full h-full object-cover" alt="Progress" />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-1 text-[8px] text-gray-500 text-center font-black uppercase">
                      {new Date(photo.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        <div className="mb-10 flex flex-col items-center gap-4">
          {!mode && !userPlantRecordId && <AddPlantButton plantId={Number(id)} />}
          {userPlantRecordId && !mode && (
            <div className="w-full text-center py-4 bg-green-50 rounded-2xl border border-green-100 text-[10px] font-black text-green-700 uppercase tracking-widest italic">In Your Garden</div>
          )}
          {mode === 'builder' && (
            <>
              <button onClick={handleAddToProject} disabled={isProcessing} className="w-full py-6 rounded-[2.5rem] bg-[#2d5a3f] text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl active:scale-95 transition-all">
                {isProcessing ? 'Adding...' : 'Add to Project List'}
              </button>
              <button onClick={handleDirectAdd} disabled={isProcessing} className="text-[10px] font-black text-green-700/50 uppercase tracking-[0.2em] border-b border-green-700/20 pb-1 italic hover:text-green-700 transition-colors">
                or add directly to current garden
              </button>
            </>
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
            <h4 className="text-[14px] font-black text-black-800 uppercase tracking-[0.2em] mb-4">⚠️ Common Issues</h4>
            <div className="space-y-3">
              {remedies.length > 0 ? (
                remedies.map((r) => (
                  <div key={r.id} className="overflow-hidden">
                    <button onClick={() => setActiveRemedyId(activeRemedyId === r.id ? null : r.id)} className={`w-full py-4 px-6 rounded-2xl border flex items-center justify-between transition-all ${activeRemedyId === r.id ? 'bg-white border-orange-400 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                      <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{r.issue_type}</span>
                      <span className={`text-orange-400 font-bold transition-transform ${activeRemedyId === r.id ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {activeRemedyId === r.id && (
                      <div className="p-4 mt-1 bg-white rounded-2xl border border-orange-100 animate-in fade-in slide-in-from-top-1">
                        <p className="text-[10px] font-black text-orange-800 uppercase mb-1">{r.remedy_title}</p>
                        <p className="text-xs text-gray-600 italic leading-relaxed mb-4">"{r.remedy_description}"</p>
                        <button onClick={() => handleLogIssue(r.issue_type)} disabled={isProcessing} className="w-full py-2 bg-orange-50 text-orange-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100 active:scale-95 transition-all">Log this issue for my plant</button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 opacity-40 italic text-[11px] text-orange-800 font-bold uppercase tracking-widest">No issues reported for this plant</div>
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
                  <div>
                    <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{log.issue_type}</p>
                    <p className="text-[10px] text-gray-400 italic">Logged: {new Date(log.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${log.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{log.status}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {userPlantRecordId && (
          <div className="mt-8 text-center pb-20">
            <button onClick={handleRemove} className="text-[10px] font-black uppercase tracking-[0.2em] text-red-200 hover:text-red-400 transition-colors italic">× Remove from My Garden</button>
          </div>
        )}
      </div>
      <Navigation />
    </main>
  )
}