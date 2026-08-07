import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige las peticiones locales del chatbot hacia el servidor local de Netlify
      '/.netlify/functions': {
        target: 'http://localhost:8888', // Puerto por defecto de Netlify Dev
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
