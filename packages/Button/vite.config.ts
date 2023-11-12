// packages/button/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 增加插件的使用
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'arteuiButton',
      fileName: 'arteui-button',
    },
    minify: false,
    rollupOptions: {
      external: [
        /@arte-ui.*/,
        'react',
        "react-dom"
      ],
    },
  }
})
