import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // Change to the API server URL you want to proxy
        changeOrigin: true,               // Needed for virtual hosted sites
        secure: false,                    // Set to false if your API uses an untrusted SSL certificate
      },
    },
  },
  
})
