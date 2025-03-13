import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client that can read/write cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Update both the request and response cookies
          request.cookies.set({
            name,
            value,
            ...options,
          } as any) // Type assertion to fix linter error
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // Update both the request and response cookies
          request.cookies.delete({
            name,
            ...options,
          } as any) // Type assertion to fix linter error
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.delete({
            name,
            ...options,
          })
        },
      },
    }
  )

  try {
    // This will refresh the session by calling getUser()
    // This is important as it validates the token with Supabase Auth
    const { data: { user } } = await supabase.auth.getUser()
    
    // Get the session (now that it's been refreshed)
    const { data: { session } } = await supabase.auth.getSession()
    
    // Log authentication status for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Middleware: User authenticated:', !!user)
    }
    
    // Get the URL path
    const path = request.nextUrl.pathname

    // Check if the path is the console or a subpath of console
    if (path.startsWith('/console')) {
      // If no session and trying to access protected route, redirect to home
      if (!user) {
        if (process.env.NODE_ENV === 'development') {
          console.log('No user found, redirecting to home')
        }
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    // If we have a session and we're on the home page, redirect to console
    if (user && path === '/') {
      if (process.env.NODE_ENV === 'development') {
        console.log('User found on home page, redirecting to console')
      }
      return NextResponse.redirect(new URL('/console', request.url))
    }
  } catch (error) {
    console.error('Middleware error:', error)
    // Continue with the response even if there's an error
  }
  
  // Return the response with refreshed auth cookies
  return response
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    // Apply this middleware to all routes except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
} 