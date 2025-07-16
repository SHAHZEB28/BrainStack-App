/** @type {import('tailwindcss').Config} */
export default {
  // This 'content' array is the most critical part for production builds.
  // It tells Tailwind to scan all of these files and folders for any CSS classes you've used.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",  // include html in case you have inline templates
  ],
  // Safelist dynamic or computed classes so PurgeCSS doesn't remove them
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
        // A new, more sophisticated and attractive color palette
        brand: {
          primary: '#6a5af9', // A vibrant, modern purple
          secondary: '#f0f2f5', // A very light, clean gray for UI elements
          accent: '#ff7a59', // A warm, energetic accent color for notifications or highlights
        },
        text: {
          primary: '#1a202c', // A dark, highly readable color for main text
          secondary: '#718096', // A softer gray for less important text
          light: '#a0aec0', // For subtle hints and placeholders
        },
        ui: {
          background: '#f7fafc', // The main background color for the dashboard
          border: '#e2e8f0', // For subtle borders on cards and inputs
          hover: '#edf2f7', // A slightly darker hover state for interactive elements
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
        // Softer, more realistic shadows for a professional look
        subtle: '0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)',
        medium: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
        lifted: '0 25px 50px -12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
