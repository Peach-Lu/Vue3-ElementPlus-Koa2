import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import config from './config/index'
console.log(config)
axios.get(config.mockApi + '/login').then(res => {
  console.log(res)
})
console.log(import.meta.env)
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
