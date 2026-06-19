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
    // ── TEMPORARY LOGGING ───────────────────────────────────────────────────
    console.log(`[PG_PENDING_PATH] storePendingNotificationPath called — path: "${path}"`);
    console.log('[PG_PENDING_PATH] sessionStorage after write:', sessionStorage.getItem(KEY));
    // ────────────────────────────────────────────────────────────────────────
  } catch (err) {
    // sessionStorage unavailable (e.g. private browsing with storage blocked).
    console.warn('[PG_PENDING_PATH] storePendingNotificationPath failed — sessionStorage unavailable:', err);
  }
}

export function consumePendingNotificationPath(): string | null {
  try {
    const path = sessionStorage.getItem(KEY);
    // ── TEMPORARY LOGGING ───────────────────────────────────────────────────
    console.log(`[PG_PENDING_PATH] consumePendingNotificationPath → "${path ?? 'null'}"`);
    // ────────────────────────────────────────────────────────────────────────
    if (path) sessionStorage.removeItem(KEY);
    return path;
  } catch {
    return null;
  }
}

export function hasPendingNotificationPath(): boolean {
  try {
    const result = !!sessionStorage.getItem(KEY);
    // ── TEMPORARY LOGGING ───────────────────────────────────────────────────
    console.log(`[PG_PENDING_PATH] hasPendingNotificationPath → ${result}`);
    // ────────────────────────────────────────────────────────────────────────
    return result;
  } catch {
    return false;
  }
}
