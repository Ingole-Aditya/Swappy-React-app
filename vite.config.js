import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use a custom cache directory to avoid permission issues
  cacheDir: path.resolve(__dirname, '.vite_cache'),
})
