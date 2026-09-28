import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE, hashPassword } from '@/lib/auth'

/**
 * Optional password protection: OFF by default.
 *
 * To turn it on, set these environment variables (e.g. in Vercel → Settings → Environment Variables):
 *   SITE_PASSWORD_ENABLED=true
 *   SITE_PASSWORD=<your password>
 * Remove SITE_PASSWORD_ENABLED (or set it to anything else) to turn it back off.
 */
export async function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD
  if (process.env.SITE_PASSWORD_ENABLED !== 'true' || !password) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get(AUTH_COOKIE)?.value
  if (cookie && cookie === (await hashPassword(password))) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/password'
  url.search = `?from=${encodeURIComponent(request.nextUrl.pathname)}`
  return NextResponse.redirect(url)
}

export const config = {
  // Everything except the password page itself, API routes, Next internals, and static files.
  matcher: ['/((?!password|api|_next/static|_next/image|icon.png|apple-icon.png|.*\\..*).*)'],
}
