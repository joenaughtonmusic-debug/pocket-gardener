'use client';

import { usePushNotifications } from '../hooks/usePushNotifications';
import { useNotificationDeepLink } from '../hooks/useNotificationDeepLink';

/**
 * Mounts push notification hooks inside the authenticated app layout.
 * Renders nothing — side effects only.
 *
 * usePushNotifications  — token registration + tap handler (writes path to
 *                          sessionStorage and attempts immediate router.push)
 * useNotificationDeepLink — consumes the sessionStorage path after the
 *                           cold-start Capacitor bridge race has settled
 *
 * Placed in (app)/layout.tsx so both hooks are active on every authenticated
 * page, and useNotificationDeepLink only fires when we know the user is
 * logged in and the router is stable.
 */
export default function PushNotificationInit() {
  usePushNotifications();
  useNotificationDeepLink();
  return null;
}
