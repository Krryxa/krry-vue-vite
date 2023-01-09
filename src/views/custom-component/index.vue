<script setup lang="ts">
import { ref } from 'vue'
import subCompFirst from './sub-comp1.vue'

const value1 = ref(['啦啦啦', '1212'])
</script>

<template>
  <h1>自定义组件</h1>
  <div class="first">
    <div class="show">绑定值：{{ value1 }}</div>
    <sub-comp-first name="自定义组件1" v-model="value1"></sub-comp-first>
  </div>
</template>

<style lang="scss" scoped>
.first {
  display: flex;
  flex-direction: column;
}

.show {
  margin-bottom: 10px;
}
</style>
