import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if password protection is enabled
  const isProtected = process.env.PASSWORD_PROTECTED === 'true'
  
  // If protection is disabled, allow all access
  if (!isProtected) {
    return NextResponse.next()
  }

  // Allow access to password page and API routes
  if (request.nextUrl.pathname === '/password' || request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Check for auth cookie with timestamp
  const authCookie = request.cookies.get('site-auth')?.value

  // If cookie exists, check if it's recent (within last 2 seconds)
  if (authCookie) {
    const timestamp = parseInt(authCookie)
    const now = Date.now()
    // Only allow if cookie was set within last 2 seconds (just for redirect)
    if (!isNaN(timestamp) && (now - timestamp) < 2000) {
      return NextResponse.next()
    }
    // Cookie expired or invalid, clear it
    const response = NextResponse.redirect(new URL('/password', request.url))
    response.cookies.delete('site-auth')
    return response
  }

  // Otherwise, redirect to password page
  return NextResponse.redirect(new URL('/password', request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - password (password page itself)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.svg|password).*)',
  ],
}

