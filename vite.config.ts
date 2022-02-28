import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue({
    template: {
      compilerOptions: {
        // 作为自定义元素处理
        isCustomElement: tag => tag.startsWith('krry-')
      }
    }
  })],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, 'src')
    }
  }
})
