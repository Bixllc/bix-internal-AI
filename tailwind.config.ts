import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fbfbfb',
        card: '#ffffff',
        border: 'rgba(0,0,0,0.07)',
        ink: '#1c1c1f',
        muted: '#7a7b82',
        faint: '#9a9ba2',
        accent: {
          DEFAULT: '#5B50E8',
          soft: 'rgba(91,80,232,0.11)',
        },
        success: {
          DEFAULT: '#1f9d63',
          soft: 'rgba(31,157,99,0.11)',
        },
        warning: {
          DEFAULT: '#c78a2a',
          soft: 'rgba(199,138,42,0.11)',
        },
        danger: {
          DEFAULT: '#c4584f',
          soft: 'rgba(196,88,79,0.11)',
        },
        info: {
          DEFAULT: '#2563c9',
          soft: 'rgba(37,99,201,0.11)',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.03)',
      },
      keyframes: {
        indeterminate: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        indeterminate: 'indeterminate 1.4s ease-in-out infinite',
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
