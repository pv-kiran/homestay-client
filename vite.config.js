import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any aliases you might need
    },
  },
  optimizeDeps: {
    include: ['leaflet'],
  },
  build: {
    commonjsOptions: {
      include: [/leaflet/, /node_modules/],
    },
  },
});