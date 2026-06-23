'use client'

import { useEffect, useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../lib/supabaseClient'
import Link from 'next/link'
import type { VisualConcept } from '../../../types/garden'
import CreateVisualIdeaForm from '../../../components/visualise/CreateVisualIdeaForm'
import VisualConceptCard from '../../../components/visualise/VisualConceptCard'

const RECENT_LIMIT = 3

function VisualisePageInner() {
  const searchParams = useSearchParams()
  const areaIdParam = searchParams.get('areaId')
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const [concepts, setConcepts] = useState<VisualConcept[]>([])
  const [loadingSaved, setLoadingSaved] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoadingSaved(false); return }

      const { data } = await supabase
        .from('garden_visual_concepts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setConcepts((data as VisualConcept[]) ?? [])
      setLoadingSaved(false)
    }
    load()
  }, [supabase])

  const recentConcepts = concepts.slice(0, RECENT_LIMIT)

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40">
      <section className="bg-green-900 px-6 pt-14 pb-10 rounded-b-[3rem] shadow-2xl shadow-green-900/20 mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none mb-3">
          Visualise your garden
        </h1>
        <p className="text-green-200/70 text-[12px] font-medium leading-relaxed">
          Start with a garden photo, then add plants in Quick Preview.
        </p>
      </section>

      <div className="px-6 space-y-8">
        <CreateVisualIdeaForm initialAreaId={areaIdParam} />

        <details className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
          <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between gap-3 active:bg-gray-50">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Saved Visual Ideas
              {!loadingSaved && concepts.length > 0 && (
                <span className="text-gray-300 font-medium normal-case tracking-normal">
                  {' '}· {concepts.length}
                </span>
              )}
            </span>
            <span className="text-[10px] text-gray-300 font-medium group-open:hidden">Show</span>
            <span className="text-[10px] text-gray-300 font-medium hidden group-open:inline">Hide</span>
          </summary>

          <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
            {loadingSaved ? (
              <p className="text-[11px] text-gray-400 font-medium pt-4">Loading saved ideas…</p>
            ) : concepts.length === 0 ? (
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed pt-4">
                No saved visual ideas yet. Create one above to get started.
              </p>
            ) : (
              <>
                <div className="space-y-3 pt-4">
                  {recentConcepts.map((concept) => (
                    <VisualConceptCard key={concept.id} concept={concept} />
                  ))}
                </div>

                {concepts.length > RECENT_LIMIT && (
                  <Link
                    href="/visualise/saved"
                    className="block text-center text-[10px] font-black uppercase tracking-widest text-green-700 py-2 active:opacity-70"
                  >
                    View all saved ideas
                  </Link>
                )}
              </>
            )}
          </div>
        </details>

        <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
            Visual previews are for inspiration only. Confirm plant suitability, mature size,
            and spacing before planting.
          </p>
        </div>
      </div>
    </main>
  )
}

export default function VisualisePage() {
  return (
    <Suspense>
      <VisualisePageInner />
    </Suspense>
  )
}
