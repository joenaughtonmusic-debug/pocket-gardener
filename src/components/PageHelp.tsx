'use client'

import { useState } from 'react'

interface PageHelpProps {
  title: string;
  description: string;
  bullets?: string[];
  example?: string;
}

export default function PageHelp({ title, description, bullets, example }: PageHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-6 h-6 rounded-full border border-green-200 flex items-center justify-center text-green-600 text-[10px] font-black hover:bg-green-50 transition-colors shadow-sm"
      >
        i
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-green-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-black text-green-900 uppercase italic tracking-tighter mb-4">
              {title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 font-medium">
              {description}
            </p>
            
            {bullets && (
              <ul className="space-y-2 mb-4">
                {bullets.map((b, i) => (
                  <li key={i} className="text-[11px] text-gray-500 flex gap-2 items-start">
                    <span className="text-green-500">•</span> {b}
                  </li>
                ))}
              </ul>
            )}

            {example && (
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100 mb-6">
                <p className="text-[10px] text-green-800 font-bold uppercase tracking-widest mb-1">Example</p>
                <p className="text-[11px] text-green-700 italic leading-relaxed">{example}</p>
              </div>
            )}

            <button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-green-900 text-white py-4 rounded-full font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </>
  )
}