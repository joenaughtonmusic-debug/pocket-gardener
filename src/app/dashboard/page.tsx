'use client'

import { useEffect, useState, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Pencil, Camera, ArrowRight, Check, Sparkles, AlertCircle } from 'lucide-react' 
import Navigation from '../../components/Navigation'
import PlantThumbnail from '../../components/PlantThumbnail'
import PageHelp from '../../components/PageHelp'
import WelcomeOverlay from '../../components/WelcomeOverlay'
import UpgradeButton from '../../components/UpgradeButton'

interface Plant {
  id: string;
  common_name: string;
  scientific_name?: string;
  plant_type?: string;
  image_url?: string;
}

interface UserPlant {
  id: string;
  plant_id: number;
  is_project: boolean;
  nickname?: string; 
  plants: Plant;
  latest_photo?: string; 
}

export default function MyGardenDashboard() {
  const [ownedPlants, setOwnedPlants] = useState<UserPlant[]>([])
  const [projectPlants, setProjectPlants] = useState<UserPlant[]>([])
  const [followUpAlerts, setFollowUpAlerts] = useState<any[]>([])
  const [careNotes, setCareNotes] = useState<any[]>([]) 
  const [featuredTip, setFeaturedTip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [userName, setUserName] = useState<string>("Gardener")
  const [gardenPhoto, setGardenPhoto] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isPro, setIsPro] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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

        const [profileRes, plantsRes, notesRes] = await Promise.all([
          supabase.from('profiles').select('is_pro').eq('id', user.id).maybeSingle(),
          supabase.from('user_plants').select(`id, plant_id, is_project, nickname, plants (*)`).eq('user_id', user.id),
          supabase.from('auckland_monthly_care').select('*').eq('month_number', new Date().getMonth() + 1)
        ]);

        if (profileRes.data) setIsPro(profileRes.data.is_pro);
        if (notesRes.data) setCareNotes(notesRes.data);

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

        const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const { data: logs } = await supabase.from('plant_logs')
          .select(`*, user_plants (plants (common_name, id, image_url, plant_type))`)
          .eq('user_id', user.id).eq('status', 'Ongoing')
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

  async function handleResolveIssue(logId: string, plantName: string) {
    const { error } = await supabase.from('plant_logs').update({ status: 'Resolved', resolved_at: new Date().toISOString() }).eq('id', logId)
    if (!error) { alert(`Great news about your ${plantName}!`); getGarden(); }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser(); if (!user) return;
      const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('weed-images').upload(`garden-photos/${fileName}`, file);
      const { data: { publicUrl } } = supabase.storage.from('weed-images').getPublicUrl(`garden-photos/${fileName}`);
      await supabase.auth.updateUser({ data: { garden_photo: publicUrl } });
      setGardenPhoto(publicUrl);
    } catch (err) { alert("Error uploading photo"); } finally { setUploading(false); }
  };

  const handleBulkMove = async () => {
    const { error } = await supabase.from('user_plants').update({ is_project: false }).in('id', selectedIds)
    if (!error) { setSelectedIds([]); getGarden(); }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-20 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-green-800/20 border-t-green-800 rounded-full animate-spin"></div>
        <p className="text-green-800 font-black uppercase text-[10px] tracking-widest">Loading Your Garden...</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#f0f4f1] p-6 pb-40 text-gray-900">
      <WelcomeOverlay />

      <header className="mb-8 pt-4 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-green-950 tracking-tighter italic uppercase leading-none">My Garden</h1>
          <div className="flex items-center gap-2 mt-3 bg-white/50 w-fit px-3 py-1.5 rounded-full border border-white/50 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-tight text-gray-500">
              Welcome, <span className="text-green-700">{userName}</span>
            </p>
            <button onClick={async () => {
              const n = window.prompt("Name:", userName); 
              if(n) { await supabase.auth.updateUser({data:{display_name:n}}); getGarden(); }
            }} className="text-green-600 hover:scale-110 transition-transform">
              <Pencil size={12} strokeWidth={3} />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Link href="/about" className="text-2xl bg-white w-14 h-14 rounded-[1.5rem] border-2 border-white flex items-center justify-center shadow-lg active:scale-90 transition-all">🧑‍🌾</Link>
          <span className="text-[8px] font-black text-green-800/40 uppercase tracking-widest">Profile/About</span>
        </div>
      </header>

      {!loading && isPro && (
        <section className="mb-10 group">
          <div className="bg-white p-2 rounded-[2.5rem] border-2 border-white shadow-xl overflow-hidden relative">
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="relative w-full h-52 bg-green-50 rounded-[2rem] flex items-center justify-center cursor-pointer overflow-hidden border border-green-100"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2 animate-bounce">
                   <Sparkles className="text-amber-500" />
                   <span className="text-[10px] font-black text-green-700 uppercase">Saving...</span>
                </div>
              ) : gardenPhoto ? (
                <img src={gardenPhoto} alt="My Garden" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Camera className="text-green-950" size={20} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-800/40">Feature your garden</span>
                </div>
              )}
              {gardenPhoto && (
                <div className="absolute bottom-4 right-4 bg-green-700 p-2 rounded-full shadow-lg text-white">
                   <Camera size={14} strokeWidth={3} />
                </div>
              )}
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
        </section>
      )}

      {!isPro && (
        <section className="mb-12">
            <div className="bg-green-950 rounded-[3rem] p-8 relative overflow-hidden flex flex-col items-center text-center shadow-2xl border-4 border-amber-400/20">
              <div className="relative z-10">
                  <div className="bg-amber-400 text-green-950 text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full mx-auto w-fit mb-4">
                    Pro Membership
                  </div>
                  <h2 className="text-2xl font-black mb-3 uppercase tracking-tighter text-white leading-none italic">Unlimited Growth</h2>
                  <p className="text-[11px] text-green-200/70 font-medium italic mb-8 px-4">Unlock the Garden Matchmaker, full identification tools, and expert guides.</p>
                  <UpgradeButton />
              </div>
              <Sparkles className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32 rotate-12" />
            </div>
        </section>
      )}

      <div className="space-y-12">
        {followUpAlerts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <AlertCircle size={14} className="text-amber-500" strokeWidth={3} />
              <h2 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">Priority Follow-up</h2>
            </div>
            {followUpAlerts.map((alert) => (
              <div key={alert.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-amber-100 shadow-xl shadow-amber-900/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
                <div className="flex gap-4 mb-4">
                  <PlantThumbnail plant={alert.user_plants?.plants} size="sm" />
                  <div>
                    <h3 className="text-sm font-black text-green-950 uppercase leading-tight">{alert.user_plants?.plants?.common_name}</h3>
                    <p className="text-[10px] text-amber-600 mt-1 font-black uppercase tracking-widest italic">{alert.issue_type} check-in</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleResolveIssue(alert.id, alert.user_plants?.plants?.common_name)} className="flex-1 bg-green-800 py-3 rounded-2xl text-[9px] font-black uppercase text-white shadow-lg active:scale-95 transition-all">Recovered!</button>
                  <Link href={`/plants/${alert.user_plants?.plants?.id}?mode=my-garden`} className="flex-1 bg-amber-400 py-3 rounded-2xl text-[9px] font-black uppercase text-green-950 text-center active:scale-95 shadow-lg transition-all">Remedies</Link>
                </div>
              </div>
            ))}
          </section>
        )}

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

        {ownedPlants.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-[11px] font-black text-green-950 uppercase tracking-[0.2em] px-2 flex items-center justify-between">
              <span>{currentMonthName} Checklist</span>
              <span className="h-px bg-green-200 flex-grow ml-4"></span>
            </h2>
            {ownedPlants.map((item: UserPlant) => {
              const plant = item.plants; 
              const note = careNotes.find(n => n.plant_type === plant.common_name) || careNotes.find(n => n.plant_type === plant.plant_type) || {care_note: "Standard watering and leaf check this month."};
              return (
                <Link key={item.id} href={`/plants/${plant.id}?mode=my-garden`} className="block bg-white p-5 rounded-[2.5rem] border border-white shadow-md hover:shadow-lg transition-shadow active:scale-[0.98]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <PlantThumbnail plant={plant} size="sm" />
                      <div>
                        <h3 className="text-md font-black text-green-950 tracking-tighter uppercase leading-none">{item.nickname || plant.common_name}</h3>
                        <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mt-1.5 italic">{plant.plant_type}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white shadow-lg">
                       <ArrowRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                  <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100 flex gap-3">
                    <Sparkles className="text-amber-500 shrink-0" size={14} />
                    <p className="text-[12px] text-green-900 leading-relaxed font-medium italic">"{note.care_note}"</p>
                  </div>
                </Link>
              );
            })}
          </section>
        )}

        {projectPlants.length > 0 && (
          <section className="space-y-4 pb-10">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 italic">Upcoming Projects</h2>
            <div className="space-y-3">
              {projectPlants.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]);
                    }} 
                    className={`w-12 h-12 rounded-[1rem] border-2 flex items-center justify-center transition-all z-10 ${selectedIds.includes(item.id) ? 'bg-amber-400 border-amber-400 text-green-950' : 'bg-white border-gray-200 text-transparent'}`}
                  >
                    <Check size={24} strokeWidth={4} />
                  </button>
                  <Link href={`/plants/${item.plants?.id}?mode=my-garden`} className="flex-grow bg-white p-4 rounded-[1.5rem] border border-white flex items-center gap-4 active:scale-95 shadow-sm">
                    <PlantThumbnail plant={item.plants} size="sm" />
                    <div className="flex-grow">
                      <h3 className="text-xs font-black text-green-950 uppercase leading-none">{item.plants?.common_name}</h3>
                      <span className="text-[8px] font-black uppercase text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-2">Planned</span>
                    </div>
                    <ArrowRight size={14} className="text-green-950 ml-auto" strokeWidth={3} />
                  </Link>
                </div>
              ))}
              {selectedIds.length > 0 && (
                <button onClick={handleBulkMove} className="w-full bg-green-900 text-amber-400 text-[11px] font-black py-5 rounded-3xl uppercase tracking-widest shadow-2xl mt-4 animate-in zoom-in-95 duration-200 flex items-center justify-center gap-2">
                  <Check size={16} strokeWidth={4} />
                  Confirm {selectedIds.length} Plants are Planted
                </button>
              )}
            </div>
          </section>
        )}
      </div>
      <Navigation />
    </main>
  )
}