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
        'rojoUAO': {
          100: '#FF3333',
          200: '#AA1111'
        }
        
      },
      borderRadius:{
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
}
