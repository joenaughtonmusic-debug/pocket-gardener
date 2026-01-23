'use client'

import { useEffect, useState, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import PlantThumbnail from '../../components/PlantThumbnail'

// 1. Explicitly define the shape of your data to satisfy TypeScript
interface Plant {
  id: string;
  common_name: string;
  scientific_name?: string;
  plant_type?: string;
  image_url?: string;
}

interface UserPlant {
  id: string;
  is_project: boolean;
  plants: Plant; // Notice this is a single object, not an array
}

export default function MyGardenDashboard() {
  const [ownedPlants, setOwnedPlants] = useState<UserPlant[]>([])
  const [projectPlants, setProjectPlants] = useState<UserPlant[]>([])
  const [followUpAlerts, setFollowUpAlerts] = useState<any[]>([])
  const [careNotes, setCareNotes] = useState<any[]>([]) 
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [nickname, setNickname] = useState<string>("Gardener")
  const [gardenPhoto, setGardenPhoto] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function getGarden() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setNickname(user.user_metadata?.display_name || "Gardener")
      setGardenPhoto(user.user_metadata?.garden_photo || null)

      const currentMonth = new Date().getMonth() + 1
      
      const { data: plants } = await supabase
        .from('user_plants')
        .select(`id, is_project, plants (*)`)
        .eq('user_id', user.id)
      
      if (plants) {
        // 2. Alphabetical Sort using the typed common_name
        const sortedPlants = [...(plants as any[])].sort((a, b) => 
          (a.plants?.common_name || "").localeCompare(b.plants?.common_name || "")
        );

        setOwnedPlants(sortedPlants.filter(item => !item.is_project));
        setProjectPlants(sortedPlants.filter(item => item.is_project));
      }

      // Fetch Alerts and Care Notes
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const { data: logs } = await supabase
        .from('plant_logs')
        .select(`*, user_plants (plants (common_name, id, image_url, plant_type))`)
        .eq('user_id', user.id)
        .eq('status', 'Ongoing')
        .lte('created_at', thirtyDaysAgo.toISOString())
      if (logs) setFollowUpAlerts(logs)

      const { data: notes } = await supabase.from('auckland_monthly_care').select('*').eq('month_number', currentMonth)
      if (notes) setCareNotes(notes)
    }
    setLoading(false)
  }

  // Handle Garden Photo Upload
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

      const { error: uploadError } = await supabase.storage
        .from('weed-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('weed-images')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { garden_photo: publicUrl }
      });

      if (updateError) throw updateError;
      setGardenPhoto(publicUrl);

    } catch (err) {
      console.error(err);
      alert("Error uploading photo");
    } finally {
      setUploading(false);
    }
  };

  // Handle Nickname Update
  async function handleUpdateNickname() {
    const newName = window.prompt("Enter your nickname:", nickname)
    if (newName && newName !== nickname) {
      const { error } = await supabase.auth.updateUser({ data: { display_name: newName } })
      if (!error) setNickname(newName); else alert("Error updating nickname");
    }
  }

  useEffect(() => { getGarden() }, [supabase])

  const handleBulkMove = async () => {
    if (selectedIds.length === 0) return
    const { error } = await supabase.from('user_plants').update({ is_project: false }).in('id', selectedIds)
    if (!error) { setSelectedIds([]); getGarden(); }
  }

  if (loading) return <div className="p-20 text-center text-gray-400 font-bold tracking-widest uppercase text-[10px]">Loading Garden...</div>

  const isGardenEmpty = ownedPlants.length === 0 && projectPlants.length === 0;

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      
      {/* HEADER */}
      <header className="mb-6 pt-4 flex justify-between items-start">
        <div className="flex-grow pr-4">
          <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">My Garden</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-[11px] text-gray-400 font-medium italic leading-none">
              Welcome back, <span className="text-green-700 font-bold not-italic">{nickname}</span>
            </p>
            <button onClick={handleUpdateNickname} className="bg-gray-200 hover:bg-green-100 w-5 h-5 rounded-full flex items-center justify-center transition-colors shadow-sm">
              <span className="text-[10px] text-gray-600 leading-none">✎</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Link href="/about" className="text-xl bg-white w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center shadow-sm active:scale-90 transition-transform">🧑‍🌾</Link>
          <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.15em] whitespace-nowrap">About / Signout</span>
        </div>
      </header>

      {/* RECTANGLE GARDEN PHOTO SECTION */}
      <section className="mb-10">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full h-48 rounded-[2rem] bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center cursor-pointer active:scale-[0.99] transition-all"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
               <span className="text-2xl animate-spin">🌀</span>
               <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Uploading...</span>
            </div>
          ) : gardenPhoto ? (
            <>
              <img src={gardenPhoto} alt="My Garden" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-white/20">
                <span className="text-[9px] font-black text-green-800 uppercase tracking-widest">Update Photo ✎</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-40">
              <span className="text-4xl">🏡</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Add a photo of your garden</span>
            </div>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
      </section>

      <div className="space-y-12">
        {/* EMPTY STATE */}
        {isGardenEmpty && (
          <section className="py-20 text-center flex flex-col items-center">
            <div className="text-4xl mb-4 opacity-50">🌱</div>
            <p className="text-lg font-black text-gray-400 italic uppercase tracking-tighter leading-tight mb-8">Your garden is empty!</p>
            <Link href="/plants" className="bg-[#2d5a3f] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all">Go to the Library</Link>
          </section>
        )}

        {/* FOLLOW UPS */}
        {followUpAlerts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] px-2 animate-pulse">Follow-up Required</h2>
            {followUpAlerts.map((alert) => (
              <Link href={`/plants/${alert.user_plants?.plants?.id}?mode=my-garden`} key={alert.id} className="block active:scale-[0.98] transition-all">
                <div className="bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100 relative overflow-hidden shadow-sm">
                  <div className="flex gap-4 relative z-10">
                    <div className="w-12 h-12 flex-shrink-0">
                       <PlantThumbnail plant={alert.user_plants?.plants} size="sm" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-orange-900 uppercase leading-tight">Status: {alert.user_plants?.plants?.common_name}</h3>
                      <p className="text-[11px] text-orange-700/70 mt-1 font-medium italic">"{alert.issue_type}" update needed.</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* OWNED PLANTS */}
        {ownedPlants.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-2">THIS MONTH IN YOUR GARDEN</h2>
            {ownedPlants.map((item) => {
              const plant = item.plants; 
              const specificNote = careNotes.find(n => n.plant_type === plant.common_name) || 
                                   careNotes.find(n => n.plant_type === plant.plant_type) ||
                                   careNotes.find(n => n.plant_type === 'General');

              return (
                <Link href={`/plants/${plant.id}?mode=my-garden`} key={item.id} className="block active:scale-[0.98] transition-all">
                  <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex gap-4 mb-4">
                      <div className="w-14 h-14 flex-shrink-0"><PlantThumbnail plant={plant} size="sm" /></div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-black text-gray-800 tracking-tighter uppercase leading-none">{plant.common_name}</h3>
                          <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">View →</span>
                        </div>
                        <p className="text-[10px] text-gray-400 italic mt-1 font-medium">{plant.scientific_name}</p>
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-600 leading-relaxed bg-[#f1f9f4] p-4 rounded-2xl border border-green-50 font-medium italic">
                      "{specificNote?.care_note || "General maintenance and watering for this month."}"
                    </p>
                  </div>
                </Link>
              );
            })}
          </section>
        )}

        {/* PROJECTS */}
        {projectPlants.length > 0 && (
          <section className="space-y-4 pb-10">
            <div className="flex justify-between items-end px-2">
              <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Future Projects</h2>
              {selectedIds.length > 0 && (
                <button onClick={handleBulkMove} className="bg-[#2d5a3f] text-white text-[9px] font-black px-6 py-2.5 rounded-full uppercase tracking-widest shadow-xl">
                  Confirm {selectedIds.length} Planted
                </button>
              )}
            </div>
            <div className="space-y-3">
              {projectPlants.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <button onClick={() => setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])} className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all ${selectedIds.includes(item.id) ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-gray-200 text-transparent'}`}>✓</button>
                  <Link href={`/plants/${item.plants?.id}?mode=my-garden`} className="flex-grow bg-white p-4 rounded-[2rem] border border-gray-100 flex items-center gap-4 active:scale-[0.98] transition-all shadow-sm">
                    <div className="w-10 h-10 flex-shrink-0"><PlantThumbnail plant={item.plants} size="sm" /></div>
                    <div>
                      <h3 className="text-sm font-black text-gray-700 uppercase leading-none">{item.plants?.common_name}</h3>
                      <p className="text-[8px] text-blue-500 font-black uppercase tracking-widest mt-1">Planning Phase</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Navigation />
    </main>
  )
}