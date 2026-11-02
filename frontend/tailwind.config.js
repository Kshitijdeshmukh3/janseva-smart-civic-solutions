/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // XINTRA-Inspired Premium Purple & Violet Enterprise Theme
        brand: {
          50: '#F3EEFE',
          100: '#E6DAFD',
          200: '#D0B8FB',
          300: '#B58EF7',
          400: '#9B67F3',
          500: '#8B5CF6',
          600: '#6739E8', // Primary Brand Purple
          700: '#5428D2',
          800: '#431DB5',
          900: '#2E1282',
        },
        primary: {
          DEFAULT: '#6739E8',
          hover: '#5527D6',
          light: '#F3EEFE',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          light: '#EDE9FE',
        },
        accent: {
          DEFAULT: '#A855F7',
          light: '#FAF5FF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          bg: '#F7F7FC',
          sidebar: '#17152B',
          sidebarHover: '#23203D',
          border: '#ECECF6',
          borderLight: '#F0F0FA',
        },
        content: {
          main: '#202033',
          secondary: '#77758C',
          muted: '#9E9DB2',
        },
        status: {
          success: '#16A36A',
          successBg: '#E8F7F0',
          warning: '#F2A93B',
          warningBg: '#FEF6E9',
          danger: '#E34D59',
          dangerBg: '#FDF0F1',
          info: '#3996E8',
          infoBg: '#EDF5FD',
        },
        // Backwards compatibility aliases
        janseva: {
          navy: '#17152B',
          navyLight: '#23203D',
          blue: '#6739E8',
          blueHover: '#5527D6',
          lightBlue: '#8B5CF6',
          sky: '#F3EEFE',
          accent: '#A855F7',
          success: '#16A36A',
          warning: '#F2A93B',
          danger: '#E34D59',
          surface: '#F7F7FC',
          border: '#ECECF6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(23, 21, 43, 0.04), 0 1px 3px rgba(23, 21, 43, 0.02)',
        'card-hover': '0 12px 28px -4px rgba(103, 57, 232, 0.12), 0 4px 10px -2px rgba(103, 57, 232, 0.04)',
        'modal': '0 25px 50px -12px rgba(23, 21, 43, 0.25)',
      },
      borderRadius: {
        'card': '16px',
        'badge': '8px',
      }
    },
  },
  plugins: [],
}
