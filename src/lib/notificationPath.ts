/**
 * Shared helpers for persisting a pending notification deep-link path across
 * the cold-start race between Capacitor event replay and Next.js routing.
 *
 * Flow:
 *  1. pushNotificationActionPerformed fires → storePendingNotificationPath()
 *  2. WelcomeOverlay reads hasPendingNotificationPath() → suppresses itself
 *  3. useNotificationDeepLink (500ms after authenticated layout mounts) →
 *     consumePendingNotificationPath() → router.push(path)
 *
 * Uses sessionStorage so the path is cleared automatically when the tab/app
 * session ends, and is never persisted to disk across restarts.
 */

const KEY = 'pg:pending-notification-path';

export function storePendingNotificationPath(path: string): void {
  try {
    sessionStorage.setItem(KEY, path);
  } catch {
    // sessionStorage unavailable (e.g. private browsing with storage blocked).
  }
}

export function consumePendingNotificationPath(): string | null {
  try {
    const path = sessionStorage.getItem(KEY);
    if (path) sessionStorage.removeItem(KEY);
    return path;
  } catch {
    return null;
  }
}

export function hasPendingNotificationPath(): boolean {
  try {
    return !!sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}
