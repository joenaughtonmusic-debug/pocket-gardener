export const dynamic = 'force-dynamic'
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // In a real app, you'd verify the session_id with your API here
    if (sessionId) {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#f8fbf9] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">🌿</span>
        </div>

        <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em] mb-2 block">Payment Received</span>
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic mb-4">Welcome!</h1>
        
        <p className="text-[13px] text-gray-500 font-medium italic mb-10 leading-relaxed">
          Your garden limits have been lifted. You now have full access to the Plant Identifier, Garden Builder, and all Expert Guides.
        </p>

        <div className="space-y-3">
          <Link 
            href="/dashboard" 
            className="block w-full bg-green-900 text-white font-black uppercase tracking-widest py-4 rounded-full shadow-lg active:scale-95 transition-transform text-[11px]"
          >
            Back to My Garden
          </Link>
          
          <Link 
            href="/builder" 
            className="block w-full bg-white text-green-900 border border-green-100 font-black uppercase tracking-widest py-4 rounded-full active:scale-95 transition-transform text-[11px]"
          >
            Try Garden Builder →
          </Link>
        </div>

        <p className="mt-8 text-[9px] text-gray-300 font-bold uppercase tracking-widest">
          A receipt has been sent to your email.
        </p>
      </div>
    </main>
  );
}