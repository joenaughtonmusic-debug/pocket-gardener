'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

// Custom URI scheme registered in AndroidManifest.xml.
// Android intercepts this without needing assetlinks.json verification.
const NATIVE_REDIRECT = 'com.pocketgardener.app://auth/callback'

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#f8fbf9] flex items-center justify-center">
        <p className="text-sm font-bold text-gray-400">Loading…</p>
      </main>
    }>
      <LoginPageContent />
    </Suspense>
  )
}

function LoginPageContent() {
  const searchParams = useSearchParams()
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
  useEffect(() => {
    let removeListener: (() => void) | undefined

    async function setupNative() {
      try {
        const { Capacitor } = await import('@capacitor/core')
        console.log('[PG-AUTH] isNativePlatform:', Capacitor.isNativePlatform())
        if (!Capacitor.isNativePlatform()) return

        setIsNative(true)
        console.log('[PG-AUTH] Native detected — registering deep-link handler')

        const { App } = await import('@capacitor/app')

        // ── processAuthUrl ────────────────────────────────────────────────────
        // BUG NOTE: for custom-scheme URLs (com.pocketgardener.app://auth/callback)
        // the URL constructor sets host="auth" and pathname="/callback".
        // We therefore check the raw url string, not parsed.pathname, so the
        // guard works for both the custom scheme and the HTTPS App-Links path.
        async function processAuthUrl(url: string) {
          console.log('[PG-AUTH] processAuthUrl — raw url:', url)
          try {
            // ── Guard: only handle auth callback URLs ────────────────────────
            if (!url.includes('/auth/callback')) {
              console.warn('[PG-AUTH] URL does not contain /auth/callback — ignoring:', url)
              return
            }

            let parsed: URL
            try {
              parsed = new URL(url)
            } catch (parseErr) {
              console.error('[PG-AUTH] URL parse failed:', parseErr, '— raw url:', url)
              setMessage('Login failed: could not parse callback URL')
              return
            }

            console.log('[PG-AUTH] parsed — scheme:', parsed.protocol,
              '| host:', parsed.hostname,
              '| pathname:', parsed.pathname,
              '| search:', parsed.search,
              '| hash:', parsed.hash ? '(present)' : '(none)')

            // ── PKCE code exchange ───────────────────────────────────────────
            const code = parsed.searchParams.get('code')
            console.log('[PG-AUTH] code present:', !!code)

            if (code) {
              console.log('[PG-AUTH] calling exchangeCodeForSession...')
              const { data, error } = await supabase.auth.exchangeCodeForSession(code)
              if (error) {
                console.error('[PG-AUTH] exchangeCodeForSession error:', error.message, '| code:', error.code)
                setMessage(`Login failed: ${error.message}`)
              } else {
                console.log('[PG-AUTH] exchangeCodeForSession success — user:', data.user?.email)
                console.log('[PG-AUTH] calling router.push(/dashboard)')
                router.push('/dashboard')
              }
              return
            }

            // ── Implicit flow fallback (hash fragment tokens) ────────────────
            const hash = new URLSearchParams(parsed.hash.slice(1))
            const accessToken = hash.get('access_token')
            const refreshToken = hash.get('refresh_token')
            console.log('[PG-AUTH] hash token present:', !!accessToken)

            if (accessToken && refreshToken) {
              console.log('[PG-AUTH] calling setSession (implicit flow)...')
              const { error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              })
              if (error) {
                console.error('[PG-AUTH] setSession error:', error.message)
                setMessage(`Login failed: ${error.message}`)
              } else {
                console.log('[PG-AUTH] setSession success — calling router.push(/dashboard)')
                router.push('/dashboard')
              }
              return
            }

            // Neither code nor hash tokens found.
            console.warn('[PG-AUTH] no code and no hash tokens in callback URL')
            setMessage('Login failed: callback URL had no auth tokens')
          } catch (err: any) {
            console.error('[PG-AUTH] processAuthUrl unexpected error:', err?.message ?? err)
            setMessage(`Login failed: ${err?.message ?? 'unexpected error'}`)
          }
        }

        // ── Cold start ───────────────────────────────────────────────────────
        // App was not running when the magic link was tapped.
        // getLaunchUrl() returns the URL that caused Android to open the app.
        const launch = await App.getLaunchUrl()
        console.log('[PG-AUTH] getLaunchUrl result:', launch?.url ?? '(null)')
        if (launch?.url) {
          await processAuthUrl(launch.url)
        }

        // ── Warm start ───────────────────────────────────────────────────────
        // App was already running (user is on the login page waiting).
        // appUrlOpen fires when Android routes a matching URL into the app.
        const listener = await App.addListener('appUrlOpen', ({ url }) => {
          console.log('[PG-AUTH] appUrlOpen fired — url:', url)
          processAuthUrl(url)
        })

        console.log('[PG-AUTH] appUrlOpen listener registered')
        removeListener = () => listener.remove()
      } catch (err: any) {
        console.error('[PG-AUTH] setupNative error (non-fatal):', err?.message ?? err)
      }
    }

    setupNative()

    return () => {
      removeListener?.()
    }
  }, [supabase, router])

  useEffect(() => {
    if (searchParams.get('error') === 'auth_failed') {
      setMessage('Sign-in failed. Please try again or use a magic link.')
    }
  }, [searchParams])

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

    console.log('[PG-AUTH] signInWithOtp — isNative:', isNative, '| emailRedirectTo:', emailRedirectTo)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo },
    })

    if (error) {
      console.error('[PG-AUTH] signInWithOtp error:', error.message)
      setMessage(`Error: ${error.message}`)
    } else {
      console.log('[PG-AUTH] signInWithOtp OK — magic link sent')
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
    if (error) {
      console.error('❌ Google Error:', error.message)
      setMessage('Google sign-in failed. Please try again or use a magic link.')
    }
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
