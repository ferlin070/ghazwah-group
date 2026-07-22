import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Routes /api/gemini requests to the real Gemini API, adding the
      // API key from the server-side environment so it is NEVER exposed
      // to the client. For production, deploy a serverless proxy function
      // (e.g. Vercel Edge Function, Netlify Function) following the same
      // pattern — do NOT call the Gemini API directly from the browser.
      '/api': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        // Rewrite /api/gemini → /v1beta/models/gemini-2.0-flash:generateContent
        rewrite: (path) => path.replace(
          '/api/gemini',
          '/v1beta/models/gemini-2.0-flash:generateContent'
        ),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            // Append API key from server-side env (not VITE_ prefixed)
            const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
            if (apiKey) {
              const separator = proxyReq.path.includes('?') ? '&' : '?';
              proxyReq.path += `${separator}key=${encodeURIComponent(apiKey)}`;
            }
          });
        },
      },
    },
  },
})
