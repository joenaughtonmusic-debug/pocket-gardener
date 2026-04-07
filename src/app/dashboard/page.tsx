'use client'

import { useEffect, useState, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Pencil, Camera, ArrowRight, Check, Sparkles, AlertCircle } from 'lucide-react' 
import Navigation from '../../components/Navigation'
import PlantThumbnail from '../../components/PlantThumbnail'
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

  const getGeneralNote = () => {
    const defaultText = "Standard watering and leaf check this month.";
    if (!careNotes || careNotes.length === 0) return defaultText;
    const generalRow = careNotes.find(n => !n.plant_type || n.plant_type.toLowerCase() === 'general');
    if (!generalRow) return defaultText;
    return generalRow.care_notes || generalRow.care_note || defaultText;
  };

  const generalMonthlyAdvice = getGeneralNote();
  
  const processedPlants = ownedPlants.map(item => {
    const plant = item.plants;
    const noteObj = careNotes.find(n => 
      n.plant_type && 
      (n.plant_type.toLowerCase() === plant.common_name?.toLowerCase() || 
       n.plant_type.toLowerCase() === plant.plant_type?.toLowerCase())
    );
    const specificNoteText = noteObj ? (noteObj.care_notes || noteObj.care_note) : null;

    return { 
      ...item, 
      displayNote: specificNoteText || generalMonthlyAdvice, 
      isSpecific: !!specificNoteText && noteObj.plant_type?.toLowerCase() !== 'general'
    };
  });

  const specificPlants = processedPlants.filter(p => p.isSpecific);
  const generalPlants = processedPlants.filter(p => !p.isSpecific);

  const groupedByType = generalPlants.reduce((acc, item) => {
    const type = item.plants.plant_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, typeof generalPlants>);

  const sortedCategories = Object.keys(groupedByType).sort();

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40 text-gray-900">
      <WelcomeOverlay />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[55vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl shadow-green-900/20 mb-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-10" />
        
        <img 
          src={gardenPhoto || "https://pristinegardens.co.nz/wp-content/uploads/2022/07/20220115_152342.jpg"} 
          alt="My Garden"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 pt-12">
          <div className="flex justify-end">
            <Link href="/about" className="group flex flex-col items-center gap-1.5 active:scale-95 transition-all">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center text-xl shadow-lg">
                🧑‍🌾
              </div>
              <span className="text-[7px] font-black text-white/60 uppercase tracking-[0.2em]">Profile</span>
            </Link>
          </div>

          <div className="pb-4">
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none mb-4 [text-shadow:_0_2px_10px_rgb(0_0_0_/_30%)]">
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
                    if(n) { await supabase.auth.updateUser({data:{display_name:n}}); getGarden(); }
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

      <div className="px-6 space-y-12">
        {/* --- PRO UPSELL --- */}
        {!isPro && (
          <section>
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
        )}

        {/* --- ALERTS --- */}
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

        {/* --- SEASON TIP --- */}
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

        {/* --- PLANT LIST --- */}
        {ownedPlants.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-[15px] font-black text-green-950 uppercase tracking-[0.2em] px-2 flex items-center justify-between">
              <span>{currentMonthName} Focus</span>
              <span className="h-px bg-green-200 flex-grow ml-4"></span>
            </h2>

            <div className="space-y-6">
              {specificPlants.map((item) => (
                <Link key={item.id} href={`/plants/${item.plants.id}?mode=my-garden`} className="block bg-white p-5 rounded-[2.5rem] border-2 border-amber-200 shadow-md hover:shadow-lg transition-shadow active:scale-[0.98]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <PlantThumbnail plant={item.plants} size="sm" />
                      <div>
                        <h3 className="text-md font-black text-green-950 tracking-tighter uppercase leading-none">
                          {item.nickname || item.plants?.common_name || "Unknown Plant (Link Broken)"}
                        </h3>
                        <p className="text-[8px] text-amber-600 font-black uppercase tracking-widest mt-1.5 italic">Special Care Month</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-green-950 shadow-lg">
                       <ArrowRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                    <Sparkles className="text-amber-600 shrink-0" size={14} />
                    <p className="text-[14px] text-green-900 leading-relaxed font-black italic">"{item.displayNote}"</p>
                  </div>
                </Link>
              ))}
            </div>

            {generalPlants.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="bg-white p-6 rounded-[2.5rem] border-2 border-green-100 shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[14px] font-black text-green-800/60 uppercase tracking-[0.2em]">{currentMonthName} - General Garden Notes</span>
                    </div>
                    <p className="text-green-900 text-[14px] font-black italic leading-relaxed">
                      "{generalMonthlyAdvice}"
                    </p>
                  </div>
                </div>

                <div className="pt-6 space-y-10">
                  {sortedCategories.map((category) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-[12px] font-black text-green-800/40 uppercase tracking-[0.3em] px-2 flex items-center gap-3">
                        <span>{category}s</span>
                        <span className="h-[1px] bg-green-200 flex-grow"></span>
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {groupedByType[category].map((item) => (
                          <Link 
                            key={item.id} 
                            href={`/plants/${item.plants.id}?mode=my-garden`} 
                            className="flex items-center justify-between bg-white/60 p-4 rounded-[2rem] border border-white shadow-sm hover:bg-white transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <PlantThumbnail plant={item.plants} size="sm" />
                              <div>
                                <h4 className="text-s font-black text-green-950 uppercase">
                                  {item.nickname || item.plants.common_name}
                                </h4>
                                <p className="text-[8px] text-gray-400 font-black uppercase tracking-tighter">
                                  {item.plants.scientific_name}
                                </p>
                              </div>
                            </div>
                            <ArrowRight size={12} className="text-gray-300" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* --- PROJECTS --- */}
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
                      <h3 className="text-s font-black text-green-950 uppercase leading-none">{item.plants?.common_name}</h3>
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