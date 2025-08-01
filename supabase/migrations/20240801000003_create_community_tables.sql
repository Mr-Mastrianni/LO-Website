-- Create discussions table
CREATE TABLE IF NOT EXISTS discussions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category TEXT DEFAULT 'general',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'archived')),
  pinned BOOLEAN DEFAULT FALSE,
  replies_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'deleted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'support' CHECK (type IN ('support', 'educational', 'social', 'professional')),
  privacy TEXT DEFAULT 'public' CHECK (privacy IN ('public', 'restricted', 'private')),
  max_members INTEGER,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_members table
CREATE TABLE IF NOT EXISTS group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('inappropriate_content', 'spam', 'harassment', 'other')),
  content_type TEXT NOT NULL CHECK (content_type IN ('discussion', 'comment', 'user', 'group')),
  content_id TEXT NOT NULL,
  reported_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reported_user UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community_settings table
CREATE TABLE IF NOT EXISTS community_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_settings ENABLE ROW LEVEL SECURITY;

-- Policies for discussions
CREATE POLICY "Anyone can view active discussions" ON discussions
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can create discussions" ON discussions
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own discussions" ON discussions
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all discussions" ON discussions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Policies for comments
CREATE POLICY "Anyone can view active comments" ON comments
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all comments" ON comments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Policies for groups
CREATE POLICY "Anyone can view public groups" ON groups
  FOR SELECT USING (privacy = 'public');

CREATE POLICY "Members can view their groups" ON groups
  FOR SELECT USING (
    privacy IN ('restricted', 'private') AND
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = groups.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create groups" ON groups
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Group admins can update groups" ON groups
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = groups.id AND user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can manage all groups" ON groups
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Policies for group_members
CREATE POLICY "Members can view group membership" ON group_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM groups 
      WHERE id = group_members.group_id AND privacy = 'public'
    ) OR
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM group_members gm2
      WHERE gm2.group_id = group_members.group_id AND gm2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join groups" ON group_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave groups" ON group_members
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for reports
CREATE POLICY "Users can create reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can view their own reports" ON reports
  FOR SELECT USING (auth.uid() = reported_by);

CREATE POLICY "Admins can manage all reports" ON reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Policies for community_settings
CREATE POLICY "Admins can manage community settings" ON community_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_discussions_updated_at
  BEFORE UPDATE ON discussions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update discussion activity
CREATE OR REPLACE FUNCTION update_discussion_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE discussions 
  SET last_activity_at = NOW(),
      replies_count = (
        SELECT COUNT(*) FROM comments 
        WHERE discussion_id = NEW.discussion_id AND status = 'active'
      )
  WHERE id = NEW.discussion_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update discussion activity when comments are added
CREATE TRIGGER update_discussion_activity_trigger
  AFTER INSERT OR UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_discussion_activity();

-- Insert default community settings
INSERT INTO community_settings (setting_key, setting_value) VALUES
('general', '{"communityName": "Living Oncology Community", "description": "A supportive community for brain cancer patients, survivors, and their families.", "welcomeMessage": "Welcome to our supportive community! Please read our guidelines before posting.", "maxMembersPerGroup": 100, "allowGuestViewing": true}'),
('moderation', '{"requireApprovalForPosts": false, "requireApprovalForComments": false, "autoModerateSpam": true, "allowReporting": true, "maxReportsBeforeHide": 3, "profanityFilter": true}'),
('notifications', '{"emailNotifications": true, "newMemberNotifications": true, "reportNotifications": true, "weeklyDigest": true, "adminAlerts": true}'),
('privacy', '{"publicDirectory": true, "allowSearchEngines": false, "requireEmailVerification": true, "allowAnonymousPosts": false, "dataRetentionDays": 365}')
ON CONFLICT (setting_key) DO NOTHING;
