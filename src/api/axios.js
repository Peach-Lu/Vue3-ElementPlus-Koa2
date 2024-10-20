/**
 * axios的二次封装
 */
import axios from "axios";
import config from "../config";
import { ElMessage } from 'element-plus'
import router from "../router";
const TOKEN_INVLID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后再试'
// 创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL: '/api',
  timeout: 8000
})
// 请求拦截
service.interceptors.request.use(req => {
  // to-do
  // const header = req.headers
  // if (!header.Authoriation) //携带token
  return req
})
// 响应拦截
service.interceptors.response.use(res => {
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else if (code === 4001) {
    ElMessage.error(TOKEN_INVLID)
    setTimeout(() => {
      router.push({
        path: '/login'
      })
    }, 3000);
    return Promise.reject(TOKEN_INVLID)

  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(NETWORK_ERROR)
  }
})
export default service