import { createRouter, createWebHashHistory } from "vue-router";
import Home from './../components/HelloWorld.vue'
import Welcome from './../components/Welcome.vue'
import Login from './../components/Login.vue'
import Test from './../views/test.vue'
import Test2 from './../views/test2.vue'
const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎页'
        },
        component: Welcome
      },
      {
        name: 'login',
        path: '/login',
        meta: {
          title: '登录'
        },
        component: Login
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router