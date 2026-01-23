'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from '../../components/Navigation'

// MOVE THIS OUTSIDE THE COMPONENT
// We provide an empty string fallback so the build doesn't crash if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export default function AboutPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserEmail(user.email ?? null)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, []) // Removed supabase from dependency array as it is now a stable constant outside the component

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-white pb-40 text-gray-900">
      {/* PROFILE HEADER */}
      <div className="h-[35vh] bg-[#2d5a3f] relative flex items-end justify-center pb-10">
        <button 
          onClick={() => router.back()} 
          className="absolute top-12 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold active:scale-90 transition-transform z-20"
        >
          ←
        </button>
        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-white rounded-[2rem] mx-auto mb-4 flex items-center justify-center text-4xl shadow-2xl">
            🧑‍🌾
          </div>
          <h1 className="text-xl font-black text-white tracking-tight uppercase tracking-[0.1em]">The Pocket Gardener</h1>
        </div>
      </div>

      <div className="px-8 pt-10 space-y-10">
        
        {/* 1. ACCOUNT & SIGN OUT (MOVED TO TOP) */}
        <section>
          <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-1">Your Account</h2>
          <div className="bg-gray-50 p-7 rounded-[2.5rem] border border-gray-100 text-center">
            {loading ? (
              <div className="h-4 w-32 bg-gray-200 animate-pulse mx-auto rounded mb-4"></div>
            ) : userEmail ? (
              <div className="mb-6">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Signed in as</p>
                <p className="text-sm font-bold text-green-900 break-all">{userEmail}</p>
              </div>
            ) : (
              <p className="text-xs font-bold text-gray-400 mb-6 italic">Guest Mode</p>
            )}

            <button 
              onClick={handleSignOut}
              className="w-full py-4 rounded-2xl bg-white text-red-500 border border-red-100 font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 transition-all"
            >
              Sign Out
            </button>
          </div>
        </section>

        {/* 2. MISSION STATEMENT */}
        <section>
          <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-1">The Mission</h2>
          <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[13px] text-gray-600 leading-relaxed font-medium italic">
              "To help Aucklanders master their backyards through local, month-by-month advice and simple digital tools."
            </p>
          </div>
        </section>

        {/* VERSION INFO */}
        <footer className="pt-4 text-center">
          <p className="text-[8px] font-black text-gray-200 uppercase tracking-[0.4em]">
            v1.0 • Pocket Gardener NZ
          </p>
        </footer>
      </div>

      <Navigation />
    </main>
  )
}