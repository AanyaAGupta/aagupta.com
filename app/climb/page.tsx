import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import OrgLogo from '@/components/OrgLogo'
import { pitches, honors, skills, profile } from '@/lib/content'

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
                <p className="mt-1 text-sm text-granite-light md:hidden">{p.dates}</p>
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

      {/* Honors + skills */}
      <section className="container-site mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight">Honors</h2>
          <ul className="mt-5 space-y-3 text-granite-muted">
            {honors.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-granite-light" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight">Skills &amp; tools</h2>
          <dl className="mt-5 space-y-4">
            {skills.map((s) => (
              <div key={s.group}>
                <dt className="text-sm font-semibold text-granite">{s.group}</dt>
                <dd className="mt-1 text-granite-muted">{s.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-site mt-14">
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Download resume (PDF)
        </a>
      </section>
    </>
  )
}
