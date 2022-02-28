<script setup lang="ts">
import { ref } from 'vue'

const info = ref('Krry')

</script>

<template>
  <krry-vue-element :info="info"></krry-vue-element>
  <krry-little-sfc></krry-little-sfc>
</template>

<style scoped>
</style>