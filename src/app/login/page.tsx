'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from '../../components/Navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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

    if (error) setMessage(`Error: ${error.message}`)
    else setMessage('Check your email for the magic link!')
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f8fbf9] flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-md bg-white p-12 rounded-[3.5rem] shadow-xl shadow-green-900/5 text-center">
        <div className="text-5xl mb-8">🌿</div>
        <h1 className="text-3xl font-black text-green-900 mb-2 tracking-tight">Pocket Gardener</h1>
        <p className="text-gray-400 text-sm mb-10 font-medium">Sign in to save your Auckland garden</p>
        
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

        {message && (
          <p className={`mt-6 text-xs font-bold p-4 rounded-2xl ${message.includes('Error') ? 'text-red-500 bg-red-50' : 'text-green-700 bg-green-50'}`}>
            {message}
          </p>
        )}
      </div>
      <Navigation />
    </main>
  )
}