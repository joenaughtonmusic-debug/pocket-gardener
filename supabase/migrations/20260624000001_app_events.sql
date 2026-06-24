-- Lightweight product analytics event log.
-- Tracks key user actions for feature usage insights before public launch.
-- Does NOT store: uploaded photo URLs, full user messages, private notes, or exact addresses.
CREATE TABLE IF NOT EXISTS app_events (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name text        NOT NULL,
  metadata   jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS app_events_user_id_idx    ON app_events (user_id);
CREATE INDEX IF NOT EXISTS app_events_event_name_idx ON app_events (event_name);
CREATE INDEX IF NOT EXISTS app_events_created_at_idx ON app_events (created_at DESC);

ALTER TABLE app_events ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert their own events (or anonymous events with null user_id).
CREATE POLICY "Users can insert own events"
  ON app_events FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Users can read only their own events.
CREATE POLICY "Users can read own events"
  ON app_events FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
