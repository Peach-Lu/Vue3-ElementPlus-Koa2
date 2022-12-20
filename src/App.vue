<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
proxy.$storeage.setItem('userInfo', { age: 30, name: 'jacl' })
proxy.$storeage.setItem('userInfo', { hello: 'jacl' })

const userInfo = proxy.$storeage.getItem('userInfo')
console.log(userInfo)
proxy.$storeage.clearAll()
</script>
<template>
  <router-view></router-view>
</template>
