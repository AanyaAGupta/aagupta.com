import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correctPassword = process.env.SITE_PASSWORD || 'dreams'

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true })
    // Set cookie with timestamp - expires in 2 seconds (just enough for redirect)
    // This ensures password is required on every page load
    const timestamp = Date.now().toString()
    response.cookies.set('site-auth', timestamp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2, // 2 seconds - expires almost immediately after redirect
    })
    return response
  }

  return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
}

