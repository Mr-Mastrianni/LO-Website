import { createClient } from '@supabase/supabase-js';

// Get Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://whaeitueennbgdnhwmwo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoYWVpdHVlZW5uYmdkbmh3bXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzY1OTUsImV4cCI6MjA2OTY1MjU5NX0.eYGDUIsE399_BZyUt8Mj0Yx1s0BSUaI_IIj4otbaYmg';

// Validate that configuration is available
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Please check your environment variables or fallback values.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection on load (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase client initialized with URL:', supabaseUrl);

  // Test basic connectivity
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection test successful');
    }
  }).catch(err => {
    console.error('Supabase connection error:', err);
  });
}