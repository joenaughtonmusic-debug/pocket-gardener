'use client'
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '..//lib/supabaseClient';

export default function GardenBuilderLab() {
const [plants, setPlants] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [selectedZone, setSelectedZone] = useState<number>(1);
const [zones, setZones] = useState<Record<number, any>>({
1: { sun: 'Full Sun', soil: 'Healthy/loam', water: 'Drains Well', placedPlants: [] },
2: { sun: 'Full Sun', soil: 'Healthy/loam', water: 'Drains Well', placedPlants: [] },
3: { sun: 'Part Shade', soil: 'Clay', water: 'Holds Water', placedPlants: [] },
4: { sun: 'Part Shade', soil: 'Clay', water: 'Holds Water', placedPlants: [] },
});

useEffect(() => {
async function fetchPlants() {
setLoading(true);
const { data, error } = await supabase.from('plants').select('*');
if (!error && data) setPlants(data);
setLoading(false);
}
fetchPlants();
}, []);

const filteredLibrary = useMemo(() => {
const zone = zones[selectedZone];
const filtered = plants.filter(p => {
const matchesSun = Array.isArray(p.sun_requirement) ? p.sun_requirement.includes(zone.sun) : p.sun_requirement === zone.sun;
const matchesSoil = Array.isArray(p.soil_type) ? p.soil_type.includes(zone.soil) : p.soil_type === zone.soil;
const matchesWater = Array.isArray(p.water_behavior) ? p.water_behavior.includes(zone.water) : p.water_behavior === zone.water;
return matchesSun && matchesSoil && matchesWater;
});

// ORGANISING BY SIZE THEN NAME
return filtered.sort((a, b) => {
const getSizeRank = (p: any) => {
const s = String(p.mature_size || "").toLowerCase();
if (s.includes("4m") || s.includes("2-4m")) return 3; // Largest
if (s.includes("1-2m") || s.includes("1 to 2m")) return 2; // Medium
return 1; // Smallest (<1m or groundcover)
};

const rankA = getSizeRank(a);
const rankB = getSizeRank(b);

if (rankA !== rankB) return rankA - rankB; // Smallest first
return (a.common_name || "").localeCompare(b.common_name || ""); // Alphabetical
});
}, [plants, zones, selectedZone]);

const addPlantToZone = (plant: any) => {
if (zones[selectedZone].placedPlants.length >= 18) return;
setZones(prev => ({
...prev,
[selectedZone]: {
...prev[selectedZone],
placedPlants: [...prev[selectedZone].placedPlants, plant]
}
}));
};

const updateZone = (key: string, value: string) => {
setZones(prev => ({
...prev,
[selectedZone]: { ...prev[selectedZone], [key]: value }
}));
};

const resetZone = (id: number) => {
setZones(prev => ({
...prev,
[id]: { ...prev[id], placedPlants: [] }
}));
};

return (
<div className="flex flex-col lg:flex-row h-screen bg-[#f0f4f1] lg:p-6 gap-6 overflow-hidden font-sans text-gray-900">

{/* --- GARDEN CANVAS --- */}
<div className="flex-1 overflow-y-auto p-4 lg:p-0">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-32 lg:pb-0">
{[1, 2, 3, 4].map((id) => (
<div
key={id}
onClick={() => setSelectedZone(id)}
className={`relative rounded-[2.5rem] transition-all border-2 flex flex-col min-h-[400px] bg-white group
${selectedZone === id ? 'border-green-500 shadow-xl' : 'border-transparent opacity-90'}`}
>
{/* ZONE LABELS */}
<div className="absolute top-6 left-8 flex flex-wrap gap-1 z-20 pr-16">
<span className="w-full text-[10px] font-black uppercase text-gray-400 mb-1">Zone {id}</span>
<span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-[8px] font-black uppercase">{zones[id].sun}</span>
{/* SOIL BADGE CHANGED TO BROWN THEME */}
<span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[8px] font-black uppercase">{zones[id].soil}</span>
<span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-md text-[8px] font-black uppercase">{zones[id].water}</span>
</div>

{/* RESET BUTTON */}
{zones[id].placedPlants.length > 0 && (
<button
onClick={(e) => { e.stopPropagation(); resetZone(id); }}
className="absolute top-6 right-8 z-30 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm"
>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
</button>
)}

{/* THE 6-COLUMN GRID (FIXED ROWS) */}
<div className="mt-20 p-6 flex-1 grid grid-cols-6 grid-rows-3 gap-2 border-t border-gray-50 bg-gray-50/30 rounded-b-[2.5rem]">
{(() => {
const grid = Array(18).fill(null);
let backIdx = 0;
let midIdx = 6;
let frontIdx = 12;

zones[id].placedPlants.forEach((p: any) => {
const size = String(p.mature_size || "").toLowerCase();
const type = String(p.plant_type || "").toLowerCase();

const isBack = size.includes("4m") || size.includes("2-4m") || type.includes("tree") || type.includes("hedge");
const isMid = size.includes("1-2m") || size.includes("1 to 2m") || type.includes("shrub") || type.includes("fruit");

if (isBack && backIdx < 6) {
grid[backIdx++] = p;
} else if (isMid && midIdx < 12) {
grid[midIdx++] = p;
} else if (frontIdx < 18) {
grid[frontIdx++] = p;
}
});

return grid.map((p, i) => (
<div key={i} className={`aspect-square rounded-xl overflow-hidden border flex items-center justify-center transition-all ${p ? 'bg-white border-white shadow-md ring-1 ring-black/5 scale-100' : 'border-dashed border-gray-200 bg-transparent'}`}>
{p && <img src={p.image_url} className="w-full h-full object-cover" alt={p.common_name} />}
</div>
));
})()}
</div>
</div>
))}
</div>
</div>

{/* --- SIDEBAR --- */}
<div className="w-full lg:w-[400px] bg-white lg:rounded-[3rem] p-6 lg:p-8 shadow-2xl flex flex-col border-t lg:border-t-0 border-green-50 overflow-hidden h-[50vh] lg:h-full z-40">
<h2 className="text-xl font-black uppercase italic text-green-900 mb-4 tracking-tighter">Designer Lab</h2>

<div className="bg-gray-50 p-4 rounded-3xl space-y-3 mb-6">
<div className="grid grid-cols-3 gap-2">
<div className="col-span-3">
<label className="text-[8px] font-black text-gray-400 mb-1 block uppercase tracking-widest">Exposure</label>
<select value={zones[selectedZone].sun} onChange={(e) => updateZone('sun', e.target.value)} className="w-full bg-white p-2.5 rounded-xl font-bold text-[10px] border border-gray-100 shadow-sm outline-none">
{["Full Sun", "Part Shade", "Full Shade"].map(o => <option key={o}>{o}</option>)}
</select>
</div>
<div className="col-span-1.5">
<label className="text-[8px] font-black text-gray-400 mb-1 block uppercase tracking-widest">Soil</label>
<select value={zones[selectedZone].soil} onChange={(e) => updateZone('soil', e.target.value)} className="w-full bg-white p-2.5 rounded-xl font-bold text-[10px] border border-gray-100 shadow-sm outline-none">
{["Clay", "Sandy", "Healthy/loam", "Potting Mix"].map(o => <option key={o}>{o}</option>)}
</select>
</div>
<div className="col-span-1.5">
<label className="text-[8px] font-black text-gray-400 mb-1 block uppercase tracking-widest">Water</label>
<select value={zones[selectedZone].water} onChange={(e) => updateZone('water', e.target.value)} className="w-full bg-white p-2.5 rounded-xl font-bold text-[10px] border border-gray-100 shadow-sm outline-none">
{["Holds Water", "Drains Well", "Dry", "Under a Roof"].map(o => <option key={o}>{o}</option>)}
</select>
</div>
</div>
</div>

<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
<p className="text-[10px] font-black uppercase text-green-800 mb-3 tracking-widest flex justify-between">
<span>Library</span>
<span className="bg-green-100 px-2 rounded-full">{filteredLibrary.length}</span>
</p>
<div className="grid grid-cols-1 gap-2">
{filteredLibrary.map(plant => (
<button
key={plant.id}
onClick={() => addPlantToZone(plant)}
className="flex items-center gap-3 p-2 bg-white hover:bg-green-50 rounded-xl border border-gray-100 transition-all active:scale-95 shadow-sm group"
>
<div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
<img src={plant.image_url} className="w-full h-full object-cover" alt={plant.common_name} />
</div>
<div className="text-left">
<p className="text-[10px] font-black text-gray-800 leading-tight group-hover:text-green-700">{plant.common_name}</p>
<p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{plant.plant_type}</p>
{/* Subtle size hint to help you verify sorting */}
<p className="text-[7px] text-gray-300 font-bold">{String(plant.mature_size)}</p>
</div>
</button>
))}
</div>
</div>

<button className="mt-4 w-full py-4 bg-green-900 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.3em] shadow-lg hover:bg-black transition-all">
✨ Render Design
</button>
</div>
</div>
);
}
