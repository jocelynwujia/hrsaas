import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() // 设置state时，从缓存中读取
}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    setToken(token) // 同步给缓存
  },
  removeToken(state, token) {
    state.token = null // 将vuex的数据置空
    removeToken() // 同步到缓存
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    // if (result.data.success) {
    //   context.commit('setToken', result.data.data)
    // }
    // console.log(result, 233)
    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

