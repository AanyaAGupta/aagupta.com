import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import OrgLogo from '@/components/OrgLogo'
import { pitches, honors, skills, profile } from '@/lib/content'
import SkillIcon from '@/components/SkillIcon'

export const metadata: Metadata = {
  title: 'The Climb',
  description: 'Experience, education, and leadership, most recent first.',
}

export default function ClimbPage() {
  return (
    <>
      <PageHeader title="The Climb">
        <p>Experience, research, and leadership, most recent first.</p>
      </PageHeader>

      <section className="container-site">
        <ol className="divide-y divide-granite/10 border-y border-granite/10">
          {pitches.map((p) => (
            <li key={p.org} className="grid gap-4 py-10 md:grid-cols-[150px_1fr_auto] md:gap-8">
              <div>
                <OrgLogo src={p.logo} org={p.org} />
              </div>

              <div className="min-w-0">
                <h2 className="font-serif text-2xl font-semibold tracking-tight">{p.org}</h2>
                <p className="mt-1 text-granite-muted">
                  {p.role} <span className="text-granite-light">· {p.location}</span>
                </p>
                {p.dates && <p className="mt-1 text-sm text-granite-light md:hidden">{p.dates}</p>}
                {p.badge && <span className="badge mt-3">{p.badge}</span>}

                <ul className="mt-4 max-w-3xl space-y-2 leading-relaxed text-granite-muted">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-granite-light" aria-hidden="true" />
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

              <p className="hidden whitespace-nowrap text-sm text-granite-light md:block">{p.dates}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="container-site mt-16">
        <h2 className="font-serif text-3xl font-semibold tracking-tight">Skills &amp; tools</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group} className="rounded-2xl border border-granite/10 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pine-light text-pine">
                  <SkillIcon name={s.icon} />
                </span>
                <h3 className="font-serif text-lg font-semibold leading-tight">{s.group}</h3>
              </div>
              <p className="mt-3 text-sm text-granite-muted">{s.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it} className="rounded-full bg-sand px-3 py-1 text-sm text-granite">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Honors */}
      <section className="container-site mt-16">
        <h2 className="font-serif text-3xl font-semibold tracking-tight">Honors</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {honors.map((h) => (
            <li key={h} className="rounded-full bg-sand px-4 py-1.5 text-granite">
              {h}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-site mt-14">
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Download resume (PDF)
        </a>
      </section>
    </>
  )
}
