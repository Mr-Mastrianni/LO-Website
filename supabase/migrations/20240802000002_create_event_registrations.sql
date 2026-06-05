-- Create event registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered',
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations(user_id);

-- Enable RLS
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view registrations" ON event_registrations
  FOR SELECT USING (true);

CREATE POLICY "Users can register for events" ON event_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their registrations" ON event_registrations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can cancel their registrations" ON event_registrations
  FOR DELETE USING (auth.uid() = user_id);
