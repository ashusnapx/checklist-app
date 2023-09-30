/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: '#1a202c',
        darkText: '#cbd5e0',
      },
},
  },
  plugins: [],
  darkMode: 'class',
}