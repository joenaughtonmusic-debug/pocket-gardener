import Link from "next/link";
import { createSupabaseServer } from "../supabaseServer";

export default async function LandingPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-[#f8fbf9] text-gray-900">
      {/* 1. HERO & FEATURED GARDEN SECTION */}
      <section className="relative h-[65vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl shadow-green-900/10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3525] via-transparent to-black/20 z-10" />
        
        {/* The Featured Garden Image */}
        <img 
          src="https://pristinegardens.co.nz/wp-content/uploads/2022/07/20220115_152342.jpg" 
          alt="Featured Auckland Garden"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 pt-16">
          <div className="flex justify-end items-start">
            {/* 1. Logo thumbnail box removed from here for a cleaner look */}
            {!user && (
              <Link href="/login" className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm text-green-900">
                Sign In
              </Link>
            )}
          </div>

          <div className="pb-6">
            {/* 2. Text made smaller, bullet point removed, styled to match the app theme */}
            <h1 className="text-2xl font-black text-white leading-[1.1] tracking-tighter mb-6 uppercase italic">
              Featured: January
            </h1>
            
            {user ? (
              <Link 
                href="/dashboard" 
                className="inline-block w-full text-center bg-white text-[#2d5a3f] py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[12px] shadow-xl active:scale-95 transition-all"
              >
                Enter My Garden
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="inline-block w-full text-center bg-white text-[#2d5a3f] py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[12px] shadow-xl active:scale-95 transition-all"
              >
                Start Your Garden
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 2. GUEST PREVIEW / ADVICE HOOK */}
      {!user && (
        <section className="px-8 -mt-10 relative z-30 mb-12">
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-green-50">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full inline-block mb-3">
                  Expert Advice • Jan
                </span>
                <h3 className="text-xl font-black text-gray-800 tracking-tight">Meyer Lemon</h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl">🍋</div>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed font-medium italic mb-6">
              "Water heavily in dry spells. If soil is too dry, lemons will be juiceless or drop off early."
            </p>

            <Link 
              href="/login" 
              className="block w-full py-4 bg-gray-50 text-gray-400 text-center rounded-2xl font-bold text-[10px] uppercase tracking-widest border border-gray-100"
            >
              + Add to My Garden
            </Link>
          </div>
        </section>
      )}

      {/* 3. CORE FEATURES */}
      <section className="px-8 py-8 space-y-12">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/identify" className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm active:scale-95 transition-all">
            <div className="text-2xl mb-3">🔍</div>
            <h3 className="font-extrabold text-sm text-green-900 leading-tight">Identify</h3>
            <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">Plant Finder</p>
          </Link>
          <Link href="/build" className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm active:scale-95 transition-all">
            <div className="text-2xl mb-3">🛠️</div>
            <h3 className="font-extrabold text-sm text-green-900 leading-tight">Builder</h3>
            <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">Garden Designer</p>
          </Link>
        </div>

        <div className="text-center pb-12">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-6">Explore Auckland Favorites</p>
          <Link href="/plants" className="inline-flex items-center gap-3 text-[11px] font-black text-green-800 bg-green-50 px-10 py-5 rounded-full border border-green-100 tracking-widest uppercase shadow-inner">
            A-Z Plant Library ➔
          </Link>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="pb-24 text-center">
         <Link href="/about" className="group inline-flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
           <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Designed by</span>
           <span className="text-xl group-hover:rotate-12 transition-transform">🧑‍🌾</span>
         </Link>
      </footer>
    </main>
  );
}