// Plain page header: title + optional intro. Decoration is kept to the home page.
export default function PageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="container-site pb-10 pt-16 sm:pt-20">
      <h1 className="animate-rise font-serif text-4xl font-semibold tracking-tight text-granite sm:text-5xl">{title}</h1>
      {children && (
        <div className="mt-5 max-w-2xl animate-rise text-lg leading-relaxed text-granite-muted [animation-delay:80ms]">
          {children}
        </div>
      )}
    </section>
  )
}
