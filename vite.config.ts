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
    // rollupOptions: {
    //   input: {
    //     main: resolve(root, 'index.html'),
    //     login: resolve(root, 'view', 'login', 'index.html'),
    //     home: resolve(root, 'view', 'home', 'index.html'),
    //     room: resolve(root, 'view', 'room', 'index.html'),
    //   }
    // }
  }
})