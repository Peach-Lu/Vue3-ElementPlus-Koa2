<template>
  <div>Welcome</div>
  <h1>欢迎来到主界面</h1>
  <router-link to="/login">去登录</router-link>
  <div>
    <audio :src="mp3Path" ref="mymusic"></audio>
    <el-radio-group v-model="radio" @change="handleChange">
      <el-radio
        border
        :label="item"
        v-for="(item, index) in mp3"
        :key="item"
        @click="handleClick(item)"
        >音乐{{ index }}</el-radio
      >
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const radio = ref('')
const mp3Path = ref('')
const mymusic = ref<HTMLElement>(null)
const mp3 = [
  'http://testdomainname.bkitchen.cn/pan/music/2.mp3',
  'http://testdomainname.bkitchen.cn/pan/music/3.mp3'
]
const handleChange = e => {
  mp3Path.value = e
  console.log(mymusic.value)
  mymusic.value.pause() // 停
  mymusic.value.play() //播放
}
const handleClick = item => {
  console.log('点击事件')
}
</script>
<style scoped></style>
