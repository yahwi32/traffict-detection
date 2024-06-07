/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#2552E6',
      },
      keyframes: {
        slideOut: {
          '0%': { height: 0, opacity: 0 },
          '100%': { height: 'fit-content', opacity: 1 },
        },
      },
      animation: {
        slideOut: 'slideOut 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
