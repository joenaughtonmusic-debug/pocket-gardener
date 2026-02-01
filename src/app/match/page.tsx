'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Sun, Droplets, Mountain, Ruler, ChevronRight, Plus, X, Sparkles } from 'lucide-react'
import Navigation from "../../components/Navigation"
import PlantThumbnail from "../../components/PlantThumbnail"
import PageHelp from '../../components/PageHelp'

export default function MatchPage() {
  const [sun, setSun] = useState('Full Sun')
  const [soil, setSoil] = useState('Clay')
  const [water, setWater] = useState('Drains Well')
  const [size, setSize] = useState('1-2m') 
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  
  // State for the Pop-up Modal
  const [selectedPlant, setSelectedPlant] = useState<any | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleAddToProject = async (plantId: string) => {
    const { error } = await supabase
      .from('project_plants')
      .insert([{ plant_id: plantId }]);

    if (!error) {
      alert('Added to your project!');
      setSelectedPlant(null); // Close popup after adding
    }
  }

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
        const sortedMatches = [...data].sort((a, b) => 
          (a.common_name || "").localeCompare(b.common_name || "")
        );
        setMatches(sortedMatches)
      }
      setLoading(false)
    }
    getLiveMatches()
  }, [sun, soil, water, size, supabase])

  const filterGroups = [
    { label: 'Sun Exposure', value: sun, setter: setSun, options: ['Full Sun', 'Part Shade', 'Full Shade'], icon: <Sun size={14}/> },
    { label: 'Soil Type', value: soil, setter: setSoil, options: ['Clay', 'Sandy', 'Healthy/loam', 'Potting Mix'], icon: <Mountain size={14}/> },
    { label: 'Drainage', value: water, setter: setWater, options: ['Holds Water', 'Drains Well', 'Dry', 'Under a Roof'], icon: <Droplets size={14}/> },
    { label: 'Mature Size', value: size, setter: setSize, options: ['<1m', '1-2m', '2-4m', '4m+'], icon: <Ruler size={14}/> },
  ]

  return (
    <main className="min-h-screen bg-[#f0f4f1] text-gray-900 pb-40">
      <div className="max-w-2xl mx-auto p-6">
        
        <header className="mb-8 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-green-950 tracking-tighter italic uppercase leading-none">The Matchmaker</h1>
              <p className="text-[10px] text-green-700/60 font-black uppercase tracking-[0.2em] mt-2">Precision planting for your space</p>
            </div>
            <PageHelp title="Matchmaker" description="Select conditions to see what will thrive." bullets={["Filters by Sun, Soil, and Water"]} />
          </div>
        </header>

        {/* --- FILTERS --- */}
        <div className="space-y-8 mb-10">
          {filterGroups.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="text-green-800 opacity-40">{group.icon}</span>
                <h3 className="text-[10px] font-black text-green-900/40 uppercase tracking-widest">{group.label}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {group.options.map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => group.setter(opt)}
                    className={`px-3 py-4 rounded-[1.5rem] text-[10px] font-black uppercase transition-all border-2 text-center
                      ${group.value === opt 
                        ? 'bg-green-800 text-white border-green-800 shadow-lg' 
                        : 'bg-white text-gray-400 border-white hover:border-green-100 shadow-sm'
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- RESULTS LIST --- */}
        <section className="relative pt-8 border-t border-green-900/5">
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-[10px] font-black text-green-900 uppercase tracking-[0.2em]">
              Recommended ({matches.length})
            </h3>
            {loading && <div className="w-4 h-4 border-2 border-green-900/20 border-t-green-900 rounded-full animate-spin"></div>}
          </div>

          <div className="space-y-3">
            {matches.map((plant) => (
              <button 
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-[2rem] border border-transparent shadow-sm active:scale-[0.98] transition-all text-left hover:border-green-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0">
                    <PlantThumbnail plant={plant} size="sm" />
                  </div>
                  <div>
                    <span className="font-black text-green-950 text-sm uppercase tracking-tight block leading-tight">{plant.common_name}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter italic">{plant.plant_type}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                  <ChevronRight size={18}/>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* --- SIMPLIFIED PLANT DETAIL POPUP --- */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-green-950/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedPlant(null)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
            <button 
              onClick={() => setSelectedPlant(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden mb-4 shadow-xl">
                  <PlantThumbnail plant={selectedPlant} size="lg" />
                </div>
                <h2 className="text-2xl font-black text-green-950 uppercase tracking-tighter leading-none italic">
                  {selectedPlant.common_name}
                </h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 italic">
                  {selectedPlant.botanical_name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#f0f4f1] p-4 rounded-2xl">
                  <p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Growth</p>
                  <p className="text-sm font-bold text-green-950">{selectedPlant.mature_size || size}</p>
                </div>
                <div className="bg-[#f0f4f1] p-4 rounded-2xl">
                  <p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Type</p>
                  <p className="text-sm font-bold text-green-950">{selectedPlant.plant_type || 'Shrub'}</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs font-medium text-gray-600">
                  <Sparkles size={16} className="text-amber-400" />
                  <span>Perfectly suited for {sun.toLowerCase()} conditions.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleAddToProject(selectedPlant.id)}
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-green-950 font-black uppercase tracking-widest py-4 rounded-2xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} strokeWidth={3} />
                  Add to Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </main>
  )
}