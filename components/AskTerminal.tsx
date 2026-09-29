'use client'

import { useEffect, useRef, useState } from 'react'
import { profile, pitches, publications, projects, travels, goals, skills } from '@/lib/content'

// A small "ask me anything" terminal. Answers are pre-written from lib/content.ts and matched by keyword,
// so it works with no backend.

type Line = { kind: 'in' | 'out'; text: string }

const places = travels.flatMap((r) => r.places.map((p) => p.name))

type Intent = { keys: string[]; answer: () => string }

const intents: Intent[] = [
  {
    keys: ['help', 'commands', '?'],
    answer: () =>
      [
        'Ask me a question in plain English, or try a command:',
        '  whoami      who I am',
        '  study       what I study at Duke',
        '  experience  where I’ve worked',
        '  research    my research + papers',
        '  projects    things I’ve built',
        '  skills      languages & tools',
        '  climbing    why I climb',
        '  coco        my dog',
        '  food        what I eat',
        '  travel      places I’ve been',
        '  goals       what I’m working toward',
        '  contact     how to reach me',
        '  clear       clear the screen',
      ].join('\n'),
  },
  {
    keys: ['whoami', 'who are you', 'yourself', 'introduce', 'aanya'],
    answer: () =>
      'I’m Aanya Gupta, an engineering student at Duke. I build software and models that help people make better decisions about health, and I spend my free time climbing, hiking, and finding good food.',
  },
  {
    keys: ['study', 'major', 'duke', 'school', 'college', 'university', 'education', 'degree', 'bme', 'ece'],
    answer: () =>
      `I’m at ${profile.school} studying ${profile.major} (${profile.majorNote}), graduating in ${profile.gradYear}. Before Duke I went to Thomas Jefferson High School for Science and Technology (TJHSST).`,
  },
  {
    keys: ['experience', 'work', 'job', 'intern', 'raytheon', 'career', 'resume', 'cv'],
    answer: () =>
      pitches
        .filter((p) => !/university|high school/i.test(p.org))
        .map((p) => `• ${p.org}: ${p.role} (${p.dates})${p.badge ? ` [${p.badge}]` : ''}`)
        .join('\n') + `\n\nFull resume: ${profile.resume}`,
  },
  {
    keys: ['research', 'paper', 'publication', 'publish', 'abm', 'agent', 'public health', 'scholar'],
    answer: () =>
      'I work on computational public health with Dr. Taylor Anderson: agent-based models and small-area estimation to predict local health outcomes.\n\n' +
      publications.map((p) => `• ${p.title} (${p.venue}, ${p.status === 'Accepted' ? 'accepted' : p.year})`).join('\n') +
      `\n\nGoogle Scholar: ${profile.scholar}`,
  },
  {
    keys: ['project', 'built', 'build', 'github', 'code', 'swiftstudy', 'ising', 'quantum', 'hackathon'],
    answer: () => projects.map((p) => `• ${p.title} (${p.context}): ${p.description}`).join('\n'),
  },
  {
    keys: ['skill', 'language', 'tools', 'python', 'stack', 'tech'],
    answer: () => skills.map((s) => `${s.group}: ${s.items.join(', ')}`).join('\n'),
  },
  {
    keys: ['climb', 'boulder', 'rock', 'outdoor', 'hike', 'hiking', 'hobby', 'hobbies', 'fun', 'free time', 'weekend'],
    answer: () =>
      'Climbing is my favorite way to think: every route is a problem you solve one move at a time. I founded TJClimbing in high school, and I’ll take any excuse to be outside, from glaciers in Patagonia to slot canyons in Arizona.',
  },
  {
    keys: ['coco', 'dog', 'pet', 'puppy'],
    answer: () => 'Coco is my dog, my favorite hiking buddy, and the self-appointed goalie of our backyard. 🐶',
  },
  {
    keys: ['food', 'eat', 'bake', 'baking', 'cook', 'restaurant', 'hungry'],
    answer: () =>
      'Huge food lover. Tacos, mezze, shakshuka, Thai, a proper Indian feast: I’ll try anything once. I also bake, so there’s usually a cookie involved.',
  },
  {
    keys: ['travel', 'place', 'been', 'country', 'countries', 'visit', 'trip'],
    answer: () => `Some places I’ve been: ${places.join(', ')}. The map is just below. 🗺️`,
  },
  {
    keys: ['sunset', 'golden hour'],
    answer: () => 'If there’s a ridge with a view at the end of the day, I’m staying until the sun is gone. 🌅',
  },
  {
    keys: ['goal', 'future', 'ahead', 'dream', 'plan'],
    answer: () => goals.map((g) => `• ${g.title}`).join('\n'),
  },
  {
    keys: ['contact', 'email', 'reach', 'hire', 'linkedin', 'connect', 'talk'],
    answer: () => `Email: ${profile.email}\nLinkedIn: ${profile.linkedin}\nGitHub: ${profile.github}`,
  },
  {
    keys: ['hello', 'hi', 'hey', 'yo'],
    answer: () => 'Hi! 👋 Ask me anything, or type `help` to see what I can answer.',
  },
]

