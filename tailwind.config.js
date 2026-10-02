/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#fdf6f3',
          100: '#faede7',
          200: '#f6dbd0',
          300: '#eebfae',
          400: '#e39981',
          500: '#c86445', // warm rustic terracotta
          600: '#b44e31',
          700: '#943e26',
          800: '#7a3422',
          900: '#652d1f',
        },
        cream: {
          50: '#fffef9',
          100: '#fbf8ee',
          200: '#f6f1de',
          300: '#eee5c4',
          400: '#e3d29f',
        },
        mustard: {
          50: '#fefce8',
          100: '#fef8c3',
          200: '#feec8a',
          300: '#fbd744',
          400: '#f2bd14',
          500: '#d79e0a',
          600: '#b57906',
          700: '#8f5607',
        },
        warmbrown: {
          50: '#f9f6f3',
          100: '#ede6dd',
          200: '#dccebe',
          300: '#c7b09b',
          400: '#b19177',
          500: '#8c684d',
          600: '#73523c',
          700: '#5a3f2d',
          800: '#432f22',
          900: '#2d1f16',
        },
        clay: '#e8ded2',
        sage: '#a3b18a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        hand: ['"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(101, 45, 31, 0.08)',
        'warm': '0 8px 24px -4px rgba(101, 45, 31, 0.10)',
        'warm-lg': '0 16px 36px -6px rgba(101, 45, 31, 0.14)',
      },
      borderRadius: {
        'cozy': '1.25rem',
        'cozy-lg': '1.75rem',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn:  'fadeIn 0.2s ease-out both',
        slideUp: 'slideUp 0.3s ease-out both',
      }
    },
  },
  plugins: [],
}
