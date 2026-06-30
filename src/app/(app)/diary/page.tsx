'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** Diary is not launch-ready — redirect to Garden dashboard. */
export default function GardenDiaryRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard')
  }, [router])

  return (
    <main className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-8">
      <p className="text-sm font-bold text-gray-500">Redirecting to your garden…</p>
    </main>
  )
}
