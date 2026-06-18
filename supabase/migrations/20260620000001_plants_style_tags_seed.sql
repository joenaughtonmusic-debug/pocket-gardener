-- ============================================================
-- Seed: Initial style_tags for commonly used plants
-- ============================================================
-- All updates use ILIKE '%pattern%' to match name variants
-- (e.g. 'Buxus Japonica', 'Buxus sempervirens', 'Box').
--
-- Safe to re-run: each UPDATE overwrites only the matched rows.
-- Rows that don't match are untouched.
-- Conservative tagging — only add tags where the fit is clear.
-- ============================================================

-- ── Formal ────────────────────────────────────────────────────────────────────

UPDATE plants
  SET style_tags = ARRAY['Formal', 'Coastal', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%griselinia%';

UPDATE plants
  SET style_tags = ARRAY['Formal']
  WHERE lower(common_name) LIKE '%buxus%'
     OR lower(common_name) LIKE '%box%' AND lower(plant_type) = 'hedge';

UPDATE plants
  SET style_tags = ARRAY['Formal', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%ficus tuffi%'
     OR lower(common_name) LIKE '%ficus%rubiginosa%';

UPDATE plants
  SET style_tags = ARRAY['Formal', 'Cottage']
  WHERE lower(common_name) LIKE '%camellia%';

UPDATE plants
  SET style_tags = ARRAY['Formal', 'Cottage']
  WHERE lower(common_name) LIKE '%gardenia%';

UPDATE plants
  SET style_tags = ARRAY['Formal', 'Cottage']
  WHERE lower(common_name) LIKE '%jasmine%'
     OR lower(common_name) LIKE '%star jasmine%';

-- ── Native ────────────────────────────────────────────────────────────────────

UPDATE plants
  SET style_tags = ARRAY['Native', 'Coastal', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%lomandra%';

UPDATE plants
  SET style_tags = ARRAY['Native', 'Coastal', 'Formal']
  WHERE lower(common_name) LIKE '%corokia%';

UPDATE plants
  SET style_tags = ARRAY['Native', 'Coastal', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%pittosporum%';

UPDATE plants
  SET style_tags = ARRAY['Native', 'Coastal', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%muehlenbeckia%';

UPDATE plants
  SET style_tags = ARRAY['Native', 'Coastal', 'Formal']
  WHERE lower(common_name) LIKE '%corokia%';

UPDATE plants
  SET style_tags = ARRAY['Native', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%puriri%';

UPDATE plants
  SET style_tags = ARRAY['Native', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%pratia%';

-- ── Flax / Cordyline ─────────────────────────────────────────────────────────

UPDATE plants
  SET style_tags = ARRAY['Native', 'Coastal', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%flax%'
     OR lower(common_name) LIKE '%phormium%';

UPDATE plants
  SET style_tags = ARRAY['Native', 'Subtropical', 'Coastal']
  WHERE lower(common_name) LIKE '%cordyline%'
     OR lower(common_name) LIKE '%cabbage tree%';

-- ── Subtropical ───────────────────────────────────────────────────────────────

UPDATE plants
  SET style_tags = ARRAY['Subtropical']
  WHERE lower(common_name) LIKE '%philodendron%';

UPDATE plants
  SET style_tags = ARRAY['Subtropical', 'Coastal']
  WHERE lower(common_name) LIKE '%strelitzia%'
     OR lower(common_name) LIKE '%bird of paradise%';

UPDATE plants
  SET style_tags = ARRAY['Subtropical']
  WHERE lower(common_name) LIKE '%kentia%'
     OR lower(common_name) LIKE '%palm%';

UPDATE plants
  SET style_tags = ARRAY['Subtropical']
  WHERE lower(common_name) LIKE '%rhododendron%'
     OR lower(common_name) LIKE '%vireya%';

UPDATE plants
  SET style_tags = ARRAY['Subtropical']
  WHERE lower(common_name) LIKE '%tractor seat%';

-- ── Coastal ───────────────────────────────────────────────────────────────────

UPDATE plants
  SET style_tags = ARRAY['Coastal', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%agapanthus%';

-- ── Cottage ───────────────────────────────────────────────────────────────────

UPDATE plants
  SET style_tags = ARRAY['Cottage']
  WHERE lower(common_name) LIKE '%hydrangea%';

UPDATE plants
  SET style_tags = ARRAY['Cottage', 'Coastal', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%lavender%'
     OR lower(common_name) LIKE '%lavandula%';

-- ── Edible ────────────────────────────────────────────────────────────────────

UPDATE plants
  SET style_tags = ARRAY['Edible', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%rosemary%';

UPDATE plants
  SET style_tags = ARRAY['Edible']
  WHERE lower(common_name) LIKE '%citrus%'
     OR lower(common_name) LIKE '%lemon%'
     OR lower(common_name) LIKE '%meyer%';

UPDATE plants
  SET style_tags = ARRAY['Edible']
  WHERE lower(common_name) LIKE '%orange%'
     OR lower(common_name) LIKE '%mandarin%'
     OR lower(common_name) LIKE '%lime%'
     OR lower(common_name) LIKE '%grapefruit%';

UPDATE plants
  SET style_tags = ARRAY['Edible', 'Low Maintenance']
  WHERE lower(common_name) LIKE '%feijoa%';

UPDATE plants
  SET style_tags = ARRAY['Edible']
  WHERE lower(common_name) LIKE '%blueberry%'
     OR lower(common_name) LIKE '%boysenberry%'
     OR lower(common_name) LIKE '%raspberry%'
     OR lower(common_name) LIKE '%strawberry%';

UPDATE plants
  SET style_tags = ARRAY['Edible']
  WHERE lower(common_name) LIKE '%apple%'
     OR lower(common_name) LIKE '%pear%'
     OR lower(common_name) LIKE '%plum%'
     OR lower(common_name) LIKE '%peach%'
     OR lower(common_name) LIKE '%nectarine%'
     OR lower(common_name) LIKE '%apricot%';

UPDATE plants
  SET style_tags = ARRAY['Edible', 'Subtropical']
  WHERE lower(common_name) LIKE '%avocado%'
     OR lower(common_name) LIKE '%passionfruit%'
     OR lower(common_name) LIKE '%banana%';

-- ── Log count for visibility ──────────────────────────────────────────────────
DO $$
DECLARE
  tagged_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO tagged_count FROM plants WHERE style_tags IS NOT NULL AND array_length(style_tags, 1) > 0;
  RAISE NOTICE 'style_tags seed complete. Plants tagged: %', tagged_count;
END $$;
