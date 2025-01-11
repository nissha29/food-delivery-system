/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB800',
        secondary: '#1E1B4B'
      },
      fontFamily: {
        "merriweather": ["Merriweather", "Serif"],
      },
    },
  },
  plugins: [],
}