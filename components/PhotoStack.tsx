import Image from 'next/image'

// Polaroid-style photo collage for the home hero. Positions are percentages of a square box.
const photos = [
  {
    src: '/photos/patagonia-rock-climbing.jpg',
    alt: 'Climbing a granite wall in Patagonia',
    caption: 'on the wall',
    box: 'right-0 top-[2%] w-[52%] rotate-[5deg] z-10',
    aspect: 'aspect-[16/10]',
  },
  {
    src: '/photos/food/tacos.jpg',
    alt: 'A table of tacos and fajitas',
    caption: 'food',
    box: 'bottom-0 left-[12%] w-[35%] -rotate-[3deg] z-10',
    aspect: 'aspect-[3/4]',
  },
  {
    src: '/photos/coco.jpg',
    alt: 'Coco, a fluffy brown dog, sitting in the grass',
    caption: 'coco',
    box: 'bottom-[3%] right-[5%] w-[40%] rotate-[3deg] z-20',
    aspect: 'aspect-square',
  },
  {
    src: '/photos/patagonia-glacier-hike.jpg',
    alt: 'Aanya hiking in front of a glacier in Patagonia',
    caption: 'patagonia',
    box: 'left-[3%] top-0 w-[41%] -rotate-[4deg] z-30',
    aspect: 'aspect-[3/4]',
  },
]

export default function PhotoStack() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md animate-rise [animation-delay:120ms] lg:max-w-none">
      {photos.map((p, i) => (
        <figure
          key={p.src}
          className={`absolute rounded-md bg-white p-2 pb-1 shadow-lg shadow-granite/15 ring-1 ring-granite/5 transition-transform duration-300 hover:z-40 hover:rotate-0 hover:scale-[1.03] ${p.box}`}
        >
          <div className={`relative overflow-hidden rounded-sm bg-sand ${p.aspect}`}>
            <Image
              src={p.src}
              alt={p.alt}
              fill
              priority={i === photos.length - 1}
              sizes="(min-width: 1024px) 260px, 45vw"
              className="object-cover"
            />
          </div>
          <figcaption className="py-1.5 text-center font-serif text-xs italic text-granite-muted sm:text-sm">
            {p.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
