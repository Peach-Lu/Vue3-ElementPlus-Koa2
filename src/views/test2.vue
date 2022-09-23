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
  <h3 align="center">排列五辅助</h3>
  <span>最新一期：{{ updateValue2 }}</span>
  <el-row>
    <el-col :span="10" style="margin-top: 10px">
      <el-select
        @change="PaihandleSelect"
        v-model="selectValue2"
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
  </el-row>
  <el-row :gutter="1">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <div id="main5" style="height: 400px; width: 100%"></div>
      <h2 align="center">万</h2>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <div id="main6" style="height: 400px; width: 100%"></div>
      <h2 align="center">千</h2>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <div id="main7" style="height: 400px; width: 100%"></div>
      <h2 align="center">百</h2>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <div id="main8" style="height: 400px; width: 100%"></div>
      <h2 align="center">十</h2>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <div id="main9" style="height: 400px; width: 100%"></div>
      <h2 align="center">个</h2>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import _axios from './config/qixincai'
import { ElLoading } from 'element-plus'
import * as echarts from 'echarts'

// _axios
//   .get('/v2/prediction/ls/selectLsjb', {
//     params: {
//       lottery: 2,
//       qs: 90
//     }
//   })
//   .then(res => {
//     console.log('121212', res)
//   })

const queryInfo = ref({
  provinceId: 0,
  pageSize: 30,
  isVerify: 1,
  pageNo: 1,
  termLimits: 30
})
const queryInfo2 = ref({
  provinceId: 0,
  pageSize: 30,
  isVerify: 1,
  pageNo: 1,
  termLimits: 30
})
const selectValue = ref(30)
const selectValue2 = ref(30)
const updateValue = ref('')
const updateValue2 = ref('')
const total1 = ref({})
const total2 = ref({})
const total3 = ref({})
const total4 = ref({})
const total5 = ref({})
const total6 = ref({})
const total7 = ref({})
const total8 = ref({})
const total9 = ref({})
const handleSelect = e => {
  // console.log(e)
  queryInfo.value.pageSize = e
  queryInfo.value.termLimits = e
  start()
}
const PaihandleSelect = e => {
  queryInfo2.value.pageSize = e
  queryInfo2.value.termLimits = e
  start()
  // console.log(e)
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
  const { data: res2 } = await _axios.get(
    '/gateway/lottery/getHistoryPageListV1.qry?gameNo=350133',
    {
      params: {
        ...queryInfo2.value
      }
    }
  )
  // console.log('res2', res2)
  // console.log(res.value.list)
  // 七星彩
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
  // 排列五
  if (res2.value.list.length) {
    // 最新一期
    updateValue.value = res2.value.list[0].lotteryDrawResult
    // 字符串提取
    const five: any = []
    const six: any = []
    const seven: any = []
    const eight: any = []
    const ten: any = []
    // 数据筛选
    res2.value.list.forEach(item => {
      const result: any = item.lotteryUnsortDrawresult
        .split(' ')
        .splice(0, 5)
        .join('')
      console.log('result', result)
      // 填充数据
      five.push(result[0])
      six.push(result[1])
      seven.push(result[2])
      eight.push(result[3])
      ten.push(result[4])
    })
    total5.value = filterArray(five)
    total6.value = filterArray(six)
    total7.value = filterArray(seven)
    total8.value = filterArray(eight)
    total9.value = filterArray(ten)
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
  const myChart5 = echarts.init(document.getElementById('main5'))
  const myChart6 = echarts.init(document.getElementById('main6'))
  const myChart7 = echarts.init(document.getElementById('main7'))
  const myChart8 = echarts.init(document.getElementById('main8'))
  const myChart9 = echarts.init(document.getElementById('main9'))
  // 绘制图表
  myChart.setOption(filterData(total1))
  myChart2.setOption(filterData(total2))
  myChart3.setOption(filterData(total3))
  myChart4.setOption(filterData(total4))
  myChart5.setOption(filterData(total5))
  myChart6.setOption(filterData(total6))
  myChart7.setOption(filterData(total7))
  myChart8.setOption(filterData(total8))
  myChart9.setOption(filterData(total9))
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

// const filterData2 = total => {
//   return {
//     tooltip: {
//       trigger: 'axis',
//       axisPointer: {
//         type: 'shadow',
//         label: {
//           formatter: params => {
//             // console.log(params.seriesData[0].value)
//             // console.log(params)
//             return `${params.seriesData[0].value} /${selectValue.value}`
//           }
//         }
//       }
//     },
//     xAxis: {
//       type: 'category',
//       data: Object.keys(total.value)
//     },
//     yAxis: {
//       type: 'value'
//     },
//     series: [
//       {
//         data: Object.values(total.value),
//         label: {
//           show: true,
//           position: 'inside'
//         },
//         type: 'bar'
//       }
//     ]
//   }
// }
</script>

<style scoped>
.active {
  background: #eee;
}
</style>
