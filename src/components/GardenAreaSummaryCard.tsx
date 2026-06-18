import Link from 'next/link'
import { ArrowRight, Leaf, BookMarked, CalendarDays } from 'lucide-react'
import type { GardenArea } from '../types/garden'

interface GardenAreaSummaryCardProps {
  area: GardenArea
  ownedCount: number
  plannedCount: number
}

export default function GardenAreaSummaryCard({
  area,
  ownedCount,
  plannedCount,
}: GardenAreaSummaryCardProps) {
  const hasStyle = area.style && area.style !== 'Not Sure'
  const hasGoal  = area.goal  && area.goal  !== 'Not Sure'

  return (
    <Link
      href="/match"
      className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm flex flex-col gap-3 active:scale-[0.98] transition-all"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-[13px] font-black text-green-950 uppercase tracking-tight leading-none truncate">
            {area.name}
          </h3>

          {(hasStyle || hasGoal) && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {hasStyle && (
                <span className="text-[8px] font-black uppercase tracking-wide bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                  {area.style}
                </span>
              )}
              {hasGoal && (
                <span className="text-[8px] font-black uppercase tracking-wide bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                  {area.goal}
                </span>
              )}
            </div>
          )}
        </div>
        <ArrowRight size={13} className="text-gray-200 shrink-0 mt-0.5" />
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 pt-2 border-t border-gray-50 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Leaf size={10} className="text-green-600" />
          <span className="text-[10px] font-black text-green-950">{ownedCount}</span>
          <span className="text-[10px] font-medium text-gray-400">
            {ownedCount === 1 ? 'plant' : 'plants'}
          </span>
        </div>

        {plannedCount > 0 && (
          <div className="flex items-center gap-1.5">
            <BookMarked size={10} className="text-amber-500" />
            <span className="text-[10px] font-black text-amber-700">{plannedCount}</span>
            <span className="text-[10px] font-medium text-gray-400">
              {plannedCount === 1 ? 'planned' : 'planned'}
            </span>
          </div>
        )}

        <div className="flex items-center gap-1 ml-auto">
          <CalendarDays size={9} className="text-gray-300" />
          <span className="text-[9px] font-medium text-gray-300 italic">View tasks in Calendar</span>
        </div>
      </div>
    </Link>
  )
}
