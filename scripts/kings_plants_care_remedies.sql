-- Pocket Gardener: care calendar, task rules, and remedies for Kings 35 plants
-- Safe / idempotent: skips rows that already exist.
-- Resolves plant IDs by common_name (works across environments).
--
-- Tables:
--   auckland_monthly_care  — matched by plant_type (= common_name or task_category)
--   plant_task_rules       — category rules (shared across plants with same task_category)
--   plant_remedies         — plant-specific diagnose / sick-plant entries

BEGIN;

-- Sync id sequences (seed data used explicit ids; nextval may be behind MAX(id)).
DO $$
DECLARE
  seq_name text;
BEGIN
  seq_name := pg_get_serial_sequence('public.auckland_monthly_care', 'id');
  IF seq_name IS NOT NULL THEN
    PERFORM setval(
      seq_name,
      (SELECT COALESCE(MAX(id), 1) FROM public.auckland_monthly_care),
      true
    );
  END IF;

  seq_name := pg_get_serial_sequence('public.plant_task_rules', 'id');
  IF seq_name IS NOT NULL THEN
    PERFORM setval(
      seq_name,
      (SELECT COALESCE(MAX(id), 1) FROM public.plant_task_rules),
      true
    );
  END IF;

  seq_name := pg_get_serial_sequence('public.plant_remedies', 'id');
  IF seq_name IS NOT NULL THEN
    PERFORM setval(
      seq_name,
      (SELECT COALESCE(MAX(id), 1) FROM public.plant_remedies),
      true
    );
  END IF;
END $$;

