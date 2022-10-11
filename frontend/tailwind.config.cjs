/* * @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        'rojoUAO': '#FF3333'
      },
      borderRadius:{
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
}
