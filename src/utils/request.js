import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  // 当执行 npm run dev => .env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use()
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
  Message.error(error.message) // 提示错误消息
  return Promise.reject(error)
})
export default service
