<script setup lang="ts">
import { ref } from 'vue'
const linkList = ref([
  {
    name: '页面水印',
    link: '/watermark'
  },
  {
    name: '拖拽',
    link: '/drag'
  },
  {
    name: 'pinia 实践',
    link: '/pinia'
  },
  {
    name: '情人节抽奖',
    link: '/love'
  },
  {
    name: 'web-component',
    link: '/web-component'
  },
  {
    name: '3D 线条小球',
    link: '/3d-ball'
  },
  {
    name: '自定义组件',
    link: '/custom-component'
  }
])
</script>

<template>
  <h1>Vue3 的一些练习</h1>
  <ul>
    <li v-for="ele in linkList" :key="ele.name">
      <router-link :to="ele.link">{{ ele.name }}</router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  li {
    margin: 10px 0;
  }
}
</style>
