/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        guardian: {
          navy: '#0B1F3A',
          blue: '#2563EB',
          bg: '#FFFFFF',
          section: '#F8FAFC',
          card: '#EEF2F7',
          heading: '#0F172A',
          body: '#334155',
          secondary: '#64748B',
          border: '#CBD5E1',
          success: '#16A34A',
          warning: '#EA580C',
          danger: '#DC2626',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59,130,246,0.2), 0 18px 35px -16px rgba(34,211,238,0.4)',
        card: '0 20px 35px -24px rgba(2,6,23,0.85)',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)',
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.95' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
        blob: 'blob 10s infinite',
      },
    },
  },
  plugins: [],
};
