'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

const getSupabase = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  )
}

// Opens a URL in Chrome Custom Tabs on Android (Capacitor native) so that
// Stripe Billing Portal runs in a real browser, not inside the WebView.
// On web the normal window.location redirect is used unchanged.
async function openUrl(url: string): Promise<void> {
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.isNativePlatform()) {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url, presentationStyle: 'fullscreen' });
      return;
    }
  } catch {
    // Not a Capacitor environment — fall through to web redirect.
  }
  window.location.href = url;
}

export default function AboutPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isPro, setIsPro] = useState(false)
  const [proExpiresAt, setProExpiresAt] = useState<string | null>(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('free')
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    const supabase = getSupabase()

    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserEmail(user.email ?? null)

          const { data: profile } = await supabase
            .from('profiles')
            .select('is_pro, pro_expires_at, subscription_status')
            .eq('id', user.id)
            .single()

          if (profile) {
            setIsPro(profile.is_pro)
            setProExpiresAt(profile.pro_expires_at ?? null)
            setSubscriptionStatus(profile.subscription_status ?? 'free')
          }
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

  const handleDeleteAccount = async () => {
    if (!window.confirm(
      'Delete your Pocket Gardener account permanently? This cannot be undone.',
    )) return

    setDeleteLoading(true)
    try {
      const res = await fetch('/api/account/delete', { method: 'POST' })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        alert(json.error || 'Could not delete account. Please email support.')
        return
      }
      const supabase = getSupabase()
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      setPortalLoading(true)
      const response = await fetch('/api/portal', { method: 'POST' })
      const data = await response.json()

      if (data.url) {
        await openUrl(data.url)
      } else {
        alert('Could not find an active subscription session.')
      }
    } catch (err) {
      console.error(err)
      alert('Error connecting to billing portal.')
    } finally {
      setPortalLoading(false)
    }
  }

  const planLabel = () => {
    if (!isPro) return 'Standard Plan'
    if (subscriptionStatus === 'canceled') return '🌿 Pro Plan (cancels at period end)'
    if (subscriptionStatus === 'past_due') return '🌿 Pro Plan (payment issue)'
    return '🌿 Pro Plan'
  }

  const expiresLabel = () => {
    if (!proExpiresAt) return null
    const date = new Date(proExpiresAt).toLocaleDateString('en-NZ', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
    if (subscriptionStatus === 'canceled') return `Access until ${date}`
    if (isPro) return `Renews ${date}`
    return null
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
          <div className="w-20 h-20 bg-white rounded-[2rem] mx-auto mb-4 flex items-center justify-center border-2 border-white/50 shadow-2xl overflow-hidden">
            <img
              src="/pglogo.png"
              alt="Pocket Gardener Logo"
              className="w-14 h-14 object-contain"
            />
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
              <div className="h-4 w-32 bg-gray-200 animate-pulse mx-auto rounded" />
            ) : (
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Current Plan</p>
                <p className="text-sm font-bold text-green-900 mb-1">{planLabel()}</p>
                {expiresLabel() && (
                  <p className="text-[10px] text-gray-400 font-medium mb-6">{expiresLabel()}</p>
                )}
                {!expiresLabel() && <div className="mb-6" />}

                {subscriptionStatus === 'past_due' && (
                  <p className="text-[10px] text-red-500 font-bold mb-4 bg-red-50 rounded-2xl px-4 py-2">
                    There was an issue with your last payment. Please update your details below.
                  </p>
                )}

                {isPro && (
                  <button
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="w-full py-4 rounded-2xl bg-[#2d5a3f] text-white font-black uppercase tracking-widest text-[9px] shadow-md active:scale-95 transition-all disabled:opacity-50"
                  >
                    {portalLoading ? 'Loading Portal...' : 'Manage or Cancel Subscription'}
                  </button>
                )}
                {!isPro && (
                  <Link
                    href="/dashboard#pro-upgrade"
                    className="block w-full py-4 rounded-2xl bg-amber-400 text-green-950 font-black uppercase tracking-widest text-[9px] shadow-md active:scale-95 transition-all text-center"
                  >
                    Upgrade to Pro
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 2. MISSION STATEMENT */}
        <section>
          <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-1">What We Do</h2>
          <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
            <p className="text-[13px] text-gray-600 leading-relaxed font-medium italic">
              "Pocket Gardener helps everyday homeowners plan, improve, and maintain their garden — even if they don't know where to start."
            </p>
            <p className="text-[12px] text-gray-400 leading-relaxed font-medium">
              Whether you have a bare section, an overgrown backyard, or an established garden that needs attention, Pocket Gardener gives you a clear, month-by-month plan built around your actual plants and Auckland's seasons.
            </p>
          </div>
        </section>

        {/* 3. ACCOUNT */}
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
          <button
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
            className="w-full mt-3 py-4 rounded-2xl bg-white text-gray-500 border border-gray-100 font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 transition-all disabled:opacity-50"
          >
            {deleteLoading ? 'Deleting…' : 'Delete Account'}
          </button>
          <p className="text-[10px] text-gray-400 font-medium text-center mt-3 leading-relaxed">
            Account deletion removes your profile and garden data. See our{' '}
            <Link href="/privacy" className="text-green-700 underline">privacy policy</Link>.
          </p>
        </section>

        <footer className="pt-4 text-center">
          <p className="text-[8px] font-black text-gray-200 uppercase tracking-[0.4em]">
            v1.0 • Pocket Gardener NZ
          </p>
        </footer>
      </div>
    </main>
  )
}
