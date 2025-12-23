import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correctPassword = process.env.SITE_PASSWORD || 'dreams'

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true })
    // Set session cookie (expires when browser closes)
    response.cookies.set('site-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      // No maxAge = session cookie (expires when browser closes)
    })
    return response
  }

  return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
}

