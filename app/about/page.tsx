import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import TravelMap from '@/components/TravelMap'
import { adventures, food } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Climbing, the outdoors, sunsets, my dog Coco, and food.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About me" title="Beyond the resume">
        <p>
          When I&apos;m not in class or building something, I&apos;m probably outside, whether that&apos;s on a wall,
          on a trail, or chasing a good sunset. Then I&apos;m looking for somewhere good to eat.
        </p>
      </PageHeader>

      {/* Outdoors */}
      <section className="container-site py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Outside</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">Rock, trail &amp; water</h2>
          <p className="mt-4 leading-relaxed text-granite-muted">
            Climbing is my favorite way to think. Every route is a problem to solve one move at a time, which is
            also how I approach engineering. I founded TJClimbing in high school to get more people on the wall,
            and I&apos;ll take any excuse to be outdoors, from Patagonian glaciers to Arizona slot canyons.
          </p>
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
          {adventures.map((a) => (
            <figure key={a.src} className="group break-inside-avoid overflow-hidden rounded-2xl bg-sand">
              <Image
                src={a.src}
                alt={a.alt}
                width={a.w}
                height={a.h}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <figcaption className="px-4 py-3 text-sm text-granite-muted">{a.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Places */}
      <section className="container-site pb-16">
        <p className="eyebrow">Passport</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">Places I&apos;ve been</h2>
        <p className="mt-2 text-sm text-granite-light">Hover over (or tap) a pin to see where.</p>
        <div className="mt-8 rounded-2xl border border-granite/10 bg-surface/70 p-3 sm:p-6">
          <TravelMap />
        </div>
      </section>

      {/* Coco + sunsets */}
      <section className="container-site grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="overflow-hidden rounded-2xl border border-granite/10 bg-surface/70">
          <div className="relative aspect-square">
            <Image
              src="/photos/coco.jpg"
              alt="Coco, a fluffy brown dog, sitting on the grass next to a soccer ball"
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <p className="eyebrow">Best friend</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">Meet Coco</h2>
            <p className="mt-2 leading-relaxed text-granite-muted">
              My dog, my favorite hiking buddy, and the self-appointed goalie of our backyard. Anything dogs,
              honestly, but Coco is number one.
            </p>
          </div>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-2xl">
          <Image
            src="/photos/sedona-golden-hour.jpg"
            alt="Golden light over the desert near Sedona"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F4C7A8]">Golden hour</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">A sucker for a good sunset</h2>
            <p className="mt-2 max-w-md text-white/85">
              If there&apos;s a ridge with a view at the end of the day, I&apos;m staying until the sun is gone.
            </p>
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="container-site py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Fuel</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">A (huge) food lover</h2>
          <p className="mt-4 leading-relaxed text-granite-muted">
            Tacos, mezze, shakshuka, Thai, a proper Indian feast: I&apos;ll try anything once and most things
            twice. I also bake, so there&apos;s usually a cookie involved somewhere. A small sample of the camera roll:
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {food.map((f) => (
            <div key={f.src} className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-sand">
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
