import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/index.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
