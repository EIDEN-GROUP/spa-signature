import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // "@/..." means "src/...", as declared in tsconfig.json.
    tsconfigPaths: true,
  },
})