-- ── Auckland monthly care ────────────────────────────────────────────────
INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Flowering Shrub', 2, 'Light trim after summer flowering on shrubs such as Azalea, Pieris and Choisya. Avoid hard cuts into old wood on Proteaceae plants.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Flowering Shrub')
    AND c.month_number = 2
    AND c.care_note = 'Light trim after summer flowering on shrubs such as Azalea, Pieris and Choisya. Avoid hard cuts into old wood on Proteaceae plants.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Flowering Shrub', 6, 'Winter check on flowering shrubs: improve drainage on clay, keep mulch away from stems, and watch for scale on dense growth.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Flowering Shrub')
    AND c.month_number = 6
    AND c.care_note = 'Winter check on flowering shrubs: improve drainage on clay, keep mulch away from stems, and watch for scale on dense growth.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Flowering Shrub', 9, 'Spring feed for flowering shrubs. Use acid-loving fertiliser on Azalea, Pieris and Daphne; use low-phosphorus native fertiliser on Grevillea and Protea.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Flowering Shrub')
    AND c.month_number = 9
    AND c.care_note = 'Spring feed for flowering shrubs. Use acid-loving fertiliser on Azalea, Pieris and Daphne; use low-phosphorus native fertiliser on Grevillea and Protea.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Flowering Shrub', 11, 'Deadhead spent blooms and water deeply before summer on Tibouchina, Plumbago and Loropetalum.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Flowering Shrub')
    AND c.month_number = 11
    AND c.care_note = 'Deadhead spent blooms and water deeply before summer on Tibouchina, Plumbago and Loropetalum.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Climber', 2, 'Trim climbers after the main flowering flush. Train new stems on Jasmine, Mandevilla and Potato Vine before growth becomes tangled.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Climber')
    AND c.month_number = 2
    AND c.care_note = 'Trim climbers after the main flowering flush. Train new stems on Jasmine, Mandevilla and Potato Vine before growth becomes tangled.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Climber', 9, 'Spring feed and tie-in on climbers. Check supports on Potato Vine and Jasmine before the windy season.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Climber')
    AND c.month_number = 9
    AND c.care_note = 'Spring feed and tie-in on climbers. Check supports on Potato Vine and Jasmine before the windy season.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Climber', 11, 'Peak growth month: keep climbers watered in pots and trim runners away from gutters and windows.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Climber')
    AND c.month_number = 11
    AND c.care_note = 'Peak growth month: keep climbers watered in pots and trim runners away from gutters and windows.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Agapanthus', 1, 'Remove spent flower stems and pull yellow leaves from the base. Divide crowded clumps if flowering has slowed.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Agapanthus')
    AND c.month_number = 1
    AND c.care_note = 'Remove spent flower stems and pull yellow leaves from the base. Divide crowded clumps if flowering has slowed.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Agapanthus', 9, 'Spring tidy: cut back old foliage and apply compost or slow-release fertiliser if growth is weak.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Agapanthus')
    AND c.month_number = 9
    AND c.care_note = 'Spring tidy: cut back old foliage and apply compost or slow-release fertiliser if growth is weak.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Photinia', 3, 'Autumn tidy trim on Photinia to keep the hedge sharp through winter and reduce leaf spot in humid weather.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Photinia')
    AND c.month_number = 3
    AND c.care_note = 'Autumn tidy trim on Photinia to keep the hedge sharp through winter and reduce leaf spot in humid weather.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Photinia', 10, 'Spring trim little and often on Photinia to encourage bright red new growth.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Photinia')
    AND c.month_number = 10
    AND c.care_note = 'Spring trim little and often on Photinia to encourage bright red new growth.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Azalea', 9, 'Feed Azaleas with acid-loving fertiliser as buds swell. Keep evenly moist, especially in pots.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Azalea')
    AND c.month_number = 9
    AND c.care_note = 'Feed Azaleas with acid-loving fertiliser as buds swell. Keep evenly moist, especially in pots.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Azalea', 11, 'Check leaf undersides for lacebug before spring flowering. Improve airflow if leaves look pale or speckled.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Azalea')
    AND c.month_number = 11
    AND c.care_note = 'Check leaf undersides for lacebug before spring flowering. Improve airflow if leaves look pale or speckled.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Daphne', 6, 'Leave Daphne alone in winter. Check drainage and keep roots cool with mulch, but keep mulch off the stem.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Daphne')
    AND c.month_number = 6
    AND c.care_note = 'Leave Daphne alone in winter. Check drainage and keep roots cool with mulch, but keep mulch off the stem.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Daphne', 9, 'Light feed after flowering with gentle acid-loving fertiliser. Avoid root disturbance.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Daphne')
    AND c.month_number = 9
    AND c.care_note = 'Light feed after flowering with gentle acid-loving fertiliser. Avoid root disturbance.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Hosta', 8, 'Slug alert: protect new Hosta shoots as they emerge. Use pet-safe pellets or barriers before damage shows.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Hosta')
    AND c.month_number = 8
    AND c.care_note = 'Slug alert: protect new Hosta shoots as they emerge. Use pet-safe pellets or barriers before damage shows.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Hosta', 6, 'Cut back old Hosta leaves after they yellow. Divide large clumps if the plant has outgrown its spot.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Hosta')
    AND c.month_number = 6
    AND c.care_note = 'Cut back old Hosta leaves after they yellow. Divide large clumps if the plant has outgrown its spot.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Puka', 6, 'Good native planting month for Puka in Auckland. Mulch young trees and protect from cold wind while establishing.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Puka')
    AND c.month_number = 6
    AND c.care_note = 'Good native planting month for Puka in Auckland. Mulch young trees and protect from cold wind while establishing.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Puka', 9, 'Spring feed lightly and remove damaged leaves. Give shelter from strong wind on young plants.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Puka')
    AND c.month_number = 9
    AND c.care_note = 'Spring feed lightly and remove damaged leaves. Give shelter from strong wind on young plants.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Protea', 9, 'Feed Proteas with low-phosphorus native fertiliser only. Never use standard high-phosphorus feeds.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Protea')
    AND c.month_number = 9
    AND c.care_note = 'Feed Proteas with low-phosphorus native fertiliser only. Never use standard high-phosphorus feeds.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Protea', 6, 'Drainage check: Proteas hate wet feet in Auckland clay. Mound planting or improve drainage before winter rain.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Protea')
    AND c.month_number = 6
    AND c.care_note = 'Drainage check: Proteas hate wet feet in Auckland clay. Mound planting or improve drainage before winter rain.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Grevillea', 9, 'Tip prune after flowering and feed sparingly with low-phosphorus native fertiliser.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Grevillea')
    AND c.month_number = 9
    AND c.care_note = 'Tip prune after flowering and feed sparingly with low-phosphorus native fertiliser.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Leucadendron', 9, 'Light prune after flowering or picking stems. Use low-phosphorus fertiliser in spring.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Leucadendron')
    AND c.month_number = 9
    AND c.care_note = 'Light prune after flowering or picking stems. Use low-phosphorus fertiliser in spring.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Leucospermum', 9, 'Remove spent pincushion flowers and check drainage on raised beds before dry weather.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Leucospermum')
    AND c.month_number = 9
    AND c.care_note = 'Remove spent pincushion flowers and check drainage on raised beds before dry weather.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Thuja', 10, 'First spring clip on Thuja — trim only into green growth, never old brown wood.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Thuja')
    AND c.month_number = 10
    AND c.care_note = 'First spring clip on Thuja — trim only into green growth, never old brown wood.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Thuja', 3, 'Autumn hedge tidy on Thuja. Water deeply if summer was dry to reduce winter browning.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Thuja')
    AND c.month_number = 3
    AND c.care_note = 'Autumn hedge tidy on Thuja. Water deeply if summer was dry to reduce winter browning.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Clumping Bamboo', 10, 'Thin old culms at ground level and feed lightly in spring to support fresh screen growth.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Clumping Bamboo')
    AND c.month_number = 10
    AND c.care_note = 'Thin old culms at ground level and feed lightly in spring to support fresh screen growth.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Clumping Bamboo', 4, 'Remove weak culms and trim lower branches if you want a clean-stem screen look.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Clumping Bamboo')
    AND c.month_number = 4
    AND c.care_note = 'Remove weak culms and trim lower branches if you want a clean-stem screen look.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Cyclamen', 4, 'Start gentle watering as Cyclamen come into growth. Keep the crown dry and pots in bright shade.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Cyclamen')
    AND c.month_number = 4
    AND c.care_note = 'Start gentle watering as Cyclamen come into growth. Keep the crown dry and pots in bright shade.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Cyclamen', 6, 'Allow Cyclamen to rest in cooler weather. Reduce watering if leaves yellow after flowering.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Cyclamen')
    AND c.month_number = 6
    AND c.care_note = 'Allow Cyclamen to rest in cooler weather. Reduce watering if leaves yellow after flowering.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Carex', 8, 'Comb out dead Carex foliage or cut back tired clumps before spring growth.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Carex')
    AND c.month_number = 8
    AND c.care_note = 'Comb out dead Carex foliage or cut back tired clumps before spring growth.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Carex', 9, 'Divide congested Carex clumps if needed and apply a light spring feed.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Carex')
    AND c.month_number = 9
    AND c.care_note = 'Divide congested Carex clumps if needed and apply a light spring feed.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Salvia', 9, 'Cut back woody Salvia stems once frost risk has passed, then feed lightly for summer flowers.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Salvia')
    AND c.month_number = 9
    AND c.care_note = 'Cut back woody Salvia stems once frost risk has passed, then feed lightly for summer flowers.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Salvia', 2, 'Deadhead Salvia through summer to keep bees visiting and reduce leggy growth.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Salvia')
    AND c.month_number = 2
    AND c.care_note = 'Deadhead Salvia through summer to keep bees visiting and reduce leggy growth.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Astilbe', 6, 'Keep Astilbe evenly moist through dry spells. Do not let shaded borders bake out.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Astilbe')
    AND c.month_number = 6
    AND c.care_note = 'Keep Astilbe evenly moist through dry spells. Do not let shaded borders bake out.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Astilbe', 9, 'Spring feed with compost and remove old flower stems before new growth expands.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Astilbe')
    AND c.month_number = 9
    AND c.care_note = 'Spring feed with compost and remove old flower stems before new growth expands.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Heuchera', 9, 'Refresh Heuchera by removing tired leaves and applying light slow-release fertiliser.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Heuchera')
    AND c.month_number = 9
    AND c.care_note = 'Refresh Heuchera by removing tired leaves and applying light slow-release fertiliser.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Ajuga', 10, 'Edge Ajuga runners after spring flowering so it does not creep into lawns or paths.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Ajuga')
    AND c.month_number = 10
    AND c.care_note = 'Edge Ajuga runners after spring flowering so it does not creep into lawns or paths.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Libertia', 9, 'Pull dead Libertia leaves from the base and apply compost if clumps look congested.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Libertia')
    AND c.month_number = 9
    AND c.care_note = 'Pull dead Libertia leaves from the base and apply compost if clumps look congested.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Apodasmia', 8, 'Tidy dead Apodasmia stems and keep weeds out while clumps are still establishing.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Apodasmia')
    AND c.month_number = 8
    AND c.care_note = 'Tidy dead Apodasmia stems and keep weeds out while clumps are still establishing.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Scleranthus', 9, 'Very light feed only if cushions look pale. Avoid heavy mulch over the crown.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Scleranthus')
    AND c.month_number = 9
    AND c.care_note = 'Very light feed only if cushions look pale. Avoid heavy mulch over the crown.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Selliera', 6, 'Keep Selliera moist through dry winter spells and trim edges if mats spread too far.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Selliera')
    AND c.month_number = 6
    AND c.care_note = 'Keep Selliera moist through dry winter spells and trim edges if mats spread too far.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Leptinella', 6, 'Keep Leptinella evenly moist and weed-free while mats are filling in.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Leptinella')
    AND c.month_number = 6
    AND c.care_note = 'Keep Leptinella evenly moist and weed-free while mats are filling in.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Mandevilla', 11, 'Warm-month feed and water for Mandevilla in pots. Train new stems onto supports.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Mandevilla')
    AND c.month_number = 11
    AND c.care_note = 'Warm-month feed and water for Mandevilla in pots. Train new stems onto supports.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Jasmine', 11, 'Peak scent month: keep Jasmine watered and tie in new growth after flowering.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Jasmine')
    AND c.month_number = 11
    AND c.care_note = 'Peak scent month: keep Jasmine watered and tie in new growth after flowering.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Potato Vine', 10, 'Hard prune Potato Vine in spring to control size before it smothers supports.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Potato Vine')
    AND c.month_number = 10
    AND c.care_note = 'Hard prune Potato Vine in spring to control size before it smothers supports.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Plumbago', 10, 'Cut back frost-damaged Plumbago growth and shape after the risk of cold has passed.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Plumbago')
    AND c.month_number = 10
    AND c.care_note = 'Cut back frost-damaged Plumbago growth and shape after the risk of cold has passed.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Tibouchina', 11, 'Feed Tibouchina through warm months and prune lightly after flowering to stay bushy.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Tibouchina')
    AND c.month_number = 11
    AND c.care_note = 'Feed Tibouchina through warm months and prune lightly after flowering to stay bushy.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Acorus', 8, 'Comb out old Acorus foliage before spring to refresh edging clumps.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Acorus')
    AND c.month_number = 8
    AND c.care_note = 'Comb out old Acorus foliage before spring to refresh edging clumps.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Nandina', 8, 'Thin old Nandina canes from the base rather than shearing the top like a hedge.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Nandina')
    AND c.month_number = 8
    AND c.care_note = 'Thin old Nandina canes from the base rather than shearing the top like a hedge.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Pieris', 9, 'Feed Pieris with acid-loving fertiliser and mulch with compost or leaf mould.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Pieris')
    AND c.month_number = 9
    AND c.care_note = 'Feed Pieris with acid-loving fertiliser and mulch with compost or leaf mould.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Loropetalum', 10, 'Lightly shape Loropetalum after flowering and mulch before dry spring weather.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Loropetalum')
    AND c.month_number = 10
    AND c.care_note = 'Lightly shape Loropetalum after flowering and mulch before dry spring weather.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Choisya', 10, 'Trim Choisya after spring flowering to keep a tidy shape near paths and entrances.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Choisya')
    AND c.month_number = 10
    AND c.care_note = 'Trim Choisya after spring flowering to keep a tidy shape near paths and entrances.'
);

