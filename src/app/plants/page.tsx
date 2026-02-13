'use client' 

import { useEffect, useState } from "react"; 
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search, X, Camera, RefreshCw, Plus, CheckCircle, ArrowRight, HelpCircle, Mail, AlertTriangle } from "lucide-react"; 
import Navigation from "../../components/Navigation";
import PlantThumbnail from "../../components/PlantThumbnail";
import QuickAddButton from "../../components/QuickAddButton";
import PageHelp from "../../components/PageHelp";

// Full Weed Registry for AI Recognition
const COMMON_WEEDS = [
  { scientific: "Ligustrum", common: "Privet (Tree/Chinese)" },
  { scientific: "Ulex europaeus", common: "Gorse" },
  { scientific: "Tradescantia fluminensis", common: "Tradescantia (Wandering Will)" },
  { scientific: "Asparagus aethiopicus", common: "Asparagus Fern" },
  { scientific: "Asparagus asparagoides", common: "Climbing Asparagus" },
  { scientific: "Acanthus mollis", common: "Acanthus (Bear’s Breeches)" },
  { scientific: "Zantedeschia aethiopica", common: "Arum Lily" },
  { scientific: "Convolvulus", common: "Bindweed" },
  { scientific: "Calystegia", common: "Convolvulus" },
  { scientific: "Solanum dulcamara", common: "Deadly Nightshade" },
  { scientific: "Solanum nigrum", common: "Black Nightshade" },
  { scientific: "Rumex obtusifolius", common: "Dock" },
  { scientific: "Lonicera japonica", common: "Honeysuckle" },
  { scientific: "Cymbalaria muralis", common: "Ivy Leaved Toadflax" },
  { scientific: "Nephrolepis cordifolia", common: "Ladder Fern" },
  { scientific: "Allium triquetrum", common: "Onion Weed" },
  { scientific: "Oxalis", common: "Oxalis" },
  { scientific: "Solanum mauritianum", common: "Tobacco Tree (Wooly Nightshade)" },
  { scientific: "Foeniculum vulgare", common: "Wild Fennel" },
  { scientific: "Hedychium", common: "Wild Ginger" },
  { scientific: "Jasminum polyanthum", common: "Wild Jasmine" }
];

interface Plant {
  id: number;
  common_name: string;
  scientific_name?: string;
  sun_requirement: string | string[] | null;
  image_url?: string | null;
  plant_type?: string | null;
  is_star_performer?: boolean;
  is_native?: boolean;
  flower_color?: string | null;
}

