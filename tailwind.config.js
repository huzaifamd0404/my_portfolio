/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#e8a849',
        'accent-light': '#f0c67a',
        'accent-dark': '#c77d20',
        'accent-dim': 'rgba(232, 168, 73, 0.15)',
        dark: {
          DEFAULT: '#050505',
          100: '#0a0a0a',
          200: '#0f0f0f',
          300: '#141414',
          400: '#1a1a1a',
        },
        muted: '#7a756d',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in-scale': 'fadeInScale 0.6s ease-out forwards',
        'marquee': 'marquee 40s linear infinite',
        'orbit': 'orbit var(--orbit-duration, 20s) linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'morph': 'morphBlob 8s ease-in-out infinite',
        'ripple': 'ripple 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
