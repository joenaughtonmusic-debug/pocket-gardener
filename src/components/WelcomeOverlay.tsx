'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// The new slides content
const slides = [
  { title: "Expert Garden Management", desc: "Track every plant in your Auckland garden.", icon: "🏡" },
  { title: "The Garden Matchmaker", desc: "Match plants to your particular garden areas and conditions.", icon: "📋" },
  { title: "Gardening Guides", desc: "In depth guides for weeds, pests, planting and more", icon: "📖" },
  { title: "Pro Tip", desc: "Look for the 'i' icon at the top of any page for quick help!", icon: "ℹ️" }
]

export default function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Check if they've visited before
    const hasVisited = localStorage.getItem('hasVisitedGardenApp');
    if (!hasVisited) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      // Final slide: save to storage and close
      localStorage.setItem('hasVisitedGardenApp', 'true');
      setIsVisible(false);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-[#2d5a3f] flex flex-col items-center justify-center p-8 text-center text-white">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden text-9xl select-none">
         <div className="absolute -top-10 -left-10 rotate-12">🌿</div>
         <div className="absolute bottom-20 -right-10 -rotate-12">🌳</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-xs relative z-10"
        >
          <div className="text-8xl mb-10 drop-shadow-2xl">{slides[currentSlide].icon}</div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-green-100/80 font-medium leading-relaxed text-sm">
            {slides[currentSlide].desc}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* FOOTER CONTROLS */}
      <div className="absolute bottom-16 w-full px-10 flex flex-col items-center gap-8">
        {/* Progress Dots */}
        <div className="flex gap-2.5">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-10 bg-white' : 'w-2 bg-white/20'
              }`} 
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="w-full py-5 bg-white text-[#2d5a3f] rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-black/20 active:scale-95 transition-all"
        >
          {currentSlide === slides.length - 1 ? "Let's get growing →" : "Next Step"}
        </button>
      </div>
    </div>
  );
}