function respond(raw: string): string | null {
  const q = raw.trim().toLowerCase()
  if (!q) return ''
  if (q === 'clear') return null
  if (q.startsWith('sudo')) return 'Nice try. 😄 Permission denied.'
  if (q === 'ls') return 'study  experience  research  projects  skills  climbing  coco  food  travel  goals  contact'

  const cleaned = q.replace(/^cat\s+/, '').replace(/[^\w\s?#]/g, ' ')
  const words = ` ${cleaned} `
  let best: { intent: Intent; score: number } | null = null
  for (const intent of intents) {
    const score = intent.keys.reduce((n, k) => (words.includes(k.length <= 3 ? ` ${k} ` : k) ? n + 1 : n), 0)
    if (score > 0 && (!best || score > best.score)) best = { intent, score }
  }
  if (best) return best.intent.answer()
  return `I don’t have an answer for that one yet. Try \`help\`, or email me at ${profile.email}.`
}

const suggestions = ['What do you study?', 'projects', 'Tell me about Coco', 'Favorite food?', 'contact']

const welcome: Line[] = [{ kind: 'out', text: 'Welcome! Ask me anything about Aanya, or type `help`.' }]

export default function AskTerminal() {
  const [lines, setLines] = useState<Line[]>(welcome)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Scroll only the terminal body, never the page.
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const run = (cmd: string) => {
    const answer = respond(cmd)
    setHistory((h) => (cmd.trim() ? [...h, cmd] : h))
    setHistoryIndex(-1)
    setInput('')
    if (answer === null) {
      setLines([])
      return
    }
    setLines((l) => [...l, { kind: 'in', text: cmd }, ...(answer ? [{ kind: 'out' as const, text: answer }] : [])])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input)
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const i = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(i)
      setInput(history[i])
    } else if (e.key === 'ArrowDown' && historyIndex !== -1) {
      e.preventDefault()
      const i = historyIndex + 1
      if (i >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(i)
        setInput(history[i])
      }
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-[#141814] text-[#E7E2D8] shadow-xl shadow-granite/10 ring-1 ring-black/20">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#E3866A]" />
        <span className="h-3 w-3 rounded-full bg-[#E8C170]" />
        <span className="h-3 w-3 rounded-full bg-[#8FBB9C]" />
        <span className="ml-3 font-mono text-xs text-white/50">ask-aanya — zsh</span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="h-72 cursor-text overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed sm:h-80 sm:text-sm"
        aria-live="polite"
      >
        {lines.map((l, i) =>
          l.kind === 'in' ? (
            <p key={i} className="mt-3 first:mt-0">
              <span className="text-[#8FBB9C]">guest@aagupta</span>
              <span className="text-white/40">:~$ </span>
              {l.text}
            </p>
          ) : (
            <p key={i} className="mt-1 whitespace-pre-wrap text-white/80">
              {l.text}
            </p>
          ),
        )}

        <div className="mt-3 flex items-center">
          <label htmlFor="ask-terminal" className="shrink-0">
            <span className="text-[#8FBB9C]">guest@aagupta</span>
            <span className="text-white/40">:~$&nbsp;</span>
          </label>
          <input
            id="ask-terminal"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="ask me something…"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-[#E7E2D8] caret-[#E3866A] placeholder:text-white/25 focus:outline-none"
          />
        </div>
      </div>

      {/* Suggestions (handy on phones) */}
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => run(s)}
            className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-white/70 transition-colors hover:border-[#E3866A] hover:text-white"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
