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
  }
])
</script>

<template>
  <h1>一些练习</h1>
  <ul>
    <li v-for="ele in linkList" :key="ele.name">
      <router-link :to="ele.link">{{ ele.name }}</router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  padding: 0;
  li {
    list-style: none;
  }
}
</style>
