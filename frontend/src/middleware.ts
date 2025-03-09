import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get the current session
  const { data: { session } } = await supabase.auth.getSession()

  // Get the URL path
  const path = req.nextUrl.pathname

  // Check if the path is the console or a subpath of console
  if (path.startsWith('/console')) {
    // If no session and trying to access protected route, redirect to home
    if (!session) {
      const redirectUrl = new URL('/', req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // If we have a session and we're on the home page, redirect to console
  if (session && path === '/') {
    const redirectUrl = new URL('/console', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Only run middleware on relevant paths
export const config = {
  matcher: ['/', '/console/:path*', '/auth/callback'],
} 