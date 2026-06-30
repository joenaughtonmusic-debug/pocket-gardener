'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import {
  isAtFreePlantLimit,
  PLANT_LIMIT_MESSAGE,
} from '../lib/pro/plantLimit'

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

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', user.id)
      .single()

    if (!profile?.is_pro) {
      const { count } = await supabase
        .from('user_plants')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_project', false)

      if (isAtFreePlantLimit(count, false)) {
        alert(`${PLANT_LIMIT_MESSAGE} Visit Dashboard → Pro to upgrade.`)
        setAdding(false)
        return
      }
    }

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