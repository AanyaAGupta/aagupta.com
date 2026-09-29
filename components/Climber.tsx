'use client'

import { useEffect, useRef, useState } from 'react'

// A little Aanya climbing a rock wall: ponytail, cream top, teal jacket tied at the waist. She climbs one limb at a
// time (two-bone IK for elbows/knees, springy body motion, uneven timing), sometimes stops to shake out and chalk up,
// celebrates at the top, then lowers off and goes again. Click her to say hi.
// Visitors who prefer reduced motion see a still pose.

type V = { x: number; y: number }
type Limb = 'lh' | 'rh' | 'lf' | 'rf'
type Phase = 'climb' | 'shake' | 'top' | 'lower'

const W = 120
const TOP_PAD = 18 // room above the wall for her raised arms and the speech bubble
const H = 200
const LEVEL_GAP = 20
const TOP_LEVEL = 8
const levelY = (n: number) => 186 - n * LEVEL_GAP
const JITTER = [0, 3, -2, 4, 1, -3, 2, 0, 3]
const hold = (n: number, side: 'l' | 'r'): V => ({
  x: (side === 'l' ? 44 : 76) + (side === 'l' ? -1 : 1) * JITTER[n % 9],
  y: levelY(n),
})

const ARM = [10.5, 10.5]
const LEG = [12, 13]
const ORDER: Limb[] = ['rh', 'lf', 'lh', 'rf']
const START: Record<Limb, number> = { lh: 3, rh: 3, lf: 0, rf: 0 }
const sideOf = (l: Limb) => (l[0] === 'l' ? 'l' : 'r') as 'l' | 'r'
const sign = (l: Limb) => (sideOf(l) === 'l' ? -1 : 1)

const COLORS = {
  skin: '#A96C4C',
  hair: '#1D1511',
  top: '#FFFFFF',
  jacket: '#1E8A7E',
  leggings: '#2B2A2E',
  shoe: '#C0643E',
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const lerp = (a: V, b: V, t: number): V => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })

function ik(root: V, target: V, [a, b]: number[], outwardX: number): V {
  const dx = target.x - root.x
  const dy = target.y - root.y
  const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(a - b) + 0.01), a + b - 0.01)
  const theta = Math.atan2(dy, dx)
  const alpha = Math.acos((a * a + d * d - b * b) / (2 * a * d))
  const j1 = { x: root.x + a * Math.cos(theta + alpha), y: root.y + a * Math.sin(theta + alpha) }
  const j2 = { x: root.x + a * Math.cos(theta - alpha), y: root.y + a * Math.sin(theta - alpha) }
  return Math.abs(j1.x - outwardX) > Math.abs(j2.x - outwardX) ? j1 : j2
}

function startEnds(): Record<Limb, V> {
  return { lh: hold(START.lh, 'l'), rh: hold(START.rh, 'r'), lf: hold(START.lf, 'l'), rf: hold(START.rf, 'r') }
}

function bodyGoal(ends: Record<Limb, V>): V {
  const hands = (ends.lh.y + ends.rh.y) / 2
  const feet = (ends.lf.y + ends.rf.y) / 2
  return { x: (ends.lh.x + ends.rh.x + ends.lf.x + ends.rf.x) / 4, y: (hands + feet) / 2 + 2 }
}

type Pose = {
  body: V
  ends: Record<Limb, V>
  tail: V
  puff: { at: V; age: number } | null
  headTurn: number
  breath: number
}

function restingPose(): Pose {
  const ends = startEnds()
  const body = bodyGoal(ends)
  return { body, ends, tail: { x: body.x, y: body.y - 8 }, puff: null, headTurn: 0, breath: 0 }
}

