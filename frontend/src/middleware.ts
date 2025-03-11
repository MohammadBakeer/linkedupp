import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  try {
    // Create a Supabase client for the middleware
    const supabase = createMiddlewareClient({ req, res })
    
    // Refresh the session if it exists
    const { data: { session } } = await supabase.auth.getSession()
    
    // Log authentication status for debugging
    console.log('Middleware: User authenticated:', !!session)
    
    // Get the URL path
    const path = req.nextUrl.pathname

    // Check if the path is the console or a subpath of console
    if (path.startsWith('/console')) {
      // If no session and trying to access protected route, redirect to home
      if (!session) {
        console.log('No session found, redirecting to home')
        const redirectUrl = new URL('/', req.url)
        return NextResponse.redirect(redirectUrl)
      }
    }

    // If we have a session and we're on the home page, redirect to console
    if (session && path === '/') {
      console.log('Session found on home page, redirecting to console')
      const redirectUrl = new URL('/console', req.url)
      return NextResponse.redirect(redirectUrl)
    }
  } catch (error) {
    console.error('Middleware error:', error)
    // Continue with the response even if there's an error
  }
  
  // Continue with the response
  return res
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    // Apply this middleware to all routes except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
} 