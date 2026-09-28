import { Topo } from './Marks'

export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-granite/10">
      <Topo className="pointer-events-none absolute inset-0 h-full w-full text-pine/[0.07]" />
      <div className="container-site relative py-16 sm:py-20">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="mt-3 animate-rise font-serif text-4xl font-semibold tracking-tight text-granite sm:text-5xl">
          {title}
        </h1>
        {children && (
          <div className="mt-5 max-w-2xl animate-rise text-lg leading-relaxed text-granite-muted [animation-delay:80ms]">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
