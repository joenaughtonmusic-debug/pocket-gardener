'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function QuickAddButton({ plantId, plantName }: { plantId: number, plantName: string }) {
  const [adding, setAdding] = useState(false)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() 
    
    setAdding(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Please sign in to add plants!")
      setAdding(false)
      return
    }

    // --- NEW: LIMIT CHECK START ---
    // 1. Check if the user is PRO
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', user.id)
      .single();

    // 2. If not Pro, count their current plants
    if (!profile?.is_pro) {
      const { count, error: countError } = await supabase
        .from('user_plants')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (count !== null && count >= 3) {
        alert("🌿 Garden Full! Free accounts are limited to 3 plants. Upgrade to Pro for unlimited garden space!");
        setAdding(false)
        return; // Stop here!
      }
    }
    // --- NEW: LIMIT CHECK END ---

    const { error } = await supabase
      .from('user_plants')
      .insert([{ 
        user_id: user.id, 
        plant_id: plantId, 
        is_project: false, 
        status: 'Ongoing' 
      }])

    if (!error) {
      alert(`Added ${plantName} to your garden! 🌿`)
    } else {
      console.error("Error adding plant:", error.message)
    }
    
    setAdding(false)
  }

  return (
    <button 
      onClick={handleQuickAdd}
      disabled={adding}
      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${
        adding ? 'bg-gray-100' : 'bg-green-50 text-green-700 hover:bg-green-100'
      }`}
    >
      <span className="text-xl font-black">{adding ? '...' : '+'}</span>
    </button>
  )
}