'use client';

import { useState } from 'react';

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // 1. Call your internal Next.js API route
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // 2. Redirect to the Stripe URL provided by your API
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error: any) {
      console.error('Stripe Error:', error);
      alert(error.message || 'Something went wrong with the payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-[#2d5a3f] hover:bg-[#1e3d2a] text-white font-bold uppercase tracking-[0.1em] py-3 px-6 rounded-full shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-[11px]"
    >
      {loading ? (
        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          <span>🌿</span>
          <span>Upgrade to Pro ($7.99 per month)</span>
        </>
      )}
    </button>
  );
}