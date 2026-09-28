import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aagupta.com'),
  title: {
    default: 'Aanya Gupta',
    template: '%s · Aanya Gupta',
  },
  description:
    'Aanya Gupta: Duke engineering student (BME + ECE) working on computational public health, software, and research.',
  openGraph: {
    title: 'Aanya Gupta',
    description: 'Duke engineering student working on computational public health, software, and research.',
    url: 'https://aagupta.com',
    siteName: 'Aanya Gupta',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aanya Gupta',
    description: 'Duke engineering student working on computational public health, software, and research.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved (or system) theme before first paint to avoid a light-mode flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
