'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PasswordPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password) {
      // Redirect with password in query string
      router.push(`/?password=${encodeURIComponent(password)}`)
    } else {
      setError('Please enter a password')
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-serif font-bold text-duke-blue">
            Enter Password
          </h1>
          <p className="text-gray-600">
            This site is password protected
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duke-blue focus:border-transparent"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-duke-blue text-white py-3 rounded-lg font-medium hover:bg-[#011a5c] transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

