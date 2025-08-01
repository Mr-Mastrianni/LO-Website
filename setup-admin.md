# Admin Dashboard Setup Instructions

## Step 1: Set up Database Tables

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Navigate to SQL Editor** (in the left sidebar)
3. **Copy and paste the following SQL** to create the profiles table:

```sql
-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',
  goal TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create simplified policies (no infinite recursion)
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow service role to access all profiles (for admin functions)
CREATE POLICY "Service role can access all profiles" ON profiles
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email, role, goal)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    NEW.raw_user_meta_data->>'goal'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. **Click "Run"** to execute the SQL

## Step 2: Create Your Admin Account

1. **Create a regular account** on your website first (if you haven't already)
2. **Go back to Supabase Dashboard** → **Table Editor** → **profiles**
3. **Find your user record** and edit it
4. **Set `is_admin` to `true`** for your account
5. **Save the changes**

## Step 3: Test Admin Access

1. **Log out and log back in** to your website
2. **You should now see "Admin Dashboard"** in your user dropdown menu
3. **Click it** to access the admin panel at `/admin`

## What's Included

✅ **Admin Authentication** - Role-based access control
✅ **Admin Dashboard** - Overview with user statistics
✅ **Protected Admin Routes** - Only admins can access
✅ **User Profile System** - Automatic profile creation
✅ **Navigation Integration** - Admin link in user menu

## Next Steps

The basic admin infrastructure is now set up! You can:

1. **Add more admin features** (user management, content management)
2. **Customize the dashboard** with more statistics
3. **Add admin-only pages** for specific management tasks

Let me know when you've completed the database setup and I'll help you add more admin features!
