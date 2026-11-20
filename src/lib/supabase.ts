import { createClient } from '@supabase/supabase-js';


const url: string =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://vxagataaejcqsrojdniw.supabase.co';
const key: string =
  import.meta.env.VITE_SUPABASE_KEY ??
  'sb_publishable_uLw1ATn9KgqiUN4SkAU3rg_A6TPsMeL';

export const supabase = createClient(url, key, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const redirectUrl = `${window.location.origin}${window.location.pathname}`;

export function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: redirectUrl },
  });
}