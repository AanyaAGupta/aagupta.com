import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { Hold } from '@/components/Marks'
import OrgLogo from '@/components/OrgLogo'
import { pitches, honors, skills, profile } from '@/lib/content'

export const metadata: Metadata = {
  title: 'The Climb',
  description: 'Experience, education, and leadership, laid out as a climbing route.',
}

export default function ClimbPage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="The Climb">
        <p>
          Climbing is about making progress one move at a time, with each step setting up the next. Here&apos;s my
          path so far, most recent first.
        </p>
      </PageHeader>

      <section className="container-site py-16">
        <div className="relative">
          {/* The rope */}
          <div
            className="absolute bottom-6 left-[11px] top-6 w-0.5 bg-[repeating-linear-gradient(to_bottom,rgb(var(--clay))_0_10px,transparent_10px_16px)] opacity-60 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Summit marker */}
          <div className="relative mb-12 flex items-center gap-4 md:justify-center">
            <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-clay text-[10px] text-chalk ring-4 ring-chalk">
              ▲
            </span>
            <p className="text-sm font-medium text-clay md:absolute md:left-1/2 md:ml-8">Still climbing…</p>
          </div>

          <ol className="space-y-12">
            {pitches.map((p, i) => {
              const right = i % 2 === 1
              return (
                <li key={p.org} className="relative md:grid md:grid-cols-2 md:gap-16">
                  {/* Hold on the rope */}
                  <div className="absolute left-0 top-1 z-10 md:left-1/2 md:-translate-x-1/2">
                    <Hold
                      variant={i}
                      className={`h-6 w-6 drop-shadow-sm ${i === 0 ? 'fill-clay' : 'fill-pine'}`}
                    />
                  </div>

                  <div className={`pl-10 md:pl-0 ${right ? 'md:col-start-2' : 'md:text-right'}`}>
                    <div className={`flex items-start gap-4 ${right ? '' : 'md:flex-row-reverse'}`}>
                      <OrgLogo src={p.logo} org={p.org} className="mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="eyebrow">{p.dates}</p>
                        <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight">{p.org}</h2>
                        <p className="mt-1 text-granite-muted">
                          {p.role} · <span className="text-granite-light">{p.location}</span>
                        </p>
                      </div>
                    </div>
                    {p.badge && <span className="tag mt-3 bg-clay-light text-clay">{p.badge}</span>}

                    <div className="mt-4 rounded-2xl border border-granite/10 bg-surface/70 p-5 text-left">
                      <p className="font-medium text-granite">{p.summary}</p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-granite-muted">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex gap-2.5">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pine/60" aria-hidden="true" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      {p.link && (
                        <Link href={p.link.href} className="link mt-4 inline-block text-sm">
                          {p.link.label} →
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Base camp */}
          <div className="relative mt-12 flex items-center gap-4 md:justify-center">
            <span className="relative z-10 h-6 w-6 rounded-full border-2 border-pine bg-chalk ring-4 ring-chalk" />
            <p className="text-sm font-medium text-pine md:absolute md:left-1/2 md:ml-8">Base camp</p>
          </div>
        </div>
      </section>

      {/* Honors + skills */}
      <section className="container-site grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-pine p-8 text-chalk">
          <h2 className="font-serif text-2xl font-semibold">Honors</h2>
          <ul className="mt-5 space-y-3">
            {honors.map((h) => (
              <li key={h} className="flex gap-3 text-chalk/90">
                <span className="text-clay-light" aria-hidden="true">
                  ▲
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-granite/10 bg-surface/70 p-8">
          <h2 className="font-serif text-2xl font-semibold">Skills &amp; tools</h2>
          <div className="mt-5 space-y-5">
            {skills.map((s) => (
              <div key={s.group}>
                <h3 className="text-sm font-semibold text-granite">{s.group}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="tag">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site mt-12 text-center">
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Download the full resume (PDF)
        </a>
      </section>
    </>
  )
}
