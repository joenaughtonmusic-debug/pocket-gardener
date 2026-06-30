-- Launch blockers: visual preview thumbnails + optional diary persistence table.

ALTER TABLE garden_visual_concepts
  ADD COLUMN IF NOT EXISTS preview_thumbnail_url TEXT;

COMMENT ON COLUMN garden_visual_concepts.preview_thumbnail_url IS
  'JPEG thumbnail of saved Quick Preview overlay composition; falls back to original_photo_url in UI.';

-- Garden diary (optional feature — persisted per user; page hidden until stable).
CREATE TABLE IF NOT EXISTS garden_diary_entries (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_date  DATE        NOT NULL DEFAULT CURRENT_DATE,
  tasks       JSONB       NOT NULL DEFAULT '[]'::JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS garden_diary_entries_user_date_idx
  ON garden_diary_entries (user_id, entry_date DESC);

ALTER TABLE garden_diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users select own diary entries"
  ON garden_diary_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own diary entries"
  ON garden_diary_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own diary entries"
  ON garden_diary_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
