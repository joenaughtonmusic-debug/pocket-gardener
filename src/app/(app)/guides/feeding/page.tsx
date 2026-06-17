'use client'

import Link from "next/link";

const feedingCategories = [
  {
    title: "The Quick Boost",
    icon: "🌊",
    sections: [
      { 
        name: "Liquid Seaweed", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/1090-6204_Marshalls-Liquid-Seaweed-1-Litre-6.jpeg",
        description: "Think of this as a quick health 'boost'. Perfect for new plantings, stressed plants, or a quick spring pick-me-up.",
        proTip: "Apply to the leaves (foliar feeding) early in the morning for the fastest absorption and great as a soil drench.",
        objectPosition: "center"
      }
    ]
  },
  {
    title: "The Long Game",
    icon: "⏳",
    sections: [
      { 
        name: "Slow-Release Granular", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/shutterstock_1087283084.jpg",
        description: "The backbone of your garden. These broken-down pellets feed your plants steadily over 3-4 months.",
        proTip: "In Auckland, apply these in early Spring and early Autumn when the rain will help wash them into the clay.",
        objectPosition: "center"
      }
    ]
  },
  {
    title: "Nutrient Balance",
    icon: "🍋",
    sections: [
      { 
        name: "Correcting Yellow Leaves", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Epsom_salt_for_gardeners_grande.jpeg",
        description: "If your leaves are turning yellow but the veins stay green (Interveinal Chlorosis), your plant is likely 'Magnesium hungry'. This is very common with Citrus and Gardenias in local soils.",
        proTip: "Dissolve 1 tablespoon of Epsom Salts in a 10L watering can for a quick green-up (alternatively purchase Magenesium Chelate and apply as a liquid drench or spray).",
        objectPosition: "center"
      }
    ]
  }
];

export default function FeedingGuide() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-[10px] font-black uppercase tracking-widest text-green-700 mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">Feeding</h1>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Nutrition for Auckland Gardens</p>
      </header>

      <div className="space-y-10">
        {feedingCategories.map((category) => (
          <section key={category.title}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{category.icon}</span>
              <h2 className="text-[10px] font-black text-green-800 uppercase tracking-[0.3em]">{category.title}</h2>
            </div>
            
            <div className="space-y-6">
              {category.sections.map((item) => (
                <div key={item.name} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
                  {/* IMAGE SLOT */}
                  <div className="h-52 w-full bg-gray-50 border-b border-gray-50 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: item.objectPosition }}
                      onError={(e) => { 
                        e.currentTarget.src = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg"; 
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="font-black text-gray-800 uppercase italic tracking-tight text-xl mb-2">{item.name}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 font-medium">
                      {item.description}
                    </p>
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/30">
                      <p className="text-[10px] font-bold text-blue-900 leading-snug">
                        <span className="uppercase mr-2 font-black text-[8px] opacity-50">Pro Tip</span> 
                        {item.proTip}
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