export default function LibraryPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlantImage, setSelectedPlantImage] = useState<Plant | null>(null);
  const [showIdentifier, setShowIdentifier] = useState(false); 
  
  const [isScanning, setIsScanning] = useState(false);
  const [aiMatch, setAiMatch] = useState<Plant | null>(null);
  const [aiResultName, setAiResultName] = useState<string | null>(null);
  const [detectedWeed, setDetectedWeed] = useState<{scientific: string, common: string} | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isNative, setIsNative] = useState("");
  const [flowerColor, setFlowerColor] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchPlants() {
      const { data: rawPlants } = await supabase
        .from("plants")
        .select("*")
        .order('common_name', { ascending: true });

      if (rawPlants) {
        const uniquePlantsMap = new Map();
        rawPlants.forEach((plant) => {
          const name = plant.common_name.trim();
          if (!uniquePlantsMap.has(name)) {
            uniquePlantsMap.set(name, plant);
          }
        });
        setPlants(Array.from(uniquePlantsMap.values()));
      }
      setLoading(false);
    }
    fetchPlants();
  }, [supabase]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setAiMatch(null);
    setAiResultName(null);
    setDetectedWeed(null);

    // MEMORY FIX: Use createObjectURL instead of FileReader
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = objectUrl;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 600; // Lowered slightly to save more memory
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Clean up the object URL from memory immediately
      URL.revokeObjectURL(objectUrl);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsScanning(false);
          return;
        }
        
        const formData = new FormData();
        formData.append("image", blob, "plant.jpg");

        try {
          const response = await fetch('/api/identify', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Server error");
          }

          const data = await response.json();
          const scientificName = data.result?.classification?.suggestions?.[0]?.name 
                                 || data.suggestions?.[0]?.scientific_name;
          
          if (scientificName) {
            setAiResultName(scientificName);

            const weedMatch = COMMON_WEEDS.find(w => 
              scientificName.toLowerCase().includes(w.scientific.toLowerCase())
            );

            if (weedMatch) {
              setDetectedWeed(weedMatch);
              setIsScanning(false);
              return;
            }

            const genus = scientificName.split(' ')[0];

            const { data: dbMatch } = await supabase
              .from("plants")
              .select("*")
              .or(`scientific_name.ilike.%${scientificName}%,common_name.ilike.%${scientificName}%,scientific_name.ilike.%${genus}%,common_name.ilike.%${genus}%`)
              .order('is_native', { ascending: false })
              .limit(1)
              .maybeSingle();

            if (dbMatch) {
              setAiMatch(dbMatch);
            }
          } else {
            setAiResultName("Unknown Plant");
          }
        } catch (err: any) {
          console.error("Scan error:", err);
          alert(`Error: ${err.message}. Try again.`);
        } finally {
          setIsScanning(false);
        }
      }, 'image/jpeg', 0.5); // Quality lowered slightly to 0.5 to keep file size tiny
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setIsScanning(false);
      alert("Error loading image. Please try again.");
    };
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.common_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.scientific_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.plant_type?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesNative = isNative === "" ? true : 
                         (isNative === "Yes" ? plant.is_native === true : plant.is_native === false);
    
    const matchesColor = flowerColor === "" ? true : plant.flower_color === flowerColor;
    const matchesType = typeFilter === "" ? true : plant.plant_type === typeFilter;

    return matchesSearch && matchesNative && matchesColor && matchesType;
  });

  const groupedPlants = filteredPlants.reduce((acc: any, plant) => {
    const firstLetter = plant.common_name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(plant);
    return acc;
  }, {});

  const alphabet = Object.keys(groupedPlants).sort();

  if (loading) return <div className="p-20 text-center text-gray-400 font-bold tracking-widest uppercase text-[10px]">Loading Library...</div>;

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">Plant Library</h1>
          <PageHelp 
            title="Plant Library"
            description="Browse the full database or use the AI Camera to identify a mystery plant."
            bullets={[
              "Use the Search Bar for quick name lookup",
              "Open the Identifier Tool to use the AI Camera",
              "Tap '+' to add plants to your garden instantly"
            ]}
          />
        </div>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">
          A-Z Plant Index
        </p>
      </header>

      <div className="mb-6 relative">
        <input 
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-full px-6 py-4 text-sm font-bold shadow-sm outline-none focus:border-green-200 transition-colors"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
          {searchQuery ? (
            <X size={16} onClick={() => setSearchQuery("")} className="cursor-pointer text-gray-400" />
          ) : (
            <Search size={18} />
          )}
        </div>
      </div>

      <div className="mb-10 transition-all duration-300">
        <button 
          onClick={() => setShowIdentifier(!showIdentifier)}
          className={`w-full p-7 rounded-[2.5rem] text-left relative overflow-hidden shadow-lg transition-all duration-300 ${
            showIdentifier ? 'bg-white border border-green-100 shadow-green-900/5' : 'bg-[#2d5a3f] text-white'
          }`}
        >
          <div className="relative z-10">
            <h3 className={`font-black text-xl mb-1 uppercase italic tracking-tight ${showIdentifier ? 'text-[#2d5a3f]' : 'text-white'}`}>
              {showIdentifier ? 'Close Identifier' : 'Identify a Plant'}
            </h3>
            <p className={`text-[11px] font-medium leading-relaxed max-w-[200px] ${showIdentifier ? 'text-gray-400' : 'text-green-100/80'}`}>
              {showIdentifier ? 'Use the AI Camera or adjust filters' : "Unsure what's growing? Use the AI camera or filter tool"}
            </p>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
            {showIdentifier ? <ChevronUp className="text-[#2d5a3f]" size={32} /> : <ChevronDown className="text-white" size={32} />}
          </div>
        </button>

        {showIdentifier && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-white rounded-[2rem] border-2 border-dashed border-green-100 p-6 text-center shadow-sm">
              {!isScanning && !aiResultName ? (
                <div className="flex flex-col items-center gap-2 mx-auto">
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment"
                    onChange={handleFileUpload}
                    id="camera-input"
                    className="hidden" 
                  />
                  <label htmlFor="camera-input" className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-700 group-hover:scale-110 active:scale-95 transition-all shadow-sm border border-green-100">
                      <Camera size={28} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-800">Tap to Scan with Camera</span>
                  </label>
                </div>
              ) : isScanning ? (
                <div className="py-2">
                  <RefreshCw className="animate-spin mx-auto text-green-600 mb-2" size={20} />
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 italic">Analyzing Mystery Plant...</p>
                </div>
              ) : (
                <div className="animate-in zoom-in-95 duration-300">
                  {aiMatch ? (
                    <div className="flex items-center justify-between bg-green-50 p-4 rounded-2xl border border-green-100">
                      <div className="text-left">
                        <div className="flex items-center gap-1 text-green-600 mb-1">
                          <CheckCircle size={12} />
                          <span className="text-[8px] font-black uppercase">Database Match Found</span>
                        </div>
                        <h4 className="font-black text-sm uppercase text-green-900 leading-none">{aiMatch.common_name}</h4>
                      </div>
                      <Link href={`/plants/${aiMatch.id}`} className="bg-green-600 text-white p-2 rounded-xl">
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : detectedWeed ? (
                    <div className="bg-red-50 p-5 rounded-2xl border border-red-100 text-center">
                      <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                        <AlertTriangle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Invasive Species</span>
                      </div>
                      <h4 className="font-black text-sm uppercase text-red-900 leading-tight mb-3">{detectedWeed.common}</h4>
                      <Link 
                        href="/guides/weeds" 
                        className="w-full bg-red-600 text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
                      >
                        How to Kill It →
                      </Link>
                    </div>
                  ) : aiResultName === "Unknown Plant" ? (
                    <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 text-center">
                       <HelpCircle className="mx-auto text-orange-400 mb-2" size={20} />
                       <h4 className="font-black text-[10px] uppercase text-orange-800 mb-1">Could not Identify</h4>
                       <p className="text-[9px] text-orange-600/70 font-bold mb-3">Try a clearer photo</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="text-left">
                        <span className="text-[8px] font-black uppercase text-gray-400">AI Result (Not in library)</span>
                        <h4 className="font-black text-sm uppercase text-slate-800 leading-tight">{aiResultName}</h4>
                      </div>
                      <a 
                        href={`mailto:hello@yourdomain.com?subject=Library%20Addition%20Request:%20${aiResultName}`}
                        className="w-full bg-slate-900 text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
                      >
                        <Mail size={12} /> Request Addition
                      </a>
                    </div>
                  )}
                  <button 
                    onClick={() => {setAiResultName(null); setAiMatch(null); setDetectedWeed(null);}}
                    className="mt-3 text-[8px] font-black text-gray-300 uppercase tracking-widest hover:text-gray-500"
                  >
                    Clear Result & Rescan
                  </button>
                </div>
              )}
            </div>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-[8px] uppercase font-black text-gray-300 bg-[#f8fbf9] px-2 w-max mx-auto tracking-widest">Or Filter Manually</div>
            </div>

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
        )}
      </div>

      <div className="space-y-10">
        <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-2 mb-[-2rem]">
          {filteredPlants.length} Plants Available
        </h2>

        {alphabet.length > 0 ? (
          alphabet.map((letter) => (
            <div key={letter}>
              <h2 className="text-xs font-black text-green-800 uppercase tracking-[0.3em] mb-4 px-2">
                {letter}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {groupedPlants[letter].map((plant: Plant) => (
                  <div key={plant.id} className="relative group">
                    <div className="flex items-center p-5 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm 
                                    group-hover:shadow-md group-hover:border-green-100 transition-all duration-200">
                      
                      <button 
                        onClick={() => setSelectedPlantImage(plant)}
                        className="w-14 h-14 flex-shrink-0 z-20 transition-transform duration-200 hover:scale-110 active:scale-90"
                      >
                        <PlantThumbnail plant={plant} size="sm" />
                      </button>

                      <Link 
                        href={`/plants/${plant.id}`} 
                        className="flex-grow flex items-center justify-between ml-4 active:scale-[0.98] transition-transform"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none mb-1">
                              {plant.common_name}
                            </h3>
                            {plant.is_native && (
                              <span className="text-[8px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full font-black uppercase">Native</span>
                            )}
                          </div>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic">
                            {plant.plant_type || 'General'}
                          </p>
                        </div>
                        <div className="text-gray-200 group-hover:text-green-600 group-hover:translate-x-1 transition-all text-lg mr-12">
                          →
                        </div>
                      </Link>
                      
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
                        <QuickAddButton plantId={plant.id} plantName={plant.common_name} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">No plants match your search</p>
          </div>
        )}
      </div>

      <Navigation />
    </main>
  );
}