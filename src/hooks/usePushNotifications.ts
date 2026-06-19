'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Registers this device for FCM push notifications when running inside the
 * Capacitor Android shell. Safe no-op on web (dynamic imports guard it).
 *
 * Behaviour:
 *  1. Requests notification permission from the OS.
 *  2. Registers with FCM → receives a device token.
 *  3. POSTs the token to /api/device-tokens so the cron can reach this device.
 *  4. On notification tap, navigates to notification.data.path (or /calendar).
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

        // Fired when the user taps a notification while the app is in background/closed.
        const tapListener = await PushNotifications.addListener(
          'pushNotificationActionPerformed',
          ({ notification }) => {
            const path: string = notification.data?.path ?? '/calendar';
            console.log(`🔔 Notification tapped → navigating to ${path}`);
            routerRef.current.push(path);
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
