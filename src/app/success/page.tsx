'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// 1. This component handles the logic and UI
function SuccessContent() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#f8fbf9] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl animate-bounce">🌿</span>
        </div>

        <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em] mb-2 block">
          Payment Received
        </span>
        
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic mb-4">
          You're All Set!
        </h1>
        
        <p className="text-[13px] text-gray-500 font-medium italic mb-10 leading-relaxed px-4">
          Your garden limits have been lifted. You now have full access to the Plant Identifier, Garden Builder, and all Expert Guides.
        </p>

        <div className="pt-2">
          <Link 
            href="/dashboard" 
            className="block w-full bg-green-900 text-white font-black uppercase tracking-widest py-5 rounded-[1.5rem] shadow-xl shadow-green-900/20 active:scale-95 transition-all text-[11px]"
          >
            Go to My Garden Dashboard
          </Link>
        </div>

        <p className="mt-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
          Happy Gardening, Auckland
        </p>
        
        <p className="mt-3 text-[8px] text-gray-300 font-bold uppercase tracking-widest">
          A receipt has been sent to your email.
        </p>
      </div>
    </main>
  );
}

// 2. Main page export with Suspense wrapper
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8fbf9] flex items-center justify-center">
        <p className="text-green-900 font-black uppercase tracking-widest text-[11px] animate-pulse">
          Loading Garden Data...
        </p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}