'use client';

import { useState } from 'react';
import { trackEvent } from '../lib/analytics/trackEvent'

// Opens a URL in Chrome Custom Tabs on Android (Capacitor native) so that
// Stripe Checkout runs in a real browser process, not inside the WebView.
// On web the normal window.location redirect is used unchanged.
async function openUrl(url: string): Promise<void> {
  try {
    // Dynamic import keeps @capacitor/browser out of the web bundle entirely;
    // it only resolves when running inside a Capacitor native context.
    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.isNativePlatform()) {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url, presentationStyle: 'fullscreen' });
      return;
    }
  } catch {
    // Not a Capacitor environment — fall through to web redirect.
  }
  window.location.href = url;
}

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    trackEvent('upgrade_clicked', { source: 'upgrade_button' })
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        await openUrl(data.url);
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
          <span>Upgrade to Pro ($12.99 per month)</span>
        </>
      )}
    </button>
  );
}