INSERT INTO public.auckland_monthly_care (plant_type, month_number, care_note, plant_id)
SELECT 'Teucrium', 10, 'Clip Teucrium little and often in spring for a dense silver hedge.', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.auckland_monthly_care c
  WHERE lower(trim(c.plant_type)) = lower('Teucrium')
    AND c.month_number = 10
    AND c.care_note = 'Clip Teucrium little and often in spring for a dense silver hedge.'
);

-- ── Plant task rules (category-level supplements) ─────────────────────────
INSERT INTO public.plant_task_rules (
  plant_category, task_type, trigger_type, trigger_month,
  frequency_per_year, base_priority, estimated_minutes, tool_tags, shopping_tags
)
SELECT 'Hedge', 'trim', 'fixed_month', 10, 2, 85, 30, ARRAY['hedge_trimmer', 'gloves'], ARRAY[]::text[]
WHERE NOT EXISTS (
  SELECT 1 FROM public.plant_task_rules r
  WHERE lower(trim(r.plant_category)) = lower('Hedge')
    AND lower(trim(r.task_type)) = lower('trim')
    AND r.trigger_month = 10
);

INSERT INTO public.plant_task_rules (
  plant_category, task_type, trigger_type, trigger_month,
  frequency_per_year, base_priority, estimated_minutes, tool_tags, shopping_tags
)
SELECT 'Flowering Shrub', 'check', 'fixed_month', 6, 1, 55, 10, ARRAY['gloves'], ARRAY[]::text[]
WHERE NOT EXISTS (
  SELECT 1 FROM public.plant_task_rules r
  WHERE lower(trim(r.plant_category)) = lower('Flowering Shrub')
    AND lower(trim(r.task_type)) = lower('check')
    AND r.trigger_month = 6
);

