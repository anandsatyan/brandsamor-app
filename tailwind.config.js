/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Funnel Sans"', 'system-ui', 'sans-serif'],
        display: ['"Funnel Display"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
