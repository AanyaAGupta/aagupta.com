import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if password protection is enabled
  const isProtected = process.env.PASSWORD_PROTECTED === 'true'
  
  // If protection is disabled, allow all access
  if (!isProtected) {
    return NextResponse.next()
  }

  // Get password from URL query parameter (session-based, no cookies)
  const password = request.nextUrl.searchParams.get('password')
  const correctPassword = process.env.SITE_PASSWORD || 'dreams'

  // If on password page, allow it
  if (request.nextUrl.pathname === '/password') {
    return NextResponse.next()
  }

  // Check if correct password is in URL
  if (password === correctPassword) {
    // Allow access but don't set cookie - password needed every time
    return NextResponse.next()
  }

  // If password was provided but incorrect, redirect to password page with error
  if (password && password !== correctPassword) {
    return NextResponse.redirect(new URL('/password?error=invalid', request.url))
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
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.svg).*)',
  ],
}

