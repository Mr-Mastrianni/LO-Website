# Content Management System Setup

## Step 1: Set up Database Tables

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Navigate to SQL Editor** (in the left sidebar)
3. **Copy and paste the SQL from `supabase/migrations/20240801000002_create_content_tables.sql`**
4. **Click "Run"** to execute the SQL

This will create tables for:
- ✅ **Testimonials** - Community stories and feedback
- ✅ **Events** - BrainStorm Cancer events and workshops
- ✅ **Resources** - Educational materials and documents
- ✅ **Photo Gallery** - Images and media content

## Step 2: Test the Content Management System

1. **Go to your admin dashboard**: `/admin`
2. **Click the "Content" tab** or use the "Content Management" quick action
3. **You should see 4 content type tabs**:
   - **Testimonials** - Add/edit community testimonials
   - **Events** - Create and manage events
   - **Resources** - Manage educational resources
   - **Gallery** - Upload and organize photos

## Features Included

### 📝 **Testimonials Manager**
- ✅ Add new testimonials with ratings
- ✅ Edit existing testimonials
- ✅ Mark testimonials as featured
- ✅ Search and filter testimonials
- ✅ Delete testimonials with confirmation

### 📅 **Events Manager**
- ✅ Create events with date, time, location
- ✅ Set event capacity and type
- ✅ Mark events as featured
- ✅ Search and filter events
- ✅ Edit and delete events

### 📚 **Resources Manager**
- ✅ Add educational resources
- ✅ Categorize resources (Education, Wellness, Research, etc.)
- ✅ Set access levels (Public, Restricted, Members Only)
- ✅ Track download counts
- ✅ Mark resources as featured

### 📸 **Photo Gallery Manager**
- ✅ Add photos with descriptions
- ✅ Categorize photos (Events, Community, Medical, etc.)
- ✅ Add alt text for accessibility
- ✅ Mark photos as featured
- ✅ Track view counts

## Database Policies

The system includes proper Row Level Security (RLS) policies:

- **Public Content**: Anyone can view testimonials, events, and photos
- **Resource Access**: Respects access levels (public, members-only, restricted)
- **Admin Management**: Only admins can create, edit, and delete content
- **Automatic Timestamps**: All content has created_at and updated_at fields

## Next Steps

1. **Test adding content** in each category
2. **Verify the content appears** on your public pages
3. **Check permissions** work correctly
4. **Add real content** to replace mock data

## Integration with Public Pages

The content you manage here will appear on:
- **Testimonials Page** - Shows featured and recent testimonials
- **Events Page** - Displays upcoming events
- **Resources Page** - Lists available resources by category
- **Photo Gallery** - Shows organized photo collections

## Mock Data

The system currently uses mock data for demonstration. Once you run the database migration, you can:
1. **Replace mock data** with real database calls
2. **Add actual content** through the admin interface
3. **Test the full workflow** from admin to public display

Let me know when you've set up the database tables and I can help you connect the real data!
