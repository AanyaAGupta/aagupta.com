import { profile } from '@/lib/content'
import CopyEmail from './CopyEmail'
import { GitHubIcon, LinkedInIcon } from './Marks'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-granite/10 bg-sand/50">
      <div className="container-site flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-granite-muted">
            Always looking for the next route. Let&apos;s talk:{' '}
            <a href={`mailto:${profile.email}`} className="link">
              {profile.email}
            </a>
          </p>
        </div>
        <div className="flex items-center gap-5 text-granite-muted">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-pine">
            <GitHubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-pine">
            <LinkedInIcon />
          </a>
          <CopyEmail />
        </div>
      </div>
    </footer>
  )
}
