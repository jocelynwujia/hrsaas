import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
// 定义超时时间
const TimeOut = 3600
const service = axios.create({
  // 当执行 npm run dev => .env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  // 统一注入token
  if (store.getters.token) {
    // 如果token存在，注入token
    // 如果有token ，判断是否超时
    if (isCheckTimeOut()) {
      // token超时了，没用了，清空，直接退出登录即可
      store.dispatch('user/logout') // 退出登录
      router.push('/login') // 跳转到登录页
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  // 必须返回配置
  return config
}, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(response => {
  // 解构返回的数据
  const { message, success, data } = response.data
  if (success) {
    return data
  } else {
    // 如果业务错了，只能进catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当code 等于 10002时，表示后端告诉我们 token 超时了
    // 退出登录
    store.dispatch('user/login')
    // 跳转到登录页
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误消息
  }
  return Promise.reject(error)
})

function isCheckTimeOut() {
  // 当前时间戳
  var currentTime = Date.now()
  // 缓存时间戳
  var timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
