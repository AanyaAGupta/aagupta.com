import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import { publications, posters, profile } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Agent-based modeling and small-area estimation for public health.',
}

const themes = [
  {
    title: 'Agent-based models of health behavior',
    body: 'Simulating thousands of synthetic individuals, each with their own social ties and circumstances, to understand how policy and social factors shape decisions like getting vaccinated.',
    stat: '5.5K synthetic agents',
  },
  {
    title: 'Small-area estimation',
    body: 'National health surveys are great for states, but blurry at the county or neighborhood level. I work on methods (like iterative proportional fitting and spatial microsimulation) that sharpen those local estimates.',
    stat: '+2% over CDC benchmarks',
  },
  {
    title: 'Fast surrogate models',
    body: 'Full simulations are slow. Geographically weighted surrogate models can approximate them quickly, making chronic-disease estimates practical for decision-makers.',
    stat: 'First-author paper',
  },
]

function ScholarIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zm-6.8 9.4V16c0 1.9 3 3.5 6.8 3.5s6.8-1.6 6.8-3.5v-3.6L12 16.1l-6.8-3.7z" />
    </svg>
  )
}

function Authors({ text }: { text: string }) {
  const parts = text.split('Gupta, A.')
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <strong className="font-semibold text-granite">Gupta, A.</strong>}
        </span>
      ))}
    </>
  )
}

export default function ResearchPage() {
  return (
    <>
      <PageHeader title="Modeling health, one county at a time">
        <p>
          Since 2024 I&apos;ve worked with Dr. Taylor Anderson on computational public health, building models that
          estimate health outcomes where data is thin, so local decision-makers aren&apos;t guessing. The code and
          datasets are open source.
        </p>
        <a href={profile.scholar} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
          <ScholarIcon /> View my Google Scholar
        </a>
      </PageHeader>

      <section className="container-site pb-16 pt-6">
        <div className="grid gap-8 md:grid-cols-3">
          {themes.map((t) => (
            <div key={t.title} className="border-t border-granite/15 pt-5">
              <h2 className="font-serif text-xl font-semibold">{t.title}</h2>
              <p className="mt-1 text-sm font-medium text-clay">{t.stat}</p>
              <p className="mt-2 text-sm leading-relaxed text-granite-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site">
        <h2 className="font-serif text-3xl font-semibold tracking-tight">Peer-reviewed papers</h2>

        <ol className="mt-8 divide-y divide-granite/10 border-y border-granite/10">
          {publications.map((p) => (
            <li key={p.title} className="grid gap-3 py-6 sm:grid-cols-[7rem_1fr]">
              <div>
                <span className="text-sm text-granite-light">{p.status === 'Accepted' ? 'Accepted' : p.year}</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold leading-snug">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="hover:text-pine">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <p className="mt-1.5 text-sm text-granite-muted">
                  <Authors text={p.authors} />
                </p>
                <p className="mt-1 text-sm italic text-granite-muted">
                  {p.venue}
                  {p.status === 'Accepted' && <span className="not-italic"> · accepted, in press</span>}
                </p>
                {p.href && (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-block text-sm">
                    DOI →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-granite-muted">
          Citations and the most up-to-date list live on{' '}
          <a href={profile.scholar} target="_blank" rel="noopener noreferrer" className="link">
            Google Scholar
          </a>
          .
        </p>
      </section>

      <section className="container-site mt-20">
        <h2 className="font-serif text-3xl font-semibold tracking-tight">Posters</h2>
        <div className="mt-8 space-y-8">
          {posters.map((p) => (
            <article key={p.pdf} className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <a
                href={p.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-granite/10 bg-white shadow-sm"
                aria-label={`Open poster: ${p.officialTitle} (PDF)`}
              >
                <Image
                  src={p.image}
                  alt={`Research poster: ${p.officialTitle}`}
                  width={1400}
                  height={1050}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>
              <div>
                <p className="text-sm text-granite-light">
                  {p.venue} · {p.year}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm italic text-granite-muted">{p.officialTitle}</p>
                <p className="mt-1 text-sm text-granite-muted">
                  <Authors text={p.authors} />
                </p>
                <p className="mt-4 leading-relaxed text-granite-muted">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="tag">
                      {h}
                    </li>
                  ))}
                </ul>
                <a href={p.pdf} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">
                  View poster (PDF)
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
