/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'handwriting': ['Indie Flower', 'cursive'],
        'manuscript': ['Patrick Hand', 'cursive'],
        'caveat': ['Caveat', 'cursive'],
        'typewriter': ['Courier Prime', 'monospace'],
      },
      colors: {
        'kraft': {
          light: '#e8dcc4',
          DEFAULT: '#c9b896',
          dark: '#a69070',
          aged: '#d4c4a8',
        },
        'leather': {
          burgundy: '#722F37',
          dark: '#4a1c21',
          accent: '#8B4049',
        },
        'washi': {
          pink: '#f8b4c4',
          mint: '#a8d8c8',
          cream: '#f5e6c8',
          blue: '#a8c8d8',
        }
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '-1': '-1deg',
        '-2': '-2deg',
        '-3': '-3deg',
      },
      boxShadow: {
        'paper': '3px 5px 8px rgba(0,0,0,0.4)',
        'photo': '4px 6px 12px rgba(0,0,0,0.35)',
        'sticker': '2px 3px 6px rgba(0,0,0,0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
