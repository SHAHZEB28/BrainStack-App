/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // A new, more sophisticated color palette
        brand: {
          primary: '#6a5af9', // A vibrant, modern purple
          secondary: '#f0f2f5', // A very light, clean gray for backgrounds
          accent: '#ff7a59', // A warm, energetic accent color
        },
        text: {
          primary: '#1a202c', // A dark, highly readable color for main text
          secondary: '#718096', // A softer gray for less important text
          light: '#a0aec0', // For subtle hints and placeholders
        },
        ui: {
          background: '#f7fafc', // Main background color
          border: '#e2e8f0', // For subtle borders on cards and inputs
          hover: '#edf2f7', // A slightly darker hover state for UI elements
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem', // A slightly larger border radius for a softer look
        '2xl': '1.5rem',
      },
      boxShadow: {
        // Softer, more realistic shadows
        'subtle': '0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)',
        'medium': '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
        'lifted': '0 25px 50px -12px rgba(0,0,0,0.1)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}
