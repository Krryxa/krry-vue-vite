<script setup lang="ts">
defineProps({
  list: { type: Array, default: () => [
    {
      name: 'krry'
    },
    {
      name: '2oefa'
    },
    {
      name: 'wefae'
    }
  ]}
})

</script>

<template>
  <h3>我是一个自定义 Web Components</h3>
  <ul>
    <li v-for="ele in list" :key="ele.name">{{ ele.name }}</li>
  </ul>
</template>

<style scoped>
ul, li {
  list-style: none;
  padding: 0;
}
</style>