-- RLS for visual concept uploads stored in weed-images bucket (legacy bucket name).
-- Paths must be: visual-ideas/uploads/{user_id}/{filename}
-- Authenticated users may only write/read/delete within their own folder.

INSERT INTO storage.buckets (id, name, public)
VALUES ('weed-images', 'weed-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "weed_images_visual_uploads_insert"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'weed-images'
    AND (storage.foldername(name))[1] = 'visual-ideas'
    AND (storage.foldername(name))[2] = 'uploads'
    AND (storage.foldername(name))[3] = auth.uid()::text
  );

CREATE POLICY "weed_images_visual_uploads_select"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'weed-images'
    AND (storage.foldername(name))[1] = 'visual-ideas'
    AND (storage.foldername(name))[2] = 'uploads'
    AND (storage.foldername(name))[3] = auth.uid()::text
  );

CREATE POLICY "weed_images_visual_uploads_delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'weed-images'
    AND (storage.foldername(name))[1] = 'visual-ideas'
    AND (storage.foldername(name))[2] = 'uploads'
    AND (storage.foldername(name))[3] = auth.uid()::text
  );

-- Thumbnails and generated images under the same user folder prefix.
CREATE POLICY "weed_images_visual_thumbs_insert"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'weed-images'
    AND (storage.foldername(name))[1] = 'visual-ideas'
    AND (storage.foldername(name))[2] IN ('thumbnails', 'generated')
    AND (storage.foldername(name))[3] = auth.uid()::text
  );

CREATE POLICY "weed_images_visual_thumbs_select"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'weed-images'
    AND (storage.foldername(name))[1] = 'visual-ideas'
    AND (storage.foldername(name))[2] IN ('thumbnails', 'generated')
    AND (storage.foldername(name))[3] = auth.uid()::text
  );
