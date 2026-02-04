'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Check, X } from 'lucide-react'

export default function TaskBadge({ taskName, actionIcon, onComplete }: any) {
  const [status, setStatus] = useState<'idle' | 'animating' | 'completed'>('idle')
  const [showPhoto, setShowPhoto] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const handleStart = () => {
    setStatus('animating')
    setTimeout(() => {
      setStatus('completed')
      if (onComplete) onComplete()
    }, 1500)
  }

  if (status === 'completed') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/50 border border-white p-3 px-6 rounded-full flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-700 p-1 rounded-full"><Check size={12} strokeWidth={4}/></span>
          <span className="text-[11px] font-black uppercase text-green-950 tracking-tight">{taskName}</span>
        </div>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Just now</span>
      </motion.div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border-2 border-white shadow-xl relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-black text-green-950 uppercase tracking-tighter leading-none">{taskName}</h3>
          <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mt-2">Ready to log</p>
        </div>
        
        <button 
          onClick={() => setShowPhoto(!showPhoto)}
          className={`p-3 rounded-2xl transition-all ${showPhoto ? 'bg-amber-400 text-green-950' : 'bg-green-50 text-green-700'}`}
        >
          <Camera size={18} strokeWidth={3} />
        </button>
      </div>

      {showPhoto && !image && (
        <div className="mb-4 p-4 border-2 border-dashed border-green-100 rounded-2xl flex flex-col items-center">
            <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id={`file-${taskName}`} 
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if(file) setImage(URL.createObjectURL(file));
                }}
            />
            <label htmlFor={`file-${taskName}`} className="text-[9px] font-black uppercase text-green-700 cursor-pointer">
                + Add Progress Photo
            </label>
        </div>
      )}

      {image && (
        <div className="relative w-full h-32 mb-4 rounded-2xl overflow-hidden border-2 border-white shadow-inner">
            <img src={image} className="w-full h-full object-cover" />
            <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"><X size={12}/></button>
        </div>
      )}

      {/* The Hedge Trimmer Animation Area */}
      <div className="relative h-6 bg-green-950 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ left: "-10%" }}
          animate={status === 'animating' ? { left: "100%" } : { left: "-10%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 text-xl z-10"
        >
          {actionIcon}
        </motion.div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={status === 'animating' ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-green-400/40"
        />
      </div>

      <button 
        onClick={handleStart}
        disabled={status === 'animating'}
        className="w-full mt-4 bg-green-800 py-4 rounded-2xl text-[11px] font-black uppercase text-white shadow-lg active:scale-95 transition-all disabled:opacity-50"
      >
        {status === 'animating' ? 'Working...' : 'Log Activity'}
      </button>
    </div>
  )
}