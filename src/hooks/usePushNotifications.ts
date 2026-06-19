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

        // ── Tap listener registered FIRST ────────────────────────────────────
        // Capacitor replays a stored cold-start tap event as soon as this
        // listener is registered — no need to call register() beforehand.
        // Registering here (before requestPermissions / register) minimises the
        // gap between component mount and sessionStorage write, giving
        // WelcomeOverlay's grace-period check the best chance of seeing it.
        const tapListener = await PushNotifications.addListener(
          'pushNotificationActionPerformed',
          (action) => {
            // ── TEMPORARY LOGGING ─────────────────────────────────────────────
            console.log('[PG_PUSH_TAP] pushNotificationActionPerformed fired');
            console.log('[PG_PUSH_TAP] full action payload:', JSON.stringify(action));
            console.log('[PG_PUSH_TAP] action.notification:', JSON.stringify(action.notification));
            console.log('[PG_PUSH_TAP] action.notification.data:', JSON.stringify(action.notification?.data));
            // ─────────────────────────────────────────────────────────────────

            const { notification } = action;
            const path: string = notification.data?.path ?? '/calendar';
            console.log(`[PG_PUSH_TAP] resolved path → "${path}" (data.path was: ${JSON.stringify(notification.data?.path)})`);

            // Persist path so useNotificationDeepLink can consume it after the
            // cold-start routing race resolves (belt).
            storePendingNotificationPath(path);

            // Also attempt immediate navigation — reliable on warm start
            // where the router is already settled (suspenders).
            try {
              routerRef.current.push(path);
              console.log('[PG_PUSH_TAP] router.push called successfully');
            } catch (err) {
              console.log('[PG_PUSH_TAP] router.push threw (cold start expected):', err);
            }
          }
        );

        // ── Permission + FCM registration ────────────────────────────────────
        // Ask the OS for permission. On Android 13+ this triggers a system
        // dialog on first call; subsequent calls resolve immediately.
        const { receive } = await PushNotifications.requestPermissions();
        if (receive !== 'granted') {
          console.log('🔔 Push permission denied');
          tapListener.remove();
          return;
        }

        // Register with FCM. The token arrives via the 'registration' listener.
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

        cleanup = () => {
          tapListener.remove();
          registrationListener.remove();
          errorListener.remove();
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
