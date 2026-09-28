import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import world from 'world-atlas/countries-110m.json'
import { travels } from '@/lib/content'

// Rendered on the server into plain SVG + positioned pins; hover labels are pure CSS.
const W = 960
const H = 500
const ANTARCTICA = '010'
// ISO 3166 numeric ids of visited countries (tinted on the map).
const VISITED = new Set(['840', '032', '250', '380', '818', '356'])
// Pins closer than this (in map units) merge into one pin that lists every place.
const MERGE_DISTANCE = 8

const topo = world as unknown as Topology<{ countries: GeometryCollection }>
const countries = feature(topo, topo.objects.countries) as FeatureCollection<Geometry>
countries.features = countries.features.filter((f) => f.id !== ANTARCTICA)

const projection = geoNaturalEarth1().fitSize([W, H], countries)
const path = geoPath(projection)

type Pin = { x: number; y: number; names: string[] }

function buildPins(): Pin[] {
  const pins: Pin[] = []
  for (const place of travels.flatMap((r) => r.places)) {
    const xy = projection(place.coords)
    if (!xy) continue
    const near = pins.find((p) => Math.hypot(p.x - xy[0], p.y - xy[1]) < MERGE_DISTANCE)
    if (near) {
      near.names.push(place.name)
    } else {
      pins.push({ x: xy[0], y: xy[1], names: [place.name] })
    }
  }
  return pins
}

export default function TravelMap() {
  const pins = buildPins()

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
        {countries.features.map((f, i) => (
          <path
            key={i}
            d={path(f) ?? ''}
            className={`stroke-chalk ${VISITED.has(String(f.id)) ? 'fill-pine/30' : 'fill-sand'}`}
            strokeWidth={0.6}
          />
        ))}
      </svg>

      <ul aria-label="Places I've been">
        {pins.map((p) => {
          const label = p.names.join(' · ')
          const flipLeft = p.x > W * 0.75
          return (
            <li
              key={label}
              className="group absolute -translate-x-1/2 -translate-y-1/2 focus-within:z-20 hover:z-20"
              style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
            >
              <button
                type="button"
                aria-label={label}
                className="flex h-5 w-5 items-center justify-center rounded-full focus:outline-none"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-clay ring-2 ring-white transition-transform group-hover:scale-150 group-focus-within:scale-150 sm:h-3 sm:w-3" />
              </button>
              <span
                role="tooltip"
                className={`pointer-events-none absolute bottom-full mb-1 whitespace-nowrap rounded-md bg-granite px-2.5 py-1 text-xs font-medium text-chalk opacity-0 shadow-md transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 ${
                  flipLeft ? 'right-0' : 'left-1/2 -translate-x-1/2'
                }`}
              >
                {label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
