-- Allow anyone to submit a testimonial (public insert)
-- The form on /testimonials needs this to work

-- Add email column for follow-up contact
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'testimonials' AND column_name = 'email'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN email TEXT;
  END IF;
END $$;

-- Add status column so new submissions can be reviewed before publishing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'testimonials' AND column_name = 'status'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));
  END IF;
END $$;

-- Public INSERT policy — anyone can submit
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Anyone can submit testimonials' AND tablename = 'testimonials'
  ) THEN
    CREATE POLICY "Anyone can submit testimonials" ON testimonials
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;
