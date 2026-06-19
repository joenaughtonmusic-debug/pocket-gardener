-- ============================================================
-- Migration: Device tokens for Android push notifications
-- ============================================================
-- Stores FCM device tokens so the weekly cron can deliver
-- push notifications to each user's Android device(s).
--
-- last_notified_week: ISO week string e.g. '2026-W25'.
-- Used to prevent duplicate sends without a separate log table.
-- The cron skips any token whose last_notified_week equals the
-- current week and updates it after a successful send.
--
-- Safe to run multiple times — uses IF NOT EXISTS.
-- ============================================================

CREATE TABLE IF NOT EXISTS device_tokens (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token               TEXT        NOT NULL,
  platform            TEXT        NOT NULL DEFAULT 'android',
  last_notified_week  TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, token)
);

-- Row-level security: users may only read/write their own tokens.
ALTER TABLE device_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own device tokens" ON device_tokens;

CREATE POLICY "Users can manage their own device tokens"
  ON device_tokens
  FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Index to make per-user lookups fast.
CREATE INDEX IF NOT EXISTS idx_device_tokens_user_id
  ON device_tokens (user_id);
