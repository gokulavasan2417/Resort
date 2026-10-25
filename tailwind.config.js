/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f6f4',
          100: '#e1ebe5',
          200: '#c5d8cd',
          300: '#9ebeac',
          400: '#719e86',
          500: '#4f8067',
          600: '#3c6651',
          700: '#2f5141',
          800: '#233a2e',
          900: '#1b2e23',
          950: '#0e1a14',
        },
        gold: {
          50: '#fbf9f0',
          100: '#f5f0db',
          200: '#ebe0b4',
          300: '#decb87',
          400: '#cfb25a',
          500: '#c5a059',
          600: '#b08742',
          700: '#8f6834',
          800: '#75532f',
          900: '#63442a',
          950: '#392415',
        },
        sand: {
          50: '#fbfaf8',
          100: '#f6f3ee',
          200: '#ede6db',
          300: '#dfd3c3',
          400: '#cbbba7',
          500: '#b4a089',
          600: '#9c8771',
          700: '#7d6b59',
          800: '#655749',
          900: '#54483e',
        },
        cream: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f7f4ee',
          300: '#f1ebd8',
          400: '#e7ddc4',
        },
        charcoal: {
          800: '#242a27',
          900: '#181e1b',
          950: '#111413',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
