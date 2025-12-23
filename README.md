# aagupta.com

Personal website built with Next.js and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

This project is configured for easy deployment on Vercel with your custom domain `aagupta.com`.

### First Time Setup:

1. **Push your code to GitHub** (if you haven't already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/AanyaAGupta/aagupta.com.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
   - Click "Add New Project"
   - Import your `aagupta.com` repository
   - Vercel will auto-detect Next.js and configure everything
   - Click "Deploy"

3. **Connect Your Custom Domain**:
   - In your Vercel project dashboard, go to **Settings** → **Domains**
   - Add your domain: `aagupta.com` and `www.aagupta.com`
   - Vercel will provide DNS records to add to your domain registrar
   - Add these DNS records at your domain registrar (where you bought aagupta.com):
     - Type: `A` or `CNAME` pointing to Vercel's servers
     - Vercel will show you the exact values to use
   - Wait for DNS propagation (usually 5-60 minutes)
   - Vercel will automatically provision SSL certificates

### Continuous Deployment:

Once set up, every time you push to your GitHub repository, Vercel will automatically:
- Build your site
- Deploy the new version
- Update your live site at `aagupta.com`

Just edit locally, commit, and push:
```bash
git add .
git commit -m "Update website"
git push
```

Your changes will be live in minutes!
