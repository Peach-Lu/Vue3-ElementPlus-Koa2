<template>
  <div>login</div>
  <el-button @click="goHome">回首页</el-button>
</template>

<script setup lang="ts">
import router from '../router'

const goHome = () => {
  router.push({
    path: '/welcome'
  })
}
</script>

<style scoped></style>
