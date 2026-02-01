'use client' 

import { useEffect, useState } from "react"; 
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import PlantThumbnail from "../../components/PlantThumbnail";
import QuickAddButton from "../../components/QuickAddButton";
import PageHelp from "../../components/PageHelp";

interface Plant {
  id: number;
  common_name: string;
  scientific_name?: string;
  sun_requirement: string | string[] | null;
  image_url?: string | null;
  plant_type?: string | null;
  is_star_performer?: boolean;
}

export default function LibraryPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlantImage, setSelectedPlantImage] = useState<Plant | null>(null); // State for the popup

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

  const groupedPlants = plants.reduce((acc: any, plant) => {
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
            description="Browse and search the full database of plants curated for Auckland gardens."
            bullets={[
              "Search by name or type",
              "Tap the image to see it full-screen",
              "Tap the '+' button to quickly add a plant to your garden"
            ]}
          />
        </div>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">
          A-Z Plant Index
        </p>
      </header>

      {/* IDENTIFY PROMO CARD */}
      <div className="mb-12 p-7 bg-[#2d5a3f] rounded-[2.5rem] text-white relative overflow-hidden shadow-lg shadow-green-900/10">
        <div className="relative z-10">
          <h3 className="font-black text-xl mb-1 uppercase italic tracking-tight">Identify a Plant</h3>
          <p className="text-[11px] text-green-100/80 mb-5 font-medium leading-relaxed max-w-[200px]">
            Unsure what's growing in your garden?
          </p>
          <Link 
            href="/identify" 
            className="inline-block bg-white text-[#2d5a3f] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
          >
            Identify your plant here →
          </Link>
        </div>
        <div className="absolute -right-2 -bottom-4 text-7xl opacity-20 rotate-12 select-none">🔍</div>
      </div>

      <div className="space-y-10">
        {alphabet.map((letter) => (
          <div key={letter}>
            <h2 className="text-xs font-black text-green-800 uppercase tracking-[0.3em] mb-4 px-2">
              {letter}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {groupedPlants[letter].map((plant: Plant) => (
                <div key={plant.id} className="relative group">
                  <div className="flex items-center p-5 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm 
                                  group-hover:shadow-md group-hover:border-green-100 transition-all duration-200">
                    
                    {/* THUMBNAIL - Trigger selectedPlantImage on click */}
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
                        <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none mb-1">
                          {plant.common_name}
                        </h3>
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
        ))}
      </div>

      {/* --- NEW SECTION: CAN'T FIND PLANT --- */}
      <footer className="mt-20 mb-10 px-4 text-center">
        <div className="inline-block p-8 border-2 border-dashed border-gray-200 rounded-[3rem]">
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
            Can't find your plant?
          </p>
          <a 
            href="mailto:hello@yourdomain.com?subject=Plant%20Library%20Request&body=Hi%20there,%20I%20couldn't%20find%20this%20plant%20in%20the%20library:%20" 
            className="text-xs font-black text-green-700 uppercase underline decoration-green-200 decoration-2 underline-offset-4 hover:text-green-900 transition-colors"
          >
            Contact us here
          </a>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter mt-2">
            and we'll see if we can add it to the library
          </p>
        </div>
      </footer>

      {/* IMAGE LIGHTBOX MODAL */}
      {selectedPlantImage && (
        <div 
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6 backdrop-blur-sm"
          onClick={() => setSelectedPlantImage(null)}
        >
          <div className="relative w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="aspect-square w-full relative">
              <PlantThumbnail plant={selectedPlantImage} size="lg" />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-black text-green-900 uppercase italic text-lg">{selectedPlantImage.common_name}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 mb-4">{selectedPlantImage.scientific_name}</p>
              <button 
                className="w-full bg-gray-100 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-gray-500 active:bg-gray-200"
                onClick={() => setSelectedPlantImage(null)}
              >
                Close Image
              </button>
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </main>
  );
}