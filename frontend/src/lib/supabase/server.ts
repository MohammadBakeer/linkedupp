import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for use in server components
 * This should be used in any server component or server action
 */
export async function createClient() {
  // Get the cookies from the request
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // Server components can't set or remove cookies, so these are no-ops
        set: () => {},
        remove: () => {},
      },
    }
  )
} 