export default function Climber({ className = '' }: { className?: string }) {
  const [pose, setPose] = useState<Pose>(restingPose)
  const [hi, setHi] = useState(false)
  const hiTimer = useRef<ReturnType<typeof setTimeout>>()

  const sim = useRef({
    phase: 'climb' as Phase,
    phaseStart: 0,
    levels: { ...START },
    step: 0,
    movesSinceRest: 0,
    wait: 300,
    moving: null as null | { limb: Limb; from: V; to: V; dur: number; start: number },
    shake: null as null | { limb: Limb; hold: V; puffed: boolean },
    lowerFrom: 0,
    vel: { x: 0, y: 0 },
    tailVel: { x: 0, y: 0 },
    pose: restingPose(),
  })

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const s = sim.current
    let raf = 0
    let last = performance.now()
    s.phaseStart = last

    const setPhase = (phase: Phase, now: number) => {
      s.phase = phase
      s.phaseStart = now
    }

    const tick = (now: number) => {
      const dt = Math.min(0.04, (now - last) / 1000)
      last = now
      const p = s.pose
      const ends = { ...p.ends }
      const since = now - s.phaseStart
      let goal = bodyGoal(ends)
      let puff = p.puff && p.puff.age < 0.7 ? { ...p.puff, age: p.puff.age + dt } : null
      let headTurn = p.headTurn * 0.9

      if (s.phase === 'climb') {
        if (!s.moving && since > s.wait) {
          // Occasionally rest: shake out an arm and chalk up.
          if (s.movesSinceRest > 5 && Math.random() < 0.35) {
            const limb: Limb = Math.random() < 0.5 ? 'lh' : 'rh'
            s.shake = { limb, hold: ends[limb], puffed: false }
            s.movesSinceRest = 0
            setPhase('shake', now)
          } else {
            const limb = ORDER[s.step % 4]
            const next = s.levels[limb] + 1
            const isHand = limb[1] === 'h'
            s.moving = {
              limb,
              from: ends[limb],
              to: hold(next, sideOf(limb)),
              dur: isHand ? rand(420, 680) : rand(340, 520),
              start: now,
            }
            s.levels[limb] = next
          }
        }
        if (s.moving) {
          const { limb, from, to, dur, start } = s.moving
          const t = Math.min(1, (now - start) / dur)
          const e = ease(t)
          const reach = Math.sin(Math.PI * t)
          ends[limb] = { x: from.x + (to.x - from.x) * e + sign(limb) * 4 * reach, y: from.y + (to.y - from.y) * e }
          goal = bodyGoal(ends)
          // Weight shift away from the moving limb, and a little dip before a hand reach.
          goal.x -= sign(limb) * 3 * reach
          if (limb[1] === 'h') goal.y += t < 0.3 ? 2.5 * Math.sin((Math.PI * t) / 0.3) : 0
          headTurn = sign(limb) * 1.6 * reach
          if (t >= 1) {
            ends[limb] = to
            if (limb[1] === 'h') puff = { at: to, age: 0 }
            s.moving = null
            s.step += 1
            s.movesSinceRest += 1
            s.phaseStart = now
            s.wait = Math.random() < 0.18 ? rand(450, 800) : rand(90, 260)
            if (s.levels.lh >= TOP_LEVEL && s.levels.rh >= TOP_LEVEL && s.step % 4 === 0) setPhase('top', now)
          }
        }
      } else if (s.phase === 'shake' && s.shake) {
        const { limb, hold: h } = s.shake
        // Keep her weight on the hold she let go of, so the body doesn't sag while shaking out.
        goal = bodyGoal({ ...ends, [limb]: h })
        const sgn = sign(limb)
        const shoulder = { x: p.body.x + sgn * 6, y: p.body.y - 11 }
        const bag = { x: p.body.x - 2, y: p.body.y + 10 }
        if (since < 900) {
          const dangle = { x: shoulder.x + sgn * 3 + Math.sin(now / 45) * 2.2, y: shoulder.y + 19 }
          ends[limb] = lerp(p.ends[limb], dangle, Math.min(1, dt * 12))
          goal.x += sgn * -2
        } else if (since < 1300) {
          ends[limb] = lerp(p.ends[limb], bag, Math.min(1, dt * 14))
          if (!s.shake.puffed && since > 1100) {
            puff = { at: bag, age: 0 }
            s.shake.puffed = true
          }
        } else if (since < 1650) {
          ends[limb] = lerp(bag, h, ease((since - 1300) / 350))
        } else {
          ends[limb] = h
          s.shake = null
          s.wait = rand(120, 300)
          setPhase('climb', now)
        }
      } else if (s.phase === 'top') {
        // Arms up in a V to celebrate.
        const up = Math.min(1, since / 350)
        ends.lh = lerp(hold(TOP_LEVEL, 'l'), { x: p.body.x - 15, y: p.body.y - 31 }, ease(up))
        ends.rh = lerp(hold(TOP_LEVEL, 'r'), { x: p.body.x + 15, y: p.body.y - 31 + Math.sin(now / 90) * 2 }, ease(up))
        goal = bodyGoal({ ...ends, lh: hold(TOP_LEVEL, 'l'), rh: hold(TOP_LEVEL, 'r') })
        if (since > 2300) {
          s.lowerFrom = p.body.y
          setPhase('lower', now)
        }
      } else if (s.phase === 'lower') {
        // Lower off: hands on the rope, feet bouncing down the wall.
        const dur = 2600
        const t = Math.min(1, since / dur)
        const endY = bodyGoal(startEnds()).y
        const y = s.lowerFrom + (endY - s.lowerFrom) * ease(t)
        const hop = Math.abs(Math.sin(since / 170)) * 3 * (1 - t)
        goal = { x: 60, y }
        const b = p.body
        ends.lh = lerp(p.ends.lh, { x: b.x - 1.5, y: b.y - 27 }, Math.min(1, dt * 10))
        ends.rh = lerp(p.ends.rh, { x: b.x + 1.5, y: b.y - 21 }, Math.min(1, dt * 10))
        ends.lf = lerp(p.ends.lf, { x: b.x - 9, y: b.y + 25 - hop }, Math.min(1, dt * 12))
        ends.rf = lerp(p.ends.rf, { x: b.x + 9, y: b.y + 25 - hop }, Math.min(1, dt * 12))
        if (t >= 1) {
          // Step back onto the starting holds and go again.
          const start = startEnds()
          ;(Object.keys(start) as Limb[]).forEach((l) => (ends[l] = lerp(ends[l], start[l], 1)))
          s.levels = { ...START }
          s.step = 0
          s.movesSinceRest = 0
          s.wait = 700
          setPhase('climb', now)
        }
      }

      // Springy body (slightly underdamped so moves settle naturally).
      const k = 70
      const c = 13
      s.vel.x += ((goal.x - p.body.x) * k - s.vel.x * c) * dt
      s.vel.y += ((goal.y - p.body.y) * k - s.vel.y * c) * dt
      const body = { x: p.body.x + s.vel.x * dt, y: p.body.y + s.vel.y * dt }

      // Ponytail tip trails behind the head.
      const anchor = { x: body.x, y: body.y - 20 }
      const rest = { x: anchor.x, y: anchor.y + 12 }
      s.tailVel.x += ((rest.x - p.tail.x) * 90 - s.tailVel.x * 7) * dt
      s.tailVel.y += ((rest.y - p.tail.y) * 90 - s.tailVel.y * 7) * dt
      let tail = { x: p.tail.x + s.tailVel.x * dt, y: p.tail.y + s.tailVel.y * dt }
      const len = Math.hypot(tail.x - anchor.x, tail.y - anchor.y)
      if (len > 13)
        tail = { x: anchor.x + ((tail.x - anchor.x) * 13) / len, y: anchor.y + ((tail.y - anchor.y) * 13) / len }

      s.pose = {
        body,
        ends,
        tail,
        puff,
        headTurn,
        breath: Math.sin(now / 600) * 0.6,
      }
      setPose(s.pose)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const sayHi = () => {
    setHi(true)
    clearTimeout(hiTimer.current)
    hiTimer.current = setTimeout(() => setHi(false), 1600)
  }

  const { body, ends, tail, puff, headTurn, breath } = pose
  const bx = body.x
  const by = body.y + breath
  const shoulderL = { x: bx - 5.5, y: by - 11 }
  const shoulderR = { x: bx + 5.5, y: by - 11 }
  const hipL = { x: bx - 3.8, y: by + 8 }
  const hipR = { x: bx + 3.8, y: by + 8 }
  const head = { x: bx + headTurn, y: by - 19 }
  const elbowL = ik(shoulderL, ends.lh, ARM, bx)
  const elbowR = ik(shoulderR, ends.rh, ARM, bx)
  const kneeL = ik(hipL, ends.lf, LEG, bx)
  const kneeR = ik(hipR, ends.rf, LEG, bx)
  const anchor = { x: 60, y: 12 }
  const harness = { x: bx, y: by + 6 }

  const seg = (a: V, b: V) => `M${a.x.toFixed(2)} ${a.y.toFixed(2)} L${b.x.toFixed(2)} ${b.y.toFixed(2)}`

  return (
    <svg
      viewBox={`0 ${-TOP_PAD} ${W} ${H + TOP_PAD}`}
      className={`cursor-pointer select-none ${className}`}
      role="img"
      aria-label="Animated drawing of Aanya climbing a rock wall. Click to say hi."
      onClick={sayHi}
    >
      {/* Wall */}
      <path
        d="M16 198 L8 150 L18 104 L10 58 L26 8 L94 6 L110 52 L102 100 L114 150 L104 198 Z"
        className="fill-sand stroke-granite/15"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M28 30 L36 60 L30 92 M92 120 L84 150 L90 184 M22 132 L32 140"
        className="stroke-granite/15"
        strokeWidth={1.2}
        fill="none"
      />

      {/* Holds */}
      {Array.from({ length: TOP_LEVEL + 1 }, (_, n) =>
        (['l', 'r'] as const).map((side) => {
          const h = hold(n, side)
          return (
            <ellipse
              key={`${n}${side}`}
              cx={h.x}
              cy={h.y + 1.5}
              rx={3.6}
              ry={2.6}
              className={(n + (side === 'l' ? 0 : 1)) % 3 === 0 ? 'fill-pine/70' : 'fill-clay/80'}
            />
          )
        }),
      )}

      {/* Anchor + rope */}
      <circle cx={anchor.x} cy={anchor.y} r={2.8} className="fill-none stroke-granite/60" strokeWidth={1.4} />
      <line x1={anchor.x + 1} y1={anchor.y + 2} x2={66} y2={H} className="stroke-clay/40" strokeWidth={1.1} />
      <path
        d={`M${anchor.x - 1} ${anchor.y + 2} Q ${(anchor.x + harness.x) / 2 - 3} ${(anchor.y + harness.y) / 2} ${harness.x} ${harness.y}`}
        className="stroke-clay/80"
        strokeWidth={1.2}
        fill="none"
      />

      {/* Chalk puff */}
      {puff && (
        <circle
          cx={puff.at.x}
          cy={puff.at.y - 1}
          r={2 + puff.age * 11}
          fill="#ffffff"
          style={{ opacity: Math.max(0, 0.75 - puff.age * 1.1) }}
        />
      )}

      <g strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Legs: leggings + shoes */}
        <path
          d={seg(hipL, kneeL) + seg(kneeL, ends.lf).replace('M', ' M')}
          stroke={COLORS.leggings}
          strokeWidth={3.6}
        />
        <path
          d={seg(hipR, kneeR) + seg(kneeR, ends.rf).replace('M', ' M')}
          stroke={COLORS.leggings}
          strokeWidth={3.6}
        />
        <path d={seg(ends.lf, { x: ends.lf.x - 2.5, y: ends.lf.y + 0.5 })} stroke={COLORS.shoe} strokeWidth={3.4} />
        <path d={seg(ends.rf, { x: ends.rf.x + 2.5, y: ends.rf.y + 0.5 })} stroke={COLORS.shoe} strokeWidth={3.4} />

        {/* Torso (cream top) */}
        <path
          d={`M${bx - 5.5} ${by - 12} L${bx + 5.5} ${by - 12} L${bx + 4.2} ${by + 6} L${bx - 4.2} ${by + 6} Z`}
          fill={COLORS.top}
          stroke="#A89B86"
          strokeWidth={1.1}
        />
        {/* Teal jacket tied at the waist, sleeves hanging */}
        <path
          d={seg({ x: bx - 5, y: by + 5.5 }, { x: bx + 5, y: by + 5.5 })}
          stroke={COLORS.jacket}
          strokeWidth={3.6}
        />
        <path d={`M${bx - 1} ${by + 6} q -2 5 -1 9`} stroke={COLORS.jacket} strokeWidth={2.4} />
        <path d={`M${bx + 1.5} ${by + 6} q 2 4 1.5 8`} stroke={COLORS.jacket} strokeWidth={2.4} />
        {/* Chalk bag */}
        <rect x={bx - 4} y={by + 7.5} width={3.6} height={3.4} rx={1} className="fill-clay" />

        {/* Arms: skin */}
        <path
          d={seg(shoulderL, elbowL) + seg(elbowL, ends.lh).replace('M', ' M')}
          stroke={COLORS.skin}
          strokeWidth={2.9}
        />
        <path
          d={seg(shoulderR, elbowR) + seg(elbowR, ends.rh).replace('M', ' M')}
          stroke={COLORS.skin}
          strokeWidth={2.9}
        />

        {/* Ponytail */}
        <path
          d={`M${head.x} ${head.y + 2} Q ${(head.x + tail.x) / 2 + (tail.x - head.x) * 0.4} ${(head.y + tail.y) / 2 + 2} ${tail.x.toFixed(2)} ${tail.y.toFixed(2)}`}
          stroke={COLORS.hair}
          strokeWidth={3.4}
        />
      </g>

      {/* Head (back of head, dark hair) + neck */}
      <rect x={bx - 1.4} y={by - 15} width={2.8} height={3.5} fill={COLORS.skin} />
      <circle cx={head.x} cy={head.y} r={5} fill={COLORS.hair} />
      <circle cx={head.x} cy={head.y - 4.2} r={1.6} fill={COLORS.hair} />

      {/* Speech bubble */}
      {hi && (
        <g transform={`translate(${Math.min(bx + 8, 78)} ${head.y - 22})`}>
          <rect width={34} height={15} rx={7.5} fill="#ffffff" stroke="#d9d1c3" strokeWidth={0.8} />
          <path d="M6 14.5 l-2 5 l7 -5 z" fill="#ffffff" />
          <text
            x={17}
            y={10.6}
            textAnchor="middle"
            fontSize={8.5}
            fontFamily="var(--font-inter), sans-serif"
            fill="#2A2825"
          >
            hi! 👋
          </text>
        </g>
      )}
    </svg>
  )
}
