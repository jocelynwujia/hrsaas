import request from '@/utils/request'

// 获取token
export function login(data) {
  // 返回的是一个promise
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户资料
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// 获取员工基本信息  主要是为了拿到用户头像
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function getInfo(token) {

}

export function logout() {

}
