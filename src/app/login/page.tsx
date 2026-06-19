'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isNative, setIsNative] = useState(false)

  // Detect Capacitor native at runtime.
  // Google OAuth is blocked inside Android WebView (disallowed_useragent).
  // On native, hide the button entirely — magic link is the primary flow.
  useEffect(() => {
    async function detectNative() {
      try {
        const { Capacitor } = await import('@capacitor/core')
        setIsNative(Capacitor.isNativePlatform())
      } catch {
        // Not a Capacitor environment.
      }
    }
    detectNative()
  }, [])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
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
            message.includes('Error') ? 'text-red-500 bg-red-50' : 'text-green-700 bg-green-50'
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
