import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// Client component Supabase client (for use in client components)
export const createClientSideSupabaseClient = () => {
  return createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options: {
      auth: {
        persistSession: true,
        storageKey: 'supabase-auth',
        storage: {
          getItem: (key) => {
            if (typeof window === 'undefined') {
              return null;
            }
            return document.cookie
              .split('; ')
              .find((row) => row.startsWith(`${key}=`))
              ?.split('=')[1];
          },
          setItem: (key, value) => {
            if (typeof window === 'undefined') {
              return;
            }
            document.cookie = `${key}=${value}; path=/; max-age=2592000`; // 30 days
          },
          removeItem: (key) => {
            if (typeof window === 'undefined') {
              return;
            }
            document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          },
        },
      },
    },
  });
};

// Default export for convenience
export default createClientSideSupabaseClient; 