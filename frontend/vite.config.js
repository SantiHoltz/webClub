import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['b3541d5db885.ngrok-free.app']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
