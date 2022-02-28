import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import 'element-plus/dist/index.css'
import '@/views/web-component/index'

createApp(App).use(router).use(createPinia()).mount('#app')
