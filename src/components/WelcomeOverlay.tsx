'use client'

import React, { useLayoutEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hasPendingNotificationPath, storePendingNotificationPath } from '../lib/notificationPath'

const GARDEN_AREAS_IMAGE =
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/plants/IMG20260129134358.jpg'

const VISUALISE_PREVIEW_IMAGE =
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20small.png'

function SlideImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="mx-auto h-40 w-full max-w-[220px] rounded-2xl object-cover shadow-lg ring-2 ring-white/20"
    />
  )
}

type Slide = {
  title: string
  desc: string
  icon?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
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

  const slides: Slide[] = [
    {
      title: "Your Garden, Sorted",
      desc: "Whether you're starting from scratch or keeping an established garden going, Pocket Gardener gives you a clear monthly plan — built around your plants and the seasons.",
      icon: "🏡",
    },
    {
      title: "Plan Your Garden Areas",
      desc: "Create areas like Front Garden, Back Fence, Patio Pots or Veggie Patch. Add plants now, or come back later when you're ready.",
      imageSrc: GARDEN_AREAS_IMAGE,
      imageAlt: "A home garden with planted borders and lawn",
    },
    {
      title: "Visualise",
      desc: "Take photos of your space and add plants to see how your garden could look, compare ideas, and get inspiration for different areas.",
      imageSrc: VISUALISE_PREVIEW_IMAGE,
      imageAlt: "Garden photo with plants added in the visualiser preview",
    },
    {
      title: "Local Guides",
      desc: "Practical help with weeds, pests, feeding, and what to plant this month — written for real home gardens, not a gardening textbook.",
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

  const slide = slides[currentSlide];

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
          className="max-w-xs relative z-10 px-1"
        >
          <div className="mb-8 flex items-center justify-center">
            {slide.imageSrc ? (
              <SlideImage src={slide.imageSrc} alt={slide.imageAlt ?? slide.title} />
            ) : (
              <div
                className="drop-shadow-2xl"
                style={{ fontSize: typeof slide.icon === 'string' ? '6rem' : undefined }}
              >
                {slide.icon}
              </div>
            )}
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-4">
            {slide.title}
          </h2>
          <p className="text-green-100/80 font-medium leading-relaxed text-sm px-1">
            {slide.desc}
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
