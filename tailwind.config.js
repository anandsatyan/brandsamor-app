/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(253, 246, 238)',
        secondary: 'rgb(240, 230, 220)',
        body: 'rgb(148, 135, 124)',
        heading: 'rgb(43, 24, 10)',
        accent: 'rgb(255, 92, 0)',
        border: 'rgba(148, 135, 124, 0.22)',
        'border-strong': 'rgba(148, 135, 124, 0.35)',
      },
      fontFamily: {
        sans: ['"Funnel Sans Variable"', 'system-ui', 'sans-serif'],
        display: ['"Funnel Display Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'Times New Roman', 'serif'],
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
