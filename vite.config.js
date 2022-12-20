import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      // '/api': {
      //   target: 'https://cat-match.easygame2021.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // },
      '/apip': {
        target: 'https://webapi.sporttery.cn', //七星彩
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apip/, '')
      },
      // '/apip': {
      //   target: 'https://webapi.sporttery.cn', //排列五
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/apip/, '')
      // }
    }
  },
  plugins: [vue()]
})
