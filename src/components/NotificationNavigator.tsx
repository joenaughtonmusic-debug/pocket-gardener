'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { consumePendingNotificationPath } from '../lib/notificationPath';

/**
 * Mounted in the root layout so it fires on EVERY page, including the root
 * landing page which lives outside the (app) layout group.
 *
 * On cold start from a notification tap:
 *   1. The bootstrap <script> in layout.tsx reads PGNative.getColdStartPath()
 *      synchronously (before React loads) and writes the path to sessionStorage.
 *   2. This component's useEffect fires, consumes the key, and pushes the route.
 *
 * On normal launches (no notification) consumePendingNotificationPath() returns
 * null and nothing happens.
 */
export default function NotificationNavigator() {
  const router = useRouter();

  useEffect(() => {
    const path = consumePendingNotificationPath();
    if (path) {
      console.log('[PG_BOOTSTRAP] NotificationNavigator → navigating to:', path);
      router.push(path);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
