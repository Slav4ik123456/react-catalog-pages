import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: 'base: /react-catalog-pages/',
  plugins: [react()],
})