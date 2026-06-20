-- Visual Ideas MVP: garden_visual_concepts table
-- Note: Create the 'visual-ideas' storage bucket manually in Supabase Console
--   Storage → New bucket → Name: "visual-ideas" → Public: true
-- Uploads will be stored as:
--   visual-ideas/uploads/{userId}-{timestamp}.ext  (original garden photos)
--   visual-ideas/generated/{userId}-{timestamp}.png (generated concept images)

CREATE TABLE IF NOT EXISTS garden_visual_concepts (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  garden_area_id   UUID        REFERENCES garden_areas(id) ON DELETE SET NULL,
  name             TEXT        NOT NULL,
  original_photo_url TEXT,
  generated_image_url TEXT,
  goal_text        TEXT,
  detected_intent  TEXT,
  selected_species JSONB       DEFAULT '[]'::JSONB,
  suggested_species JSONB      DEFAULT '[]'::JSONB,
  hedge_form       TEXT,
  style            TEXT,
  status           TEXT        DEFAULT 'draft',
  error_message    TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE garden_visual_concepts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own visual concepts"
  ON garden_visual_concepts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own visual concepts"
  ON garden_visual_concepts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own visual concepts"
  ON garden_visual_concepts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own visual concepts"
  ON garden_visual_concepts FOR DELETE
  USING (auth.uid() = user_id);
