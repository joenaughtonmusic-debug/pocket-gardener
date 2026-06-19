'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hasPendingNotificationPath } from '../lib/notificationPath'

export default function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedGardenApp');
    if (hasVisited) {
      console.log('[PG_WELCOME] hasVisited=true — overlay suppressed (returning user)');
      return;
    }

    // window.Capacitor is injected by the native bridge before any JS runs.
    const isNative = !!(window as any).Capacitor?.isNativePlatform?.();
    console.log(`[PG_WELCOME] isNative=${isNative} | hasVisited=${hasVisited}`);

    if (!isNative) {
      console.log('[PG_WELCOME] web — showing overlay immediately');
      setIsVisible(true);
      return;
    }

    // ── IMMEDIATE CHECK (the fix) ─────────────────────────────────────────
    // onPageFinished (MainActivity) writes the key to sessionStorage BEFORE
    // React hydrates. We must snapshot it HERE — synchronously at mount —
    // before useNotificationDeepLink's useEffect (which fires a few ms later
    // as a shallower component) calls consumePendingNotificationPath() and
    // removes the key. If we wait until the 800ms timer to check, the key is
    // already gone and the overlay incorrectly shows.
    const pendingAtMount = hasPendingNotificationPath();
    console.log(`[PG_WELCOME] immediate check — pendingAtMount=${pendingAtMount}`);
    if (pendingAtMount) {
      console.log('[PG_WELCOME] notification tap detected at mount — suppressing overlay');
      return; // useNotificationDeepLink handles navigation
    }

    // ── DELAYED FALLBACK ──────────────────────────────────────────────────
    // Covers the Capacitor pushNotificationActionPerformed replay path, where
    // the key is written asynchronously (~300ms after mount) rather than by
    // the synchronous onPageFinished injection. onPageFinished is the primary
    // path; this timer is the safety net.
    console.log('[PG_WELCOME] no immediate pending path — starting 800ms fallback timer');
    const timer = setTimeout(() => {
      const pendingPath = hasPendingNotificationPath();
      console.log(`[PG_WELCOME] 800ms fallback — hasPendingNotificationPath=${pendingPath}`);
      if (!pendingPath) {
        console.log('[PG_WELCOME] no pending notification — showing overlay');
        setIsVisible(true);
      } else {
        console.log('[PG_WELCOME] pending notification found at 800ms — suppressing overlay');
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const slides = [
    {
      title: "Your Garden, Sorted",
      desc: "Whether you're starting from scratch or keeping an established garden going, Pocket Gardener gives you a clear monthly plan — built around your plants and Auckland's seasons.",
      icon: "🏡",
    },
    {
      title: "Map Out Your Garden",
      desc: "Start by adding the parts of your garden — like Front Boundary, Back Fence, Deck Pots, or Veggie Patch. You can add plants to each area now or come back later.",
      icon: "🗺️",
    },
    {
      title: "Find the Right Plants",
      desc: "Not sure what will grow in your conditions? Set your sun, soil, and slope for each area — and see exactly what thrives in your section.",
      icon: "🌱",
    },
    {
      title: "Local Guides",
      desc: "Practical help with weeds, pests, feeding, and what to plant this month — written for Auckland conditions, not a gardening textbook.",
      icon: "📖",
    },
  ];

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      localStorage.setItem('hasVisitedGardenApp', 'true');
      setIsVisible(false);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-[#2d5a3f] flex flex-col items-center justify-center p-8 text-center text-white">
      {/* DECORATIVE BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden text-9xl select-none">
         <div className="absolute -top-10 -left-10 rotate-12">🌿</div>
         <div className="absolute bottom-20 -right-10 -rotate-12">🌳</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
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

      {/* PROGRESS & BUTTON */}
      <div className="absolute bottom-16 w-full px-10 flex flex-col items-center gap-8">
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
          className="w-full py-5 bg-white text-[#2d5a3f] rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl active:scale-95 transition-all"
        >
          {currentSlide === slides.length - 1 ? "Start Gardening →" : "Next"}
        </button>
      </div>
    </div>
  );
}