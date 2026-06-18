'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'

export interface LockedProFeatureCardProps {
  icon: string
  title: string
  description: string
  /** Defaults to dashboard upgrade section */
  upgradeHref?: string
}

export default function LockedProFeatureCard({
  icon,
  title,
  description,
  upgradeHref = '/dashboard#pro-upgrade',
}: LockedProFeatureCardProps) {
  return (
    <Link
      href={upgradeHref}
      className="group relative block bg-white rounded-[1.75rem] p-4 border border-dashed border-amber-200/80 shadow-sm active:scale-[0.98] transition-all"
    >
      <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
        <Lock size={9} strokeWidth={3} />
        Pro
      </span>
      <div className="flex items-start gap-3 pr-14">
        <div className="w-9 h-9 rounded-[0.875rem] bg-[#f0f4f1] flex items-center justify-center text-lg leading-none shrink-0 opacity-80">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-black text-green-950 uppercase tracking-tight leading-none mb-1">
            {title}
          </p>
          <p className="text-[10px] text-gray-400 font-medium leading-snug">
            {description}
          </p>
          <p className="text-[8px] font-black uppercase tracking-widest text-amber-600/70 mt-2 group-hover:text-amber-600 transition-colors">
            Upgrade to unlock →
          </p>
        </div>
      </div>
    </Link>
  )
}
