-- ============================================================
-- Migration: Subscription metadata fields on profiles
-- ============================================================
-- Adds three columns needed to track Pro status correctly across
-- Stripe (web) and RevenueCat (native, future).
-- Safe to run multiple times — all statements use IF NOT EXISTS.
-- ============================================================

-- pro_source: which billing system granted this Pro status.
-- Possible values: 'stripe' | 'revenuecat_apple' | 'revenuecat_google' | 'manual'
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS pro_source TEXT;

-- pro_expires_at: when the current paid period ends.
-- Kept in sync by the Stripe webhook on every subscription event.
-- Used to display "Pro until <date>" in the UI and for grace-period logic.
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS pro_expires_at TIMESTAMPTZ;

-- subscription_status: fine-grained billing state.
-- Values: 'free' | 'active' | 'canceled' | 'past_due' | 'expired'
-- 'canceled' means the user cancelled but is still within the paid period.
-- 'expired'  means the period ended and is_pro has been set to false.
-- Defaults to 'free' for all existing rows.
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS subscription_status TEXT NOT NULL DEFAULT 'free';
