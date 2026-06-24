'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type MonthEntry = {
  month: string
  sow: string[]
  plant: string[]
  harvest: string[]
  tip: string
}

const MONTHS: MonthEntry[] = [
  {
    month: 'January',
    sow: ['Beans', 'Basil', 'Lettuce (succession)', 'Courgette'],
    plant: ['Basil seedlings', 'Sweetcorn seedlings'],
    harvest: ['Tomatoes', 'Courgette', 'Beans', 'Cucumber', 'Capsicum', 'Basil'],
    tip: 'Water deeply in the early morning. Mulch heavily around tomatoes and courgettes to hold moisture through summer heat.',
  },
  {
    month: 'February',
    sow: ['Silverbeet', 'Spinach', 'Lettuce', 'Beetroot', 'Asian greens'],
    plant: ['Autumn brassica seedlings started indoors'],
    harvest: ['Tomatoes', 'Beans', 'Cucumber', 'Courgette', 'Capsicum'],
    tip: 'Start winding down summer sowings. Begin sowing cool-season greens for autumn harvest.',
  },
  {
    month: 'March',
    sow: ['Broccoli', 'Cauliflower', 'Cabbage', 'Kale', 'Peas', 'Silverbeet'],
    plant: ['Brassica seedlings', 'Silverbeet', 'Leeks'],
    harvest: ['Last tomatoes', 'Pumpkin', 'Sweetcorn', 'Capsicum', 'Beans'],
    tip: 'Harvest pumpkins once the vine has died back and the skin is hard. Cure in a warm, dry spot for 2 weeks before storing.',
  },
  {
    month: 'April',
    sow: ['Garlic', 'Onions', 'Broad beans', 'Peas', 'Spinach', 'Kale'],
    plant: ['Garlic cloves', 'Onion seedlings', 'Brassica seedlings'],
    harvest: ['Broccoli (early)', 'Silverbeet', 'Leeks', 'Lettuce'],
    tip: 'Plant garlic with the pointy end up, about 5 cm deep and 15 cm apart. Choose a sunny, well-drained spot.',
  },
  {
    month: 'May',
    sow: ['Broad beans', 'Peas', 'Spinach', 'Asian greens'],
    plant: ['Broad beans', 'Onions', 'Garlic (if not done)'],
    harvest: ['Broccoli', 'Cauliflower', 'Silverbeet', 'Kale', 'Leeks', 'Celery'],
    tip: 'Shelter brassicas from strong winds with stakes or a windbreak. Frosts in Auckland are rare but possible overnight in May.',
  },
  {
    month: 'June',
    sow: ['Peas (cold-tolerant)', 'Spinach', 'Broad beans'],
    plant: ['Broad beans', 'Onion sets'],
    harvest: ['Broccoli', 'Cauliflower', 'Cabbage', 'Silverbeet', 'Kale', 'Leeks'],
    tip: 'Little action required in June. Focus on harvesting winter greens and keeping beds weeded.',
  },
  {
    month: 'July',
    sow: ['Tomatoes (indoors, heated)', 'Capsicum (indoors, heated)', 'Eggplant (indoors, heated)', 'Peas'],
    plant: ['Potatoes (early varieties in sheltered spots)'],
    harvest: ['Silverbeet', 'Kale', 'Broccoli', 'Cauliflower', 'Leeks', 'Broad beans (early)'],
    tip: 'Start tomatoes and capsicums on a heated windowsill or propagator — they need 18–24°C to germinate well. Too early outdoors without heat means failure.',
  },
  {
    month: 'August',
    sow: ['Tomatoes (indoors)', 'Capsicum (indoors)', 'Celery', 'Lettuce', 'Peas'],
    plant: ['Potatoes', 'Peas outdoors', 'Onion seedlings'],
    harvest: ['Silverbeet', 'Kale', 'Leeks', 'Broad beans', 'Broccoli'],
    tip: 'Potatoes can go in the ground from mid-August in most Auckland areas. Earth up as the foliage grows to prevent greening.',
  },
  {
    month: 'September',
    sow: ['Tomatoes', 'Basil (indoors)', 'Cucumber (indoors)', 'Courgette (indoors)', 'Beans'],
    plant: ['Tomato seedlings (sheltered spots only)', 'Peas', 'Lettuce', 'Beetroot'],
    harvest: ['Broad beans', 'Peas (early)', 'Silverbeet', 'Leeks'],
    tip: 'Harden off indoor seedlings before planting out — leave them outside in a sheltered spot for a few hours each day over a week.',
  },
  {
    month: 'October',
    sow: ['Beans', 'Courgette', 'Cucumber', 'Basil', 'Pumpkin', 'Sweetcorn'],
    plant: ['Tomatoes', 'Capsicum', 'Eggplant', 'Courgette', 'Cucumber', 'Basil'],
    harvest: ['Peas', 'Broad beans', 'Lettuce', 'Silverbeet'],
    tip: 'Last frost risk in Auckland is typically late September to mid-October. Wait for consistently warm nights before planting heat-lovers outdoors.',
  },
  {
    month: 'November',
    sow: ['Beans (succession)', 'Basil', 'Lettuce'],
    plant: ['All summer crops', 'Sweetcorn', 'Pumpkin', 'Watermelon (warm spots)'],
    harvest: ['Lettuce', 'Peas', 'Spring onions', 'Silverbeet'],
    tip: 'Mulch everything after planting to reduce watering needs through summer. Water tomatoes at the base, not the foliage, to reduce disease risk.',
  },
  {
    month: 'December',
    sow: ['Beans (succession)', 'Courgette (succession)', 'Basil'],
    plant: ['Any remaining summer seedlings'],
    harvest: ['Beans', 'Early tomatoes', 'Courgette', 'Cucumber', 'Peas', 'Lettuce'],
    tip: 'The main harvest season begins. Check courgettes every 2 days — they become marrows very quickly in December heat.',
  },
]

