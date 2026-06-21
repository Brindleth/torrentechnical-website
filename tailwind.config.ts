import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Torren Technical brand palette (navy + champagne gold)
        navy: {
          deep: '#0A1320', // --bg-deep
          DEFAULT: '#0F1B2D', // --bg-dark / --text
          700: '#131f33',
          600: '#1a2841',
          500: '#1a2b47',
        },
        ink: '#0F1B2D',
        // Champagne gold accent
        gold: {
          DEFAULT: '#C9A961', // --accent
          light: '#DDC07C',
          deep: '#B8983F', // --accent-hover
        },
        // Neutrals
        light: '#F8F9FB', // --bg-alt
        slate: '#475569', // --text-muted
        dim: '#94A3B8', // --text-dim
        line: '#E2E8F0', // --border
        'line-dark': '#1E2A3F', // --border-dark
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.35em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scan: 'scan 6s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
