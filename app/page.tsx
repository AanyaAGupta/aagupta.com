'use client'

import { useState } from 'react'

export default function Home() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('aanyaashi@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-16">
            {/* Name & Bio */}
            <div className="space-y-10">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-duke-blue leading-[1.05] tracking-[-0.02em]">
                aanya gupta
              </h1>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-[#2a2a2a] leading-[1.7] font-sans">
                  i'm a student at{' '}
                  <span className="font-semibold text-duke-blue">TJHSST</span> interested in{' '}
                  <span className="font-semibold text-duke-blue">biomedical engineering</span>.
                </p>
              </div>

              {/* Social Links */}
              <div className="pt-1 flex items-center gap-6">
                <a
                  href="https://github.com/AanyaAGupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4a4a4a] hover:text-duke-blue transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/aanyagupta1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4a4a4a] hover:text-duke-blue transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <button
                  onClick={copyEmail}
                  className="text-[#4a4a4a] hover:text-duke-blue transition-colors duration-300 relative"
                  aria-label="Copy email"
                  title={copied ? 'Copied!' : 'Copy email'}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-duke-blue font-medium whitespace-nowrap">
                      copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Projects Section */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-duke-blue tracking-tight">projects</h2>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#1a1a1a] text-base leading-snug">
                    agent-based modeling research
                  </h3>
                  <p className="text-[#4a4a4a] text-sm leading-[1.7] font-sans">
                    developing data-driven agent-based models for predicting vaccine uptake and small area estimation techniques for public health research. co-author of multiple publications.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#1a1a1a] text-base leading-snug">
                    quantum software (MIT BWSI)
                  </h3>
                  <p className="text-[#4a4a4a] text-sm leading-[1.7] font-sans">
                    implemented quantum algorithms (QFT, Deutsch-Jozsa, Shor's) using Q# and Qiskit. led capstone project simulating 1D transverse Ising spin chain, presented to 500+ audience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:sticky lg:top-12 space-y-12">
            {/* Interests */}
            <div className="space-y-5">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-duke-blue tracking-tight">interests</h2>
              <div className="text-sm text-[#4a4a4a] leading-[1.7] font-sans">
                <p>rock climbing • baking • traveling • dogs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

