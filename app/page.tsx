import Image from 'next/image'
import Link from 'next/link'
import { profile, pitches } from '@/lib/content'
import CopyEmail from '@/components/CopyEmail'
import OrgLogo from '@/components/OrgLogo'
import { ArrowIcon, GitHubIcon, LinkedInIcon } from '@/components/Marks'

const explore = [
  { href: '/climb', label: 'Experience' },
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About Me' },
]

export default function Home() {
  const latest = pitches.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section>
        <div className="container-site grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <h1 className="animate-rise font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-granite sm:text-6xl lg:text-7xl">
              Hi, I&apos;m Aanya.
            </h1>
            <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-granite-muted [animation-delay:80ms] sm:text-xl">
              I study <span className="text-granite">biomedical engineering</span> and{' '}
              <span className="text-granite">electrical &amp; computer engineering</span> at Duke. I build software and
              models that help people make better decisions about health, and I spend my weekends climbing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 animate-rise [animation-delay:160ms]">
              <Link href="/climb" className="btn-primary">
                View experience <ArrowIcon />
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
          </div>

          {/* Photo + Coco */}
          <div className="relative mx-auto mt-10 w-full max-w-[420px] animate-rise [animation-delay:120ms] lg:mt-0">
            <div className="relative aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden rounded-3xl bg-sand shadow-xl shadow-granite/10">
                <Image
                  src="/photos/patagonia-glacier-hike.jpg"
                  alt="Aanya hiking in front of a glacier in Patagonia"
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-[center_40%]"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 h-28 w-28 overflow-hidden rounded-2xl bg-sand shadow-lg ring-4 ring-chalk sm:h-32 sm:w-32">
                <Image src="/photos/coco.jpg" alt="Coco, a fluffy brown dog" fill sizes="128px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent experience */}
      <section className="container-site py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">Recent experience</h2>
          <Link href="/climb" className="link hidden text-sm sm:inline">
            All experience →
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-granite/10 border-t border-granite/10">
          {latest.map((p) => (
            <li key={p.org} className="flex items-center gap-5 py-5">
              <div className="hidden w-[132px] shrink-0 sm:block">
                <OrgLogo src={p.logo} org={p.org} size="sm" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-granite">{p.org}</h3>
                <p className="text-sm text-granite-muted">{p.role}</p>
              </div>
              <div className="hidden shrink-0 text-right md:block">
                {p.dates && <p className="text-sm text-granite-muted">{p.dates}</p>}
                {p.badge && <span className="badge mt-1">{p.badge}</span>}
              </div>
            </li>
          ))}
        </ul>
        <Link href="/climb" className="link mt-6 inline-block text-sm sm:hidden">
          All experience →
        </Link>
      </section>

      {/* Explore */}
      <section className="container-site">
        <div className="flex flex-wrap gap-3 border-t border-granite/10 pt-10">
          {explore.map((e) => (
            <Link key={e.href} href={e.href} className="btn-ghost">
              {e.label} <ArrowIcon />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
