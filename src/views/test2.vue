<template>
  <h3 align="center">七星彩辅助</h3>
  <span>最新一期：{{ updateValue }}</span>
  <el-row>
    <el-col :span="6">
      <div v-for="(item, key, index) in total1" :key="key">
        <div :class="{ active: index % 2 === 0 }">{{ key }}--{{ item }}</div>
      </div>
    </el-col>
    <el-col :span="6">
      <div v-for="(item, key, index) in total2" :key="key">
        <div :class="{ active: index % 2 === 0 }">{{ key }}--{{ item }}</div>
      </div>
    </el-col>
    <el-col :span="6">
      <div v-for="(item, key, index) in total3" :key="key">
        <div :class="{ active: index % 2 === 0 }">{{ key }}--{{ item }}</div>
      </div>
    </el-col>
    <el-col :span="6">
      <div v-for="(item, key, index) in total4" :key="key">
        <div :class="{ active: index % 2 === 0 }">{{ key }}--{{ item }}</div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <!-- <el-col :span="24">
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
    </el-col> -->
    <el-col :span="10">
      <!-- <el-button @click="start">执行</el-button> -->
      <el-select
        @change="handleSelect"
        v-model="selectValue"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="item in [
            { label: '30', value: 30 },
            { label: '50', value: 50 },
            { label: '100', value: 100 }
          ]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <!-- <el-col :span="24" style="margin-top: 10px">
      成功次数：{{ success }}
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
      执行次数过多可能会导致成功率降低
    </el-col> -->
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import _axios from './config/qixincai'
import { ElLoading } from 'element-plus'
const queryInfo = ref({
  provinceId: 0,
  pageSize: 100,
  isVerify: 1,
  pageNo: 1,
  termLimits: 100
})
const selectValue = ref(100)
const updateValue = ref('')
const total1 = ref({})
const total2 = ref({})
const total3 = ref({})
const total4 = ref({})

const handleSelect = e => {
  // console.log(e)
  queryInfo.value.pageSize = e
  queryInfo.value.termLimits = e
  start()
}

// '/gateway/lottery/getHistoryPageListV1.qry?gameNo=04&provinceId=0&pageSize=100&isVerify=1&pageNo=1&termLimits=100'

const start = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  const { data: res } = await _axios.get(
    '/gateway/lottery/getHistoryPageListV1.qry?gameNo=04',
    {
      params: {
        ...queryInfo.value
      }
    }
  )
  // console.log(res.value.list)
  if (res.value && res.value.list.length) {
    // 最新一期
    updateValue.value = res.value.list[0].lotteryDrawResult
    // 字符串提取
    const one: any = []
    const two: any = []
    const three: any = []
    const four: any = []
    // 数据筛选
    res.value.list.forEach(item => {
      const result: any = item.lotteryDrawResult
        .split(' ')
        .splice(0, 4)
        .join('')
      // 填充数据
      one.push(result[0])
      two.push(result[1])
      three.push(result[2])
      four.push(result[3])
    })
    total1.value = filterArray(one)
    total2.value = filterArray(two)
    total3.value = filterArray(three)
    total4.value = filterArray(four)
  }
  loading.close()
}
start() //执行
// 筛选次数
const filterArray = array => {
  return array.reduce((allNum, item) => {
    if (item in allNum) {
      allNum[item]++
    } else {
      allNum[item] = 1
    }
    return allNum
  }, {})
}
</script>

<style scoped>
.active {
  background: #eee;
}
</style>
