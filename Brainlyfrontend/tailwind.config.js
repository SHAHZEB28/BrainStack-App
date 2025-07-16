/** @type {import('tailwindcss').Config} */
export default {
  // FIX: This 'content' array is the most critical part for production builds.
  // It tells Tailwind to scan all of these files and folders for any CSS classes you've used.
  // If this is incorrect, your styles will be missing on the deployed site.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6a5af9',
          secondary: '#f0f2f5',
          accent: '#ff7a59',
        },
        text: {
          primary: '#1a202c',
          secondary: '#718096',
          light: '#a0aec0',
        },
        ui: {
          background: '#f7fafc',
          border: '#e2e8f0',
          hover: '#edf2f7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)',
        'medium': '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
        'lifted': '0 25px 50px -12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
