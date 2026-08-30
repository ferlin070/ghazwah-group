/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ghz-black': '#07111f',
        'ghz-black-deep': '#020817',
        'ghz-blue-deep': '#123b7a',
        'ghz-blue-electric': '#4f9cf9',
        'ghz-purple': '#475569',
        'ghz-silver': '#d7deea',
        'ghz-silver-muted': '#8a96a8',
        'ghz-red': '#d24b4b',
        'ghz-gold': '#d7a84f',
        'ghz-green': '#2fbf8f',
        'ghz-white': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient-flow 8s linear infinite',
        'float-soft': 'icon-float-slow 7s ease-in-out infinite',
      },
      boxShadow: {
        'corporate-sm': '0 10px 30px rgba(2, 8, 23, 0.24)',
        corporate: '0 24px 80px rgba(2, 8, 23, 0.38)',
        'blue-soft': '0 18px 40px rgba(79, 156, 249, 0.22)',
        'gold-soft': '0 18px 40px rgba(215, 168, 79, 0.18)',
        'neon-sm': '0 10px 30px rgba(79, 156, 249, 0.14)',
        neon: '0 18px 45px rgba(79, 156, 249, 0.18)',
        'neon-lg': '0 24px 70px rgba(79, 156, 249, 0.2)',
        'neon-purple': '0 18px 45px rgba(71, 85, 105, 0.18)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-cyber': 'linear-gradient(135deg, #020817 0%, #07111f 52%, #10213a 100%)',
        'executive-mesh': 'radial-gradient(circle at 15% 0%, rgba(79, 156, 249, 0.18), transparent 34rem), radial-gradient(circle at 85% 12%, rgba(215, 168, 79, 0.12), transparent 28rem)',
      },
    },
  },
  plugins: [],
}
