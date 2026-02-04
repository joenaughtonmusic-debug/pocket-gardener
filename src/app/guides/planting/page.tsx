'use client'
import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, Search, Shovel, Droplets, 
  Wind, ShieldCheck, AlertTriangle, CheckCircle2, XCircle,
  ThermometerSun, Sprout, Car, ArrowLeft 
} from 'lucide-react';

export default function PlantingGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12 bg-white font-sans text-slate-900">
      
      {/* NAVIGATION - BACK TO GUIDES */}
      <nav className="mb-8">
        <Link 
          href="/guides" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-50 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Guides</span>
        </Link>
      </nav>

      {/* HEADER */}
      <header className="mb-12 border-b border-slate-100 pb-10">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">
          Auckland Planting Guide
        </h1>
        <p className="text-slate-600 font-bold leading-relaxed max-w-2xl">
          Before you plant, make sure to get the right plants for your area. For site-specific selection (sun, soil, drainage), use the Plant Match Maker. This guide focuses on what to do once you’ve chosen your plants.
        </p>
      </header>

      <div className="space-y-16">
        
        {/* SECTION 1: SOURCING & HEALTH */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">1</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Sourcing Healthy Plants</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] flex flex-col">
              <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><ShoppingBag size={14}/> Reputable Nurseries</h3>
              <p className="text-sm font-bold text-slate-600 leading-relaxed mb-6">Look for nurseries that grow locally, keep stock well-watered, and space plants properly. Avoid plants that have been sitting dry or crowded.</p>
              
              <div className="bg-amber-100/50 p-4 rounded-2xl border border-amber-200 mb-4 flex items-start gap-3">
                <Car className="text-amber-600 shrink-0" size={18} />
                <p className="text-[11px] font-black text-amber-800 uppercase tracking-tight leading-snug">
                  Bonus Tip: Ensure plants are in a covered vehicle or trailer if travelling back via a motorway to prevent wind-burn.
                </p>
              </div>

              <div className="mt-auto bg-white p-4 rounded-2xl border border-slate-100 text-[11px] font-bold text-green-700 uppercase tracking-tight">
                Once home, plant as soon as possible. Keep them watered and out of hot sun/wind until they are in the ground.
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem]">
              <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Search size={14}/> Quality Check</h3>
              <div className="flex gap-4">
                <div className="space-y-3 flex-1">
                  <p className="text-[11px] font-bold uppercase text-slate-400">✅ Look For:</p>
                  <p className="text-xs font-bold leading-relaxed">New growth, especially healthy new growth is a great sign (new growth usually has a lighter colour leaf compared to the rest of the plant).</p>
                  <img 
                    src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/Gemini_planting%20guide%20v1%20growth%20image.png" 
                    alt="New growth diagram" 
                    className="rounded-xl border border-slate-200 w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <p className="text-[11px] font-bold uppercase text-slate-400">❌ Avoid:</p>
                <p className="text-xs font-bold leading-relaxed text-red-700">Yellow/brown leaves, black spots, wilted growth, pests, mushy soil, or broken stems.</p>
                <p className="text-[11px] font-bold uppercase text-slate-400 mt-4">🧪 Roots:</p>
                <p className="text-xs font-bold leading-relaxed">Should be light colored. Avoid heavily root-bound plants where roots wrap tightly around the pot.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE PREP */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">2</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Before You Dig</h2>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-[2rem] space-y-6">
            <p className="text-sm font-bold leading-relaxed text-slate-600">
              Check for underground services (water, power, gas, irrigation). Ensure you are planting in the right position for sun and space—refer back to the Plant Match Maker for spacing rules.
            </p>
            <div className="border-l-4 border-amber-400 pl-6 py-2">
                <h4 className="font-black uppercase text-xs mb-2">The Auckland Clay/Drainage Test</h4>
                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                    If you have heavy clay, fill your hole with water. If it hasn't drained after 1–2 hours, you must improve drainage or plant slightly higher than the ground level. Remember that clay soil has it's benefits (it holds nutrients and moisture), just make sure to add garden mix (organic matter) and it will improve over time!
                </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: PLANTING PROCESS */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">3</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">The Planting Process</h2>
          </div>

          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <div>
                        <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Shovel size={14}/> 1. Digging & Root Prep</h3>
                        <p className="text-xs font-bold leading-relaxed text-slate-600">
                            Dig the hole the same depth as the root ball and slightly wider. Loosen the soil at the bottom of the hole to help the roots establish. 
                            <br/><br/>
                            <strong>If root bound:</strong> Gently loosen the roots with your hands or make a few vertical cuts.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Sprout size={14}/> 2. Soil & Backfill</h3>
                        <p className="text-xs font-bold leading-relaxed text-slate-600">
                            Have good quality garden mix on hand. Backfill using a mix of your existing soil and garden mix. <strong>Do not replace all the soil with compost;</strong> this helps the plant adapt.
                        </p>
                    </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Ideal Planting Depth & Prep</p>
                    <img 
                      src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/Gemini_Generated_Image_4x0g9e4x0g9e4x0g.png" 
                      alt="Planting depth diagram" 
                      className="rounded-2xl shadow-sm mx-auto"
                    />
                </div>
            </div>

            {/* RE-DESIGNED STEP-BY-STEP BOX */}
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl border border-slate-800">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900"><CheckCircle2 size={20}/></div>
                    <h3 className="font-black uppercase text-sm tracking-[0.2em] text-emerald-400">Step-by-Step Planting</h3>
                </div>
                <div className="grid gap-6">
                    {[
                        { num: '01', text: 'Place root ball level with ground' },
                        { num: '02', text: 'Backfill with soil mix & gently firm/compact soil with hands or standing on soil' },
                        { num: '03', text: 'Water thoroughly; middle of plant and area surrounding plant' },
                        { num: '04', text: 'Now is a good time for a liquid (seaweed) feed and a light handful of granular slow release fertiliser' }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-6 items-start group">
                            <span className="text-emerald-500/50 font-black italic text-lg leading-none pt-1">{step.num}</span>
                            <span className="text-xs font-bold uppercase tracking-widest leading-relaxed text-slate-300 group-hover:text-white transition-colors">{step.text}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: AFTERCARE */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">4</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Establishing Your Plant</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
                <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 flex items-center gap-2"><Droplets size={14}/> Watering & Feeding</h3>
                <p className="text-xs font-bold leading-relaxed text-slate-600">
                    Water is critical for 2-8 weeks. Apply slow-release granules around the base, but <strong>never directly against the stem</strong>.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <img src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/Gemini_planting%20guide%20v1%20fert%20image.png" alt="Fertilizer placement" className="rounded-2xl border border-slate-100 shadow-sm" />
                </div>
            </div>
            <div className="space-y-6">
                <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 flex items-center gap-2"><Wind size={14}/> Staking & Wind</h3>
                <p className="text-xs font-bold leading-relaxed text-slate-600">
                    Stake tall plants or hedge plants in wind-exposed areas. Use soft ties and allow slight movement. Remove stakes once established.
                </p>
            </div>
          </div>

          <div className="mt-8 bg-green-50 p-8 rounded-[2rem] border border-green-100 flex gap-6 items-center">
            <div className="hidden lg:block text-4xl">🍂</div>
            <div>
                <h3 className="font-black uppercase text-xs tracking-widest text-green-800 mb-2">Mulching (Highly Recommended)</h3>
                <p className="text-xs font-bold text-green-700 leading-relaxed">
                    Apply mulch 50–75mm thick. Keep it away from the stem. Mulch retains moisture, reduces weeds, and protects roots.
                </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: AUCKLAND SPECIFIC */}
        <section className="bg-slate-50 p-8 rounded-[2rem]">
            <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-6 flex items-center gap-2"><ThermometerSun size={14}/> Auckland Specific Notes</h3>
            <ul className="grid lg:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                <li className="flex gap-2"><span>•</span> Best planting times: Autumn and Spring</li>
                <li className="flex gap-2"><span>•</span> Avoid extreme heat or very wet conditions</li>
                <li className="flex gap-2"><span>•</span> Clay soils are common — but don't panic clay is good! It holds nutrients and moisture.</li>
                <li className="flex gap-2"><span>•</span> Wind exposure is a major factor for young plants</li>
            </ul>
        </section>

        {/* DO & DON'T */}
        <section className="grid lg:grid-cols-2 gap-8 border-t border-slate-100 pt-16">
            <div className="p-8 bg-green-50 rounded-3xl">
                <h3 className="text-green-700 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><CheckCircle2 size={16}/> The Do's</h3>
                <ul className="text-[11px] font-bold text-green-800 space-y-3">
                    <li>• Choose healthy plants</li>
                    <li>• Loosen the root ball if bound</li>
                    <li>• Use garden mix with existing soil</li>
                    <li>• Water in thoroughly</li>
                    <li>• Stake tall or exposed plants</li>
                    <li>• Monitor closely for the first few weeks</li>
                </ul>
            </div>
            <div className="p-8 bg-red-50 rounded-3xl">
                <h3 className="text-red-700 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><XCircle size={16}/> The Don'ts</h3>
                <ul className="text-[11px] font-bold text-red-800 space-y-3">
                    <li>• Don't plant too deep</li>
                    <li>• Don't leave roots tightly bound</li>
                    <li>• Don't use compost as backfill</li>
                    <li>• Don't forget to water after planting</li>
                    <li>• Don't over-fertilize at planting time</li>
                    <li>• Don't pile up mulch around the stem</li>
                </ul>
            </div>
        </section>

        {/* DISCLAIMER */}
        <footer className="flex gap-4 items-start border-t border-slate-100 pt-12 opacity-50">
            <AlertTriangle size={18} className="text-slate-400 shrink-0"/>
            <p className="text-[10px] font-bold text-slate-800 uppercase leading-loose tracking-wider">
                This guide provides general planting advice only. Always check for underground services before digging. Plant performance depends on site conditions, weather, and ongoing care.
            </p>
        </footer>
      </div>
    </div>
  );
}