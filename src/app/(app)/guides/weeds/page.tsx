'use client'
import { useState, useEffect } from "react";
import { createBrowserClient } from '@supabase/ssr'
import Link from "next/link";

export default function WeedsDetail() {
  const [weeds, setWeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchWeeds() {
      const { data, error } = await supabase
        .from('weeds')
        .select('*')
        .order('name', { ascending: true });
      
      if (data) setWeeds(data);
      setLoading(false);
    }
    fetchWeeds();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-green-800 text-[10px] font-black uppercase tracking-widest mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 italic uppercase leading-none">Common Weeds</h1>
        <p className="text-xs text-gray-500 font-bold mt-1">Identification & Eradication</p>
      </header>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-sm aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl">
            <img src={selectedImage} className="w-full h-full object-cover" alt="Enlarged weed" />
            <button className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full font-bold">✕</button>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2.5rem] mb-8">
        <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-2">Expert Tip</h4>
        <p className="text-xs text-amber-900/80 leading-relaxed font-medium italic">
          "Stump Pasting" means applying herbicide to the fresh cut within 30 seconds.
        </p>
      </div>

      <div className="grid gap-3">
        {loading ? (
          <p className="text-center text-xs font-bold text-gray-400 py-10 uppercase tracking-widest">Loading Weeds...</p>
        ) : (
          weeds.map((weed) => (
            <div key={weed.id} className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 active:bg-gray-50 transition-colors">
              <button 
                onClick={() => setSelectedImage(weed.image_url)}
                className="w-16 h-16 bg-gray-100 rounded-2xl flex-shrink-0 overflow-hidden border border-gray-100 relative group"
              >
                <img 
                  src={weed.image_url || "/placeholder-weed.jpg"} 
                  className="w-full h-full object-cover" 
                  alt={weed.name}
                  onError={(e) => { e.currentTarget.src = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg" }}
                />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none">{weed.name}</h3>
                  <span className="text-[7px] font-black bg-gray-100 px-2 py-0.5 rounded-full text-gray-400 uppercase">{weed.type}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 leading-tight font-medium">{weed.note}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
