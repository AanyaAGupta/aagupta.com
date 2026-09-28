'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// Only reachable when password protection is on (see middleware.ts).
function PasswordForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const from = useSearchParams().get('from') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        router.replace(from.startsWith('/') && !from.startsWith('//') ? from : '/')
        router.refresh()
      } else {
        setError('Incorrect password')
        setPassword('')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-5 text-center">
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setError('')
        }}
        placeholder="password"
        aria-label="Password"
        className="w-full border-b-2 border-granite/20 bg-transparent px-4 py-3 text-center text-lg focus:border-pine focus:outline-none"
        autoFocus
        disabled={loading}
      />
      {error && <p className="text-sm text-clay">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? '…' : 'Enter'}
      </button>
    </form>
  )
}

export default function PasswordPage() {
  // Covers the site nav/footer so nothing is visible before unlocking.
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-chalk px-6">
      <Suspense>
        <PasswordForm />
      </Suspense>
    </div>
  )
}
