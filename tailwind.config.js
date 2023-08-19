/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '0px',   
        '2sm':'500px', 
        'md': '880px',    
        'lg': '1440px',    
      }
    },
  },
  plugins: [],
}

