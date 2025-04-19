import { createClient } from '@supabase/supabase-js';

// Using the API key from your passwords.txt file
const supabaseUrl = 'https://wfrdwndvwcgdebmzhnbm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcmR3bmR2d2NnZGVibXpobmJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1OTA1NjIsImV4cCI6MjA1ODE2NjU2Mn0.AsCspuSwCr6v5opxoZ9_FNhyF8qSlDgdkCs0JNJ07UI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;