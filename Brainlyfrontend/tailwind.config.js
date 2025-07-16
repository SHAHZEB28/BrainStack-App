/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        brand: { 
          primary: '#6a5af9', 
          secondary: '#f0f2f5', 
          accent: '#ff7a59' 
        },
        text:  { 
          primary: '#1a202c', 
          secondary: '#4a5568',
          light: '#a0aec0' 
        },
        ui:    { 
          // Changed background to a very light purple (Lavender)
          background: '#E6E6FA', // Very light purple
          // Border remains black as per your previous request
          border: '#000000', // Black
          hover: '#f3f4f6', 
        },
      },
      fontFamily: { 
        sans: ['Inter','sans-serif'] 
      },
      borderRadius: { 
        xl: '1rem', 
        '2xl': '1.5rem' 
      },
      boxShadow: {
        subtle: '0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)',
        medium:'0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
        lifted:'0 25px 50px -12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};