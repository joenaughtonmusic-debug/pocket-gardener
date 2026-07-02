-- Manual foreground masks for Quick Preview (photo-relative polygon clip paths).
-- Feature is gated client-side via NEXT_PUBLIC_ENABLE_FOREGROUND_MASKS.

ALTER TABLE garden_visual_concepts
  ADD COLUMN IF NOT EXISTS foreground_masks JSONB;

COMMENT ON COLUMN garden_visual_concepts.foreground_masks IS
  'Array of { id, points[{x,y}], name?, createdAt } — normalised 0–1 photo coordinates.';
