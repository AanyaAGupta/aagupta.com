import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import TravelMap from '@/components/TravelMap'
import AskTerminal from '@/components/AskTerminal'
import { adventures, food, goals } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Climbing, the outdoors, sunsets, my dog Coco, and food.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader title="Beyond the resume">
        <p>
          Outside of class, I&apos;m usually outdoors, most often on a climbing wall. Ask me anything below, or
          scroll down to see where I&apos;ve been and what I&apos;ve been eating.
        </p>
      </PageHeader>

      {/* Ask me anything */}
      <section className="container-site pt-4">
        <div className="max-w-3xl">
          <AskTerminal />
        </div>
      </section>

      {/* Outdoors */}
      <section className="container-site py-16">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">Getting outside</h2>
          <p className="mt-4 leading-relaxed text-granite-muted">
            Climbing is the thing I always come back to. Every route is a puzzle: you plan it from the ground, then
            work it out one move at a time once you&apos;re on the wall. I liked it enough to found TJClimbing in high
            school so more people would give it a try. I&apos;ll take any excuse to be outside, and hiking in Patagonia
            is still one of my favorite trips.
          </p>
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
          {adventures.map((a) => (
            <figure key={a.src} className="break-inside-avoid">
              <Image
                src={a.src}
                alt={a.alt}
                width={a.w}
                height={a.h}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full rounded-xl bg-sand"
              />
              <figcaption className="mt-2 text-sm text-granite-light">{a.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Places */}
      <section className="container-site pb-16">
        <h2 className="font-serif text-3xl font-semibold tracking-tight">Places I&apos;ve been</h2>
        <p className="mt-2 text-sm text-granite-light">Hover over (or tap) a pin to see where.</p>
        <div className="mt-8 rounded-2xl bg-sand/40 p-3 sm:p-6">
          <TravelMap />
        </div>
      </section>

      {/* Coco + sunsets */}
      <section className="container-site grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand">
            <Image
              src="/photos/coco.jpg"
              alt="Coco, a fluffy brown dog, sitting on the grass next to a soccer ball"
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="pt-5">
            <h2 className="font-serif text-2xl font-semibold">Meet Coco</h2>
            <p className="mt-2 leading-relaxed text-granite-muted">
              Coco is my dog and my favorite hiking partner. She also thinks she&apos;s the goalie for every game in
              our backyard. I love pretty much every dog I meet, but she&apos;s number one.
            </p>
          </div>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-2xl lg:self-start lg:aspect-[4/3]">
          <Image
            src="/photos/sedona-golden-hour.jpg"
            alt="Golden light over the desert near Sedona"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">A sucker for a good sunset</h2>
            <p className="mt-2 max-w-md text-white/85">
              If there&apos;s a ridge with a view at the end of the day, I&apos;m staying until the sun goes down.
            </p>
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="container-site py-20">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">I really love food</h2>
          <p className="mt-4 leading-relaxed text-granite-muted">
            I&apos;ll try almost anything, and my camera roll is mostly proof of that. A big Indian dinner is hard to
            beat. I also bake, so there&apos;s usually a cookie nearby. Here are a few favorites.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {food.map((f) => (
            <div key={f.src} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-sand">
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Goals */}
      <section className="container-site">
        <h2 className="font-serif text-3xl font-semibold tracking-tight">What I&apos;m working toward</h2>
        <ul className="mt-8 grid gap-x-12 gap-y-8 border-t border-granite/10 pt-8 sm:grid-cols-2">
          {goals.map((g) => (
            <li key={g.title}>
              <h3 className="font-serif text-xl font-semibold">{g.title}</h3>
              <p className="mt-1 leading-relaxed text-granite-muted">{g.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
