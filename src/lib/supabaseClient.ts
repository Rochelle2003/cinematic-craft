import { createClient } from '@supabase/supabase-js';

// Supabase project URL and public anon key
const supabaseUrl = 'https://ryehatyshyahybxmrntc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZWhhdHlzaHlhaHlieG1ybnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTY0OTMsImV4cCI6MjA2ODgzMjQ5M30.gFVGs4-tv8H-O24zWYgykP-b-_-blRk_dB5wmy3w_I';

// Create a single Supabase client for the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 