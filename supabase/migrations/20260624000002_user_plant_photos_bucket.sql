-- user-plant-photos: dedicated bucket for user-generated plant/garden photos.
--
-- Replaces the previous pattern of uploading to 'weed-images' with no path
-- ownership enforcement.  All new uploads use the path:
--   user-plant-photos/{user_id}/{filename}
-- where the first segment is always the authenticated user's UUID.
--
-- Bucket type: PUBLIC
--   Required so that publicUrl values stored in plant_photos.photo_url and
--   user.user_metadata.garden_photo continue to render in <img> tags without
--   signed-URL expiry concerns (acceptable for launch; migrate to signed URLs
--   with path-only storage for stronger privacy in a future sprint).
--
-- Storage policies enforce:
--   - INSERT  : only to own folder ({user_id}/...)
--   - SELECT  : only own folder (API listing; does not restrict direct URL access)
--   - UPDATE  : only own folder
--   - DELETE  : only own folder
-- Public (anonymous) users cannot list or modify any files via the API.

-- Create the bucket (safe to re-run: on conflict do nothing).
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-plant-photos', 'user-plant-photos', true)
ON CONFLICT (id) DO NOTHING;

-- ────────────────────────────────────────────────────────────────
-- INSERT policy: authenticated users may upload only under their
-- own user-id folder (first path segment must equal auth.uid()).
-- ────────────────────────────────────────────────────────────────
CREATE POLICY "user_plant_photos_insert"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'user-plant-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ────────────────────────────────────────────────────────────────
-- SELECT policy: authenticated users may list/read only their own
-- files via the Supabase Storage API.
-- (Direct public-URL access is not restricted by RLS policies;
--  URLs are effectively unguessable due to user_id + timestamp.)
-- ────────────────────────────────────────────────────────────────
CREATE POLICY "user_plant_photos_select"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'user-plant-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ────────────────────────────────────────────────────────────────
-- UPDATE policy: authenticated users may update only their own files.
-- ────────────────────────────────────────────────────────────────
CREATE POLICY "user_plant_photos_update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'user-plant-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ────────────────────────────────────────────────────────────────
-- DELETE policy: authenticated users may delete only their own files.
-- ────────────────────────────────────────────────────────────────
CREATE POLICY "user_plant_photos_delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'user-plant-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
