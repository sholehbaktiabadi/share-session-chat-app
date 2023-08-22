import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    port: +process.env.VITE_PORT 
  },
  preview: {
    port: +process.env.VITE_PORT,
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        // about: resolve(root, 'view', 'about', 'index.html'),
        // service: resolve(root, 'view', 'service', 'index.html'),
        // contact: resolve(root, 'view', 'contact', 'index.html'),
      }
    }
  }
})