import { defineConfig } from 'vite'

export default defineConfig({
  
  // 增加插件的使用
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'arteuiUi',
      fileName: 'arteui-ui',
    },
    minify: false,
    rollupOptions: {
      external: [
        /@arte-ui.*/
      ],
      output:{
        format:"es",
        dir:"dist"
      },
    },

  }
})
