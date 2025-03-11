import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // Create a Supabase client for the Route Handler
    const supabase = createRouteHandlerClient({ cookies })
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)
    
    // Get the session to verify it worked
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Auth callback: Session established:', !!session)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/console', request.url))
}
