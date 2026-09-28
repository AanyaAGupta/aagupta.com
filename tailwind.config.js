/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      // Colors are CSS variables (see globals.css) so dark mode can swap the whole palette at once.
      colors: {
        chalk: 'rgb(var(--chalk) / <alpha-value>)',
        sand: 'rgb(var(--sand) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        granite: {
          DEFAULT: 'rgb(var(--granite) / <alpha-value>)',
          muted: 'rgb(var(--granite-muted) / <alpha-value>)',
          light: 'rgb(var(--granite-light) / <alpha-value>)',
        },
        pine: {
          DEFAULT: 'rgb(var(--pine) / <alpha-value>)',
          dark: 'rgb(var(--pine-dark) / <alpha-value>)',
          light: 'rgb(var(--pine-light) / <alpha-value>)',
        },
        clay: {
          DEFAULT: 'rgb(var(--clay) / <alpha-value>)',
          light: 'rgb(var(--clay-light) / <alpha-value>)',
        },
      },
      maxWidth: {
        site: '72rem',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
