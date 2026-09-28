# aagupta.com

Personal website built with Next.js and Tailwind CSS, deployed on Vercel.

## Editing content

Almost all copy (experience, publications, projects, photos) lives in `lib/content.ts`.
Photos are in `public/photos`. Export new ones resized (~2000px) with location metadata stripped;
full-size originals stay in `/img`, which is git-ignored.

## Password protection (off by default)

Set these environment variables in Vercel → Settings → Environment Variables, then redeploy:

- `SITE_PASSWORD_ENABLED` = `true`
- `SITE_PASSWORD` = your password

Remove `SITE_PASSWORD_ENABLED` to turn it off again.
