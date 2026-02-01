"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ChevronDown, ChevronUp, Trash2, Layout, 
  Maximize2, Sun, Droplets, MapPin, Search, AlertCircle, Info 
} from 'lucide-react';

// --- Supabase Client ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- Types (Synced with your CSV Column Options) ---
type SunOption = "Full Sun" | "Part Shade" | "Full Shade";
type SoilOption = "Clay" | "Sandy" | "Healthy/loam" | "Potting Mix";
type WaterOption = "Holds Water" | "Drains Well" | "Dry" | "Under a Roof";

interface Plant {
  id: string | number;
  common_name: string; // Matches your CSV
  plant_type: string;  // Matches your CSV
  sun_requirement: SunOption[]; // Matches your CSV Array format
  soil_type: SoilOption[];      // Matches your CSV Array format
  water_behavior: WaterOption[]; // Matches your CSV Array format
  builder_image_url: string;
}

interface PlacedPlant extends Plant {
  instanceId: string;
  positionX: number;
  row: 'back' | 'middle' | 'front';
}

const BACKGROUND_TYPES = [
  { id: 'standard_fence', label: 'Standard Fence', sun: 'Full Sun', url: 'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/backgrounds/Gemini_standard%20fence.png' },
  { id: 'shady_corner', label: 'Shady Corner', sun: 'Full Shade', url: 'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/backgrounds/Gemini_shady%20corner.png' },
  { id: 'modern_metal', label: 'Modern Metal', sun: 'Full Sun', url: 'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/backgrounds/Gemini_modern%20metal%20fence.png' },
  { id: 'wire_x', label: 'Wire Trellis X', sun: 'Full Sun', url: 'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/backgrounds/Gemini_wire%20trellis%20x.png' },
  { id: 'garden_extended', label: 'Extended Bed', sun: 'Full Shade', url: 'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/backgrounds/Gemini_Generated_Image_3t1dvc3t1dvc3t1d.png' },
];

