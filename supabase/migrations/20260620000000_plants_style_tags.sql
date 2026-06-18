-- ============================================================
-- Migration: Add style_tags column to plants
-- ============================================================
-- Safe to run multiple times (ADD COLUMN IF NOT EXISTS).
-- All existing plant rows keep style_tags = NULL — no data loss.
-- style_tags is a nullable text array, e.g. {'Formal','Coastal','Low Maintenance'}.
-- Used by rankPlantsForArea() to give a direct style boost in area recommendations.
-- ============================================================

ALTER TABLE plants ADD COLUMN IF NOT EXISTS style_tags TEXT[];
