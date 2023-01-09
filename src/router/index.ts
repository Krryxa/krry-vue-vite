import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/watermark',
    name: 'watermark',
    component: () => import('@/views/watermark.vue')
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import('@/views/drag.vue')
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('@/views/pinia.vue')
  },
  {
    path: '/love',
    name: 'love',
    component: () => import('@/views/love.vue')
  },
  {
    path: '/web-component',
    name: 'web-component',
    component: () => import('@/views/web-component/web-component.vue')
  },
  {
    path: '/3d-ball',
    name: '3d-ball',
    component: () => import('@/views/3d-ball.vue')
  },
  {
    path: '/custom-component',
    name: 'custom-component',
    component: () => import('@/views/custom-component/index.vue'),
  }
]

// 由于生产环境小项目很多，同一台机器没有配置 404 都指向 index.html，所以这里判断生产环境就用 hash 路由
export default createRouter({
  history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(),
  routes
})
