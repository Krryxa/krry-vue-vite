<script setup lang="ts">
import { ref } from 'vue'

const info = ref('Krry')
const obj = ref({
  name: 'My little part'
})

</script>

<template>
  <krry-vue-element :info="info" :obj="obj"></krry-vue-element>
  <krry-little-sfc></krry-little-sfc>
</template>

<style scoped>
</style>