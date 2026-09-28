'use client'

import { useState } from 'react'
import { profile } from '@/lib/content'
import { MailIcon } from './Marks'

export default function CopyEmail({ showAddress = false, className = '' }: { showAddress?: boolean; className?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <button
      onClick={copy}
      className={`relative inline-flex items-center gap-2 transition-colors hover:text-pine ${className}`}
      aria-label="Copy email address"
      title={copied ? 'Copied!' : 'Copy email'}
    >
      <MailIcon />
      {showAddress && <span className="text-sm">{profile.email}</span>}
      <span
        className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-granite px-2 py-0.5 text-xs text-chalk transition-opacity ${
          copied ? 'opacity-100' : 'opacity-0'
        }`}
        aria-live="polite"
      >
        {copied ? 'Copied!' : ''}
      </span>
    </button>
  )
}
