import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for use in client components
 * This should be used in any component with the 'use client' directive
 */
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
} 