import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    // Контейнер центрируем, сохраняем твои отступы
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem'
      },
      // Контейнерная ширина для десктопа (1440)
      screens: {
        xl: '1440px'
      }
    },

    // Переопределяем БРЕЙКПОИНТЫ: только md (768) и xl (1440).
    // Базовая мобильная стилизация — без префиксов (320+).
    screens: {
      md: '768px',
      xl: '1440px'
    },

    extend: {
      colors: {
        border: 'rgba(23, 42, 48, 0.12)',
        brand: { DEFAULT: '#268C96', light: '#46AAB4', muted: '#E6F4F5', dark: '#1E6E76' },
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Merriweather"', 'serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(20,46,54,0.08)'
      },
      backgroundImage: {
        grid:
          'linear-gradient(0deg, rgba(58,107,120,0.07) 1px, transparent 0), ' +
          'linear-gradient(90deg, rgba(58,107,120,0.07) 1px, transparent 0)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out'
      }
    }
  },
  plugins: []
} satisfies Config
