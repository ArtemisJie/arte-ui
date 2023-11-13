// packages/button/vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  // 增加插件的使用
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'arteuiTransition',
      fileName: 'arteui-transition',
    },
    
    minify: false,
    rollupOptions: {
      external: [
        /@arte-ui.*/, 
        /CSSTransition.*/,
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
