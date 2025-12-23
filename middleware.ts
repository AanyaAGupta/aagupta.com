import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const password = request.nextUrl.searchParams.get('password')
  const cookiePassword = request.cookies.get('site-password')?.value

  // Get password from environment variable
  const correctPassword = process.env.SITE_PASSWORD || 'dreams'

  // If password is provided in URL and correct, set cookie
  if (password === correctPassword) {
    const response = NextResponse.next()
    response.cookies.set('site-password', correctPassword, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    return response
  }

  // If cookie exists and is correct, allow access
  if (cookiePassword === correctPassword) {
    return NextResponse.next()
  }

  // Otherwise, show password page
  if (request.nextUrl.pathname !== '/password') {
    return NextResponse.redirect(new URL('/password', request.url))
  }

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
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.svg).*)',
  ],
}

