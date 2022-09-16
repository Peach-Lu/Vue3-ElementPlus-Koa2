<template>
  <h3 align="center">某羊辅助</h3>
  <span>需抓包获取token</span>
  <el-row>
    <el-col :span="24">
      <el-input
        type="textarea"
        :rows="8"
        placeholder="请输入token"
        v-model="textarea"
      >
      </el-input>
    </el-col>
    <el-col :span="10">
      <el-input-number
        v-model="num"
        :min="1"
        :max="999"
        label="描述文字"
      ></el-input-number>
    </el-col>
    <el-col :span="10">
      <el-button @click="start">执行</el-button>
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
      成功次数：{{ success }}
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
      执行次数过多可能会导致成功率降低
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import _axios from './config/index'
import { ElMessage } from 'element-plus'
const textarea = ref(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ0Mzg2MTYsIm5iZiI6MTY2MzMzNjQxNiwiaWF0IjoxNjYzMzM0NjE2LCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjozMDIxNTk2NywiZGVidWciOiIiLCJsYW5nIjoiIn0.ve2y3OoHCQ_9s_0IIcUTrFdRAVHdEkiqTVpDAgDzi9I'
)
window.localStorage.setItem('t', textarea.value)
const num = ref(1)
const success = ref(0)
const timer: any = ref(0)
const start = async () => {
  if (!textarea.value)
    ElMessage({
      message: 'token不能为空',
      type: 'error'
    })
  success.value = 0
  timer.value = setInterval(request, 5000)
  // for (let i = 0; i < num.value; i++) {
  //   request() //执行
  // }
}
const request = async () => {
  const res = await _axios.get('/sheep/v1/game/game_over', {
    params: {
      rank_score: 1,
      rank_state: 1,
      rank_time: 20,
      rank_role: 1,
      skin: 1
    }
  })
  console.log(res)
  if (res.status === 200) {
    ElMessage({
      message: '成功',
      type: 'success'
    })
    ++success.value
    if (success.value >= num.value) {
      console.log('成功')
      ElMessage({
        message: '执行完毕',
        type: 'success'
      })
      clearInterval(timer.value)
    }
  }
}
</script>

<style scoped></style>
