/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nakhoda Cloud Inspired Cyberpunk Palette
        'ghz-black': '#0a0a1f',
        'ghz-black-deep': '#1a0b2e',
        'ghz-blue-deep': '#0066ff',
        'ghz-blue-electric': '#00d4ff',
        'ghz-purple': '#6366f1',
        'ghz-silver': '#d1d5db',
        'ghz-silver-muted': '#9ca3af',
        'ghz-red': '#f43f5e',
        'ghz-gold': '#fbbf24',
        'ghz-green': '#10b981',
        'ghz-white': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient': 'gradient-flow 3s linear infinite',
      },
      boxShadow: {
        'neon-sm': '0 0 10px rgba(0, 212, 255, 0.3)',
        'neon': '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)',
        'neon-lg': '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(99, 102, 241, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-cyber': 'linear-gradient(135deg, #0a0a1f 0%, #1a0b2e 100%)',
      },
    },
  },
  plugins: [],
}

