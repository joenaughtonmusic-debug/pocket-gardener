'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from '../../components/Navigation'

const getSupabase = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  )
}

export default function AboutPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    const supabase = getSupabase()

    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserEmail(user.email ?? null)
          
          // Check Pro Status for the Manage button
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_pro')
            .eq('id', user.id)
            .single()
          
          if (profile) setIsPro(profile.is_pro)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    getUserData()
  }, [])

  const handleSignOut = async () => {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // NEW: Handle redirection to Stripe Customer Portal
  const handleManageSubscription = async () => {
    try {
      setPortalLoading(true)
      const response = await fetch('/api/portal', { method: 'POST' })
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Could not find an active subscription session.")
      }
    } catch (err) {
      console.error(err)
      alert("Error connecting to billing portal.")
    } finally {
      setPortalLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white pb-40 text-gray-900">
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
        
        {/* 1. MEMBERSHIP STATUS & PORTAL */}
        <section>
          <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-1">Subscription</h2>
          <div className="bg-gray-50 p-7 rounded-[2.5rem] border border-gray-100">
            {loading ? (
              <div className="h-4 w-32 bg-gray-200 animate-pulse mx-auto rounded"></div>
            ) : (
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Current Plan</p>
                <p className="text-sm font-bold text-green-900 mb-6">{isPro ? "🌿 Pro Plan" : "Standard Plan"}</p>
                
                {isPro && (
                  <button 
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="w-full py-4 rounded-2xl bg-[#2d5a3f] text-white font-black uppercase tracking-widest text-[9px] shadow-md active:scale-95 transition-all disabled:opacity-50"
                  >
                    {portalLoading ? "Loading Portal..." : "Manage or Cancel Subscription"}
                  </button>
                )}
                {!isPro && (
                   <p className="text-[10px] text-gray-400 italic">Upgrade on your dashboard to unlock all features.</p>
                )}
              </div>
            )}
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

        {/* 3. SIGN OUT (MOVED TO BOTTOM) */}
        <section className="pt-4">
          <div className="px-1 mb-4 flex justify-between items-center">
             <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Account</h2>
             {userEmail && <span className="text-[9px] font-bold text-gray-400 lowercase italic">{userEmail}</span>}
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full py-4 rounded-2xl bg-white text-red-500 border border-red-100 font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 transition-all"
          >
            Sign Out
          </button>
        </section>

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