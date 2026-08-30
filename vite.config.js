import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('react/jsx-runtime')) {
            return 'vendor-react';
          }
          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: () => '/v1beta/models/gemini-2.0-flash:generateContent',
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const apiKey = process.env.GEMINI_API_KEY;
            if (apiKey) {
              const separator = proxyReq.path.includes('?') ? '&' : '?';
              proxyReq.path += `${separator}key=${encodeURIComponent(apiKey)}`;
            }
          });
        },
      },
    },
  },
});
