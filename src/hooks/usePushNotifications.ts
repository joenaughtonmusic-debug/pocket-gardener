'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { storePendingNotificationPath } from '../lib/notificationPath';

/**
 * Registers this device for FCM push notifications when running inside the
 * Capacitor Android shell. Safe no-op on web (dynamic imports guard it).
 *
 * Behaviour:
 *  1. Requests notification permission from the OS.
 *  2. Registers with FCM → receives a device token.
 *  3. POSTs the token to /api/device-tokens so the cron can reach this device.
 *  4. On notification tap:
 *       a. Writes path to sessionStorage (belt) so useNotificationDeepLink can
 *          consume it after the cold-start app initialisation race resolves.
 *       b. Also calls router.push immediately (suspenders) — this works on
 *          warm start where the router is already active and settled.
 *
 * Mount once via <PushNotificationInit /> in the authenticated app layout.
 * All errors are caught silently — push failures must never crash the app.
 */
export function usePushNotifications() {
  const router = useRouter();
  // Stable ref so the notification tap handler always has the current router.
  const routerRef = useRef(router);
  routerRef.current = router;

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function register() {
      try {
        const { Capacitor } = await import('@capacitor/core');
        if (!Capacitor.isNativePlatform()) return;

        const { PushNotifications } = await import('@capacitor/push-notifications');

        // Ask the OS for permission. On Android 13+ this triggers a system dialog.
        const { receive } = await PushNotifications.requestPermissions();
        if (receive !== 'granted') {
          console.log('🔔 Push permission denied');
          return;
        }

        // Register with FCM. The token arrives via the 'registration' listener below.
        await PushNotifications.register();

        const registrationListener = await PushNotifications.addListener(
          'registration',
          async ({ value: token }) => {
            console.log('🔔 FCM token received, saving to server');
            try {
              const res = await fetch('/api/device-tokens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, platform: 'android' }),
              });
              if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                console.error('❌ Failed to save push token:', body);
              }
            } catch (err) {
              console.error('❌ Network error saving push token:', err);
            }
          }
        );

        const errorListener = await PushNotifications.addListener(
          'registrationError',
          (err) => {
            console.error('❌ Push registration error:', err);
          }
        );

        // Fired when the user taps a notification (background or cold start).
        // Capacitor replays this event to newly-registered listeners, so it
        // fires here even after a cold start once the bridge is ready.
        const tapListener = await PushNotifications.addListener(
          'pushNotificationActionPerformed',
          ({ notification }) => {
            const path: string = notification.data?.path ?? '/calendar';
            console.log(`🔔 Notification tapped → ${path}`);

            // Persist to sessionStorage FIRST so useNotificationDeepLink can
            // pick it up if the immediate router.push below races with routing.
            storePendingNotificationPath(path);

            // Attempt immediate navigation — works reliably on warm start.
            // On cold start the router may not be settled yet; the persisted
            // path is the fallback consumed by useNotificationDeepLink.
            try {
              routerRef.current.push(path);
            } catch {
              // Router not ready — useNotificationDeepLink will handle it.
            }
          }
        );

        cleanup = () => {
          registrationListener.remove();
          errorListener.remove();
          tapListener.remove();
        };
      } catch (err) {
        // Dynamic import failure or non-Capacitor environment — ignore.
        console.error('❌ Push setup error (non-fatal):', err);
      }
    }

    register();

    return () => {
      cleanup?.();
    };
  }, []); // Run once on mount; router accessed via ref.
}
