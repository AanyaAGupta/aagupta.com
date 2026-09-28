'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/climb', label: 'The Climb' },
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About Me' },
  { href: '/resume', label: 'Resume' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-granite/10 bg-chalk/85 backdrop-blur">
      <nav className="container-site flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-granite transition-colors hover:text-pine"
          onClick={() => setOpen(false)}
        >
          Aanya Gupta
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <ul className="flex items-center gap-7">
            {links.map((l) => {
              const active = pathname === l.href
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-sm transition-colors ${
                      active ? 'font-semibold text-pine' : 'text-granite-muted hover:text-pine'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ThemeToggle />
        </div>

        <div className="-mr-2 flex items-center md:hidden">
          <ThemeToggle />
          <button
            className="p-2 text-granite"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="container-site space-y-1 border-t border-granite/10 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-2 py-2.5 ${
                  pathname === l.href ? 'font-semibold text-pine' : 'text-granite'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
