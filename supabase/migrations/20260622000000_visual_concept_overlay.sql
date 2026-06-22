-- Add Quick Preview overlay fields to garden_visual_concepts.
--
-- overlay_asset_key  – key of the plant overlay PNG/SVG used in Quick Preview
-- overlay_position   – normalised centre point { x: 0–1, y: 0–1 } within the photo
-- overlay_scale      – overlay width as a fraction of the photo container width (0–1)
-- preview_mode       – 'overlay' when the user has saved a Quick Preview; null otherwise

ALTER TABLE garden_visual_concepts
  ADD COLUMN IF NOT EXISTS overlay_asset_key TEXT,
  ADD COLUMN IF NOT EXISTS overlay_position  JSONB,
  ADD COLUMN IF NOT EXISTS overlay_scale     NUMERIC,
  ADD COLUMN IF NOT EXISTS preview_mode      TEXT;
