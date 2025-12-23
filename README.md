# aagupta.com

Personal website built with Next.js and Tailwind CSS.

## Password Protection

This site is password protected. To set the password:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `SITE_PASSWORD`
   - **Value**: Your desired password
   - **Environment**: Production, Preview, Development (or just Production)
4. Redeploy your site

The password will be checked server-side and is never exposed in the code.
