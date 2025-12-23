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

  // Always require password - no cookies, check happens client-side
  // The client will handle redirecting to password page if needed
  return NextResponse.next()
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

