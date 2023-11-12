// packages/button/vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  // 增加插件的使用
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'arteuiInput',
      fileName: 'arteui-input',
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
