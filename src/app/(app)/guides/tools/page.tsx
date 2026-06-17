'use client'

import Link from "next/link";

const toolCategories = [
  {
    title: "Weeding & Detail",
    icon: "🌱",
    tools: [
      { 
        name: "Japanese Niwashi", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/niwashi-traditional-right.jpeg",
        description: "The ultimate tool for Auckland clay. The angled blade cuts through weeds at the root and breaks up hard ground with ease.",
        proTip: "Keep the inner edge sharp with a whetstone for effortless weeding.",
        objectPosition: "center center"
      }
    ]
  },
  {
    title: "Trimming & Shaping",
    icon: "✂️",
    tools: [
      { 
        name: "Pole Hedge Trimmers", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/Pole%20hedge%20trimmer.png",
        description: "Essential for keeping hedges like Griselinia or Pittosporum square without needing a ladder.",
        proTip: "Long-reach poles save your back and ensure a straighter line on tall boundary hedges.",
        objectPosition: "top center" 
      }
    ]
  },
  {
    title: "Digging & Planting",
    icon: "⛏️",
    tools: [
      { 
        name: "Trench Spade", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/trench%20spade.jpg",
        description: "A narrow, heavy-duty spade. Perfect for digging precise holes in tight spots or transplanting established plants.",
        proTip: "The slim profile makes it much easier to slice through thick roots than a standard square spade.",
        objectPosition: "bottom center" 
      }
    ]
  },
  {
    title: "Pruning",
    icon: "🌳",
    tools: [
      { 
        name: "Bypass Secateurs", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/GTO-SCLH-burgon-and-ball-left-handed-bypass-secateurs-02.jpeg",
        description: "Your everyday companion for clean cuts on living stems.",
        proTip: "Always choose bypass (scissor-action) over anvil style to avoid crushing the plant's 'veins'.",
        objectPosition: "center center"
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
              <h2 className="text-[10px] font-black text-green-800 uppercase tracking-[0.3em]">{category.title}</h2>
            </div>
            
            <div className="space-y-6">
              {category.tools.map((tool) => (
                <div key={tool.name} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
                  {/* TOOL IMAGE CONTAINER */}
                  <div className="h-60 w-full bg-gray-50 border-b border-gray-100 overflow-hidden relative">
                    <img 
                      src={tool.image} 
                      alt={tool.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ 
                        objectPosition: tool.objectPosition || 'center' 
                      }}
                      onError={(e) => { 
                        e.currentTarget.src = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg"; 
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-black text-gray-800 uppercase italic tracking-tight text-xl leading-none">{tool.name}</h3>
                      <span className="bg-orange-50 text-orange-600 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Essential</span>
                    </div>
                    
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-5 font-medium">
                      {tool.description}
                    </p>
                    
                    <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
                      <p className="text-[11px] font-bold text-green-800 leading-snug">
                        <span className="uppercase mr-2 font-black text-[9px] text-green-900/40">Pro Tip</span> 
                        {tool.proTip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
