'use client'
import Navigation from "../../components/Navigation";
import Link from "next/link";

export default function GuidesPage() {
  const categories = [
    { name: "Pests and Diseases", icon: "🐜", href: "/guides/pests", desc: "Diagnosis & Cures" },
    { name: "Feeding", icon: "🧪", href: "#", desc: "Nutrients & Fertilizers" },
    { name: "Pruning/trimming", icon: "✂️", href: "#", desc: "Maintenance & Shaping" }
  ];

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-32">
      <header className="mb-8 pt-4">
        <h1 className="text-3xl font-bold text-green-900">Expert Guides</h1>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Grow like a pro</p>
      </header>

      {/* FEATURED: PLANTING MASTERCLASS */}
      <section className="mb-6">
        <div className="bg-[#2d5a3f] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block text-white">Essential Reading</span>
            <h2 className="text-2xl font-bold mb-2 tracking-tight leading-none">The Ultimate Planting Guide<br/></h2>
            <p className="text-green-100 text-sm mb-6 leading-relaxed opacity-90 max-w-[220px]">
              Give your plants the best chance at success.
            </p>
            <button className="bg-white text-[#2d5a3f] px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest">Read Guide</button>
          </div>
          <span className="absolute -bottom-4 -right-4 text-8xl opacity-10">🪴</span>
        </div>
      </section>

      {/* NEW: COMMON WEEDS BUTTON */}
      <section className="mb-4 relative z-10">
        <Link href="/guides/weeds" className="block no-underline">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4 pointer-events-none">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">🥀</div>
              <div>
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">Common Weeds</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Identification & Kill Guide</p>
              </div>
            </div>
            <span className="text-gray-200 group-hover:text-amber-600 transition-colors text-xl mr-2 pointer-events-none">→</span>
          </div>
        </Link>
      </section>

      {/* CATEGORY LIST (Full Width) */}
      <section className="flex flex-col gap-4 relative z-10">
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            href={cat.href} 
            className="block no-underline cursor-pointer"
          >
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4 pointer-events-none">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-active:bg-green-50 transition-colors">{cat.icon}</div>
                <div>
                  <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">{cat.name}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cat.desc}</p>
                </div>
              </div>
              <span className="text-gray-200 group-hover:text-green-600 transition-colors text-xl mr-2 pointer-events-none">→</span>
            </div>
          </Link>
        ))}
      </section>

      <Navigation />
    </main>
  );
}