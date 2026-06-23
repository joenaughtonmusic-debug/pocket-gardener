'use client'

import { useEffect, useState, useMemo } from 'react'
import { createSupabaseBrowserClient } from '../../../lib/supabaseClient'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { VisualConcept } from '../../../../types/garden'
import VisualConceptCard from '../../../../components/visualise/VisualConceptCard'

export default function SavedVisualIdeasPage() {
  const [concepts, setConcepts] = useState<VisualConcept[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data } = await supabase
        .from('garden_visual_concepts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setConcepts((data as VisualConcept[]) ?? [])
      setLoading(false)
    }
    load()
  }, [supabase])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-green-800/20 border-t-green-800 rounded-full animate-spin" />
          <p className="text-green-800 font-black uppercase text-[10px] tracking-widest">Loading…</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40">
      <section className="bg-green-900 px-6 pt-14 pb-10 rounded-b-[3rem] shadow-2xl shadow-green-900/20 mb-8">
        <Link
          href="/visualise"
          className="inline-flex items-center gap-2 text-green-300 text-[10px] font-black uppercase tracking-widest mb-5 active:opacity-70"
        >
          <ArrowLeft size={12} strokeWidth={3} />
          Visualise
        </Link>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none mb-3">
          Saved Visual Ideas
        </h1>
        <p className="text-green-200/70 text-[12px] font-medium leading-relaxed">
          Tap a saved idea to edit placement and size in Quick Preview.
        </p>
      </section>

      <div className="px-6 space-y-4">
        {concepts.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm text-center space-y-4">
            <p className="text-4xl">🌿</p>
            <h2 className="text-sm font-black text-green-950 uppercase tracking-tight">
              No visual ideas yet
            </h2>
            <p className="text-[12px] text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
              Upload a garden photo and preview how a plant could look in place.
            </p>
            <Link
              href="/visualise"
              className="inline-flex items-center gap-2 bg-green-900 text-white text-[10px] font-black uppercase tracking-widest px-7 py-3 rounded-full shadow-sm active:scale-95 transition-all"
            >
              Create Visual Idea
            </Link>
          </div>
        ) : (
          <>
            <p className="text-[9px] font-black text-green-800/40 uppercase tracking-[0.25em] px-1">
              {concepts.length} saved {concepts.length === 1 ? 'idea' : 'ideas'}
            </p>

            {concepts.map((concept) => (
              <VisualConceptCard key={concept.id} concept={concept} />
            ))}
          </>
        )}

        <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
            Visual ideas are for inspiration only. Plant spacing, mature size,
            and suitability should be confirmed before planting.
          </p>
        </div>
      </div>
    </main>
  )
}
