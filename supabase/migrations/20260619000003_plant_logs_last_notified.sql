-- ============================================================
-- Migration: Add last_notified_at to plant_logs
-- ============================================================
-- Enables lightweight deduplication for sick-plant push notifications
-- without a separate notification_log table.
--
-- The sick-followup cron sets last_notified_at after a successful send.
-- On the next cron run, any log whose last_notified_at is within the past
-- 30 days is skipped, so the user receives at most one push notification
-- per sick plant per 30-day window.
--
-- Existing rows keep last_notified_at = NULL.
-- NULL is treated as "never notified" by the cron filter:
--   last_notified_at IS NULL OR last_notified_at <= NOW() - INTERVAL '30 days'
--
-- Safe to run multiple times — uses IF NOT EXISTS.
-- ============================================================

ALTER TABLE plant_logs
  ADD COLUMN IF NOT EXISTS last_notified_at TIMESTAMPTZ;
