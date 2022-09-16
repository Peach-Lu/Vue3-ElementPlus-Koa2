import axios from 'axios'
const instance = axios.create({
  baseURL: '/apis',
  timeout: 5000
})
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    config.headers = {
      //添加token，unit，busType，processId
      'Content-Type': 'application/json' //配置请求头
    }
    const token = window.localStorage.getItem('t')
    if (token) config.headers.t = token
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)
export default instance