export default function GardenBuilder() {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [selectedBg, setSelectedBg] = useState(BACKGROUND_TYPES[0]);
  const [length, setLength] = useState(4);
  const [soil, setSoil] = useState<SoilOption>("Healthy/loam");
  const [water, setWater] = useState<WaterOption>("Drains Well");
  const [placedPlants, setPlacedPlants] = useState<PlacedPlant[]>([]);
  const [bgMenuOpen, setBgMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    async function fetchPlants() {
      const { data, error } = await supabase.from('plants').select('*');
      if (data) setAllPlants(data as Plant[]);
      if (error) console.error("Supabase Error:", error.message);
    }
    fetchPlants();
  }, []);

  // --- FILTER LOGIC (Updated for CSV Formats) ---
  const availablePlants = useMemo(() => {
    return allPlants.filter(plant => {
      if (!plant.common_name) return false;

      // 1. Sun Match (Check if background sun is in plant's sun array)
      const sunMatch = plant.sun_requirement?.includes(selectedBg.sun as SunOption);

      // 2. Soil Match (Check if selected soil is in plant's soil array)
      const soilMatch = plant.soil_type?.includes(soil);

      // 3. Water Match (Check if selected water is in plant's water array)
      const waterMatch = plant.water_behavior?.includes(water);

      return sunMatch && soilMatch && waterMatch;
    });
  }, [allPlants, selectedBg, soil, water]);

  const addPlant = (plant: Plant) => {
    let row: 'back' | 'middle' | 'front' = 'front';
    const type = plant.plant_type?.toLowerCase();
    
    if (type === 'tree' || type === 'hedge') row = 'back';
    else if (type === 'shrub') row = 'middle';

    const countInRow = placedPlants.filter(p => p.row === row).length;
    const newPlant: PlacedPlant = {
      ...plant,
      instanceId: Math.random().toString(36).substring(7),
      row,
      positionX: (countInRow * 20) % 90 + 5, 
    };
    setPlacedPlants(prev => [...prev, newPlant]);
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col z-30 shadow-2xl">
        <div className="p-4 bg-slate-900 text-white flex flex-col gap-1">
          <h1 className="font-black text-xs uppercase tracking-widest italic">Garden Studio</h1>
          <p className="text-[9px] text-slate-400">Total Database Plants: {allPlants.length}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Background Selection */}
          <section className="border rounded-xl overflow-hidden bg-white shadow-sm">
            <button onClick={() => setBgMenuOpen(!bgMenuOpen)} className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition text-[10px] font-black uppercase text-slate-500">
              <div className="flex items-center gap-2"><Layout size={14}/> View Type</div>
              {bgMenuOpen ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </button>
            {bgMenuOpen && (
              <div className="p-2 grid grid-cols-2 gap-2 max-height-40 overflow-y-auto">
                {BACKGROUND_TYPES.map(bg => (
                  <button key={bg.id} onClick={() => {setSelectedBg(bg); setPlacedPlants([]);}} className={`relative rounded-lg overflow-hidden border-2 transition ${selectedBg.id === bg.id ? 'border-green-600' : 'border-transparent'}`}>
                    <img src={bg.url} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Site Conditions */}
          <div className="space-y-5 px-1">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest flex justify-between">
                Bed Length <span>{length}m</span>
              </label>
              <input type="range" min="2" max="20" step="0.5" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1"><MapPin size={12}/> Soil Condition</label>
                    <select value={soil} onChange={(e) => setSoil(e.target.value as SoilOption)} className="w-full p-2 text-xs border rounded-lg bg-white outline-none">
                        {["Clay","Sandy","Healthy/loam","Potting Mix"].map(o => <option key={o}>{o}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1"><Droplets size={12}/> Water Level</label>
                    <select value={water} onChange={(e) => setWater(e.target.value as WaterOption)} className="w-full p-2 text-xs border rounded-lg bg-white outline-none">
                        {["Holds Water","Drains Well","Dry","Under a Roof"].map(o => <option key={o}>{o}</option>)}
                    </select>
                </div>
            </div>

            <button onClick={() => setShowDebug(!showDebug)} className="text-[9px] font-bold text-slate-300 uppercase flex items-center gap-1">
              <Info size={10}/> {showDebug ? "Hide Debugger" : "Troubleshoot (Show All)"}
            </button>
          </div>
        </div>

        <div className="p-4 border-t bg-slate-50">
          <button onClick={() => setIsModalOpen(true)} className="w-full bg-green-700 text-white font-black py-3 rounded-xl text-[10px] uppercase shadow-lg hover:bg-green-800 transition">View Summary</button>
          <button onClick={() => setPlacedPlants([])} className="w-full text-slate-400 font-bold py-3 text-[9px] uppercase tracking-widest hover:text-red-500 flex items-center justify-center gap-1">
            <Trash2 size={12}/> Clear Canvas
          </button>
        </div>
      </aside>

      {/* CANVAS */}
      <main className="flex-1 flex flex-col relative bg-slate-200">
        <div className="flex-1 relative overflow-hidden group">
          <img src={selectedBg.url} className="absolute inset-0 w-full h-full object-cover" alt="Garden Backdrop" />
          
          <div className="absolute inset-0 flex items-end justify-center pb-24 pointer-events-none px-10">
            {placedPlants.map((p) => {
  // Determine height based on CSV 'plant_type'
  let heightClass = "h-[18%]"; // Default
  const type = p.plant_type?.toLowerCase();

  if (type === 'tree' || type === 'hedge') heightClass = "h-[55%]";
  if (type === 'shrub') heightClass = "h-[35%]";
  if (type === 'flower') heightClass = "h-[28%]"; // Bird of Paradise lives here now
  if (p.id == 68) heightClass = "h-[32%]";      // Force ID 68 to be even bigger if you want

  return (
    <img 
      key={p.instanceId} 
      src={p.builder_image_url} 
      className={`absolute transition-all duration-500 transform -translate-x-1/2 drop-shadow-2xl ${heightClass} 
        ${p.row === 'back' ? 'z-10' : p.row === 'middle' ? 'z-20' : 'z-30'}`}
      style={{ 
        left: `${p.positionX}%`, 
        bottom: p.row === 'back' ? '16%' : p.row === 'middle' ? '8%' : '0%'
      }}
    />
  );
})}
          </div>
        </div>

        {/* TRAY */}
        <div className="h-32 bg-white/95 backdrop-blur-md border-t flex items-center px-6 gap-6 overflow-x-auto">
          <div className="pr-4 border-r min-w-[100px]">
             <p className="text-[9px] font-black text-slate-300 uppercase leading-none">Filter</p>
             <p className="text-[10px] font-bold text-green-700 uppercase flex items-center gap-1 mt-1 font-mono tracking-tighter"><Sun size={12}/> {selectedBg.sun}</p>
          </div>

          {(showDebug ? allPlants : availablePlants).map(plant => (
            <button key={plant.id} onClick={() => addPlant(plant)} className="flex-shrink-0 group flex flex-col items-center">
              <div className={`w-14 h-14 rounded-xl bg-white border shadow-sm group-hover:border-green-500 group-hover:scale-110 transition-all flex items-center justify-center p-2 overflow-hidden relative ${showDebug && !availablePlants.includes(plant) ? 'opacity-30 border-red-200' : 'border-slate-100'}`}>
                {plant.builder_image_url ? (
                    <img src={plant.builder_image_url} className="w-full h-full object-contain" alt="" />
                ) : (
                    <AlertCircle size={20} className="text-slate-200" />
                )}
                {plant.id == 68 && <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
              </div>
              <span className="text-[9px] font-black mt-2 text-slate-500 group-hover:text-green-600 transition-colors uppercase truncate w-20 text-center">{plant.common_name}</span>
            </button>
          ))}

          {!showDebug && availablePlants.length === 0 && (
            <p className="text-slate-400 italic text-xs flex items-center gap-2"><Search size={14}/> No matching plants found...</p>
          )}
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl relative animate-in zoom-in-95">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex justify-between items-center">Design Summary <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-black transition"><ChevronDown size={24}/></button></h2>
              <div className="space-y-2 mb-8 max-h-60 overflow-y-auto">
                 {Object.entries(placedPlants.reduce((acc, p) => { acc[p.common_name] = (acc[p.common_name] || 0) + 1; return acc; }, {} as any)).map(([name, count]) => (
                    <div key={name} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                       <span className="text-xs font-bold text-slate-700 uppercase">{name}</span>
                       <span className="bg-green-100 text-green-800 font-black px-3 py-1 rounded text-[10px]">x{count as number}</span>
                    </div>
                 ))}
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl text-[10px] uppercase shadow-xl hover:scale-[1.02] transition">Return to Designer</button>
           </div>
        </div>
      )}
    </div>
  );
}