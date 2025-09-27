import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/HMA-voyages-sri-lanka/', // required for subpath deploys on Pages
})
