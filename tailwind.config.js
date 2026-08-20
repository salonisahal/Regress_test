/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-hover': '#4338CA',
        'primary-soft': '#EEF2FF',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        'surface-muted': '#F1F5F9',
        border: '#E2E8F0',
        ink: '#0F172A',
        secondary: '#475569',
        muted: '#94A3B8',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        info: '#0284C7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        panel: '14px',
      },
    },
  },
  plugins: [],
}

