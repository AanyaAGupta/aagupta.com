/* eslint-disable @next/next/no-img-element */
// Organization logo on a small white plate so every logo reads on the chalk background.
export default function OrgLogo({
  src,
  org,
  className = '',
  size = 'md',
}: {
  src?: string
  org: string
  className?: string
  size?: 'sm' | 'md'
}) {
  if (!src) return null
  const plate = size === 'sm' ? 'h-9 rounded-lg px-2' : 'h-14 rounded-xl px-3'
  const img = size === 'sm' ? 'h-5 max-w-[96px]' : 'h-8 max-w-[120px]'
  return (
    <span className={`inline-flex shrink-0 items-center bg-white shadow-sm ring-1 ring-granite/10 ${plate} ${className}`}>
      <img src={src} alt={`${org} logo`} className={`w-auto object-contain ${img}`} loading="lazy" />
    </span>
  )
}
