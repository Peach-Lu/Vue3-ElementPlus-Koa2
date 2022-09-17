<template>
  <h3 align="center">七星彩辅助</h3>
  <span>最新一期：{{ updateValue }}</span>
  <el-col :span="10" style="margin-top: 10px">
    <el-select
      @change="handleSelect"
      v-model="selectValue"
      class="m-2"
      placeholder="Select"
      size="large"
    >
      <el-option
        v-for="item in [
          { label: '最近30期', value: 30 },
          { label: '最近50期', value: 50 },
          { label: '最近100期', value: 100 }
        ]"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-col>
  <el-row :gutter="1">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <div id="main" style="height: 400px; width: 100%"></div>
      <h2 align="center">千</h2>

      <!-- <div v-for="(item, key, index) in total1" :key="key">
        <div :class="{ active: index % 2 === 0 }">{{ key }}--{{ item }}</div>
      </div> -->
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <!-- <div v-for="(item, key, index) in total2" :key="key"> -->
      <div id="main2" style="height: 400px; width: 100%"></div>
      <h2 align="center">百</h2>
      <!-- <div :class="{ active: index % 2 === 0 }">{{ key }}--{{ item }}</div> -->
      <!-- </div> -->
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <!-- <div v-for="(item, key, index) in total3" :key="key"> -->
      <div id="main3" style="height: 400px; width: 100%"></div>
      <h2 align="center">十</h2>

      <!-- <div :class="{ active: index % 2 === 0 }">{{ key }}--{{ item }}</div> -->
      <!-- </div> -->
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <!-- <div v-for="(item, key, index) in total4" :key="key"> -->
      <div id="main4" style="height: 400px; width: 100%"></div>
      <h2 align="center">个</h2>
      <!-- <div :class="{ active: index % 2 === 0 }">{{ key }}--{{ item }}</div> -->
      <!-- </div> -->
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
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import _axios from './config/qixincai'
import { ElLoading } from 'element-plus'
import * as echarts from 'echarts'
const queryInfo = ref({
  provinceId: 0,
  pageSize: 30,
  isVerify: 1,
  pageNo: 1,
  termLimits: 30
})
const selectValue = ref(30)
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
  mountedChart()
  loading.close()
}
onMounted(async () => {
  await start() //执行网络请求
  mountedChart() //挂载echart
})
const mountedChart = () => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main'))
  const myChart2 = echarts.init(document.getElementById('main2'))
  const myChart3 = echarts.init(document.getElementById('main3'))
  const myChart4 = echarts.init(document.getElementById('main4'))
  // 绘制图表
  myChart.setOption(filterData(total1))
  myChart2.setOption(filterData(total2))
  myChart3.setOption(filterData(total3))
  myChart4.setOption(filterData(total4))
  window.addEventListener('resize', () => {
    console.log('resize')
    myChart.resize()
    myChart2.resize()
    myChart3.resize()
    myChart4.resize()
  })
}
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
// 筛选数据

const filterData = total => {
  // console.log(
  //   Object.values(total.value).map(item => item + `/${selectValue.value}`)
  // )
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          formatter: params => {
            // console.log(params.seriesData[0].value)
            // console.log(params)
            return `${params.seriesData[0].value} /${selectValue.value}`
          }
        }
      }
    },
    xAxis: {
      type: 'category',
      data: Object.keys(total.value)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: Object.values(total.value),
        label: {
          show: true,
          position: 'inside'
        },
        type: 'bar'
      }
    ]
  }
}
</script>

<style scoped>
.active {
  background: #eee;
}
</style>