INSERT INTO public.plant_task_rules (
  plant_category, task_type, trigger_type, trigger_month,
  frequency_per_year, base_priority, estimated_minutes, tool_tags, shopping_tags
)
SELECT 'Climber', 'check', 'fixed_month', 11, 1, 50, 15, ARRAY['secateurs', 'gloves'], ARRAY[]::text[]
WHERE NOT EXISTS (
  SELECT 1 FROM public.plant_task_rules r
  WHERE lower(trim(r.plant_category)) = lower('Climber')
    AND lower(trim(r.task_type)) = lower('check')
    AND r.trigger_month = 11
);

-- ── Plant remedies ───────────────────────────────────────────────────────
INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Browning Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Acorus') LIMIT 1), NULL, 'Dry tips', 'Brown tips usually mean drying out or salt exposure. Keep evenly moist near pond edges and pots.', false, 'Environment', 'acorus, brown tips, dry', ARRAY['Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Acorus') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Acorus') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Browning Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Acorus') LIMIT 1), NULL, 'Crown needs oxygen', 'Likes moisture but still needs oxygen at the crown. Avoid waterlogging in pots.', false, 'Environment', 'acorus, crown rot, wet', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Acorus') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Acorus') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Snails', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Agapanthus') LIMIT 1), NULL, 'Crown and foliage protection', 'Snails hide in dense Agapanthus foliage. Check at night, remove leaf litter, and use pet-safe pellets if damage continues.', false, 'Pest', 'snails, holes, agapanthus, crown', ARRAY['Snail Pellets', 'Quash']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Agapanthus') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Agapanthus') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Snails')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Agapanthus') LIMIT 1), NULL, 'Crown rot prevention', 'Agapanthus crowns rot in waterlogged soil. Improve drainage and avoid burying the base with mulch.', false, 'Environment', 'crown rot, wet soil, collapse, agapanthus', ARRAY['Gypsum', 'Compost']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Agapanthus') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Agapanthus') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Self-seeding', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Agapanthus') LIMIT 1), NULL, 'Seed head removal', 'Remove spent heads before seed drops, especially near bush or waterways. Prefer sterile cultivars where spread is a concern.', false, 'Environment', 'seed, spread, invasive, agapanthus', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Agapanthus') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Agapanthus') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Self-seeding')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'White Powdery Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Ajuga') LIMIT 1), NULL, 'Mildew in damp patches', 'Improve airflow in dense damp patches and trim runners after flowering.', false, 'Disease', 'ajuga, mildew, groundcover', ARRAY['Fungicide Spray', 'Garden Sprayer']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Ajuga') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Ajuga') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('White Powdery Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Slugs', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Ajuga') LIMIT 1), NULL, 'Edge control', 'Slugs can damage Ajuga in damp shade. Edge regularly and use pellets if needed.', false, 'Pest', 'slugs, ajuga, holes', ARRAY['Snail Pellets']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Ajuga') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Ajuga') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Slugs')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Slugs', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Alstroemeria') LIMIT 1), NULL, 'Protect new shoots', 'Slugs attack new Alstroemeria shoots in spring. Use pet-safe pellets around clumps.', false, 'Pest', 'slugs, alstroemeria, holes', ARRAY['Snail Pellets', 'Quash']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Alstroemeria') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Alstroemeria') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Slugs')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Alstroemeria') LIMIT 1), NULL, 'Heavy clay rot', 'Root rot occurs in heavy wet soil. Improve drainage and pull spent stems from the base, do not cut.', false, 'Environment', 'alstroemeria, wet, rot', ARRAY['Gypsum']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Alstroemeria') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Alstroemeria') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Dry Stress', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Apodasmia') LIMIT 1), NULL, 'Establishment watering', 'Poor growth before establishment often means drying out. Water until roots settle, then reduce.', false, 'Environment', 'apodasmia, oioi, dry, establish', ARRAY['Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Apodasmia') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Apodasmia') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Dry Stress')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Weeds', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Apodasmia') LIMIT 1), NULL, 'Keep weed-free while young', 'Weed competition slows young Apodasmia. Keep bases clear until clumps fill in.', false, 'Environment', 'weeds, apodasmia, oioi', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Apodasmia') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Apodasmia') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Weeds')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leaf Scorch', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Astilbe') LIMIT 1), NULL, 'Keep soil moist', 'Brown crispy leaves mean the site is too dry or sunny. Increase shade and moisture.', false, 'Environment', 'astilbe, dry, scorch, shade', ARRAY['Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Astilbe') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Astilbe') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leaf Scorch')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Poor Flowering', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Astilbe') LIMIT 1), NULL, 'Moist shade required', 'Astilbe flowers poorly in dry shade. Mulch and water during dry spells.', false, 'Environment', 'astilbe, no flowers, dry', ARRAY['Mulch', 'Compost']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Astilbe') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Astilbe') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Poor Flowering')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Silvery or Mottled Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Azalea') LIMIT 1), NULL, 'Lacebug check', 'Pale or speckled leaves often mean lacebug on undersides. Spray with plant soap and improve airflow.', false, 'Pest', 'lacebug, pale leaves, azalea, rhododendron', ARRAY['Garden Sprayer', 'Plant Soap', 'Horticultural Oil']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Azalea') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Azalea') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Silvery or Mottled Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Yellow Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Azalea') LIMIT 1), NULL, 'Acid soil and moisture', 'Yellowing may mean alkaline soil or dry roots. Use acid-loving fertiliser and keep evenly moist in pots.', false, 'Environment', 'yellow, azalea, acid, dry', ARRAY['Granular Fertiliser', 'Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Azalea') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Azalea') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Yellow Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Azalea') LIMIT 1), NULL, 'Root stress in pots', 'Azaleas need drainage and steady moisture, not wet crowns. Repot with acidic mix if soil stays soggy.', false, 'Environment', 'root rot, azalea, wet, pot', ARRAY['Fresh Potting Mix']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Azalea') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Azalea') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Carex') LIMIT 1), NULL, 'Crown rot in compacted soil', 'Carex crowns rot in wet compacted soil. Improve drainage and avoid burying the crown with mulch.', false, 'Environment', 'carex, crown rot, wet, sedge', ARRAY['Gypsum']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Carex') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Carex') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Browning Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Carex') LIMIT 1), NULL, 'Refresh tired clumps', 'Comb out dead leaves or cut back hard in late winter if the clump looks messy.', false, 'Environment', 'brown, carex, tidy, sedge', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Carex') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Carex') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Browning Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leggy Growth', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Choisya') LIMIT 1), NULL, 'Shape after flowering', 'Shape after flowering and remove older crowded stems if the shrub gets leggy.', false, 'Environment', 'choisya, leggy, mexican orange', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Choisya') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Choisya') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leggy Growth')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Bumps on Stems / Sticky Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Choisya') LIMIT 1), NULL, 'Scale in dense growth', 'Check dense growth for scale. Spray with horticultural oil in cooler months.', false, 'Pest', 'scale, choisya, sticky', ARRAY['Garden Sprayer', 'Horticultural Oil']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Choisya') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Choisya') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Bumps on Stems / Sticky Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Dry Stress', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Clumping Bamboo') LIMIT 1), NULL, 'Water while establishing', 'Rolled or dry leaves often mean water stress or wind exposure. Deep soak during dry spells.', false, 'Environment', 'dry, bamboo, wind, scorch', ARRAY['Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Clumping Bamboo') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Clumping Bamboo') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Dry Stress')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Overgrowth', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Clumping Bamboo') LIMIT 1), NULL, 'Annual cane thinning', 'Remove old culms at ground level each year to keep the screen tidy and manageable.', false, 'Environment', 'spread, bamboo, thin, culm', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Clumping Bamboo') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Clumping Bamboo') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Overgrowth')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Cyclamen') LIMIT 1), NULL, 'Crown rot from overwatering', 'If stems collapse, check for overwatering. Water the mix, not the crown, and keep in bright shade.', false, 'Environment', 'cyclamen, crown rot, wet, collapse', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Cyclamen') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Cyclamen') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Tiny Bugs / Curled Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Cyclamen') LIMIT 1), NULL, 'Aphid check', 'Check for aphids on new growth. Spray with plant soap and keep plants in cool bright shade.', false, 'Pest', 'aphids, cyclamen, curled', ARRAY['Garden Sprayer', 'Plant Soap']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Cyclamen') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Cyclamen') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Tiny Bugs / Curled Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Yellow Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Daphne') LIMIT 1), NULL, 'Drainage and disturbance', 'Daphne hates wet feet and root disturbance. Check drainage and avoid moving or heavy pruning.', false, 'Environment', 'yellow, daphne, dieback, wet', ARRAY['Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Daphne') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Daphne') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Yellow Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Sudden Decline', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Daphne') LIMIT 1), NULL, 'Root rot warning', 'Sudden wilting often means root rot. Reduce watering, improve drainage, and do not disturb roots.', false, 'Environment', 'dieback, daphne, collapse, root rot', ARRAY['Gypsum']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Daphne') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Daphne') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Sudden Decline')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Grevillea') LIMIT 1), NULL, 'Free drainage essential', 'Grevillea roots rot in wet soil. Plant in raised or sandy beds and avoid heavy feeding.', false, 'Environment', 'grevillea, root rot, wet, drainage', ARRAY['Gypsum']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Grevillea') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Grevillea') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Yellow Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Grevillea') LIMIT 1), NULL, 'Low-phosphorus feed only', 'Standard fertilisers can damage Grevillea. Use native low-phosphorus feed sparingly in spring.', false, 'Environment', 'phosphorus, grevillea, yellow, feed', ARRAY['Granular Fertiliser']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Grevillea') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Grevillea') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Yellow Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leggy Growth', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Grevillea') LIMIT 1), NULL, 'Tip prune after flowering', 'Tip prune after flowering to keep bushy and remove old woody stems gradually.', false, 'Environment', 'leggy, woody, grevillea', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Grevillea') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Grevillea') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leggy Growth')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Heuchera') LIMIT 1), NULL, 'Crown rot', 'Keep crowns above wet mulch. If the plant wilts despite moist soil, check for vine weevil or crown rot.', false, 'Environment', 'heuchera, crown rot, wilt, weevil', ARRAY['Fresh Potting Mix']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Heuchera') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Heuchera') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leaf Scorch', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Heuchera') LIMIT 1), NULL, 'Afternoon shade', 'Harsh afternoon sun scorches foliage. Move to part shade and keep evenly moist.', false, 'Environment', 'heuchera, scorch, sun', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Heuchera') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Heuchera') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leaf Scorch')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Slugs', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Hosta') LIMIT 1), NULL, 'Spring slug defence', 'Protect emerging Hosta shoots early in spring before slugs shred new leaves.', false, 'Pest', 'slugs, snails, holes, hosta', ARRAY['Snail Pellets', 'Quash']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Hosta') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Hosta') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Slugs')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leaf Scorch', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Hosta') LIMIT 1), NULL, 'Shade and moisture', 'Brown crispy leaves mean too much sun or dry soil. Move to shade and keep soil moist.', false, 'Environment', 'scorch, sunburn, hosta, dry', ARRAY['Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Hosta') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Hosta') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leaf Scorch')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Poor Flowering', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Jasmine') LIMIT 1), NULL, 'Light and training', 'Poor flowering often means too much shade or tangled growth. Train stems and improve light.', false, 'Environment', 'jasmine, no flowers, shade, tangled', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Jasmine') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Jasmine') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Poor Flowering')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Tiny Bugs / Curled Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Jasmine') LIMIT 1), NULL, 'Aphids on soft growth', 'Aphids on new tips can be hosed off or treated with plant soap.', false, 'Pest', 'aphids, jasmine, curled', ARRAY['Garden Sprayer', 'Plant Soap']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Jasmine') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Jasmine') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Tiny Bugs / Curled Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Dry Stress', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leptinella') LIMIT 1), NULL, 'Keep cool and moist', 'Browning often comes from drying out or heat between pavers. Keep evenly moist while establishing.', false, 'Environment', 'leptinella, dry, brown, brass buttons', ARRAY['Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leptinella') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leptinella') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Dry Stress')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Weeds', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leptinella') LIMIT 1), NULL, 'Protect from competition', 'Aggressive weeds can outcompete Leptinella mats. Edge and weed while plants are filling in.', false, 'Environment', 'weeds, leptinella, brass buttons', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leptinella') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leptinella') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Weeds')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucadendron') LIMIT 1), NULL, 'Drainage first', 'Leucadendron wilts quickly in wet clay. Improve drainage and use low-phosphorus fertiliser only.', false, 'Environment', 'leucadendron, wilt, drainage, protea', ARRAY['Gypsum']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucadendron') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucadendron') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leggy Growth', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucadendron') LIMIT 1), NULL, 'Prune after picking', 'Light prune after flowering or picking stems to prevent bare woody growth.', false, 'Environment', 'woody, leggy, leucadendron', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucadendron') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucadendron') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leggy Growth')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucospermum') LIMIT 1), NULL, 'Raised bed planting', 'Wilting in wet soil is serious. Improve drainage immediately and avoid heavy mulch against the stem.', false, 'Environment', 'leucospermum, wilt, drainage, pincushion', ARRAY['Gypsum', 'Compost']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucospermum') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucospermum') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Poor Flowering', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucospermum') LIMIT 1), NULL, 'Sun and drainage', 'Poor flowering usually means too much shade or wet roots. Move to full sun and free-draining soil.', false, 'Environment', 'no flowers, leucospermum, shade', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucospermum') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Leucospermum') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Poor Flowering')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leaf Spot', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Libertia') LIMIT 1), NULL, 'Rust spots', 'Rust spots appear in crowded clumps. Remove old foliage and improve airflow.', false, 'Disease', 'libertia, rust, spots', ARRAY['Fungicide Spray', 'Garden Sprayer']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Libertia') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Libertia') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leaf Spot')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Overcrowding', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Libertia') LIMIT 1), NULL, 'Divide clumps', 'Divide congested Libertia clumps in spring to refresh growth.', false, 'Environment', 'libertia, divide, congested', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Libertia') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Libertia') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Overcrowding')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Poor Flowering', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Loropetalum') LIMIT 1), NULL, 'Improve light', 'Poor foliage colour in too much shade. Improve light or prune surrounding plants.', false, 'Environment', 'loropetalum, shade, colour, bronze', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Loropetalum') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Loropetalum') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Poor Flowering')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Silvery or Mottled Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Loropetalum') LIMIT 1), NULL, 'Mite check', 'Dry stress and mites can dull foliage. Water during dry spells and treat pests if present.', false, 'Pest', 'mites, loropetalum, dusty', ARRAY['Garden Sprayer', 'Plant Soap']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Loropetalum') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Loropetalum') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Silvery or Mottled Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Cold Damage', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Mandevilla') LIMIT 1), NULL, 'Frost protection', 'Protect from frost and cold wind. Move pots under eaves and prune cold-damaged growth in spring.', false, 'Environment', 'mandevilla, frost, cold, damage', ARRAY['Frost Cloth']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Mandevilla') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Mandevilla') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Cold Damage')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Tiny Bugs / Curled Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Mandevilla') LIMIT 1), NULL, 'Aphids on new shoots', 'Check new shoots for aphids. Spray with plant soap and keep pots watered in summer.', false, 'Pest', 'aphids, mandevilla, mites', ARRAY['Garden Sprayer', 'Plant Soap']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Mandevilla') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Mandevilla') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Tiny Bugs / Curled Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Bumps on Stems / Sticky Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Nandina') LIMIT 1), NULL, 'Scale in dense stems', 'Scale can hide in dense Nandina stems. Thin old canes and spray with horticultural oil if needed.', false, 'Pest', 'scale, nandina, sticky', ARRAY['Garden Sprayer', 'Horticultural Oil']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Nandina') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Nandina') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Bumps on Stems / Sticky Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Poor Flowering', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Nandina') LIMIT 1), NULL, 'Too much shade', 'Foliage colour fades in deep shade. Move to brighter light or thin surrounding plants.', false, 'Environment', 'nandina, poor colour, shade', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Nandina') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Nandina') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Poor Flowering')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leaf Spot', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Photinia') LIMIT 1), NULL, 'Airflow and hygiene', 'Humid crowded hedges get leaf spot. Trim lightly, improve airflow, and remove badly spotted leaves.', false, 'Disease', 'leaf spot, photinia, red robin, fungal', ARRAY['Fungicide Spray', 'Garden Sprayer']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Photinia') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Photinia') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leaf Spot')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leggy Growth', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Photinia') LIMIT 1), NULL, 'Little-and-often trim', 'If red new growth is weak, trim lightly through the growing season rather than letting the hedge get woody.', false, 'Environment', 'leggy, woody, photinia, hedge', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Photinia') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Photinia') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leggy Growth')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Photinia') LIMIT 1), NULL, 'Drainage while establishing', 'Young Photinia can stress in wet clay. Mound soil slightly and mulch the root zone, not the stems.', false, 'Environment', 'wet feet, drought, photinia', ARRAY['Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Photinia') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Photinia') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Silvery or Mottled Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Pieris') LIMIT 1), NULL, 'Lacebug', 'Pale speckled leaves may mean lacebug. Check undersides and use plant soap.', false, 'Pest', 'lacebug, pieris, pale leaves', ARRAY['Garden Sprayer', 'Plant Soap']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Pieris') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Pieris') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Silvery or Mottled Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Yellow Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Pieris') LIMIT 1), NULL, 'Acid soil needed', 'Yellow leaves may mean alkaline soil or poor drainage. Mulch with leaf mould and feed with acid fertiliser.', false, 'Environment', 'pieris, yellow, acid, alkaline', ARRAY['Granular Fertiliser', 'Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Pieris') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Pieris') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Yellow Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Frost Damage', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Plumbago') LIMIT 1), NULL, 'Spring cutback', 'Prune out frost-damaged growth in spring and shape after cold weather has passed.', false, 'Environment', 'plumbago, frost, damage, sprawling', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Plumbago') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Plumbago') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Frost Damage')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Bumps on Stems / Sticky Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Plumbago') LIMIT 1), NULL, 'Scale on stems', 'Check stems for scale. Spray with horticultural oil if sticky sooty mould appears.', false, 'Pest', 'scale, plumbago, sticky', ARRAY['Garden Sprayer', 'Horticultural Oil']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Plumbago') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Plumbago') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Bumps on Stems / Sticky Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Overgrowth', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Potato Vine') LIMIT 1), NULL, 'Schedule hard prune', 'Potato Vine becomes a tangled mass without pruning. Cut back hard after flowering or in spring.', false, 'Environment', 'potato vine, overgrowth, tangled, solanum', ARRAY['Secateurs']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Potato Vine') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Potato Vine') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Overgrowth')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Tiny Bugs / Curled Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Potato Vine') LIMIT 1), NULL, 'Aphids on soft growth', 'Watch soft new growth for aphids after spring flush.', false, 'Pest', 'aphids, potato vine, solanum', ARRAY['Garden Sprayer', 'Plant Soap']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Potato Vine') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Potato Vine') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Tiny Bugs / Curled Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Protea') LIMIT 1), NULL, 'Raised planting', 'Proteas collapse quickly in wet clay. Plant high in free-draining soil and never use rich compost around roots.', false, 'Environment', 'protea, root rot, wet, drainage', ARRAY['Compost', 'Gypsum']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Protea') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Protea') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Yellow Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Protea') LIMIT 1), NULL, 'Phosphorus sensitivity', 'Never use standard fertilisers. Use low-phosphorus native or protea fertiliser only.', false, 'Environment', 'phosphorus, yellow, protea, fertiliser', ARRAY['Granular Fertiliser']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Protea') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Protea') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Yellow Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wind Damage', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Puka') LIMIT 1), NULL, 'Shelter young trees', 'Young Puka brown in drying winds. Stake lightly and plant in a sheltered courtyard or protected site.', false, 'Environment', 'wind, frost, puka, brown leaves', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Puka') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Puka') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wind Damage')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Puka') LIMIT 1), NULL, 'Clay drainage', 'Puka struggles in wet heavy clay. Improve drainage and avoid planting in boggy low spots.', false, 'Environment', 'wet clay, puka, root stress', ARRAY['Gypsum', 'Compost']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Puka') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Puka') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'White Powdery Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Salvia') LIMIT 1), NULL, 'Mildew and airflow', 'Mildew appears in humid crowded growth. Improve airflow and avoid wetting foliage late in the day.', false, 'Disease', 'mildew, salvia, powdery', ARRAY['Fungicide Spray', 'Garden Sprayer']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Salvia') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Salvia') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('White Powdery Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Tiny Bugs / Curled Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Salvia') LIMIT 1), NULL, 'Aphids on new growth', 'Aphids on soft new stems can be removed with a hose or plant soap spray.', false, 'Pest', 'aphids, salvia, curled', ARRAY['Garden Sprayer', 'Plant Soap']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Salvia') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Salvia') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Tiny Bugs / Curled Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Scleranthus') LIMIT 1), NULL, 'Cushion rot', 'Brown patches often mean poor drainage or mulch over the cushion. Keep drainage sharp and mulch light.', false, 'Environment', 'scleranthus, rot, cushion, wet', ARRAY['Gypsum']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Scleranthus') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Scleranthus') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Weeds', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Scleranthus') LIMIT 1), NULL, 'Low competition site', 'Keep weeds away from cushions. Plant in free-draining mounds or rock gardens.', false, 'Environment', 'weeds, scleranthus, competition', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Scleranthus') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Scleranthus') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Weeds')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Patchy Growth', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Selliera') LIMIT 1), NULL, 'Even moisture', 'Patchy mats usually mean inconsistent moisture or weed competition. Water while establishing.', false, 'Environment', 'selliera, patchy, dry, mat', ARRAY['Mulch']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Selliera') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Selliera') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Patchy Growth')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Weeds', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Selliera') LIMIT 1), NULL, 'Keep mats clean', 'Weeds overtake low Selliera mats quickly while establishing. Hand-weed regularly.', false, 'Environment', 'weeds, selliera, groundcover', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Selliera') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Selliera') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Weeds')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leggy Growth', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Teucrium') LIMIT 1), NULL, 'Clip regularly', 'Clip regularly for density. Renovate gradually rather than cutting hard into old wood.', false, 'Environment', 'teucrium, leggy, hedge, silver', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Teucrium') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Teucrium') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leggy Growth')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Wilting in Wet Soil', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Teucrium') LIMIT 1), NULL, 'Dry-loving hedge', 'Teucrium yellows or collapses in wet soil. Improve drainage and keep in full sun.', false, 'Environment', 'teucrium, wet, root rot', ARRAY['Gypsum']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Teucrium') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Teucrium') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Wilting in Wet Soil')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Browning Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Thuja') LIMIT 1), NULL, 'Moisture and mites', 'Browning may be drought, wet feet, or mites. Check soil moisture and drainage before trimming harder.', false, 'Environment', 'brown, thuja, conifer, hedge', ARRAY['Garden Sprayer', 'Horticultural Oil']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Thuja') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Thuja') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Browning Leaves')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Leggy Growth', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Thuja') LIMIT 1), NULL, 'Green growth only', 'Never cut Thuja back into old brown wood. Trim lightly into green foliage only.', false, 'Environment', 'bare patches, thuja, hedge, brown', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Thuja') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Thuja') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Leggy Growth')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Frost Damage', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Tibouchina') LIMIT 1), NULL, 'Shelter and prune', 'Protect from frost and cold wind. Prune lightly after flowering to stay compact.', false, 'Environment', 'tibouchina, frost, leggy, cold', ARRAY[]::text[]
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Tibouchina') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Tibouchina') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Frost Damage')
  );

