import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/predictions': {
        target: 'https://api.replicate.com/v1/predictions',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/predictions/, ''),
        headers: {
          'Authorization': `Token ${process.env.VITE_REPLICATE_API_TOKEN}`,
        },
      },
    },
  },
});