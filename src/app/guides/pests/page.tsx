'use client'
import { useState } from "react";
import Navigation from "../../../components/Navigation";
import Link from "next/link";

const pestList = [
  { name: "Aphids", note: "Small sap suckers on buds/new leaves. Spray with Plant Soap and Neem oil.", type: "Insect", solution: "Plant Soap + Neem" },
  { name: "Black Spot", note: "Common fungal disease, especially on Roses. Dark brown/black spots.", type: "Fungal", solution: "Yates Super Shield + Thrive" },
  { name: "Camellia Flower Blight", note: "Remove diseased blooms. Apply fresh mulch in spring to stop spore spread.", type: "Fungal", solution: "Fungicidal Soil Drench" },
  { name: "Caterpillars", note: "Look for holes in middle of leaves. Pick off by hand or use specialized spray.", type: "Insect", solution: "Manual removal / Kiwicare" },
  { name: "Citrus Scab", note: "Rough, scabby growth on fruit and leaves. Common in Auckland humid weather.", type: "Fungal", solution: "Copper Spray" },
  { name: "Mealybug", note: "White cotton-like clusters. Look for 'Sooty Mould' as a sign they are present.", type: "Insect", solution: "Neem + Plant Soap" },
  { name: "Mildew", note: "White powdery coating on leaves. Often caused by poor air circulation.", type: "Fungal", solution: "Fungicide / Improve airflow" },
  { name: "Mites (Spider Mites)", note: "Tiny pests causing yellowing/mottled leaves. Loves hot, dry spots.", type: "Insect", solution: "Mite-specific spray" },
  { name: "Scale Insects", note: "Tiny sap suckers with protective shells. Often found on stems.", type: "Insect", solution: "Horticultural Oil / Neem" },
  { name: "Slugs & Snails", note: "Eats leaves from outer edge in. Loves Ligularia and Hibiscus.", type: "Pest", solution: "Snail Pellets / Quash" },
  { name: "Sooty Mould", note: "Black 'soot' on leaves. Actually a fungus growing on pest 'honeydew'.", type: "Fungal", solution: "Kill the insects first!" },
  { name: "Thrips", note: "Causes silvering of leaves with black dots. Common on Ficus and Rhododendrons.", type: "Insect", solution: "Imidacloprid (Bad) or Neem (Mild)" },
  { name: "Whitefly", note: "Tiny white flying insects. Can be very damaging. Look under leaves.", type: "Insect", solution: "Neem + Plant Soap" }
].sort((a, b) => a.name.localeCompare(b.name));

export default function PestsDetail() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-green-800 text-[10px] font-black uppercase tracking-widest mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 italic uppercase leading-none">Pests & Diseases</h1>
        <p className="text-xs text-gray-500 font-bold mt-1">Diagnosis & Cures</p>
      </header>

      <div className="grid gap-3">
        {pestList.map((pest) => (
          <div key={pest.name} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none">{pest.name}</h3>
                <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase ${pest.type === 'Fungal' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                  {pest.type}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight mb-3 italic">{pest.note}</p>
              
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-green-700 bg-green-50 px-3 py-1 rounded-lg uppercase tracking-wider border border-green-100">
                  ✔ {pest.solution}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Navigation />
    </main>
  );
}