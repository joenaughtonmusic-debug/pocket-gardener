-- ============================================================
-- Migration: Garden Areas MVP
-- ============================================================
-- Safe to run multiple times (IF NOT EXISTS / ADD COLUMN IF NOT EXISTS).
-- Existing user_plants rows remain valid; garden_area_id defaults to NULL.
-- Calendar logic is unaffected — it only reads user_plants WHERE is_project = false.
-- ============================================================

-- 1. Create garden_areas table
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS garden_areas (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            TEXT        NOT NULL,
  sun_condition   TEXT,       -- 'Full Sun' | 'Part Shade' | 'Full Shade'
  soil_condition  TEXT,       -- 'Healthy/loam' | 'Clay' | 'Sandy' | 'Potting Mix'
  water_condition TEXT,       -- 'Holds Water' | 'Drains Well' | 'Dry' | 'Under a Roof'
  size_condition  TEXT,       -- '<1m' | '1-2m' | '2-4m' | '4m+'
  slope_condition TEXT,       -- 'flat' | 'gentle' | 'moderate' | 'steep'
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Row-Level Security
-- ─────────────────────────────────────────────────────────────
ALTER TABLE garden_areas ENABLE ROW LEVEL SECURITY;

-- Drop if re-running, then re-create
DROP POLICY IF EXISTS "Users can manage their own garden areas" ON garden_areas;

CREATE POLICY "Users can manage their own garden areas"
  ON garden_areas
  FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. Add garden_area_id to user_plants (nullable FK)
-- ─────────────────────────────────────────────────────────────
-- Existing rows keep garden_area_id = NULL — fully backward compatible.
ALTER TABLE user_plants
  ADD COLUMN IF NOT EXISTS garden_area_id UUID
    REFERENCES garden_areas(id)
    ON DELETE SET NULL;

-- 4. Index for efficient lookups by area
-- ─────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_user_plants_garden_area_id
  ON user_plants (garden_area_id);
