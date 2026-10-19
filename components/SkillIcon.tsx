import type { SkillGroup } from '@/lib/content'

// Small line icons for the skills cards.
const paths: Record<SkillGroup['icon'], string> = {
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14',
  flask: 'M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 006 21h12a1.7 1.7 0 001.5-2.5L14 9V3M7.5 15h9',
  chart: 'M4 20h16M7 16v-5M12 16V7M17 16v-8',
  atom: 'M12 12m-1.5 0a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0M12 3c2.5 0 4.5 4 4.5 9s-2 9-4.5 9-4.5-4-4.5-9 2-9 4.5-9zM4.2 7.5c1.2-2.2 5.7-1.8 10 .8s6.8 6.4 5.6 8.6-5.7 1.8-10-.8-6.8-6.4-5.6-8.6z',
  cube: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  tools: 'M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z',
}

export default function SkillIcon({ name }: { name: SkillGroup['icon'] }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
