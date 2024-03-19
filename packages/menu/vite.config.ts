// packages/button/vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  // 增加插件的使用
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'arteuiMenu',
      fileName: 'arteui-menu',
    },
    minify: false,
    rollupOptions: {
      external: [
        /@arte-ui.*/, 
        'react',
        "react-dom"
      ],
      output:{
        format:"es",
        dir:"dist"
      }
    },
  }
})
