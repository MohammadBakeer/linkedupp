import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)
    
    // Check if the session was created successfully
    const { data: { session } } = await supabase.auth.getSession()
    
    // Only redirect to console if we have a valid session
    if (session) {
      // Make sure to use absolute URL for redirect
      return NextResponse.redirect(new URL('/console', requestUrl.origin))
    }
  }

  // If no code or session creation failed, redirect to home
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}
