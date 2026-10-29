import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { mockQuicksortPlugin } from './vite-plugins/mock-quicksort.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), mockQuicksortPlugin()],
  server: {
    host: '127.0.0.1',
    port: 45261,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 45261,
    strictPort: true,
  },
})
