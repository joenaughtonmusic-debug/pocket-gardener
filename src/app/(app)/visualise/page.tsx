'use client'

import { useEffect, useState, useMemo } from 'react'
import { createSupabaseBrowserClient } from '../../lib/supabaseClient'
import Link from 'next/link'
import { ArrowRight, Plus, ImageOff } from 'lucide-react'
import type { VisualConcept } from '../../../types/garden'

const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  generating: 'Generating…',
  complete: 'Complete',
  error: 'Error',
}

const STATUS_COLOURS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-500',
  generating: 'bg-amber-50 text-amber-600',
  complete: 'bg-green-50 text-green-700',
  error: 'bg-red-50 text-red-500',
}

export default function VisualisePage() {
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
      {/* Header */}
      <section className="bg-green-900 px-6 pt-14 pb-10 rounded-b-[3rem] shadow-2xl shadow-green-900/20 mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-green-400 mb-2">
          Pocket Gardener
        </p>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none mb-3">
          Visual Ideas
        </h1>
        <p className="text-green-200/70 text-[12px] font-medium leading-relaxed mb-6">
          Upload a garden photo and see how planting ideas could look.
        </p>
        <Link
          href="/visualise/new"
          className="inline-flex items-center gap-2 bg-amber-400 text-green-950 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-lg active:scale-95 transition-all"
        >
          <Plus size={14} strokeWidth={3} />
          Create Visual Idea
        </Link>
      </section>

      <div className="px-6 space-y-4">
        {concepts.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm text-center space-y-4">
            <p className="text-4xl">🌿</p>
            <h2 className="text-sm font-black text-green-950 uppercase tracking-tight">
              No visual ideas yet
            </h2>
            <p className="text-[12px] text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
              Upload a garden photo and visualise planting ideas.
            </p>
            <Link
              href="/visualise/new"
              className="inline-flex items-center gap-2 bg-green-900 text-white text-[10px] font-black uppercase tracking-widest px-7 py-3 rounded-full shadow-sm active:scale-95 transition-all"
            >
              <Plus size={12} strokeWidth={3} />
              Create Visual Idea
            </Link>
          </div>
        ) : (
          <>
            <p className="text-[9px] font-black text-green-800/40 uppercase tracking-[0.25em] px-1">
              {concepts.length} saved {concepts.length === 1 ? 'concept' : 'concepts'}
            </p>

            {concepts.map((concept) => (
              <Link
                key={concept.id}
                href={`/visualise/${concept.id}`}
                className="block bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden active:scale-[0.98] transition-all"
              >
                <div className="flex items-stretch gap-0">
                  {/* Thumbnail */}
                  <div className="w-28 shrink-0 bg-gray-100 relative overflow-hidden rounded-l-[2rem]">
                    {concept.original_photo_url ? (
                      <img
                        src={concept.original_photo_url}
                        alt={concept.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageOff size={20} className="text-gray-300" />
                      </div>
                    )}
                    {concept.generated_image_url && (
                      <div className="absolute bottom-1.5 right-1.5 bg-green-700 rounded-full p-1">
                        <span className="text-[8px] text-white font-black">✨</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-black text-green-950 uppercase truncate">
                          {concept.name}
                        </h3>
                        <ArrowRight size={12} className="text-gray-300 shrink-0 mt-0.5" />
                      </div>
                      {concept.detected_intent && (
                        <p className="text-[9px] font-black uppercase tracking-widest text-green-600 mb-1.5">
                          {concept.detected_intent}
                        </p>
                      )}
                      {concept.goal_text && (
                        <p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-relaxed">
                          {concept.goal_text}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                          STATUS_COLOURS[concept.status] ?? STATUS_COLOURS.draft
                        }`}
                      >
                        {STATUS_LABELS[concept.status] ?? concept.status}
                      </span>
                      <span className="text-[9px] text-gray-300 font-bold">
                        {new Date(concept.created_at).toLocaleDateString('en-NZ', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
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
