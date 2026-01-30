'use client'

import { createBrowserClient } from '@supabase/ssr'

export default function GoogleSignIn() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // This ensures the user comes back to your site after Google says OK
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Login error:', error.message)
      alert('Error: ' + error.message)
    }
  }

  return (
    <button 
      onClick={handleLogin}
      className="flex items-center justify-center gap-3 w-full bg-white border border-gray-200 p-4 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95"
    >
      <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google logo" 
        className="w-5 h-5"
      />
      <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">
        Continue with Google
      </span>
    </button>
  )
}