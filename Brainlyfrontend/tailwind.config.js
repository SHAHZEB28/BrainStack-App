/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  safelist: [
    'bg-brand-primary',
    'text-white',
    'hover:bg-brand-primary/90',
    'bg-brand-secondary',
    'text-brand-primary',
    'hover:bg-brand-secondary/80',
    'h-9',
    'h-10',
    'h-11',
    'px-3',
    'px-4',
    'px-8',
    'py-2',
    'rounded-lg',
    'text-sm',
    'font-medium'
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
          secondary: '#4a5568', // Made slightly darker for better readability
          light: '#a0aec0' 
        },
        ui:    { 
          background: '#f7fafc', 
          border: '#cbd5e1', 
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
