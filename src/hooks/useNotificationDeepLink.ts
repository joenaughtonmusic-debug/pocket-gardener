'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { consumePendingNotificationPath } from '../lib/notificationPath';

/**
 * Consumes a pending notification deep-link path stored by the
 * pushNotificationActionPerformed tap handler during cold start.
 *
 * Why the delay:
 *   On cold start, usePushNotifications registers the tap listener after several
 *   async awaits (Capacitor import → permission check → register → addListener).
 *   Capacitor replays the stored tap event at that point and the handler writes
 *   the path to sessionStorage. The delay below gives that entire async chain
 *   time to complete before we check — if the sessionStorage is already populated
 *   (by a previous hot attempt that couldn't navigate), we consume it immediately.
 *
 * Only runs inside the authenticated (app)/layout.tsx tree, so by the time
 * it fires we know the user is logged in and the router is settled.
 *
 * Mount via PushNotificationInit alongside usePushNotifications.
 */
export function useNotificationDeepLink(): void {
  const router = useRouter();

  useEffect(() => {
    // Check immediately for a path written before this component mounted
    // (e.g. the tap handler fired before hydration completed on the remote URL).
    const immediate = consumePendingNotificationPath();
    if (immediate) {
      router.push(immediate);
      return;
    }

    // Delayed check: waits for the async Capacitor registration chain to
    // complete and for the tap event replay to write to sessionStorage.
    // 600 ms is conservative — the chain typically takes 200–400 ms on device.
    const timer = setTimeout(() => {
      const path = consumePendingNotificationPath();
      if (path) {
        console.log(`🔔 useNotificationDeepLink → navigating to ${path}`);
        router.push(path);
      }
    }, 600);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount only.
}
