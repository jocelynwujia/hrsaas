import layout from '@/layout'
// 导出考勤路由规则
export default {
  path: '/attendances',
  name: 'attendances', // 为权限管理做准备
  component: layout,
  children: [{
    path: '', // 当二级路由什么都不写的时候，表示该路由为当前二级路由的默认路由
    component: () => import('@/views/attendances'),
    // 路由元信息  其实就是存储数据的对象，我们可以在这里放置一些信息
    meta: {
      // 左侧导航路由会读取这里的title作为菜单信息
      title: '考勤',
      icon: 'skill'
    }
  }]
}
