import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://cat-match.easygame2021.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // '/apis': {
      //   target: 'https://webapi.sporttery.cn', //七星彩
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/apis/, '')
      // },
      // '/apip': {
      //   target: 'https://wsqbusymp.gouli8.cn', //七星彩
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/apis/, '')
      // }
    }
  },
  plugins: [vue()]
})