const SEASON_TIPS = [
  {
    season: 'Summer (Dec–Feb)',
    emoji: '☀️',
    summary: 'Harvest daily. Water deeply. Sow beans and lettuce in succession to avoid gluts.',
  },
  {
    season: 'Autumn (Mar–May)',
    emoji: '🍂',
    summary: 'Wind down summer crops. Get brassicas and garlic in. Start cool-season greens.',
  },
  {
    season: 'Winter (Jun–Aug)',
    emoji: '🌧️',
    summary: 'Harvest leafy greens. Start tomatoes and capsicums on heat indoors from July.',
  },
  {
    season: 'Spring (Sep–Nov)',
    emoji: '🌱',
    summary: 'Harden off seedlings. Plant summer crops after last frost. Mulch before heat arrives.',
  },
]

export default function VegetableCalendarGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12 bg-white font-sans text-slate-900 pb-40">

      {/* Back link */}
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

      {/* Header */}
      <header className="mb-10 border-b border-slate-100 pb-10">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">
          Vegetable Calendar
        </h1>
        <p className="text-slate-600 font-bold leading-relaxed max-w-2xl mb-3">
          A simple New Zealand guide for what to sow, plant and harvest through the year.
        </p>
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-2xl">
          Timing is general guidance for the Auckland region. Your microclimate matters — a frost pocket, exposed hillside, or warm north-facing wall can shift timings by several weeks. Soil temperature, shelter, and rainfall all play a role.
        </p>
      </header>

      {/* Seasonal overview */}
      <section className="mb-12">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Seasonal Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SEASON_TIPS.map((s) => (
            <div key={s.season} className="bg-[#f8fbf9] rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-[11px] font-black uppercase tracking-widest text-green-900">{s.season}</span>
              </div>
              <p className="text-[12px] text-slate-600 font-medium leading-relaxed">{s.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly calendar */}
      <section className="space-y-8">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Month by Month</h2>
        {MONTHS.map((entry) => (
          <div key={entry.month} className="border-l-4 border-green-200 pl-5">
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-green-950 mb-4">
              {entry.month}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Sow</p>
                <ul className="space-y-1">
                  {entry.sow.map((item) => (
                    <li key={item} className="text-[12px] font-medium text-slate-700 flex items-start gap-1.5">
                      <span className="text-green-400 mt-0.5 shrink-0">▸</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Plant Out</p>
                <ul className="space-y-1">
                  {entry.plant.map((item) => (
                    <li key={item} className="text-[12px] font-medium text-slate-700 flex items-start gap-1.5">
                      <span className="text-amber-400 mt-0.5 shrink-0">▸</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Harvest</p>
                <ul className="space-y-1">
                  {entry.harvest.map((item) => (
                    <li key={item} className="text-[12px] font-medium text-slate-700 flex items-start gap-1.5">
                      <span className="text-orange-400 mt-0.5 shrink-0">▸</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-3 border-l-2 border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 italic leading-relaxed">💡 {entry.tip}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Disclaimer footer */}
      <footer className="mt-16 pt-8 border-t border-slate-100">
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
          This guide is general advice for the Auckland region. Timing varies with your microclimate, soil temperature, frost exposure, and shelter. Always check conditions in your specific garden before planting.
        </p>
      </footer>
    </div>
  )
}
