-- ============================================================
-- Migration: Garden Areas Phase 2 — Style & Goal
-- ============================================================
-- Adds optional planning context fields to garden_areas.
-- Safe to run multiple times (ADD COLUMN IF NOT EXISTS).
-- Existing rows remain valid with style/goal = NULL.
-- ============================================================

ALTER TABLE garden_areas
  ADD COLUMN IF NOT EXISTS style TEXT;

ALTER TABLE garden_areas
  ADD COLUMN IF NOT EXISTS goal TEXT;
