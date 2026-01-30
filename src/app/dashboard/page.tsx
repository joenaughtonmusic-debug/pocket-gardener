'use client'

import { useEffect, useState, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
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
  // NEW: State to track Pro status
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

  async function getGarden() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // NEW: Fetch Pro Status from Profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setIsPro(profile.is_pro);
      }

      setUserName(user.user_metadata?.display_name || "Gardener")
      setGardenPhoto(user.user_metadata?.garden_photo || null)

      const monthIndex = new Date().getMonth()
      const currentMonthNumber = monthIndex + 1
      
      const { data: plants } = await supabase
        .from('user_plants')
        .select(`id, plant_id, is_project, nickname, plants (*)`)
        .eq('user_id', user.id)
      
      if (plants) {
        const sortedPlants = [...(plants as any[])].sort((a, b) => 
          (a.plants?.common_name || "").localeCompare(b.plants?.common_name || "")
        );

        setOwnedPlants(sortedPlants.filter(item => !item.is_project));
        setProjectPlants(sortedPlants.filter(item => item.is_project));

        let season = 'Winter';
        if ([7, 8, 9].includes(monthIndex)) season = 'Spring';
        if ([10, 11, 0].includes(monthIndex)) season = 'Summer';
        if ([1, 2, 3].includes(monthIndex)) season = 'Autumn';
        
        const ownedIds = plants.filter(p => !p.is_project).map(p => p.plant_id);
        
        if (ownedIds.length > 0) {
          const { data: tip } = await supabase
            .from('expert_tips')
            .select('*, plants(common_name)')
            .in('plant_id', ownedIds)
            .or(`season.eq.${season},season.eq.Any`)
            .limit(1)
            .maybeSingle();
          
          if (tip) setFeaturedTip(tip);
        }
      }

      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const { data: logs } = await supabase
        .from('plant_logs')
        .select(`*, user_plants (plants (common_name, id, image_url, plant_type))`)
        .eq('user_id', user.id)
        .eq('status', 'Ongoing')
        .lte('created_at', thirtyDaysAgo.toISOString())
      if (logs) setFollowUpAlerts(logs)

      const { data: notes } = await supabase.from('auckland_monthly_care').select('*').eq('month_number', currentMonthNumber)
      if (notes) setCareNotes(notes)
    }
    setLoading(false)
  }

  async function handleResolveIssue(logId: string, plantName: string) {
    const { error } = await supabase
      .from('plant_logs')
      .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
      .eq('id', logId)
    if (!error) {
      alert(`Great news about your ${plantName}! History updated.`);
      getGarden();
    }
  }

  const groupedOwned = ownedPlants.reduce((acc: any, item) => {
    const type = item.plants?.plant_type || "Other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `garden-photos/${fileName}`;
      await supabase.storage.from('weed-images').upload(filePath, file);
      const { data: { publicUrl } } = supabase.storage.from('weed-images').getPublicUrl(filePath);
      await supabase.auth.updateUser({ data: { garden_photo: publicUrl } });
      setGardenPhoto(publicUrl);
    } catch (err) { console.error(err); alert("Error uploading photo"); } finally { setUploading(false); }
  };

  async function handleUpdateUserName() {
    const newName = window.prompt("Enter your name:", userName)
    if (newName && newName !== userName) {
      const { error } = await supabase.auth.updateUser({ data: { display_name: newName } })
      if (!error) setUserName(newName);
    }
  }

  useEffect(() => { getGarden() }, [supabase])

  const handleBulkMove = async () => {
    if (selectedIds.length === 0) return
    const { error } = await supabase.from('user_plants').update({ is_project: false }).in('id', selectedIds)
    if (!error) { setSelectedIds([]); getGarden(); }
  }

  if (loading) return <div className="p-20 text-center text-gray-400 font-bold tracking-widest uppercase text-[10px]">Loading Garden...</div>

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <WelcomeOverlay />

      <header className="mb-6 pt-4 flex justify-between items-start">
        <div className="flex-grow pr-4">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">My Garden</h1>
            <PageHelp title="My Garden" description="Your main garden overview." bullets={["Track plant health", "Monthly care reminders", "Keep your garden thriving"]} />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-[11px] text-gray-400 font-medium italic leading-none">Welcome back, <span className="text-green-700 font-bold not-italic">{userName}</span></p>
            <button onClick={handleUpdateUserName} className="bg-gray-200 hover:bg-green-100 w-5 h-5 rounded-full flex items-center justify-center transition-colors shadow-sm">
              <span className="text-[10px] text-gray-600 leading-none">✎</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Link href="/about" className="text-xl bg-white w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center shadow-sm active:scale-90 transition-transform">🧑‍🌾</Link>
          <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.15em] whitespace-nowrap">About / Signout</span>
        </div>
      </header>

      <section className="mb-10">
        <div onClick={() => fileInputRef.current?.click()} className="relative w-full h-48 rounded-[2rem] bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center cursor-pointer active:scale-[0.99] transition-all">
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
               <span className="text-2xl animate-spin">🌀</span>
               <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Uploading...</span>
            </div>
          ) : gardenPhoto ? (
            <img src={gardenPhoto} alt="My Garden" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-40">
              <span className="text-4xl">🏡</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Add a photo of your garden</span>
            </div>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
      </section>

      {/* --- REFINED UPGRADE SECTION (CONDITIONAL) --- */}
      {!isPro && (
        <section className="mb-12 px-2">
            <div className="bg-[#f0f7f3] rounded-[3rem] p-8 relative overflow-hidden flex flex-col items-center text-center border border-green-100/50 shadow-sm">
            <div className="relative z-10 max-w-[300px]">
                <span className="text-[9px] font-black text-green-700/60 uppercase tracking-[0.2em] mb-4 block">Pro Garden Membership</span>
                
                <h2 className="text-xl font-black mb-3 uppercase tracking-tight text-green-900 leading-tight">Grow without limits</h2>
                
                <ul className="text-[11px] text-gray-600 font-medium italic mb-8 space-y-2 text-center list-none">
                <li>🌿 Unlimited plants in your garden</li>
                <li>🔍 Full use of Plant Identifier</li>
                <li>📋 Unlock the Garden Builder</li>
                <li>📚 Access all detailed expert guides</li>
                </ul>
                
                <div className="max-w-[220px] mx-auto">
                <UpgradeButton />
                </div>
            </div>
            {/* Subtle background element */}
            <span className="absolute -right-1 -bottom-1 text-7xl opacity-[0.07] select-none rotate-12">🌿</span>
            </div>
        </section>
      )}

      <div className="space-y-12">
        {followUpAlerts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] px-2 animate-pulse">Follow-up Required</h2>
            {followUpAlerts.map((alert) => (
              <div key={alert.id} className="bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100 relative shadow-sm">
                <div className="flex gap-4 mb-4">
                  <Link href={`/plants/${alert.user_plants?.plants?.id}?mode=my-garden`} className="w-12 h-12 flex-shrink-0">
                    <PlantThumbnail plant={alert.user_plants?.plants} size="sm" />
                  </Link>
                  <div className="flex-grow">
                    <h3 className="text-sm font-black text-orange-900 uppercase leading-tight">Health Check: {alert.user_plants?.plants?.common_name}</h3>
                    <p className="text-[11px] text-orange-700/70 mt-1 font-medium italic">Still having "{alert.issue_type}" issues?</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleResolveIssue(alert.id, alert.user_plants?.plants?.common_name)} className="flex-1 bg-white py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-green-700 border border-green-100 active:scale-95">Yes, it's fixed!</button>
                  <Link href={`/plants/${alert.user_plants?.plants?.id}?mode=my-garden`} className="flex-1 bg-orange-100 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-orange-800 text-center active:scale-95">View Remedies →</Link>
                </div>
              </div>
            ))}
          </section>
        )}

        {featuredTip && (
          <section className="px-2">
            <details className="group bg-green-900 rounded-[2.5rem] shadow-xl overflow-hidden transition-all border border-green-800">
              <summary className="list-none flex justify-between items-center p-8 cursor-pointer active:bg-green-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl drop-shadow-md">
                    {getSeasonIcon(featuredTip.season)}
                  </span>
                  <div className="flex flex-col">
                    <span className="bg-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full backdrop-blur-sm w-fit">
                      {featuredTip.season} Pro Tip
                    </span>
                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-1.5 px-1">
                      For your {featuredTip.plants?.common_name}
                    </span>
                  </div>
                </div>
                <span className="text-white/30 text-xs font-black transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-white text-lg font-medium italic leading-relaxed border-t border-white/10 pt-6">
                  "{featuredTip.tip_text}"
                </p>
              </div>
            </details>
          </section>
        )}

        {Object.keys(groupedOwned).length > 0 && (
          <section className="space-y-10">
            <h2 className="text-[10px] font-black text-green-800 uppercase tracking-[0.2em] px-2 border-b border-green-100 pb-2">
              {currentMonthName} Care Guide
            </h2>
            {Object.keys(groupedOwned).map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] px-2 italic">{category}s</h3>
                {groupedOwned[category].map((item: UserPlant) => {
                  const plant = item.plants; 
                  const specificNote = careNotes.find(n => n.plant_type === plant.common_name) || careNotes.find(n => n.plant_type === plant.plant_type) || careNotes.find(n => n.plant_type === 'General');
                  return (
                    <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                      <div className="flex gap-4 mb-4">
                        <Link href={`/plants/${plant.id}?mode=my-garden`} className="w-14 h-14 flex-shrink-0 active:scale-95 transition-transform">
                          <PlantThumbnail plant={plant} size="sm" />
                        </Link>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                              <Link href={`/plants/${plant.id}?mode=my-garden`} className="text-left group">
                                <h3 className="text-lg font-black text-gray-800 tracking-tighter uppercase leading-none group-hover:text-green-700">
                                  {item.nickname || plant.common_name}
                                </h3>
                              </Link>
                              {item.nickname && (
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                                  {plant.common_name}
                                </p>
                              )}
                            </div>
                            <Link href={`/plants/${plant.id}?mode=my-garden`} className="text-[9px] font-black text-green-700 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full flex items-center gap-1.5 active:scale-95 transition-all">
                               <span>View</span>
                               <span className="text-sm font-light">→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="text-[12px] text-gray-600 leading-relaxed bg-[#f1f9f4] p-4 rounded-2xl border border-green-50 font-medium italic">"{specificNote?.care_note || "General maintenance and watering for this month."}"</p>
                    </div>
                  );
                })}
              </div>
            ))}
          </section>
        )}

        {projectPlants.length > 0 && (
          <section className="space-y-4 pb-10">
            <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-2">Future Projects</h2>
            <div className="space-y-3">
              {projectPlants.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <button onClick={() => setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])} className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all ${selectedIds.includes(item.id) ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-gray-200 text-transparent'}`}>✓</button>
                  <Link href={`/plants/${item.plants?.id}?mode=my-garden`} className="flex-grow bg-white p-4 rounded-[2rem] border border-gray-100 flex items-center gap-4 active:scale-[0.98] shadow-sm">
                    <div className="w-10 h-10 flex-shrink-0"><PlantThumbnail plant={item.plants} size="sm" /></div>
                    <div><h3 className="text-sm font-black text-gray-700 uppercase leading-none">{item.plants?.common_name}</h3><p className="text-[8px] text-blue-500 font-black uppercase tracking-widest mt-1">Planning Phase</p></div>
                  </Link>
                </div>
              ))}
              {selectedIds.length > 0 && <button onClick={handleBulkMove} className="w-full bg-[#2d5a3f] text-white text-[10px] font-black py-4 rounded-full uppercase tracking-widest shadow-xl mt-2">Confirm {selectedIds.length} Plants are in the ground</button>}
            </div>
          </section>
        )}
      </div>
      <Navigation />
    </main>
  )
}