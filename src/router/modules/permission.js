import layout from '@/layout'
// 导出权限管理路由规则
export default {
  path: '/permission',
  name: 'permission', // 为权限管理做准备
  component: layout,
  children: [{
    path: '', // 当二级路由什么都不写的时候，表示该路由为当前二级路由的默认路由
    component: () => import('@/views/permission'),
    // 路由元信息  其实就是存储数据的对象，我们可以在这里放置一些信息
    meta: {
      // 左侧导航路由会读取这里的title作为菜单信息
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
