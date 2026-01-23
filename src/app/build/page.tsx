'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import Navigation from "../../components/Navigation"
import PlantThumbnail from "../../components/PlantThumbnail"

// Safe initialization for Vercel
const getSupabase = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  )
}

export default function BuildPage() {
  const [sun, setSun] = useState('Full Sun')
  const [soil, setSoil] = useState('Clay')
  const [water, setWater] = useState('Drains Well')
  const [size, setSize] = useState('1-2m')
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [addingId, setAddingId] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabase()
    async function getLiveMatches() {
      setLoading(true)
      const { data } = await supabase
        .from('plants')
        .select('*')
        .contains('sun_requirement', [sun])
        .contains('soil_type', [soil])
        .contains('water_behavior', [water])
        .contains('mature_size', [size])
      
      if (data) setMatches(data)
      setLoading(false)
    }
    getLiveMatches()
  }, [sun, soil, water, size])

  // ADD DIRECTLY TO GARDEN (Planted Section)
  const addDirectlyToGarden = async (e: React.MouseEvent, plant: any) => {
    e.preventDefault()
    e.stopPropagation()
    
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Please sign in to save plants!")
      return
    }

    setAddingId(plant.id)
    
    const { error } = await supabase
      .from('user_plants')
      .insert([
        { 
          user_id: user.id, 
          plant_id: plant.id,
          is_project: false // This puts it in the 'Owned' list immediately
        }
      ])

    setAddingId(null)

    if (error) {
      alert("Error adding to garden.")
    } else {
      alert(`Successfully added ${plant.common_name} to your garden!`)
    }
  }

  // Options arrays... (same as before)
  const sunOptions = [{ name: 'Full Sun', icon: '☀️' }, { name: 'Part Shade', icon: '⛅' }, { name: 'Full Shade', icon: '☁️' }]
  const soilOptions = [{ name: 'Clay', icon: '🧱' }, { name: 'Sandy', icon: '🏖️' }, { name: 'Healthy/loam', icon: '🪴' }, { name: 'Potting Mix', icon: '🥡' }]
  const waterOptions = [{ name: 'Holds Water', icon: '💧' }, { name: 'Drains Well', icon: '🚿' }, { name: 'Dry', icon: '🌵' }, { name: 'Under a Roof', icon: '🏠' }]
  const sizeOptions = [{ name: '<1m', icon: '🌱' }, { name: '1-2m', icon: '🌿' }, { name: '2-4m', icon: '🌳' }, { name: '4m+', icon: '🌲' }]

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase">Garden Builder</h1>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Match plants to your backyard</p>
      </header>

      <div className="space-y-10">
        {/* SELECTORS (Keep your same structure) */}
        {/* ... Sun, Soil, Water, Size sections remain exactly as your code ... */}

        <section className="pt-8 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-[10px] font-black text-green-900 uppercase tracking-[0.2em]">Recommended ({matches.length})</h3>
            {loading && <div className="w-4 h-4 border-2 border-green-900/20 border-t-green-900 rounded-full animate-spin"></div>}
          </div>

          <div className="space-y-4">
            {matches.map((plant) => (
              <div key={plant.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-2 shadow-sm">
                <Link 
                  href={`/plants/${plant.id}?mode=builder`} 
                  className="flex items-center justify-between p-3 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <PlantThumbnail plant={plant} size="sm" />
                    </div>
                    <div>
                      <span className="font-black text-gray-800 text-sm uppercase tracking-tight block leading-none">{plant.common_name}</span>
                      <span className="text-[10px] text-gray-400 italic font-medium">{plant.plant_type}</span>
                    </div>
                  </div>
                  <span className="text-gray-300 mr-2">→</span>
                </Link>
                
                {/* THE SUBTLE SHORTCUT */}
                <div className="px-4 pb-3 border-t border-gray-50 pt-2 flex justify-center">
                  <button 
                    onClick={(e) => addDirectlyToGarden(e, plant)}
                    disabled={addingId === plant.id}
                    className="text-[9px] font-black text-green-700/50 uppercase tracking-widest hover:text-green-700 transition-colors"
                  >
                    {addingId === plant.id ? 'Adding...' : 'or add directly to my garden list'}
                  </button>
                </div>
              </div>
            ))}

            {!loading && matches.length === 0 && (
              <div className="text-center py-12 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                <p className="text-xl mb-2 opacity-50">🌱</p>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No plants found for this combo</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Navigation />
    </main>
  )
}