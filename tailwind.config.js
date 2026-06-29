/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Funnel Sans Variable"', 'system-ui', 'sans-serif'],
        display: ['"Funnel Display Variable"', 'system-ui', 'sans-serif'],
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
