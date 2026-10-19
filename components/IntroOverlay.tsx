'use client'

import { useCallback, useEffect, useState } from 'react'

// Full-screen sunset intro: the scene fades in, the sun settles toward the horizon, the name appears, then it all
// fades away. Plays once per browser session; click / any key / "Skip" ends it early. The inline script in
// app/layout.tsx hides it before paint when it was already seen or motion is reduced.

const TOTAL_MS = 3300
const EXIT_MS = 800
const W = 1440
const H = 900

// Smooth, natural-looking ridgeline from layered sine waves (deterministic, so server and client match).
function ridgeY(x: number, base: number, amp: number, seed: number) {
  return (
    base -
    amp *
      (0.55 * Math.sin(x * 0.0042 + seed) +
        0.3 * Math.sin(x * 0.011 + seed * 2.1) +
        0.15 * Math.sin(x * 0.027 + seed * 3.7) +
        0.5)
  )
}

function ridge(base: number, amp: number, seed: number) {
  let d = `M0 ${ridgeY(0, base, amp, seed).toFixed(1)}`
  for (let x = 10; x <= W; x += 10) d += ` L${x} ${ridgeY(x, base, amp, seed).toFixed(1)}`
  return `${d} L${W} ${H} L0 ${H} Z`
}

// Far → near: lighter and hazier in the distance (atmospheric perspective), darker up close.
const RIDGES = [
  { d: ridge(600, 70, 1.3), fill: '#9C7A92' },
  { d: ridge(660, 90, 4.2), fill: '#6D5476' },
  { d: ridge(735, 110, 2.6), fill: '#43354F' },
  { d: ridge(830, 120, 5.9), fill: '#1F1A28' },
]

// A tiny hiker standing on the nearest ridge, arms up.
const HIKER_X = 1010
const HIKER_Y = ridgeY(HIKER_X, 830, 120, 5.9)

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
      className={`intro-overlay fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[#1F2747] ${
        state === 'leaving' ? 'intro-exit' : ''
      }`}
      onClick={leave}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        className="intro-scene absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="intro-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F2747" />
            <stop offset="30%" stopColor="#3E3A68" />
            <stop offset="50%" stopColor="#8A4F78" />
            <stop offset="63%" stopColor="#D1667A" />
            <stop offset="73%" stopColor="#F08A5D" />
            <stop offset="80%" stopColor="#FBBF6E" />
            <stop offset="100%" stopColor="#FCD9A0" />
          </linearGradient>
          <radialGradient id="intro-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFE6B0" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#FFC27A" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#F28A5E" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#F28A5E" stopOpacity="0" />
          </radialGradient>
          <filter id="intro-soft" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient id="intro-haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBC27A" stopOpacity="0" />
            <stop offset="100%" stopColor="#FBC27A" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill="url(#intro-sky)" />

        {/* Thin clouds low in the sky, lit from below */}
        <g opacity="0.6" filter="url(#intro-soft)">
          <ellipse cx="330" cy="455" rx="240" ry="7" fill="#F5A783" />
          <ellipse cx="470" cy="472" rx="150" ry="5" fill="#F9BE8E" />
          <ellipse cx="1150" cy="430" rx="210" ry="6" fill="#EC967F" />
          <ellipse cx="1040" cy="448" rx="120" ry="4.5" fill="#F5AE88" />
        </g>

        {/* Sun, settling toward the horizon */}
        <g className="intro-sun">
          <circle cx="760" cy="590" r="400" fill="url(#intro-glow)" />
          <circle cx="760" cy="590" r="56" fill="#FFE9B8" />
        </g>

        {RIDGES.map((r, i) => (
          <g key={i}>
            <path d={r.d} fill={r.fill} />
            {i < RIDGES.length - 1 && <path d={r.d} fill="url(#intro-haze)" />}
          </g>
        ))}

        {/* Hiker silhouette */}
        <g
          transform={`translate(${HIKER_X} ${(HIKER_Y - 1).toFixed(1)})`}
          fill="#1F1A28"
          stroke="#1F1A28"
          strokeLinecap="round"
        >
          <circle cx="0" cy="-27" r="3.6" stroke="none" />
          <path d="M0 -23 L0 -11" strokeWidth="4" />
          <path d="M0 -21 L-6 -31 M0 -21 L6 -31" strokeWidth="2.2" />
          <path d="M0 -11 L-3.5 0 M0 -11 L3.5 0" strokeWidth="2.6" />
        </g>
      </svg>

      {/* Name */}
      <div className="absolute inset-x-0 top-[22%] px-6 text-center">
        <p
          className="intro-title font-serif text-5xl font-medium tracking-tight text-white sm:text-7xl"
          style={{ textShadow: '0 2px 24px rgba(31, 26, 40, 0.35)' }}
        >
          Aanya Gupta
        </p>
        <p className="intro-title mt-4 text-base text-white/80 [animation-delay:900ms] sm:text-lg">
          Engineering at Duke
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          leave()
        }}
        className="absolute bottom-5 right-5 rounded-full border border-white/30 px-4 py-1.5 text-sm text-white/85 hover:bg-white/10"
      >
        Skip
      </button>
    </div>
  )
}
