/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gymshark: {
          dark: '#111111',
          black: '#000000',
          gray: '#767676',
          light: '#f4f4f4',
          border: '#e5e5e5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        wide: '0.08em',
        wider: '0.12em',
        widest: '0.2em',
      }
    },
  },
  plugins: [],
}
