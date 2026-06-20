-- Add tap-to-place placement_point column to garden_visual_concepts.
-- Stores normalized coordinates { x: 0–1, y: 0–1 } where user tapped the photo.
ALTER TABLE garden_visual_concepts
  ADD COLUMN IF NOT EXISTS placement_point JSONB;
