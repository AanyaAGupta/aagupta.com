import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE, hashPassword } from '@/lib/auth'

// See middleware.ts for how to turn password protection on.
export async function POST(request: NextRequest) {
  const correctPassword = process.env.SITE_PASSWORD
  if (process.env.SITE_PASSWORD_ENABLED !== 'true' || !correctPassword) {
    return NextResponse.json({ success: true })
  }

  const { password } = await request.json()
  if (password !== correctPassword) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(AUTH_COOKIE, await hashPassword(correctPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // stay unlocked for a week
  })
  return response
}
