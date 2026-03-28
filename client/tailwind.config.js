/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        calendly: {
          DEFAULT: '#006bff',
          hover: '#005ce6',
          ink: '#0b3558',
          muted: '#476788',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.05)',
        'glow-blue': '0 0 60px -12px rgba(0, 107, 255, 0.45)',
        'glow-soft': '0 25px 50px -12px rgba(0, 107, 255, 0.15)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-12px) scale(1.02)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
