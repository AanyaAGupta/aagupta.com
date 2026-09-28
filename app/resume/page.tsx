import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import { profile } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Aanya Gupta.',
}

export default function ResumePage() {
  return (
    <>
      <PageHeader eyebrow="Resume" title="The one-page version">
        <p>Everything on this site, condensed to a single page.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={profile.resume} download className="btn-primary">
            Download PDF
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Open in new tab
          </a>
        </div>
      </PageHeader>

      <section className="container-site py-12">
        <div className="overflow-hidden rounded-2xl border border-granite/10 bg-white shadow-sm">
          <iframe
            src={`${profile.resume}#view=FitH`}
            title="Aanya Gupta resume"
            className="h-[80vh] min-h-[600px] w-full"
          />
        </div>
      </section>
    </>
  )
}
