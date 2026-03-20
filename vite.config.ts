import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        // Proxy /api/* to the Node.js backend during development
      '/api': {
        target: 'https://portfoliyobackend-fybs.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
