'use client'

import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ChevronRight, Camera, User, Plus } from 'lucide-react'
import Navigation from '../../components/Navigation'
import { createSupabaseBrowserClient } from '../lib/supabaseClient'

const GARDEN_ARCHIVE = [
  {
    id: 'apr-26',
    month: 'April 2026',
    style: 'Modern Architectural',
    submittedBy: 'Joe from Auckland',
    description: 'Clean lines and structural plants that look great year-round in the NZ sun.',
    image: 'https://images.unsplash.com/photo-1558905619-17355095afe0?auto=format&fit=crop&q=80',
    plantNames: ['Bird Of Paradise', 'Kentia Palm', 'Griselinia', 'Star Jasmine']
  },
  {
    id: 'mar-26',
    month: 'March 2026',
    style: 'Native Bush Retreat',
    submittedBy: 'Sarah from Titirangi',
    description: 'A selection of hardy natives designed to blend into the local Waitakere landscape.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80',
    plantNames: ['Pohutukawa', 'NZ Flax', 'Manuka', 'Silver Flax']
  }
]

export default function GardenFeatures() {
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const [favorites, setFavorites] = useState<string[]>([])
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [currentPlants, setCurrentPlants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const current = GARDEN_ARCHIVE[featuredIndex]

  // 1. Fetch Featured Plants (UI Display)
  useEffect(() => {
    async function fetchPlantDetails() {
      if (!current?.plantNames?.length) return
      setLoading(true)
      
      const { data, error } = await supabase
        .from('plants')
        .select('id, common_name, image_url')
        .in('common_name', current.plantNames)

      if (error) {
        console.error('Error fetching featured plants:', error)
        setCurrentPlants([])
      } else if (data) {
        const uniqueMap = new Map();
        data.forEach((p) => { if (!uniqueMap.has(p.common_name)) uniqueMap.set(p.common_name, p); });
        const sorted = Array.from(uniqueMap.values()).sort((a: any, b: any) => a.common_name.localeCompare(b.common_name))
        setCurrentPlants(sorted)
      }
      setLoading(false)
    }
    fetchPlantDetails()
  }, [featuredIndex, supabase])

  // 2. Load Favorites
  useEffect(() => {
    const saved = localStorage.getItem('garden-favorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(fav => fav !== id) : [...favorites, id]
    setFavorites(newFavs)
    localStorage.setItem('garden-favorites', JSON.stringify(newFavs))
  }

  const handlePlantClick = (plantId: number) => {
    router.push(`/plants/${plantId}`)
  }

  // 3. The Professional Formatted Email Logic
  const handleEmailSubmit = async () => {
    setLoading(true)
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      alert("Please log in to submit your garden!");
      setLoading(false)
      return;
    }

    const { data: userPlants, error: plantsError } = await supabase
      .from('user_plants')
      .select(`
        plant_id,
        plants (
          common_name
        )
      `)
      .eq('user_id', user.id);

    if (plantsError) {
      console.error('DEBUG - Query Error:', plantsError);
      alert(`Database Error: ${plantsError.message}`);
      setLoading(false)
      return;
    }

    const plantListText = (userPlants && userPlants.length > 0)
      ? userPlants
          .map((item: any) => {
            const p = item.plants;
            return Array.isArray(p) ? p[0]?.common_name : p?.common_name;
          })
          .filter(Boolean)
          .join(', ')
      : "No plants in my garden yet";

    // --- UPDATED EMAIL FORMATTING ---
    const recipient = "pocketgardeneruploads@gmail.com";
    const subject = "Pocket Gardener Feature Submission";
    
    // Using \r\n inside the join for ultimate reliability across devices
    const bodyText = [
      'Hi Pocket Gardener,',
      '',
      "I'd love to feature my garden in the app!",
      '',
      'My garden style: [Type here]',
      'My location: [Type here]',
      `My current app plants: ${plantListText}`,
      '',
      'Please attach photos of your garden to this email before sending.'
    ].join('\r\n');

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    setLoading(false);
    window.location.href = mailtoUrl;
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] pb-40">
      <section className="relative h-[55vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img 
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={current.image} 
            className="w-full h-full object-cover" 
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-green-500 text-[8px] font-black uppercase px-2 py-1 rounded-md tracking-widest">Community Feature</span>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">{current.month}</p>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">{current.style}</h1>
            <div className="flex items-center gap-1.5 opacity-80">
                <User size={10} className="text-green-400" />
                <p className="text-[10px] font-bold uppercase tracking-tight">Featured: {current.submittedBy}</p>
            </div>
          </div>
          <button onClick={() => toggleFavorite(current.id)} className={`p-4 rounded-3xl backdrop-blur-md transition-all active:scale-75 ${favorites.includes(current.id) ? 'bg-red-500 text-white' : 'bg-white/10 text-white border border-white/20'}`}>
            <Heart size={20} fill={favorites.includes(current.id) ? "currentColor" : "none"} />
          </button>
        </div>
      </section>

      <section className="p-6">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 -mt-10 relative z-20">
          <p className="text-xs text-gray-500 font-medium leading-relaxed mb-8">
            <span className="text-green-700 font-black mr-1 text-[10px] uppercase">The Story:</span>
            {current.description}
          </p>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Featured Plants (A-Z)</h2>
          <div className="grid grid-cols-1 gap-3">
            {loading ? (
              <div className="text-[10px] font-bold text-gray-300 animate-pulse uppercase text-center">Syncing...</div>
            ) : (
              currentPlants.map((plant) => (
                <button key={plant.id} onClick={() => handlePlantClick(plant.id)} className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-2xl border border-gray-100 transition-all active:scale-[0.97] hover:bg-green-50/50 group w-full text-left">
                  <img src={plant.image_url} alt={plant.common_name} className="w-12 h-12 rounded-xl object-cover shadow-sm border border-white" />
                  <div className="flex-1">
                    <h3 className="text-[11px] font-black uppercase text-gray-800 tracking-tight leading-none group-hover:text-green-800 transition-colors">{plant.common_name}</h3>
                    <p className="text-[8px] font-bold text-green-600/60 uppercase mt-1">Tap for care info</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 group-hover:border-green-200 transition-all">
                    <Plus size={14} className="text-gray-400 group-hover:text-green-600" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="px-6 mb-8">
        <button onClick={handleEmailSubmit} className="w-full bg-green-900 rounded-[2rem] p-6 text-white flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="text-left">
                <h4 className="text-sm font-black uppercase italic tracking-tight">Feature your garden?</h4>
                <p className="text-[10px] opacity-70">Send a photo to be featured next month</p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl group-hover:bg-white/30 transition-colors">
                <Camera size={20} />
            </div>
        </button>
      </section>

      <section className="px-6 space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Garden Archive</h2>
        {GARDEN_ARCHIVE.map((garden, index) => (
          <button key={garden.id} onClick={() => setFeaturedIndex(index)} className={`w-full flex items-center gap-4 p-3 rounded-3xl transition-all border ${featuredIndex === index ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 shadow-sm'}`}>
            <img src={garden.image} className="w-16 h-16 rounded-2xl object-cover" />
            <div className="flex-1 text-left">
              <p className="text-[8px] font-black text-gray-400 uppercase">{garden.month}</p>
              <h4 className="text-xs font-black uppercase text-green-950">{garden.style}</h4>
            </div>
            <ChevronRight size={16} className={featuredIndex === index ? 'text-green-600' : 'text-gray-200'} />
          </button>
        ))}
      </section>
      <Navigation />
    </main>
  )
}