'use client'

import React, { useLayoutEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hasPendingNotificationPath, storePendingNotificationPath } from '../lib/notificationPath'

function GardenBedIcon() {
  return (
    <svg viewBox="0 0 120 100" width="96" height="80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Soil bed */}
      <rect x="8" y="68" width="104" height="22" rx="6" fill="#6b3f1a" />
      <rect x="8" y="68" width="104" height="8" rx="4" fill="#7d4e24" />
      {/* Centre plant — tall stem + two leaves */}
      <line x1="60" y1="68" x2="60" y2="32" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="47" cy="46" rx="11" ry="7" fill="#22c55e" transform="rotate(-30 47 46)" />
      <ellipse cx="73" cy="40" rx="11" ry="7" fill="#16a34a" transform="rotate(30 73 40)" />
      <ellipse cx="60" cy="30" rx="9" ry="6" fill="#4ade80" />
      {/* Left sprout */}
      <line x1="32" y1="68" x2="30" y2="48" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="24" cy="46" rx="8" ry="5" fill="#22c55e" transform="rotate(-20 24 46)" />
      <ellipse cx="35" cy="42" rx="8" ry="5" fill="#16a34a" transform="rotate(20 35 42)" />
      {/* Right sprout */}
      <line x1="88" y1="68" x2="90" y2="48" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="85" cy="42" rx="8" ry="5" fill="#22c55e" transform="rotate(-20 85 42)" />
      <ellipse cx="96" cy="46" rx="8" ry="5" fill="#16a34a" transform="rotate(20 96 46)" />
    </svg>
  )
}

export default function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // useLayoutEffect fires synchronously after DOM commit, BEFORE the browser
  // paints and BEFORE any useEffect callbacks run (including NotificationNavigator
  // and useNotificationDeepLink). This guarantees the pending-path key is still
  // in sessionStorage when we check — it cannot have been consumed yet.
  useLayoutEffect(() => {
    // Returning user: skip overlay.
    const hasVisited = localStorage.getItem('hasVisitedGardenApp');
    if (hasVisited) return;

    const isNative = !!(window as any).Capacitor?.isNativePlatform?.();
    if (!isNative) {
      setIsVisible(true);
      return;
    }

    // PRIMARY: bootstrap <script> wrote the path to sessionStorage before React
    // loaded. Check it synchronously here — no useEffect can have consumed it
    // yet because useLayoutEffect fires first.
    if (hasPendingNotificationPath()) return;

    // FALLBACK: if the bootstrap script ran before PGNative was registered
    // (unlikely but possible on a very fast cache hit), call the interface
    // directly. getColdStartPath() is a @JavascriptInterface synchronous call
    // that returns the cold-start Intent path immediately.
    const nativePath: string = (window as any).PGNative?.getColdStartPath?.() ?? '';
    if (nativePath) {
      // Write to sessionStorage so NotificationNavigator (useEffect, fires later)
      // can consume it and navigate to the correct route.
      storePendingNotificationPath(nativePath);
      return;
    }

    // No notification in flight — genuine first-time visit.
    setIsVisible(true);
  }, []);

  const slides: { title: string; desc: string; icon: React.ReactNode }[] = [
    {
      title: "Your Garden, Sorted",
      desc: "Whether you're starting from scratch or keeping an established garden going, Pocket Gardener gives you a clear monthly plan — built around your plants and Auckland's seasons.",
      icon: "🏡",
    },
    {
      title: "Map Out Your Garden",
      desc: "Create areas like Front Garden, Back Fence, Patio Pots or Veggie Patch. Add plants now, or come back later when you're ready.",
      icon: <GardenBedIcon />,
    },
    {
      title: "Find the Right Plants",
      desc: "Find plants that suit your garden, then preview them in your own photo.",
      icon: "🖼️",
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
          <div className="mb-10 drop-shadow-2xl flex items-center justify-center" style={{ fontSize: typeof slides[currentSlide].icon === 'string' ? '6rem' : undefined }}>
            {slides[currentSlide].icon}
          </div>
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