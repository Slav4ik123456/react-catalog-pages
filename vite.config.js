import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  base: '/react-catalog-pages/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000'
    }
  }
});
