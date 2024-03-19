// packages/shared/vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
    build: {

        lib: {
            entry: './src/index.tsx',

            name: 'ArteHooks',
            // 产物文件名称
            fileName: 'arteui-hooks',
        },
        minify: false,
        rollupOptions:{
        external:[/react.*/]
        }
    }
})
