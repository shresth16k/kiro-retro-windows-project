/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win95-teal': '#008080',
        'win95-grey': '#C0C0C0',
        'win95-highlight': '#FFFFFF',
        'win95-shadow': '#000000',
        'win95-dark-grey': '#808080',
        'win95-button-face': '#C0C0C0',
      },
      fontFamily: {
        'win95': ['MS Sans Serif', 'sans-serif'],
      }
    },
  },
  plugins: [],
}