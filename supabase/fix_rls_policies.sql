-- Enable RLS on community_posts if not already enabled
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- 1. Policy for viewing posts (everyone can view)
CREATE POLICY "Everyone can view posts" 
ON community_posts FOR SELECT 
USING (true);

-- 2. Policy for inserting posts (authenticated users can insert)
CREATE POLICY "Authenticated users can create posts" 
ON community_posts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 3. Policy for deleting own posts (users can delete their own)
CREATE POLICY "Users can delete own posts" 
ON community_posts FOR DELETE 
USING (auth.uid() = user_id);

-- 4. Policy for ADMINS to delete ANY post (The missing piece!)
-- This checks if the current user has 'role' = 'admin' in the profiles table
CREATE POLICY "Admins can delete any post" 
ON community_posts FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- 5. Policy for ADMINS to update ANY post (for pinning/hiding later)
CREATE POLICY "Admins can update any post" 
ON community_posts FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
