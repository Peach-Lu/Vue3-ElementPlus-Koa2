import { createApp } from 'vue'
import ElementPlus, { spaceProps } from 'element-plus'
import 'element-plus/dist/index.css'
// import './style.css'
import App from './App.vue'
import router from './router'
import request from './utils/request'
import storage from './utils/storage'
console.log(import.meta.env)
// 挂载全局请求
const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$storeage = storage
app.use(ElementPlus)
app.use(router)
app.mount('#app')
