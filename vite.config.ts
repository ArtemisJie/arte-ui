import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'
// https://vitejs.dev/config/
const pathSrc = path.resolve(__dirname, 'src');
export default defineConfig({
  build: {
    lib: {
      entry: './packages/ui/src/index.tsx',
      name: 'arte-ui',
      fileName: (format) => `arte-ui.${format}.js`
    },
  },
  resolve: {
    alias: {
      '@/': `${pathSrc}/`,
    },
  },
  plugins:[
    react(),
  ],
})
