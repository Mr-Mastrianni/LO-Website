import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dgpnvvcumsnkwjvdwmwp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRncG52dmN1bXNua3dqdmR3bXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTIxNDUsImV4cCI6MjA2ODUyODE0NX0.8AogmK-SVrC0CWWGXg_e1IAkKcAolaslwzY7mre487Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);