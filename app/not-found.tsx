import Link from 'next/link'
import { Topo } from '@/components/Marks'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <Topo className="pointer-events-none absolute inset-0 h-full w-full text-pine/[0.07]" />
      <div className="container-site relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Looks like you&apos;re off route.</h1>
        <p className="mt-4 max-w-md text-lg text-granite-muted">
          This page doesn&apos;t exist, or it moved. Let&apos;s get you back to the trailhead.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back home
        </Link>
      </div>
    </section>
  )
}
