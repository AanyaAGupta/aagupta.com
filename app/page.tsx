import Link from 'next/link'
import { profile, pitches, goals } from '@/lib/content'
import CopyEmail from '@/components/CopyEmail'
import PhotoStack from '@/components/PhotoStack'
import Climber from '@/components/Climber'
import OrgLogo from '@/components/OrgLogo'
import { ArrowIcon, GitHubIcon, LinkedInIcon, Topo } from '@/components/Marks'

const stats = [
  { value: '4', label: 'peer-reviewed publications' },
  { value: '1st', label: 'of 520 at HackTJ' },
  { value: '$18K+', label: 'raised for global education' },
]

const toolkit = ['Python', 'Java', 'R', 'Q# / Qiskit', 'Git']

const explore = [
  { href: '/climb', label: 'The Climb' },
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About Me' },
  { href: '/resume', label: 'Resume' },
]

export default function Home() {
  const latest = pitches.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Topo className="pointer-events-none absolute inset-0 h-full w-full text-pine/[0.07]" />
        <div className="container-site relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow animate-rise">Duke University</p>
            <h1 className="mt-4 animate-rise font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-granite sm:text-6xl lg:text-7xl">
              Hi, I&apos;m Aanya.
            </h1>

            <div className="mt-6 flex items-center gap-6">
              <div className="min-w-0 flex-1">
                <p className="max-w-xl animate-rise text-lg leading-relaxed text-granite-muted [animation-delay:80ms] sm:text-xl">
                  I study <span className="font-medium text-granite">biomedical engineering</span> and{' '}
                  <span className="font-medium text-granite">electrical &amp; computer engineering</span> at Duke. I
                  like building software and models that help people make better decisions about health, and I like
                  climbing rocks on the weekends.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3 animate-rise [animation-delay:160ms]">
                  <Link href="/climb" className="btn-primary">
                    See the climb <ArrowIcon />
                  </Link>
                  <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    Resume
                  </a>
                  <div className="ml-2 flex items-center gap-4 text-granite-muted">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="hover:text-pine"
                    >
                      <GitHubIcon />
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-pine"
                    >
                      <LinkedInIcon />
                    </a>
                    <CopyEmail />
                  </div>
                </div>

                <p className="mt-8 max-w-xl animate-rise text-sm leading-relaxed text-granite-muted [animation-delay:200ms]">
                  <span className="mr-2 font-semibold uppercase tracking-[0.14em] text-granite">Toolkit</span>
                  {toolkit.join(' · ')}
                </p>
              </div>
              <Climber className="hidden h-52 w-auto shrink-0 sm:block" />
            </div>
          </div>

          <PhotoStack />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-granite/10 bg-sand/40">
        <dl className="container-site grid grid-cols-1 gap-y-8 py-10 text-center sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-3xl font-semibold text-pine sm:text-4xl">{s.value}</dd>
              <dd className="mt-1 text-sm text-granite-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Latest on the route */}
      <section className="container-site py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Recent experience</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">What I&apos;ve been up to</h2>
          </div>
          <Link href="/climb" className="link hidden text-sm sm:inline">
            All experience →
          </Link>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {latest.map((p) => (
            <li key={p.org} className="rounded-2xl border border-granite/10 bg-surface/60 p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wider text-granite-light">{p.dates}</p>
                <OrgLogo src={p.logo} org={p.org} size="sm" className="-my-3" />
              </div>
              <h3 className="mt-2 font-serif text-xl font-semibold">{p.org}</h3>
              <p className="mt-1 text-sm text-granite-muted">{p.role}</p>
              {p.badge && <span className="tag mt-4 bg-clay-light text-clay">{p.badge}</span>}
              <p className="mt-4 text-sm leading-relaxed text-granite-muted">{p.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Goals */}
      <section className="container-site">
        <p className="eyebrow">Looking ahead</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">What I&apos;m working toward</h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((g, i) => (
            <li key={g.title} className="rounded-2xl border border-granite/10 bg-surface/60 p-6">
              <span className="font-serif text-3xl font-semibold text-clay/80">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-serif text-lg font-semibold leading-snug">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-granite-muted">{g.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Explore */}
      <section className="container-site mt-20 text-center">
        <h2 className="font-serif text-2xl font-semibold tracking-tight">Keep exploring</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {explore.map((e) => (
            <Link key={e.href} href={e.href} className="btn-ghost bg-surface/60">
              {e.label} <ArrowIcon />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
