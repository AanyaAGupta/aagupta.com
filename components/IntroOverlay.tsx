'use client'

import { useCallback, useEffect, useState } from 'react'

// Full-screen sunrise intro: ridges rise, the sun comes up, a little climber summits and plants a flag, the name
// appears, then the scene lifts away. Plays once per browser session; click / any key / "Skip" ends it early.
// The inline script in app/layout.tsx hides it before paint when it was already seen or motion is reduced.

const TOTAL_MS = 3600
const EXIT_MS = 750

export default function IntroOverlay() {
  const [state, setState] = useState<'playing' | 'leaving' | 'done'>('playing')

  const leave = useCallback(() => {
    setState((s) => (s === 'playing' ? 'leaving' : s))
  }, [])

  useEffect(() => {
    if (document.documentElement.dataset.intro === 'skip') {
      setState('done')
      return
    }
    try {
      sessionStorage.setItem('intro-seen', '1')
    } catch {}
    const t = setTimeout(leave, TOTAL_MS)
    const onKey = () => leave()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [leave])

  useEffect(() => {
    if (state !== 'leaving') return
    document.body.style.overflow = ''
    const t = setTimeout(() => setState('done'), EXIT_MS)
    return () => clearTimeout(t)
  }, [state])

  if (state === 'done') return null

  return (
    <div
      className={`intro-overlay fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[#F7EFE6] ${
        state === 'leaving' ? 'intro-exit' : ''
      }`}
      onClick={leave}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="intro-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7EFE6" />
            <stop offset="65%" stopColor="#F6DCC8" />
            <stop offset="100%" stopColor="#EFC3A6" />
          </linearGradient>
          <radialGradient id="intro-glow">
            <stop offset="0%" stopColor="#F2A879" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F2A879" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#intro-sky)" />

        {/* Sun */}
        <g className="intro-sun">
          <circle cx="1060" cy="470" r="230" fill="url(#intro-glow)" />
          <circle cx="1060" cy="470" r="86" fill="#E58E5E" />
        </g>

        {/* Ridges, back to front */}
        <path
          className="intro-ridge [animation-delay:0ms]"
          d="M0 610 L170 520 L330 575 L520 440 L700 525 L860 415 L1040 505 L1220 430 L1440 515 L1440 900 L0 900 Z"
          fill="#D8C9B5"
        />
        <path
          className="intro-ridge [animation-delay:140ms]"
          d="M0 700 L160 635 L340 690 L540 565 L720 640 L900 545 L1100 650 L1280 580 L1440 640 L1440 900 L0 900 Z"
          fill="#7F9A88"
        />
        <g className="intro-ridge [animation-delay:280ms]">
          <path
            d="M0 820 L220 760 L420 800 L600 560 L720 380 L800 470 L880 430 L1020 620 L1200 740 L1440 700 L1440 900 L0 900 Z"
            fill="#2F4A3C"
          />
          {/* Snow on the summit */}
          <path d="M664 465 L720 380 L772 444 L750 455 L731 433 L706 463 L689 449 Z" fill="#F7F3EC" opacity="0.92" />

          {/* Climber hiking up the left ridge */}
          <g className="intro-climber">
            <g transform="translate(0 -32) scale(1.7)">
              <circle cx="0" cy="-14" r="5.5" fill="#1D1511" />
              <path d="M-5.6 -15 A5.8 5.8 0 0 1 5.6 -15 Z" fill="#E58E5E" />
              <path d="M-4 -8 L4 -8 L3 6 L-3 6 Z" fill="#FFFFFF" />
              <rect x="-4.5" y="4" width="9" height="3" rx="1.5" fill="#1E8A7E" />
              <path d="M-2 7 L-5 19 M2 7 L5 19" stroke="#F7F3EC" strokeWidth="3" strokeLinecap="round" />
              <path d="M-4 -6 L-9 2 M4 -6 L10 -3" stroke="#F7F3EC" strokeWidth="2.6" strokeLinecap="round" />
              <rect x="-7" y="-8" width="5" height="9" rx="2" fill="#E58E5E" />
            </g>
          </g>

          {/* Summit flag */}
          <g className="intro-flag">
            <line x1="724" y1="382" x2="724" y2="330" stroke="#F7F3EC" strokeWidth="3" strokeLinecap="round" />
            <path d="M724 332 L762 343 L724 356 Z" fill="#E58E5E" />
          </g>
        </g>
      </svg>

      {/* Name */}
      <div className="absolute inset-x-0 top-[16%] px-6 text-center sm:top-[18%]">
        <p className="intro-title font-serif text-5xl font-semibold tracking-tight text-[#2A2825] sm:text-7xl">
          Aanya Gupta
        </p>
        <p className="intro-title mt-3 text-base text-[#5F5A52] [animation-delay:2550ms] sm:text-lg">
          Biomedical + electrical & computer engineering at Duke
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          leave()
        }}
        className="absolute bottom-5 right-5 rounded-full bg-white/70 px-4 py-1.5 text-sm text-[#2A2825] backdrop-blur hover:bg-white"
      >
        Skip
      </button>
    </div>
  )
}
