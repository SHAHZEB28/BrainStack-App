/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  safelist: [
    // Brand palette
    'bg-brand-primary',
    'bg-brand-secondary',
    'bg-brand-accent',
    // Text palette
    'text-text-primary',
    'text-text-secondary',
    'text-text-light',
    // UI palette
    'bg-ui-background',
    'border-ui-border',
    'bg-ui-hover',
    // Utility classes
    'bg-white/50',
    'backdrop-blur-lg',
    // Shadows
    'shadow-subtle',
    'shadow-medium',
    'shadow-lifted',
    // Border radius
    'rounded-xl',
    'rounded-2xl',
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
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        subtle: '0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)',
        medium: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
        lifted: '0 25px 50px -12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
