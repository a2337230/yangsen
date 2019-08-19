import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/tengfei'
    },
    {
      path: '/tengfei',
      name: '腾飞在线',
      component: () => import('@/views/Home/Home.vue')
    },
    {
      path: '/leader',
      name: '区域连锁领军人物风采榜',
      component: () => import('@/views/Leader/Leader.vue')
    },
    {
      path: '/online',
      name: '线上管理赋能课程专区',
      component: () => import('@/views/Online/Online.vue')
    },
    {
      path: '/offline',
      name: '线下管理赋能巡讲会集锦',
      component: () => import('@/views/Offline/Offline.vue'),
    },
    {
      path: '/resale',
      name: '零售峰会点亮行动',
      component: () => import('@/views/Resale/Resale.vue')
    },
    {
      path: '/study',
      name: '读书报告',
      component: () => import('@/views/Study/Study.vue')
    },
    {
      path: '/trade',
      name: '行业报告',
      component: () => import('@/views/Trade/Trade.vue')
    },
    {
      path: '/offarcitle',
      name: '正文',
      component: () => import('@/views/Offline/children/OffArcitle.vue')
    },
    {
      path: '/select',
      name: 'sel',
      component: () => import('@/views/Select/Select.vue')
    }
  ]
})
