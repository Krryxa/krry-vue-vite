<script setup lang="ts">
import { ref } from 'vue'
import subCompFirst from './sub-comp1.vue'
import subCompSecond from './sub-comp2.vue'

const value = ref(['啦啦啦', '1212'])
const leftVal = ref('show fast')
const rightVal = ref('only one')
</script>

<template>
  <h1>自定义组件 v-model</h1>
  <div class="wrap">
    <sub-comp-first name="自定义组件1" v-model="value" />
    <div class="show">绑定值：{{ value }}</div>
  </div>
  <div class="wrap">
    <sub-comp-second
      name="自定义组件2"
      v-model:first="leftVal"
      v-model:second="rightVal"
    />
    <div class="show">first 绑定值：{{ leftVal }}</div>
    <div class="show">second 绑定值：{{ rightVal }}</div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  .show {
    margin-top: 10px;
  }
}
</style>
