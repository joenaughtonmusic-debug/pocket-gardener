'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../lib/supabaseClient'
import {
  Sun, Droplets, Shovel, ChevronRight, X,
  Ruler, TrendingUp, Plus,
} from 'lucide-react'
import Link from 'next/link'
import PlantThumbnail from '../../../components/PlantThumbnail'
import PageHelp from '../../../components/PageHelp'

// ─── Condition option constants (match plants table values) ───────────────────
const SUN_OPTIONS   = ['Full Sun', 'Part Shade', 'Full Shade']
const SOIL_OPTIONS  = ['Healthy/loam', 'Clay', 'Sandy', 'Potting Mix']
const WATER_OPTIONS = ['Holds Water', 'Drains Well', 'Dry', 'Under a Roof']
const SIZE_OPTIONS  = ['<1m', '1-2m', '2-4m', '4m+']
const SLOPE_OPTIONS = ['flat', 'gentle', 'moderate', 'steep']
const SLOPE_LABELS  = ['Flat', 'Gentle Slope', 'Moderate Slope', 'Steep Slope']

// ─── Slider image assets ──────────────────────────────────────────────────────
const SUN_IMAGES = [
  'https://img.freepik.com/free-photo/penang-malaysia-march-25-2024_58702-16918.jpg?semt=ais_incoming&w=740&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80',
  'https://www.juliebawdendavis.com/wp-content/uploads/2024/05/Shade-Garden-plant-and-flower-in-garden-zone-at-coffee-cafe-ou-2023-11-27-05-18-40-utc-1024x683.jpg',
]
const SOIL_IMAGES = [
  'https://www.familyhandyman.com/wp-content/uploads/2021/12/GettyImages-1411589688.jpg?fit=700,700',
  'https://www.telegraph.co.uk/content/dam/gardening/2016/03/02/clay_trans_NvBQzQNjv4Bq2tiKoEXXnMogTwbjBHNCEqNpFR3XzR3Ec7ZpvUpPAOA.jpg?imwidth=640',
  'https://images.ctfassets.net/3s5io6mnxfqz/2NtZAbCMNH8DDAY7GQz2Gu/83ae589dc93ee115cc1b74bfb7c1db99/AdobeStock_271102263_2.jpeg',
  'https://www.marthastewart.com/thmb/9L878wbTxNsqMSkH1BXUlpmcZH4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-22093204211-c155b91cf01d45168b0170cbf938368d.jpg',
]
const WATER_IMAGES = [
  'https://www.saga.co.uk/helix-contentlibrary/saga/magazine/articles/2024/july/gettyimages-945124834-how-to-cope-with-waterlogged-soil_hero.jpg',
  'https://extension.umd.edu/sites/extension.umd.edu/files/styles/optimized/public/2021-03/hgic_soils_soil_cross_section_1600.jpg?itok=B6yNaByH',
  'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2010/04/dry_soil/9670553-3-eng-GB/Dry_soil_pillars.jpg',
  'https://www.thespruce.com/thmb/Z4V-26SsiT_2Qul7tsZya5XeZPg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1198218813-e5051f347a814c2ab5d6129b2cdc2ead.jpg',
]
const SIZE_IMAGES = [
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20small.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20mdeiium.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20hedge.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20tree.png',
]
const SLOPE_IMAGES = [
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Slope%20files/slope_flat%20v1.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Slope%20files/slope_gentle%20%20v1.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Slope%20files/slope_moderate%20v1.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Slope%20files/slope_steep%20v1.png',
]

