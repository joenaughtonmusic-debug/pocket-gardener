'use client'

import Navigation from "../../../components/Navigation";
import Link from "next/link";

const toolCategories = [
  {
    title: "Weeding & Detail",
    icon: "🌱",
    tools: [
      { 
        name: "Japanese Niwashi", 
        description: "The ultimate tool for Auckland clay. The angled blade cuts through weeds at the root and breaks up hard ground with ease.",
        proTip: "Keep the inner edge sharp with a whetstone for effortless weeding."
      }
    ]
  },
  {
    title: "Trimming & Shaping",
    icon: "✂️",
    tools: [
      { 
        name: "Pole Hedge Trimmers", 
        description: "Essential for keeping hedges like Griselinia or Pittosporum square without needing a ladder.",
        proTip: "Long-reach poles save your back and ensure a straighter line on tall boundary hedges."
      }
    ]
  },
  {
    title: "Digging & Planting",
    icon: "⛏️",
    tools: [
      { 
        name: "Trench Spade", 
        description: "A narrow, heavy-duty spade. Perfect for digging precise holes in tight spots or transplanting established plants.",
        proTip: "The slim profile makes it much easier to slice through thick roots than a standard square spade."
      }
    ]
  },
  {
    title: "Pruning",
    icon: "🌳",
    tools: [
      { 
        name: "Bypass Secateurs", 
        description: "Your everyday companion for clean cuts on living stems.",
        proTip: "Always choose bypass (scissor-action) over anvil style to avoid crushing the plant's 'veins'."
      }
    ]
  }
];

export default function ToolsGuide() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-[10px] font-black uppercase tracking-widest text-green-700 mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">The Tool Kit</h1>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Recommended for Auckland Gardens</p>
      </header>

      <div className="space-y-8">
        {toolCategories.map((category) => (
          <section key={category.title}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{category.icon}</span>
              <h2 className="text-xs font-black text-green-800 uppercase tracking-[0.3em]">{category.title}</h2>
            </div>
            
            <div className="space-y-4">
              {category.tools.map((tool) => (
                <div key={tool.name} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-gray-800 uppercase italic tracking-tight">{tool.name}</h3>
                    <span className="bg-orange-50 text-orange-600 text-[8px] font-black px-2 py-1 rounded-full uppercase">Recommended</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <div className="bg-green-50 p-3 rounded-xl">
                    <p className="text-[9px] font-bold text-green-800 leading-tight">
                      <span className="uppercase mr-1">Pro Tip:</span> {tool.proTip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Navigation />
    </main>
  );
}