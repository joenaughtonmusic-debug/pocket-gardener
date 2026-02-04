'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ClipboardList, Scissors, Droplets, Save, RotateCcw, ChevronDown, Calendar } from 'lucide-react'
import Navigation from '../../components/Navigation'

// Pre-defined tasks for the "Shelf"
const TASK_LIBRARY = [
  { id: 'trim', label: 'Trimmed Hedges', icon: <Scissors size={14}/> },
  { id: 'water', label: 'Watered', icon: <Droplets size={14}/> },
  { id: 'mow', label: 'Mowed Lawn', icon: '🚜' },
  { id: 'feed', label: 'Fertilized', icon: '🌿' },
]

function LeafConfetti() {
  return (
    <div className="absolute top-1/2 left-0 pointer-events-none z-50">
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 1], x: -40 - Math.random() * 80, y: -20 + Math.random() * 60, rotate: Math.random() * 360 }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08, ease: "easeOut" }}
          className="absolute text-[20px] filter drop-shadow-sm"
        >
          🍃
        </motion.span>
      ))}
    </div>
  )
}

export default function GardenDiary() {
  const [activeTasks, setActiveTasks] = useState<any[]>([])
  const [dailyArchives, setDailyArchives] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  // Fix hydration by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const addToPad = (task: any) => {
    const uniqueId = `${task.id}-${Math.random().toString(36).substr(2, 9)}`;
    setActiveTasks(prev => [...prev, { ...task, id: uniqueId, status: 'ready' }]);
  }

  const completeTask = (taskId: string) => {
    setActiveTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'animating' } : t));
    setTimeout(() => {
        setActiveTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
    }, 2500); 
  }

  const resetToday = () => {
    if (confirm("Clear today's work? This cannot be undone.")) {
      setActiveTasks([]);
    }
  }

  const saveDay = () => {
    if (activeTasks.length === 0) return;
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'short' }),
      tasks: activeTasks.filter(t => t.status === 'completed')
    };

    setDailyArchives(prev => [newEntry, ...prev]);
    setActiveTasks([]);
  }

  // Don't render the dynamic parts until mounted to prevent hydration errors
  const currentDateLabel = mounted ? new Date().toLocaleDateString() : ""

  return (
    <main className="min-h-screen bg-[#f0f4f1] p-4 pb-40 text-gray-900 flex flex-col">
      <header className="mb-6 pt-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-green-950 tracking-tighter italic uppercase leading-none">Diary Pad</h1>
          <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mt-1 min-h-[1em]">
            {mounted && `Session: ${currentDateLabel}`}
          </p>
        </div>
        <div className="flex gap-2">
            <button onClick={resetToday} className="p-2 bg-white rounded-full shadow-sm text-red-400 border border-red-50 active:scale-90 transition-transform"><RotateCcw size={18} /></button>
            <button onClick={saveDay} className="p-2 bg-green-600 rounded-full shadow-md text-white active:scale-90 transition-transform"><Save size={18} /></button>
        </div>
      </header>

      <div className="flex gap-4 flex-1">
        <aside className="w-20 flex flex-col gap-3">
          {TASK_LIBRARY.map((task) => (
            <button key={task.id} onClick={() => addToPad(task)} className="bg-white border-2 border-white shadow-sm rounded-2xl p-3 flex flex-col items-center gap-1 active:scale-90 transition-all">
              <span className="text-green-700">{task.icon}</span>
              <span className="text-[7px] font-black uppercase text-center">{task.label}</span>
            </button>
          ))}
        </aside>

        <section className="flex-grow bg-white rounded-[2.5rem] shadow-2xl border-b-8 border-gray-200 p-6 relative overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
            <ClipboardList size={16} className="text-green-800" />
            <span className="text-[10px] font-black uppercase tracking-widest text-green-800">Today's Work</span>
          </div>

          <div className="space-y-4 flex-grow overflow-y-auto">
            <AnimatePresence mode='popLayout'>
              {activeTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="relative p-4 rounded-3xl bg-green-50/50 border border-green-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-black uppercase ${task.status === 'completed' ? 'text-green-500 line-through' : 'text-green-950'}`}>
                      {task.label}
                    </span>
                    <button 
                        disabled={task.status !== 'ready'}
                        onClick={() => completeTask(task.id)}
                        className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${task.status === 'completed' ? 'bg-green-500 border-green-500' : task.status === 'animating' ? 'bg-green-200 border-green-200' : 'bg-white border-gray-200'}`}
                    >
                        {task.status === 'completed' ? <Check size={16} className="text-white" strokeWidth={4} /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                    </button>
                  </div>

                  {task.status === 'animating' && (
                    <div className="relative h-24 mt-2 bg-white rounded-2xl overflow-hidden border border-green-50">
                        <div className="absolute bottom-1 left-0 w-full h-12 z-10 opacity-80" style={{ backgroundImage: 'url("https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/1000_F_202501258_LXa3HAvoZDKfsyZsu4AYML3ltk6QJNuU.jpg")', backgroundRepeat: 'repeat-x', backgroundSize: 'contain', backgroundPosition: 'bottom'}} />
                        <motion.div initial={{ left: "-30%" }} animate={{ left: "110%", rotate: [1, -1, 1] }} transition={{ left: { duration: 2.2, ease: "linear" }, rotate: { repeat: Infinity, duration: 0.1 } }} className="absolute bottom-0 w-24 h-24 z-40 flex items-center justify-center">
                            <img src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/trimmer%20v2.png" alt="Trimmer" className="w-full h-full object-contain" />
                            <LeafConfetti />
                        </motion.div>
                        <motion.div initial={{ width: 0 }} animate={{ width: "105%" }} transition={{ duration: 2.2, ease: "linear" }} className="absolute bottom-1 left-0 h-12 bg-white/40 z-20 mix-blend-overlay" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6">
             <p className="text-[9px] font-black uppercase text-gray-400 mb-2 border-t pt-4 border-dashed">Past Entries</p>
             <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {dailyArchives.map((day) => (
                  <details key={day.id} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                    <summary className="list-none p-3 flex justify-between items-center cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-green-800" />
                        <span className="text-[10px] font-black uppercase text-green-900">{day.date}</span>
                      </div>
                      <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-gray-400" />
                    </summary>
                    <div className="p-3 pt-0 space-y-1">
                      {day.tasks.map((t: any) => (
                        <div key={t.id} className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-2">
                           <div className="w-1 h-1 bg-green-400 rounded-full" /> {t.label}
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
             </div>
          </div>
        </section>
      </div>
      <Navigation />
    </main>
  )
}