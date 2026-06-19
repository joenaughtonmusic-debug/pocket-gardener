'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

// Custom URI scheme registered in AndroidManifest.xml.
// Android intercepts this without needing assetlinks.json verification.
const NATIVE_REDIRECT = 'com.pocketgardener.app://auth/callback'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isNative, setIsNative] = useState(false)
  const router = useRouter()

  const supabase = useMemo(
    () =>
      createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ),
    []
  )

  // ── Native setup: platform detection + deep-link auth handler ────────────────
  //
  // Two auth path problems in Android WebView:
  //   1. Google OAuth → blocked (disallowed_useragent). Button is hidden below.
  //   2. Magic-link HTTPS callback → App Links open the app but Capacitor fires
  //      appUrlOpen and nothing handles it, so the session is never set.
  //
  // Fix for (2): on native we send redirectTo=NATIVE_REDIRECT (custom scheme).
  // Android routes com.pocketgardener.app:// back into the app without needing
  // assetlinks.json verification. We then exchange the code client-side here.
  //
  // The handler also catches HTTPS App-Links callbacks (e.g. old links already
  // sent with the web URL) because appUrlOpen fires for both schemes.
  useEffect(() => {
    let removeListener: (() => void) | undefined

    async function setupNative() {
      try {
        const { Capacitor } = await import('@capacitor/core')
        if (!Capacitor.isNativePlatform()) return

        setIsNative(true)

        const { App } = await import('@capacitor/app')

        // Exchange a PKCE code (or implicit hash tokens) for a live session.
        // Uses the browser client so the code_verifier stored in WebView
        // localStorage by signInWithOtp() is still reachable here.
        async function processAuthUrl(url: string) {
          try {
            const parsed = new URL(url)
            if (!parsed.pathname.includes('/auth/callback')) return

            const code = parsed.searchParams.get('code')
            if (code) {
              const { error } = await supabase.auth.exchangeCodeForSession(code)
              if (!error) {
                router.push('/dashboard')
              } else {
                console.error('❌ exchangeCodeForSession error:', error.message)
                setMessage(`Login failed: ${error.message}`)
              }
              return
            }

            // Fallback: implicit flow sends tokens in the hash fragment.
            const hash = new URLSearchParams(parsed.hash.slice(1))
            const accessToken = hash.get('access_token')
            const refreshToken = hash.get('refresh_token')
            if (accessToken && refreshToken) {
              const { error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              })
              if (!error) {
                router.push('/dashboard')
              } else {
                console.error('❌ setSession error:', error.message)
                setMessage(`Login failed: ${error.message}`)
              }
            }
          } catch (err) {
            console.error('❌ processAuthUrl error:', err)
          }
        }

        // Cold start: app was not running when the magic link was tapped.
        // getLaunchUrl() returns the URL that caused Android to open the app.
        const launch = await App.getLaunchUrl()
        if (launch?.url) {
          await processAuthUrl(launch.url)
        }

        // Warm start: app was already running (on this login page).
        // appUrlOpen fires when Android routes a matching URL into a running app.
        const listener = await App.addListener('appUrlOpen', ({ url }) => {
          processAuthUrl(url)
        })

        removeListener = () => listener.remove()
      } catch (err) {
        console.error('❌ Native setup error (non-fatal):', err)
      }
    }

    setupNative()

    return () => {
      removeListener?.()
    }
  }, [supabase, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Native: redirect to custom scheme so Android can intercept it without
    // relying on App Links / assetlinks.json being fully verified.
    // Web: standard HTTPS callback handled server-side by /auth/callback.
    const emailRedirectTo = isNative
      ? NATIVE_REDIRECT
      : `${window.location.origin}/auth/callback`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo },
    })

    if (error) {
      console.error('❌ Login Error:', error.message)
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Check your email! Your Magic Link is on the way.')
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) console.error('❌ Google Error:', error.message)
  }

  return (
    <main className="min-h-screen bg-[#f8fbf9] flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-md bg-white p-12 rounded-[3.5rem] shadow-xl shadow-green-900/5 text-center">
        {/* Branding */}
        <div className="text-5xl mb-8">🌿</div>
        <h1 className="text-3xl font-black text-green-900 mb-2 tracking-tight">Pocket Gardener</h1>
        <p className="text-gray-400 text-sm mb-10 font-medium italic">Save your Auckland garden</p>

        {/* Magic Link Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full px-6 py-5 rounded-[1.5rem] border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all text-sm font-medium text-gray-700"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="w-full bg-[#2d5a3f] hover:bg-[#254b34] text-white font-bold py-5 rounded-[1.5rem] uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending link...' : 'Get Magic Link'}
          </button>
        </form>

        {/* Google login — hidden on Capacitor native (disallowed_useragent in WebView) */}
        {!isNative && (
          <>
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-300 italic bg-white px-4">
                or
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full bg-white border border-gray-100 hover:border-green-200 text-gray-700 font-bold py-5 rounded-[1.5rem] uppercase tracking-widest text-[11px] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>
          </>
        )}

        {/* Feedback Message */}
        {message && (
          <p className={`mt-6 text-xs font-bold p-4 rounded-2xl animate-pulse ${
            message.includes('Error') || message.includes('failed')
              ? 'text-red-500 bg-red-50'
              : 'text-green-700 bg-green-50'
          }`}>
            {message}
          </p>
        )}
      </div>

      <p className="mt-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
        Designed for Auckland Gardeners
      </p>
    </main>
  )
}
