import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { ArrowIcon } from '@/components/Marks'
import { projects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I have built: quantum simulation, ML evaluation tooling, healthcare concepts, and apps.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Things I’ve built">
        <p>From quantum circuits to hackathon apps. A mix of research, internships, and building things for fun.</p>
      </PageHeader>

      <section className="container-site py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => {
            const external = p.href?.startsWith('http')
            const card = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-granite-light">
                      {p.context} · {p.dates}
                    </p>
                    <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight group-hover:text-pine">
                      {p.title}
                    </h2>
                  </div>
                  {p.href && (
                    <ArrowIcon className="mt-1 h-5 w-5 shrink-0 text-granite-light transition-transform group-hover:translate-x-1 group-hover:text-pine" />
                  )}
                </div>
                {p.highlight && <span className="tag mt-4 bg-clay-light text-clay">{p.highlight}</span>}
                <p className="mt-4 leading-relaxed text-granite-muted">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )
            const cls =
              'group block h-full rounded-2xl border border-granite/10 bg-surface/70 p-7 transition-all'
            return p.href ? (
              external ? (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cls} hover:-translate-y-0.5 hover:border-pine/40 hover:shadow-lg hover:shadow-granite/5`}
                >
                  {card}
                </a>
              ) : (
                <Link
                  key={p.title}
                  href={p.href}
                  className={`${cls} hover:-translate-y-0.5 hover:border-pine/40 hover:shadow-lg hover:shadow-granite/5`}
                >
                  {card}
                </Link>
              )
            ) : (
              <div key={p.title} className={cls}>
                {card}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
