/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        turquoise: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        gold: {
          50: '#fff9e6',
          100: '#ffedb3',
          200: '#ffe180',
          300: '#ffd54d',
          400: '#ffc91a',
          500: '#e6b300',
          600: '#b38c00',
          700: '#806600',
          800: '#4d3d00',
          900: '#1a1400',
        },
        navy: {
          50: '#f2f5f9',
          100: '#e6ebf2',
          200: '#bfcce0',
          300: '#99adcd',
          400: '#4d70a6',
          500: '#003380',
          600: '#002e73',
          700: '#002966',
          800: '#001f4d',
          900: '#001433',
        }
      },
      keyframes: {
        overlayShow: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalSlide: {
          '0%': { transform: 'translate(-50%, -48%) scale(0.96)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      },
      animation: {
        overlayShow: 'overlayShow 150ms ease-out',
        modalSlide: 'modalSlide 150ms ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};