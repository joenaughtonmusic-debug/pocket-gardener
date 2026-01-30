'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import Navigation from "../../components/Navigation"
import PlantThumbnail from "../../components/PlantThumbnail"
import PageHelp from '../../components/PageHelp'

export default function BuildPage() {
  const [sun, setSun] = useState('Full Sun')
  const [soil, setSoil] = useState('Clay')
  const [water, setWater] = useState('Drains Well')
  const [size, setSize] = useState('1-2m') 
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function getLiveMatches() {
      setLoading(true)
      const { data } = await supabase
        .from('plants')
        .select('*')
        .contains('sun_requirement', [sun])
        .contains('soil_type', [soil])
        .contains('water_behavior', [water])
        .contains('mature_size', [size]) 
      
      if (data) {
        // Sort results alphabetically by common_name
        const sortedMatches = [...data].sort((a, b) => 
          (a.common_name || "").localeCompare(b.common_name || "")
        );
        setMatches(sortedMatches)
      }
      setLoading(false)
    }
    getLiveMatches()
  }, [sun, soil, water, size, supabase])

  const sunOptions = [
    { name: 'Full Sun', icon: '☀️' }, 
    { name: 'Part Shade', icon: '⛅' }, 
    { name: 'Full Shade', icon: '☁️' }
  ]
  const soilOptions = [
    { name: 'Clay', icon: '🧱' }, 
    { name: 'Sandy', icon: '🏖️' }, 
    { name: 'Loam', icon: '🪴' }, 
    { name: 'Potting Mix', icon: '🥡' }
  ]
  const waterOptions = [
    { name: 'Holds Water', icon: '💧' }, 
    { name: 'Drains Well', icon: '🚿' }, 
    { name: 'Dry', icon: '🌵' }, 
    { name: 'Under a Roof', icon: '🏠' }
  ]
  const sizeOptions = [
    { name: '<1m', icon: '🌱' }, 
    { name: '1-2m', icon: '🌿' }, 
    { name: '2-4m', icon: '🌳' }, 
    { name: '4m+', icon: '🌲' }
  ]

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">Garden Builder</h1>
          <PageHelp 
            title="Garden Builder"
            description="Find plants that match your garden's specific conditions. Select your filters below and see what thrives best."
            bullets={[
              "Sun or Shade requirements",
              "Soil type (Clay, Sandy, etc.)",
              "Water drainage behavior",
              "Desired mature plant size"
            ]}
            example="If you have a shady corner with clay soil that holds water, select: Full Shade, Clay, and Holds Water."
          />
        </div>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Plant recommendations for your place</p>
      </header>

      <div className="space-y-10">
        {/* SUN SECTION */}
        <section>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Sun Exposure</h3>
          <div className="grid grid-cols-2 gap-3">
            {sunOptions.map((opt) => (
              <button 
                key={opt.name} 
                onClick={() => setSun(opt.name)} 
                className={`p-5 rounded-[2rem] border transition-all active:scale-95 flex items-center gap-3 ${
                  sun === opt.name 
                  ? 'bg-[#2d5a3f] text-white border-[#2d5a3f] shadow-lg shadow-green-900/10' 
                  : 'bg-white text-gray-800 border-gray-100 shadow-sm'
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <p className="font-bold text-[13px] uppercase tracking-tight">{opt.name}</p>
              </button>
            ))}
          </div>
        </section>

        {/* SOIL SECTION */}
        <section>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Soil Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {soilOptions.map((opt) => (
              <button 
                key={opt.name} 
                onClick={() => setSoil(opt.name)} 
                className={`p-5 rounded-[2rem] border transition-all active:scale-95 flex items-center gap-3 ${
                  soil === opt.name 
                  ? 'bg-[#2d5a3f] text-white border-[#2d5a3f] shadow-lg shadow-green-900/10' 
                  : 'bg-white text-gray-800 border-gray-100 shadow-sm'
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <p className="font-bold text-[13px] uppercase tracking-tight">{opt.name}</p>
              </button>
            ))}
          </div>
        </section>

        {/* WATER SECTION */}
        <section>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Water & Drainage</h3>
          <div className="grid grid-cols-2 gap-3">
            {waterOptions.map((opt) => (
              <button 
                key={opt.name} 
                onClick={() => setWater(opt.name)} 
                className={`p-5 rounded-[2rem] border transition-all active:scale-95 flex items-center gap-3 ${
                  water === opt.name 
                  ? 'bg-[#2d5a3f] text-white border-[#2d5a3f] shadow-lg shadow-green-900/10' 
                  : 'bg-white text-gray-800 border-gray-100 shadow-sm'
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <p className="font-bold text-[13px] uppercase tracking-tight">{opt.name}</p>
              </button>
            ))}
          </div>
        </section>

        {/* SIZE SECTION */}
        <section>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Eventual Size Preference</h3>
          <div className="grid grid-cols-2 gap-3">
            {sizeOptions.map((opt) => (
              <button 
                key={opt.name} 
                onClick={() => setSize(opt.name)} 
                className={`p-5 rounded-[2rem] border transition-all active:scale-95 flex items-center gap-3 ${
                  size === opt.name 
                  ? 'bg-[#2d5a3f] text-white border-[#2d5a3f] shadow-lg shadow-green-900/10' 
                  : 'bg-white text-gray-800 border-gray-100 shadow-sm'
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <p className="font-bold text-[13px] uppercase tracking-tight">{opt.name}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="pt-8 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-[10px] font-black text-green-900 uppercase tracking-[0.2em]">
              Recommended ({matches.length})
            </h3>
            {loading && <div className="w-4 h-4 border-2 border-green-900/20 border-t-green-900 rounded-full animate-spin"></div>}
          </div>

          <div className="space-y-3">
            {matches.map((plant) => (
              <Link 
                href={`/plants/${plant.id}?mode=builder`} 
                key={plant.id} 
                className="flex items-center justify-between p-4 bg-white rounded-[2rem] border border-gray-100 active:scale-[0.98] transition-all group"
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
                <span className="text-gray-200 group-hover:text-green-600 transition-colors mr-2">→</span>
              </Link>
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