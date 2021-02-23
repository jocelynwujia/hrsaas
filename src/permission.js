// 权限拦截  在路由导航守卫 处理
import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css'
// 不需要导出，因为只需要让代码执行即可
// 前置守卫
// next 是前置守卫必须执行的钩子， 否则页面就死了
// next() 放过
// next(false)跳转终止
// next(地址)跳转到某个地址
// 定义白名单
const WhiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果访问的 是登录页
      return next('/') // 跳转到主页
    } else {
      next() // 放过
    }
  } else {
    // 如果说没有token的情况
    if (WhiteList.indexOf(to.path) > -1) {
      // 表示要的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 为了解决 手动切换地址时  进度条的不关闭的问题
})
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
