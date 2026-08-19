import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070B14',
          900: '#0B111F',
          800: '#131B2E',
          700: '#1C2740',
          600: '#2B3654',
        },
        brand: {
          50: '#EEF2FF',
          100: '#DCE4FF',
          200: '#B6C6FF',
          300: '#8AA3FF',
          400: '#5A79F5',
          500: '#3355EA',
          600: '#2340D6',
          700: '#1B32AD',
          800: '#182A87',
          900: '#16266B',
        },
        accent: {
          400: '#F5B94D',
          500: '#EFA524',
          600: '#D6890F',
        },
        success: {
          500: '#1E9E5A',
          600: '#17834B',
        },
        slate: {
          25: '#FAFBFC',
        },
      },
      fontFamily: {
        // Self-hosted variable fonts, loaded via next/font/local in
        // src/app/layout.tsx — no dependency on Google Fonts' CDN.
        sans: ['var(--font-inter)', 'ui-sans-serif', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-archivo)', 'var(--font-inter)', 'ui-sans-serif', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.1rem' }],
        sm: ['0.875rem', { lineHeight: '1.35rem' }],
        base: ['1rem', { lineHeight: '1.6rem' }],
        lg: ['1.125rem', { lineHeight: '1.7rem' }],
        xl: ['1.25rem', { lineHeight: '1.8rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.015em' }],
        '4xl': ['2.375rem', { lineHeight: '2.6rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '3.3rem', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(10, 15, 30, 0.04), 0 1px 6px -1px rgba(10, 15, 30, 0.06)',
        'card-hover': '0 4px 16px -4px rgba(10, 15, 30, 0.12)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
    },
  },
  plugins: [],
};

export default config;
