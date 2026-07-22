/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ghz-black': 'var(--ghz-black)',
        'ghz-blue-deep': 'var(--ghz-blue-deep)',
        'ghz-blue-electric': 'var(--ghz-blue-electric)',
        'ghz-silver': 'var(--ghz-silver)',
        'ghz-red': 'var(--ghz-red)',
        'ghz-white': 'var(--ghz-white)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

