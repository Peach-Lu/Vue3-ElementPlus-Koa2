import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import config from './config/index'
import request from './utils/request'
// console.log(config)
// axios.get(config.mockApi + '/login').then(res => {
//   console.log(res)
// })
console.log(import.meta.env)
// 挂载全局请求
const app = createApp(App)
app.config.globalProperties.$request = request
app.use(ElementPlus)
app.use(router)
app.mount('#app')
