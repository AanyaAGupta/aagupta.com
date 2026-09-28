// Shared by middleware (edge runtime) and the password API route, so this sticks to Web Crypto.

export const AUTH_COOKIE = 'site-auth'

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`aagupta.com:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
