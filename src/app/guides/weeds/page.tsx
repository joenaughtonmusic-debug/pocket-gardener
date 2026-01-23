'use client'
import { useState } from "react";
import Navigation from "../../../components/Navigation";
import Link from "next/link";

const weedList = [
  { name: "Acanthus (Bear’s Breeches)", note: "Cut down and stump paste or spray with double strength weed killer.", type: "Perennial", image: "/weeds/acanthus.jpg" },
  { name: "Arum Lilies", note: "Carefully remove seed pods. Cut down and stump paste.", type: "Bulb", image: "/weeds/arum-lily.jpg" },
  { name: "Bindweed / Convolvulus", note: "Fast vine. Difficult to find main root. Cut and stump paste.", type: "Vine", image: "/weeds/bindweed.jpg" },
  { name: "Climbing Asparagus", note: "Stump paste, or spray if not near other plants. Look for orange berries.", type: "Vine", image: "/weeds/asparagus.jpg" },
  { name: "Deadly Nightshade", note: "Toxic berries. Pull or cut and stump paste.", type: "Shrub", image: "/weeds/nightshade.jpg" },
  { name: "Dock", note: "Stump paste leaves. Lawn sprays don't affect it.", type: "Perennial", image: "/weeds/dock.jpg" },
  { name: "Honeysuckle", note: "Follow back to the large root area, cut and stump paste.", type: "Vine", image: "/weeds/honeysuckle.jpg" },
  { name: "Ivy Leaved Toadflax", note: "Loves rock walls and concrete cracks. Spray if possible.", type: "Creeping", image: "/weeds/toadflax.jpg" },
  { name: "Ladder Fern", note: "Remove ball roots. Pick up any that fall as they regrow.", type: "Fern", image: "/weeds/ladder-fern.jpg" },
  { name: "Onion Weed", note: "Dig down deep to remove bulbs or spray if possible.", type: "Bulb", image: "/weeds/onion-weed.jpg" },
  { name: "Oxalis", note: "Must dig deep to remove small bulbs. Pulling stems won't work.", type: "Bulb", image: "/weeds/oxalis.jpg" },
  { name: "Privet", note: "Pull out if small, otherwise cut down and stump paste.", type: "Woody", image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg" },
  { name: "Tobacco Tree (Wooly Nightshade)", note: "Pull/dig out if small. Otherwise, cut down and stump paste.", type: "Tree", image: "/weeds/tobacco-tree.jpg" },
  { name: "Tradescantia (Wandering Jew)", note: "Comes out easily. Use a metal rake for large areas.", type: "Succulent", image: "/weeds/tradescantia.jpg" },
  { name: "Wild Fennel", note: "Cut down and stump paste. Hard to remove due to long tap root.", type: "Woody", image: "/weeds/fennel.jpg" },
  { name: "Wild Ginger", note: "Cut down and stump paste or dig out the entire root system.", type: "Rhizome", image: "/weeds/ginger.jpg" },
  { name: "Wild Jasmine", note: "Follow back to main root area, cut and stump paste.", type: "Vine", image: "/weeds/jasmine.jpg" }
].sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical Sort

export default function WeedsDetail() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-green-800 text-[10px] font-black uppercase tracking-widest mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 italic uppercase leading-none">Common Weeds</h1>
        <p className="text-xs text-gray-500 font-bold mt-1">Identification & Eradication</p>
      </header>

      {/* IMAGE MODAL (The Popup) */}
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
        {weedList.map((weed) => (
          <div key={weed.name} className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 active:bg-gray-50 transition-colors">
            {/* THUMBNAIL (Click to expand) */}
            <button 
              onClick={() => setSelectedImage(weed.image)}
              className="w-16 h-16 bg-gray-100 rounded-2xl flex-shrink-0 overflow-hidden border border-gray-100 relative group"
            >
              <img src={weed.image} className="w-full h-full object-cover" alt={weed.name} />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">🔍</span>
              </div>
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none">{weed.name}</h3>
                <span className="text-[7px] font-black bg-gray-100 px-2 py-0.5 rounded-full text-gray-400 uppercase">{weed.type}</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5 leading-tight font-medium">{weed.note}</p>
            </div>
          </div>
        ))}
      </div>

      <Navigation />
    </main>
  );
}