INSERT INTO public.plant_remedies (
  issue_type, specific_plant_id, plant_type_fallback, remedy_title, remedy_description,
  is_universal, category, search_keywords, shopping_tags
)
SELECT 'Silvery or Mottled Leaves', (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Tibouchina') LIMIT 1), NULL, 'Mite check', 'Check new growth for mites in warm weather. Spray with plant soap or horticultural oil if present.', false, 'Pest', 'mites, tibouchina, dusty leaves', ARRAY['Garden Sprayer', 'Horticultural Oil', 'Plant Soap']
WHERE (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Tibouchina') LIMIT 1) IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.plant_remedies r
    WHERE r.specific_plant_id = (SELECT id FROM public.plants WHERE lower(trim(common_name)) = lower('Tibouchina') LIMIT 1)
      AND lower(trim(r.issue_type)) = lower('Silvery or Mottled Leaves')
  );

COMMIT;

-- ── Verification ─────────────────────────────────────────────────────────
SELECT 'monthly_care' AS section, count(*) AS row_count
FROM public.auckland_monthly_care c
WHERE lower(trim(c.plant_type)) IN (
  lower('Flowering Shrub'),
  lower('Climber'),
  lower('Acorus'),
  lower('Agapanthus'),
  lower('Ajuga'),
  lower('Alstroemeria'),
  lower('Apodasmia'),
  lower('Astilbe'),
  lower('Azalea'),
  lower('Carex'),
  lower('Choisya'),
  lower('Clumping Bamboo'),
  lower('Cyclamen'),
  lower('Daphne'),
  lower('Grevillea'),
  lower('Heuchera'),
  lower('Hosta'),
  lower('Jasmine'),
  lower('Leptinella'),
  lower('Leucadendron'),
  lower('Leucospermum'),
  lower('Libertia'),
  lower('Loropetalum'),
  lower('Mandevilla'),
  lower('Nandina'),
  lower('Photinia'),
  lower('Pieris'),
  lower('Plumbago'),
  lower('Potato Vine'),
  lower('Protea'),
  lower('Puka'),
  lower('Salvia'),
  lower('Scleranthus'),
  lower('Selliera'),
  lower('Teucrium'),
  lower('Thuja'),
  lower('Tibouchina')
);

SELECT p.common_name, count(r.id) AS remedy_count
FROM public.plants p
LEFT JOIN public.plant_remedies r ON r.specific_plant_id = p.id
WHERE lower(trim(p.common_name)) IN (
  lower('Acorus'),
  lower('Agapanthus'),
  lower('Ajuga'),
  lower('Alstroemeria'),
  lower('Apodasmia'),
  lower('Astilbe'),
  lower('Azalea'),
  lower('Carex'),
  lower('Choisya'),
  lower('Clumping Bamboo'),
  lower('Cyclamen'),
  lower('Daphne'),
  lower('Grevillea'),
  lower('Heuchera'),
  lower('Hosta'),
  lower('Jasmine'),
  lower('Leptinella'),
  lower('Leucadendron'),
  lower('Leucospermum'),
  lower('Libertia'),
  lower('Loropetalum'),
  lower('Mandevilla'),
  lower('Nandina'),
  lower('Photinia'),
  lower('Pieris'),
  lower('Plumbago'),
  lower('Potato Vine'),
  lower('Protea'),
  lower('Puka'),
  lower('Salvia'),
  lower('Scleranthus'),
  lower('Selliera'),
  lower('Teucrium'),
  lower('Thuja'),
  lower('Tibouchina')
)
GROUP BY p.common_name
ORDER BY p.common_name;

-- Expect monthly_care row_count >= 54 and remedy_count >= 2 for each of 35 plants.
