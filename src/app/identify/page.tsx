'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import PlantThumbnail from '../../components/PlantThumbnail'

export default function IdentifyPage() {
  const [plants, setPlants] = useState<any[]>([])
  const [userPlantIds, setUserPlantIds] = useState<Set<number>>(new Set())
  const [filteredPlants, setFilteredPlants] = useState<any[]>([])
  
  // Filter States
  const [typeFilter, setTypeFilter] = useState('')
  const [isNative, setIsNative] = useState('')
  const [flowerColor, setFlowerColor] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser()
      
      // 1. Fetch all master plants
      const { data: allPlants } = await supabase.from('plants').select('*')
      
      if (allPlants) {
        // DEDUPLICATION LOGIC: Only keep the first instance of each plant name
        const uniqueMap = new Map();
        allPlants.forEach(p => {
          const name = p.common_name.trim();
          if (!uniqueMap.has(name)) {
            uniqueMap.set(name, p);
          }
        });
        setPlants(Array.from(uniqueMap.values()));
      }

      // 2. Fetch user's current plants to show checkmarks
      if (user) {
        const { data: userPlants } = await supabase
          .from('user_plants')
          .select('plant_id')
          .eq('user_id', user.id)
        
        if (userPlants) {
          const ids = new Set(userPlants.map(p => Number(p.plant_id)))
          setUserPlantIds(ids)
        }
      }
    }
    fetchData()
  }, [supabase])

  useEffect(() => {
    let list = [...plants]

    if (typeFilter) list = list.filter(p => p.plant_type === typeFilter)
    if (flowerColor) list = list.filter(p => p.flower_color === flowerColor)
    if (isNative) {
      const nativeBool = isNative === 'Yes'
      list = list.filter(p => p.is_native === nativeBool)
    }

    const sortedList = list.sort((a, b) => {
      if (a.is_common !== b.is_common) return a.is_common ? -1 : 1
      return a.common_name.localeCompare(b.common_name)
    })

    setFilteredPlants(sortedList)
  }, [typeFilter, isNative, flowerColor, plants])

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase">Identify</h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mt-1">Auckland Plant Finder</p>
      </header>

      {/* FILTERS SECTION */}
      <div className="space-y-3 mb-10">
        <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
          <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Plant Category</label>
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {['Hedge', 'Shrub', 'Tree', 'Flower', 'Palm', 'Flax', 'Groundcover', 'Climber', 'Fruit'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
            <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Native?</label>
            <select 
              value={isNative}
              onChange={(e) => setIsNative(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
            >
              <option value="">Any Origin</option>
              <option value="Yes">NZ Native</option>
              <option value="No">Exotic</option>
            </select>
          </div>

          <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
            <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Flowers</label>
            <select 
              value={flowerColor}
              onChange={(e) => setFlowerColor(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
            >
              <option value="">Any Color</option>
              {['White', 'Pink', 'Red', 'Blue', 'Yellow', 'Purple', 'Orange'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="space-y-4">
        <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-2">
          {filteredPlants.length} Plants Found
        </h2>
        
        <div className="grid grid-cols-1 gap-2">
          {filteredPlants.map((plant) => (
            <Link href={`/plants/${plant.id}`} key={plant.id} className="block group">
              <div className="bg-white p-4 rounded-[2rem] border border-gray-100 flex items-center gap-4 group-active:scale-[0.98] transition-all">
                <div className="w-14 h-14 flex-shrink-0">
                  <PlantThumbnail plant={plant} size="sm" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight leading-none truncate">
                        {plant.common_name}
                    </h3>
                    {userPlantIds.has(Number(plant.id)) && (
                      <span className="text-green-500 font-bold text-xs">✓</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 italic mt-1 font-medium truncate">
                    {plant.scientific_name}
                  </p>
                </div>
                <div className="text-gray-200 pr-2 group-hover:text-green-600 transition-colors text-lg">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Navigation />
    </main>
  )
}