-- Patch missing plant_remedies.shopping_tags for common pest, disease and nutrient issues.
--
-- Scope: shopping_tags column ONLY — no changes to titles, descriptions, issue types,
-- search keywords, categories, or plant IDs.
--
-- Behaviour: merge new tags into existing arrays; duplicates removed via array_agg(distinct).
-- Safe to re-run — distinct merge is idempotent once tags are present.
--
-- App-side enrichment in src/lib/taskSupplies.ts remains as a backup for rows this
-- migration does not match.

-- ─────────────────────────────────────────────────────────────────────────────
-- Helper: combined searchable text for a plant_remedies row (lowercase).
-- ─────────────────────────────────────────────────────────────────────────────
-- Used inline in each UPDATE via a repeating expression:
--   lower(
--     coalesce(issue_type, '') || ' ' ||
--     coalesce(remedy_title, '') || ' ' ||
--     coalesce(remedy_description, '') || ' ' ||
--     coalesce(search_keywords, '')
--   )

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Scale / sticky leaves / sooty mould
-- ─────────────────────────────────────────────────────────────────────────────
UPDATE plant_remedies
SET shopping_tags = (
  SELECT array_agg(DISTINCT tag ORDER BY tag)
  FROM unnest(
    coalesce(shopping_tags, '{}'::text[])
    || ARRAY['Horticultural Oil', 'Garden Sprayer']
  ) AS tag
)
WHERE lower(
  coalesce(issue_type, '') || ' ' ||
  coalesce(remedy_title, '') || ' ' ||
  coalesce(remedy_description, '') || ' ' ||
  coalesce(search_keywords, '')
) ~ '(scale|sticky|sooty|honeydew)';

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Aphids / spider mites / mealybugs
-- ─────────────────────────────────────────────────────────────────────────────
UPDATE plant_remedies
SET shopping_tags = (
  SELECT array_agg(DISTINCT tag ORDER BY tag)
  FROM unnest(
    coalesce(shopping_tags, '{}'::text[])
    || ARRAY['Neem Oil', 'Plant Soap', 'Garden Sprayer']
  ) AS tag
)
WHERE lower(
  coalesce(issue_type, '') || ' ' ||
  coalesce(remedy_title, '') || ' ' ||
  coalesce(remedy_description, '') || ' ' ||
  coalesce(search_keywords, '')
) ~ '(aphid|spider mite|mites|mealybug)';

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Powdery mildew / fungal / leaf spot
-- ─────────────────────────────────────────────────────────────────────────────
UPDATE plant_remedies
SET shopping_tags = (
  SELECT array_agg(DISTINCT tag ORDER BY tag)
  FROM unnest(
    coalesce(shopping_tags, '{}'::text[])
    || ARRAY['Fungicide Spray', 'Garden Sprayer']
  ) AS tag
)
WHERE lower(
  coalesce(issue_type, '') || ' ' ||
  coalesce(remedy_title, '') || ' ' ||
  coalesce(remedy_description, '') || ' ' ||
  coalesce(search_keywords, '')
) ~ '(mildew|powdery|fungal|leaf spot|fungus(?! gnat))';

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. Borer / holes in stems / sawdust / frass
-- ─────────────────────────────────────────────────────────────────────────────
UPDATE plant_remedies
SET shopping_tags = (
  SELECT array_agg(DISTINCT tag ORDER BY tag)
  FROM unnest(
    coalesce(shopping_tags, '{}'::text[])
    || ARRAY['Borer Spray', 'Pruning Paste', 'Secateurs']
  ) AS tag
)
WHERE lower(
  coalesce(issue_type, '') || ' ' ||
  coalesce(remedy_title, '') || ' ' ||
  coalesce(remedy_description, '') || ' ' ||
  coalesce(search_keywords, '')
) ~ '(borer|holes in stem|sawdust|frass)';

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. Fungus gnats
-- Match fungus gnats, tiny black flies, or gnats in a fungus/potting/soil context.
-- ─────────────────────────────────────────────────────────────────────────────
UPDATE plant_remedies
SET shopping_tags = (
  SELECT array_agg(DISTINCT tag ORDER BY tag)
  FROM unnest(
    coalesce(shopping_tags, '{}'::text[])
    || ARRAY['Indoor Plant Sticky Traps', 'Fresh Potting Mix']
  ) AS tag
)
WHERE lower(
  coalesce(issue_type, '') || ' ' ||
  coalesce(remedy_title, '') || ' ' ||
  coalesce(remedy_description, '') || ' ' ||
  coalesce(search_keywords, '')
) ~ '(fungus gnat|tiny black fl)'
   OR (
     lower(
       coalesce(issue_type, '') || ' ' ||
       coalesce(remedy_title, '') || ' ' ||
       coalesce(remedy_description, '') || ' ' ||
       coalesce(search_keywords, '')
     ) ~ 'gnats'
     AND lower(
       coalesce(issue_type, '') || ' ' ||
       coalesce(remedy_title, '') || ' ' ||
       coalesce(remedy_description, '') || ' ' ||
       coalesce(search_keywords, '')
     ) ~ '(fungus|potting|soil|indoor)'
   );

-- ─────────────────────────────────────────────────────────────────────────────
-- 6a. Yellow leaves / magnesium — general nutrient (non-citrus-specific)
-- Adds Magnesium Liquid Feed only; avoids citrus fertiliser on unrelated rows.
-- ─────────────────────────────────────────────────────────────────────────────
UPDATE plant_remedies
SET shopping_tags = (
  SELECT array_agg(DISTINCT tag ORDER BY tag)
  FROM unnest(
    coalesce(shopping_tags, '{}'::text[])
    || ARRAY['Magnesium Liquid Feed']
  ) AS tag
)
WHERE lower(
  coalesce(issue_type, '') || ' ' ||
  coalesce(remedy_title, '') || ' ' ||
  coalesce(remedy_description, '') || ' ' ||
  coalesce(search_keywords, '')
) ~ '(yellow leaves|yellowing|magnesium)'
  AND lower(
    coalesce(issue_type, '') || ' ' ||
    coalesce(remedy_title, '') || ' ' ||
    coalesce(remedy_description, '') || ' ' ||
    coalesce(search_keywords, '')
  ) !~ 'citrus'
  AND coalesce(remedy_title, '') NOT ILIKE 'Possible Magnesium Deficiency%';

-- ─────────────────────────────────────────────────────────────────────────────
-- 6b. Citrus / magnesium deficiency — citrus-specific nutrient tags
-- Applies when row mentions citrus with yellowing/magnesium symptoms,
-- or title is Possible Magnesium Deficiency.
-- ─────────────────────────────────────────────────────────────────────────────
UPDATE plant_remedies
SET shopping_tags = (
  SELECT array_agg(DISTINCT tag ORDER BY tag)
  FROM unnest(
    coalesce(shopping_tags, '{}'::text[])
    || ARRAY['Citrus Fertiliser', 'Magnesium Liquid Feed']
  ) AS tag
)
WHERE coalesce(remedy_title, '') ILIKE 'Possible Magnesium Deficiency%'
   OR (
     lower(
       coalesce(issue_type, '') || ' ' ||
       coalesce(remedy_title, '') || ' ' ||
       coalesce(remedy_description, '') || ' ' ||
       coalesce(search_keywords, '')
     ) ~ 'citrus'
     AND lower(
       coalesce(issue_type, '') || ' ' ||
       coalesce(remedy_title, '') || ' ' ||
       coalesce(remedy_description, '') || ' ' ||
       coalesce(search_keywords, '')
     ) ~ '(yellow leaves|yellowing|magnesium)'
   );
