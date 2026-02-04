'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Droplets, Leaf, Heart, Calendar, ChevronRight } from 'lucide-react'
import Navigation from '../../components/Navigation'

// Updated archive with 4+ plants and detailed notes
const GARDEN_ARCHIVE = [
  {
    id: 'jan-26',
    month: 'January 2026',
    style: 'Sub-Tropical Oasis',
    description: 'Layered foliage and vibrant textures for a private jungle feel.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80',
    plants: [
      { name: 'Bird of Paradise', sun: 'Full Sun', water: 'Drains Well', note: 'Provides the essential structural anchor.' },
      { name: 'Bromeliads', sun: 'Part Shade', water: 'Holds Water', note: 'Adds vibrant pops of neon color.' },
      { name: 'Kentia Palm', sun: 'Part Shade', water: 'Drains Well', note: 'Creates the upper canopy and movement.' },
      { name: 'Monstera Deliciosa', sun: 'Full Shade', water: 'Drains Well', note: 'Fills the lower levels with iconic texture.' }
    ]
  },
  {
    id: 'dec-25',
    month: 'December 2025',
    style: 'English Cottage',
    description: 'A romantic, informal mix of flowering perennials and stone paths.',
    image: 'https://images.unsplash.com/photo-1558905619-17355095afe0?auto=format&fit=crop&q=80',
    plants: [
      { name: 'Lavender', sun: 'Full Sun', water: 'Dry', note: 'Fragrance and a magnet for local bees.' },
      { name: 'Foxgloves', sun: 'Part Shade', water: 'Drains Well', note: 'Provides classic vertical height.' },
      { name: 'Climbing Roses', sun: 'Full Sun', water: 'Drains Well', note: 'Softens hard edges and fences.' }
    ]
  }
]

export default function GardenFeatures() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [featuredIndex, setFeaturedIndex] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('garden-favorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) 
      ? favorites.filter(fav => fav !== id) 
      : [...favorites, id]
    
    setFavorites(newFavs)
    localStorage.setItem('garden-favorites', JSON.stringify(newFavs))
  }

  const current = GARDEN_ARCHIVE[featuredIndex]

  return (
    <main className="min-h-screen bg-[#f8faf9] pb-40">
      {/* 1. HERO SPOTLIGHT */}
      <section className="relative h-[50vh] w-full overflow-hidden">
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
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end">
          <div className="text-white">
            <p className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-1">{current.month}</p>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{current.style}</h1>
          </div>
          
          <button 
            onClick={() => toggleFavorite(current.id)}
            className={`p-4 rounded-full backdrop-blur-md transition-all active:scale-75 ${favorites.includes(current.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white border border-white/30'}`}
          >
            <Heart size={24} fill={favorites.includes(current.id) ? "currentColor" : "none"} />
          </button>
        </div>
      </section>

      {/* 2. PLANT PALETTE (Vertical Scroll Fixed Box) */}
      <section className="p-6">
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-green-50 -mt-12 relative z-20">
          <p className="text-sm text-gray-600 italic mb-6 leading-relaxed">"{current.description}"</p>
          
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-800 mb-4">Planting Guide</h2>
          
          {/* Vertical scroll container for plants */}
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
            {current.plants.map((plant) => (
              <div key={plant.name} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                  <Leaf size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-black uppercase text-green-950">{plant.name}</h3>
                  <p className="text-[10px] text-gray-400 italic mb-2 leading-tight">{plant.note}</p>
                  <div className="flex gap-2">
                    <span className="text-[8px] font-bold text-gray-400 uppercase bg-gray-100 px-1.5 py-0.5 rounded leading-none">{plant.sun}</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase bg-gray-100 px-1.5 py-0.5 rounded leading-none">{plant.water}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREVIOUS EDITIONS */}
      <section className="px-6 space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Previous Editions</h2>
        
        {GARDEN_ARCHIVE.map((garden, index) => (
          <button 
            key={garden.id}
            onClick={() => setFeaturedIndex(index)}
            className={`w-full flex items-center gap-4 p-3 rounded-3xl transition-all border ${featuredIndex === index ? 'bg-green-50 border-green-200' : 'bg-white border-transparent shadow-sm'}`}
          >
            <img src={garden.image} className="w-16 h-16 rounded-2xl object-cover" />
            <div className="flex-1 text-left">
              <p className="text-[8px] font-black text-gray-400 uppercase">{garden.month}</p>
              <h4 className="text-xs font-black uppercase text-green-950">{garden.style}</h4>
            </div>
            <div className="flex items-center gap-3 pr-2">
                {favorites.includes(garden.id) && <Heart size={12} className="text-red-500" fill="currentColor" />}
                <ChevronRight size={16} className="text-gray-300" />
            </div>
          </button>
        ))}
      </section>

      <Navigation />
    </main>
  )
}