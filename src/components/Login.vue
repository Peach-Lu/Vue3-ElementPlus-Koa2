<template>
  <div>login</div>
  <el-button @click="goHome">回首页</el-button>
  <el-button @click="login">登录</el-button>
</template>

<script setup lang="ts">
import router from '../router'
// import _axios from '../utils/request'
import _axios from '../api/axios'
const goHome = () => {
  router.push({
    path: '/welcome'
  })
}
const login = () => {
  const data = {
    userName: 'admin',
    userPwd: 'admin'
  }
  _axios.post('/api/users/login', data).then(res => {
    console.log('res', res)
  })
}
</script>

<style scoped></style>
