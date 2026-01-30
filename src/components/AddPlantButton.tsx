'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function AddPlantButton({ plantId }: { plantId: number }) {
  const [loading, setLoading] = useState<'owned' | 'project' | null>(null)
  const [isAdded, setIsAdded] = useState(false)
  const [checking, setChecking] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function checkExisting() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data } = await supabase
          .from('user_plants')
          .select('id')
          .eq('user_id', session.user.id)
          .eq('plant_id', plantId)
          .maybeSingle()

        if (data) setIsAdded(true)
      }
      setChecking(false)
    }
    checkExisting()
  }, [plantId, supabase])

  async function handleAdd(isProject: boolean) {
    setLoading(isProject ? 'project' : 'owned')
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      alert("Please log in to add plants!")
      setLoading(null)
      return
    }

    // --- NEW: LIMIT CHECK START ---
    // 1. Fetch the user's profile to see if they are PRO
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', session.user.id)
      .single();

    // 2. If not Pro, count their current entries (including projects)
    if (!profile?.is_pro) {
      const { count } = await supabase
        .from('user_plants')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      if (count !== null && count >= 3) {
        alert("🌿 Garden limit reached! Free accounts can only track 3 plants. Upgrade to Pro for unlimited garden space!");
        setLoading(null);
        return; // Stop the process here
      }
    }
    // --- NEW: LIMIT CHECK END ---

    const { error } = await supabase
      .from('user_plants')
      .insert([{ 
        user_id: session.user.id, 
        plant_id: plantId,
        is_project: isProject 
      }])

    if (!error) {
      setIsAdded(true)
    } else {
      alert("Error: " + error.message)
    }
    setLoading(null)
  }

  if (checking) return <div className="w-full h-[70px] bg-gray-50 animate-pulse rounded-[2.5rem]" />

  // IF ALREADY ADDED: Show confirmation
  if (isAdded) {
    return (
      <div className="w-full bg-[#f1f9f4] border border-green-100 py-6 rounded-[2.5rem] flex items-center justify-center gap-3">
        <span className="text-green-600 font-bold">✓</span>
        <span className="text-[11px] font-black text-green-800 uppercase tracking-[0.2em]">In Your Garden</span>
      </div>
    )
  }

  // IF NOT ADDED: Show two options
  return (
    <div className="space-y-4">
      <button 
        onClick={() => handleAdd(false)}
        disabled={loading !== null}
        className="w-full bg-[#2d5a3f] text-white py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-green-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {loading === 'owned' ? 'Adding...' : '+ Add to My Garden'}
      </button>

      <div className="flex items-center justify-center gap-4">
        <div className="h-px bg-gray-100 flex-grow"></div>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">or</span>
        <div className="h-px bg-gray-100 flex-grow"></div>
      </div>

      <button 
        onClick={() => handleAdd(true)}
        disabled={loading !== null}
        className="w-full bg-white border border-gray-100 text-gray-400 py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[11px] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {loading === 'project' ? 'Saving...' : '☆ Future Project'}
      </button>
    </div>
  )
}