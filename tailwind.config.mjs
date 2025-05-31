/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          50: '#FFF7ED',
          100: '#FFEED6',
          200: '#FED0AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF6600',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },

        // Light mode flat colors
        'light-background': '#FFF5EB',
        'light-surface': '#FFFFFF',
        'light-text-primary': '#1e293b',
        'light-text-secondary': '#475569',
        'light-border': '#E67E22',

        // Dark mode flat colors
        'dark-background-base': '#0f172a',
        'dark-background-elevated': '#1e293b',
        'dark-background-subtle': '#334155',
        'dark-surface-base': '#1e293b',
        'dark-text-primary': '#f8fafc',
        'dark-text-secondary': '#cbd5e1',
        'dark-text-muted': '#94a3b8',
        'dark-border': '#1e293b',
        'dark-border-light': '#334155',
      },

      // Gradient configuration
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FF6600 0%, #FF8533 100%)',
        'dark-gradient': 'linear-gradient(to bottom, #0f172a 0%, #1e293b 100%)',
      },
    },
  },
  plugins: [
   
  ],
}

