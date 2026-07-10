/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary-rgb) / <alpha-value>)',
        body: 'rgb(var(--color-body-rgb) / <alpha-value>)',
        heading: 'rgb(var(--color-heading-rgb) / <alpha-value>)',
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        border: 'rgba(148, 135, 124, 0.22)',
        'border-strong': 'rgba(148, 135, 124, 0.35)',
      },
      fontFamily: {
        sans: ['"Funnel Sans Variable"', 'system-ui', 'sans-serif'],
        display: ['"Funnel Display Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Queens Compressed Trial"', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        /* Golden ratio scale: base 16px, ratio φ ≈ 1.618 */
        'phi-xs': ['0.618rem', { lineHeight: '1.618' }],       /* 9.9px  — caption */
        'phi-sm': ['0.787rem', { lineHeight: '1.618' }],       /* 12.6px — small body */
        'phi-base': ['1rem', { lineHeight: '1.618' }],         /* 16px   — body */
        'phi-md': ['1.272rem', { lineHeight: '1.5' }],         /* 20.4px — body large / h5 */
        'phi-lg': ['1.618rem', { lineHeight: '1.4' }],         /* 25.9px — h5 */
        'phi-xl': ['2.058rem', { lineHeight: '1.35' }],        /* 32.9px — h4 */
        'phi-2xl': ['2.618rem', { lineHeight: '1.3' }],        /* 41.9px — h3 */
        'phi-3xl': ['3.3rem', { lineHeight: '1.2' }],          /* 52.8px — h2 */
        'phi-4xl': ['4.236rem', { lineHeight: '1.15' }],       /* 67.8px — h1 */
        'phi-5xl': ['5.354rem', { lineHeight: '1.1' }],         /* 85.7px — display */
      },
      spacing: {
        'phi-1': '0.382rem',   /* 6.1px  — φ⁻¹ from 10px base unit */
        'phi-2': '0.618rem',   /* 9.9px */
        'phi-3': '1rem',       /* 16px */
        'phi-4': '1.618rem',   /* 25.9px */
        'phi-5': '2.618rem',   /* 41.9px */
        'phi-6': '4.236rem',   /* 67.8px */
      },
      keyframes: {
        'audience-marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% + 100vw - 3rem))' },
        },
      },
      animation: {
        'audience-marquee': 'audience-marquee 28s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
