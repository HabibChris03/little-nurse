import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor';
          }
          // Split UI libraries
          if (id.includes('framer-motion') || id.includes('lottie-react')) {
            return 'ui';
          }
          // Split router
          if (id.includes('react-router-dom')) {
            return 'router';
          }
          // Split icons library
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Split form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers') || id.includes('zod')) {
            return 'forms';
          }
          // Split utility libraries
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('date-fns') || id.includes('axios')) {
            return 'utils';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600, // Set to 600 to see if we can get below 500
  },
})
