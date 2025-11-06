import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a dummy client if credentials are missing (development fallback)
const dummyClient = {
  from: () => ({
    insert: async () => ({ data: null, error: new Error('Supabase not configured') }),
    select: async () => ({ data: null, error: new Error('Supabase not configured') }),
  }),
};

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : dummyClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing - using dummy client');
}
