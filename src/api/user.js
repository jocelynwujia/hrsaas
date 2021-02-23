import request from '@/utils/request'

export function login(data) {
  // 返回的是一个promise
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}