// ─── Main page ────────────────────────────────────────────────────────────────
function MatchPageInner() {
  const [sunIdx,        setSunIdx]        = useState(0)
  const [soilIdx,       setSoilIdx]       = useState(0)
  const [waterIdx,      setWaterIdx]      = useState(1)
  const [sizeIdx,       setSizeIdx]       = useState(1)
  const [slopeIdx,      setSlopeIdx]      = useState(0)
  const [matches,       setMatches]       = useState<any[]>([])
  const [loading,       setLoading]       = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<any | null>(null)

  const supabase          = useMemo(() => createSupabaseBrowserClient(), [])
  const searchParams      = useSearchParams()
  // TODO: Future — use mode=suitability to pre-select suitability-focused filters.
  const isSuitabilityMode = searchParams.get('mode') === 'suitability'

  // ── Save plant to Future Plants ───────────────────────────────────────────
  const handleAddToProject = async (plantId: string) => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session?.user) { alert('Please log in first!'); return }

    const { data: existing } = await supabase
      .from('user_plants').select('id')
      .eq('user_id', session.user.id).eq('plant_id', Number(plantId)).eq('is_project', true)
      .maybeSingle()

    if (existing) { alert('Already in your planting ideas.'); return }

    const { error } = await supabase.from('user_plants').insert([{
      user_id:    session.user.id,
      plant_id:   Number(plantId),
      is_project: true,
      status:     'Planning',
    }])

    if (!error) { alert('Saved as a Future Plant!'); setSelectedPlant(null) }
  }

  // ── Live condition-based plant query ─────────────────────────────────────
  useEffect(() => {
    async function getLiveMatches() {
      setLoading(true)
      const { data } = await supabase
        .from('plants').select('*')
        .contains('sun_requirement',   [SUN_OPTIONS[sunIdx]])
        .contains('soil_type',         [SOIL_OPTIONS[soilIdx]])
        .contains('water_behavior',    [WATER_OPTIONS[waterIdx]])
        .contains('mature_size',       [SIZE_OPTIONS[sizeIdx]])
        .contains('slope_suitability', [SLOPE_OPTIONS[slopeIdx]])
      if (data) {
        setMatches([...data].sort((a, b) => (a.common_name || '').localeCompare(b.common_name || '')))
      }
      setLoading(false)
    }
    getLiveMatches()
  }, [sunIdx, soilIdx, waterIdx, sizeIdx, slopeIdx, supabase])

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#f0f4f1] text-gray-900 pb-40">
      <div className="max-w-2xl mx-auto p-6">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <header className="mb-6 pt-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-green-950 tracking-tighter italic uppercase leading-none">
              {isSuitabilityMode ? 'Check Suitability' : 'Plant Finder'}
            </h1>
            <p className="text-[10px] text-green-700/60 font-black uppercase tracking-[0.2em] mt-2">
              {isSuitabilityMode
                ? 'Choose the conditions for your space to check which plants may suit.'
                : 'Choose the conditions for your space to find plants that could suit your garden.'}
            </p>
          </div>
          <PageHelp
            title={isSuitabilityMode ? 'Check Suitability' : 'Plant Finder'}
            description={isSuitabilityMode
              ? 'Dial in sun, soil, drainage and slope to check whether a plant could suit that spot.'
              : 'Dial in sun, soil, drainage and slope to see plants that suit that spot. Tap any plant to save it to your garden.'}
            bullets={[
              'Adjust the sliders to match your garden conditions',
              'Tap a plant to see details and add it to your garden',
              'Use Visualise to preview plants in your own garden photo',
            ]}
          />
        </header>

        {/* ── Condition sliders ────────────────────────────────────────────── */}
        <div className="space-y-10 mb-12">

          {/* SUN */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <Sun size={14} /> Sun Exposure
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {SUN_OPTIONS[sunIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SUN_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{ backgroundImage: `url("${url}")`, opacity: sunIdx === i ? 1 : 0 }} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
              <input type="range" min="0" max="2" step="1" value={sunIdx}
                onChange={(e) => setSunIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* SOIL */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <Shovel size={14} /> Soil Type
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {SOIL_OPTIONS[soilIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SOIL_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{ backgroundImage: `url("${url}")`, opacity: soilIdx === i ? 1 : 0 }} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
              <input type="range" min="0" max="3" step="1" value={soilIdx}
                onChange={(e) => setSoilIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* DRAINAGE */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <Droplets size={14} /> Drainage
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {WATER_OPTIONS[waterIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {WATER_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{ backgroundImage: `url("${url}")`, opacity: waterIdx === i ? 1 : 0 }} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
              <input type="range" min="0" max="3" step="1" value={waterIdx}
                onChange={(e) => setWaterIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* MATURE SIZE */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <Ruler size={14} /> Mature Size
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {SIZE_OPTIONS[sizeIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-white">
              {SIZE_IMAGES.map((url, i) => (
                <div key={i}
                  className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-all duration-500 ease-out"
                  style={{
                    backgroundImage: `url("${url}")`,
                    opacity: sizeIdx === i ? 1 : 0,
                    transform: sizeIdx === i ? 'scale(1)' : 'scale(0.9)',
                  }}
                />
              ))}
              <input type="range" min="0" max="3" step="1" value={sizeIdx}
                onChange={(e) => setSizeIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-green-900/10 rounded-full appearance-none cursor-pointer accent-green-900 z-10" />
            </div>
          </div>

          {/* SLOPE */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2">
                <TrendingUp size={14} /> Slope
              </label>
              <span className="text-xs font-black italic uppercase text-green-950">
                {SLOPE_LABELS[slopeIdx]}
              </span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SLOPE_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{ backgroundImage: `url("${url}")`, opacity: slopeIdx === i ? 1 : 0 }} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
              <input type="range" min="0" max="3" step="1" value={slopeIdx}
                onChange={(e) => setSlopeIdx(parseInt(e.target.value))}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>
        </div>

        {/* ── Plant results ────────────────────────────────────────────────── */}
        <section className="relative pt-8 border-t border-green-900/5">
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-[10px] font-black text-green-900 uppercase tracking-[0.2em]">
              Matching plants ({matches.length})
            </h3>
            {loading && (
              <div className="w-4 h-4 border-2 border-green-900/20 border-t-green-900 rounded-full animate-spin" />
            )}
          </div>

          {!loading && matches.length === 0 && (
            <div className="py-6 text-center space-y-1.5">
              <p className="text-[12px] text-gray-400 font-medium">
                No plants match these conditions.
              </p>
              <p className="text-[11px] text-gray-300 italic leading-snug max-w-xs mx-auto">
                Try adjusting sun exposure, soil type, or drainage to broaden results.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {matches.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlant(p)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-[2rem] border border-transparent shadow-sm active:scale-[0.98] transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0">
                    <PlantThumbnail plant={p} size="sm" />
                  </div>
                  <div>
                    <span className="font-black text-green-950 text-sm uppercase block leading-none mb-1">
                      {p.common_name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase italic">
                      {p.plant_type}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        </section>

        {/* ── Visualise CTA ────────────────────────────────────────────────── */}
        <div className="mt-10 pt-8 border-t border-green-900/5 text-center space-y-2">
          <p className="text-[11px] text-gray-400 font-medium">
            Want to see how plants could look?
          </p>
          <Link
            href="/visualise"
            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-700 active:text-green-900 transition-colors"
          >
            Open Visualise →
          </Link>
        </div>

      </div>

      {/* ── Plant detail modal ───────────────────────────────────────────────── */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          <div
            className="absolute inset-0 bg-green-950/60 backdrop-blur-sm"
            onClick={() => setSelectedPlant(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-8 overflow-hidden animate-in slide-in-from-bottom-10">
            <button
              onClick={() => setSelectedPlant(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-400"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden mb-4 shadow-xl">
                <PlantThumbnail plant={selectedPlant} size="lg" />
              </div>
              <h2 className="text-2xl font-black text-green-950 uppercase italic leading-none">
                {selectedPlant.common_name}
              </h2>
              <p className="text-xs font-bold text-gray-400 uppercase italic mt-2">
                {selectedPlant.botanical_name}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#f0f4f1] p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Growth</p>
                <p className="text-sm font-bold text-green-950">
                  {selectedPlant.mature_size?.[0] || SIZE_OPTIONS[sizeIdx]}
                </p>
              </div>
              <div className="bg-[#f0f4f1] p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Type</p>
                <p className="text-sm font-bold text-green-950">
                  {selectedPlant.plant_type || 'Shrub'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAddToProject(selectedPlant.id)}
              className="w-full bg-amber-400 text-green-950 font-black uppercase py-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
              <Plus size={16} strokeWidth={3} /> Save as Future Plant
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default function MatchPage() {
  return (
    <Suspense>
      <MatchPageInner />
    </Suspense>
  )
}
