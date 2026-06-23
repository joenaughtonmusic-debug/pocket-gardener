'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function VisualiseNewRedirectInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const qs = searchParams.toString()
    router.replace(qs ? `/visualise?${qs}` : '/visualise')
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-green-800/20 border-t-green-800 rounded-full animate-spin" />
        <p className="text-green-800 font-black uppercase text-[10px] tracking-widest">Redirecting…</p>
      </div>
    </div>
  )
}

export default function VisualiseNewRedirectPage() {
  return (
    <Suspense>
      <VisualiseNewRedirectInner />
    </Suspense>
  )
}
