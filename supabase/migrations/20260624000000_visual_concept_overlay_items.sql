-- Multi-overlay Quick Preview composition (normalised positions per plant).
--
-- overlay_items – array of { id, assetKey, plantName, x, y, scale }
-- Legacy single-overlay fields (overlay_asset_key, overlay_position, overlay_scale)
-- are retained for backward compatibility.

ALTER TABLE garden_visual_concepts
  ADD COLUMN IF NOT EXISTS overlay_items JSONB;
