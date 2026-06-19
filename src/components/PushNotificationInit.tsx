'use client';

import { usePushNotifications } from '../hooks/usePushNotifications';

/**
 * Mounts the push notification registration hook inside the authenticated
 * app layout. Renders nothing — side effects only.
 *
 * Placed in (app)/layout.tsx so it activates on every authenticated page,
 * not just the dashboard, ensuring the token is registered even if the user
 * deep-links into a non-dashboard route after login.
 */
export default function PushNotificationInit() {
  usePushNotifications();
  return null;
}
