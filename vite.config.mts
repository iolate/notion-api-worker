import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    ssr: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
  },
  ssr: {
    target: 'node',
    noExternal: true,
  }
})
