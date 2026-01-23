import { createSupabaseServer } from "../../supabaseServer";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import PlantThumbnail from "../../components/PlantThumbnail";

interface Plant {
  id: number;
  common_name: string;
  scientific_name?: string;
  sun_requirement: string | string[] | null;
  image_url?: string | null;
  plant_type?: string | null;
  is_star_performer?: boolean;
}

export default async function LibraryPage() {
  const supabase = await createSupabaseServer();

  // Fetch all plants
  const { data: rawPlants } = await supabase
    .from("plants")
    .select("*")
    .order('common_name', { ascending: true });

  const starPerformers = rawPlants?.filter(p => p.is_star_performer === true) || [];

  const uniquePlantsMap = new Map();
  rawPlants?.forEach((plant) => {
    const name = plant.common_name.trim();
    if (!uniquePlantsMap.has(name)) {
      uniquePlantsMap.set(name, plant);
    }
  });

  const plants: Plant[] = Array.from(uniquePlantsMap.values());

  const groupedPlants = plants.reduce((acc: any, plant) => {
    const firstLetter = plant.common_name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(plant);
    return acc;
  }, {});

  const alphabet = Object.keys(groupedPlants).sort();

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase">Plant Library</h1>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">
          A-Z Plant Index
        </p>
      </header>

      {/* IDENTIFY PROMO CARD */}
      <div className="mb-8 p-7 bg-[#2d5a3f] rounded-[2.5rem] text-white relative overflow-hidden">
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

      {/* STAR PERFORMERS CAROUSEL (Auckland Stars logic restored) */}
      {starPerformers.length > 0 && (
        <section className="mb-12">
          <div className="flex justify-between items-end mb-4 px-2">
            <div>
              <h2 className="text-xs font-black text-green-800 uppercase tracking-[0.2em]">Auckland Stars</h2>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic mt-0.5">Top Performers</p>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {starPerformers.map((plant) => (
              <Link 
                key={plant.id} 
                href={`/plants/${plant.id}`}
                className="flex-shrink-0 w-32 group"
              >
                <div className="w-32 h-32 rounded-[2rem] overflow-hidden border border-gray-100 mb-2 bg-white active:scale-95 transition-transform">
                   <PlantThumbnail plant={plant} size="lg" />
                </div>
                <h3 className="text-[10px] font-black text-gray-800 uppercase tracking-tight text-center truncate">
                  {plant.common_name}
                </h3>
                {/* RESTORED: Special descriptions for top stars */}
                <p className="text-[8px] text-gray-400 font-medium text-center leading-tight mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {plant.common_name === 'Lomandra' && "The ultimate clay-buster."}
                  {plant.common_name === 'Ficus Tuffi' && "Modern privacy hedging."}
                  {plant.common_name === 'Gardenia' && "Summer scent star."}
                  {plant.common_name === 'Star Jasmine' && "Fence covering hero."}
                  {plant.common_name === 'Titoki' && "The glossy native."}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ALPHABETICAL LIST (Cleaned up: Plant Type instead of Sun Requirement) */}
      <div className="space-y-10">
        {alphabet.map((letter) => (
          <div key={letter}>
            <h2 className="text-xs font-black text-green-800 uppercase tracking-[0.3em] mb-4 px-2">
              {letter}
            </h2>

            <div className="grid grid-cols-1 gap-2">
              {groupedPlants[letter].map((plant: Plant) => (
                <Link 
                  href={`/plants/${plant.id}`} 
                  key={plant.id}
                  className="flex items-center justify-between p-4 bg-white rounded-[2rem] border border-gray-100 active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <PlantThumbnail plant={plant} size="sm" />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none mb-1">
                        {plant.common_name}
                      </h3>
                      {/* CHANGED: Now shows plant_type (e.g., shrub, tree) instead of sun requirement */}
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic">
                        {plant.plant_type || 'General'}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-200 group-hover:text-green-600 transition-colors mr-2 text-lg">→</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Navigation />
    </main>
  );
}