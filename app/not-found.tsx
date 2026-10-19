import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-medium text-granite-light">404</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-granite-muted">This page doesn&apos;t exist, or it may have moved.</p>
      <Link href="/" className="btn-primary mt-8">
        Back home
      </Link>
    </section>
  )
}
