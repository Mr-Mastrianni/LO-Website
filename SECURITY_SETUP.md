# 🚨 Security Setup Instructions

## Immediate Action Required

GitHub has detected that your Supabase API key was exposed in your repository. Follow these steps immediately:

### 1. Revoke the Exposed API Key

1. Go to your **Supabase Dashboard**
2. Navigate to **Settings** → **API**
3. Find the **anon/public** key section
4. Click **Revoke** on the current key
5. Click **Generate new key** to create a replacement

### 2. Update Your Environment File

1. Copy the new anon key from Supabase
2. Open `.env.local` in your project
3. Replace `your_new_revoked_and_regenerated_anon_key_here` with your new key
4. Save the file

### 3. Verify Security

- ✅ The `.env.local` file is already in `.gitignore`
- ✅ The `customSupabaseClient.js` now uses environment variables
- ✅ No hardcoded keys remain in the source code

### 4. Clean Git History (Optional but Recommended)

To remove the exposed key from git history:

```bash
# Install git-filter-repo if you don't have it
pip install git-filter-repo

# Remove the file from history
git filter-repo --path src/lib/customSupabaseClient.js --invert-paths

# Force push to update remote history
git push origin --force --all
```

### 5. Best Practices Going Forward

- ✅ **Never commit API keys** to version control
- ✅ **Use environment variables** for all sensitive data
- ✅ **Regularly rotate API keys** (every 90 days)
- ✅ **Use different keys** for development and production
- ✅ **Enable Row Level Security** in Supabase
- ✅ **Monitor API usage** for unusual activity

### 6. Environment File Template

Your `.env.local` should look like this:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 7. Verification

After completing these steps:

1. Restart your development server
2. Test that the application still connects to Supabase
3. Verify that no API keys are visible in your source code
4. Confirm the old key no longer works

## ⚠️ Important Notes

- The exposed key can no longer be used once revoked
- Environment files (`.env.local`) are automatically ignored by git
- This setup is now secure for production deployment
- Consider enabling additional security features in Supabase (RLS, API rate limiting)

## Need Help?

If you encounter any issues:
1. Check the Supabase dashboard for connection status
2. Verify environment variables are loaded correctly
3. Ensure the new API key has the correct permissions
4. Contact support if problems persist

---

**Status**: 🔒 **SECURED** - API keys are now properly protected with environment variables.
