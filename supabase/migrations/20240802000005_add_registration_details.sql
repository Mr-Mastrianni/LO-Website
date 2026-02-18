-- Add detailed registration fields to event_registrations table
ALTER TABLE event_registrations
  ADD COLUMN IF NOT EXISTS attendee_type TEXT,
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS registration_data JSONB DEFAULT '{}';

-- Allow the unique constraint to work for non-logged-in modal registrations
-- by making user_id nullable (it already is since there's no NOT NULL constraint)

-- Add index on attendee_type for filtering
CREATE INDEX IF NOT EXISTS idx_event_registrations_attendee_type ON event_registrations(attendee_type);

-- Allow anonymous (non-logged-in) users to register for events
CREATE POLICY "Anonymous can register for events" ON event_registrations
  FOR INSERT WITH CHECK (user_id IS NULL);
