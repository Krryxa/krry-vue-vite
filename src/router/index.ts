import { createRouter, createWebHistory } from 'vue-router'

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
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
