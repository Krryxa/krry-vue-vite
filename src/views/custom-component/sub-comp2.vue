<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  first: string // 具名绑定 v-model:first
  second: string
  name: string
}

// 采用基于类型声明 props，用 withDefaults 指定默认值
const props = withDefaults(defineProps<Props>(), {
  first: '',
  second: '',
  name: '组件'
})
const emit = defineEmits(['update:first', 'update:second'])

// 可写计算属性，当改变 firstVal.value，就会触发 set 方法
const firstVal = computed({
  get: () => props.first,
  set: (val) => emit('update:first', val)
})
const secondVal = computed({
  get: () => props.second,
  set: (val) => emit('update:second', val)
})
</script>

<template>
  <div class="container">
    <span class="label">{{ name }}</span>
    <el-input v-model="firstVal" placeholder="Please input" />
    <el-input v-model="secondVal" placeholder="Please input" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;

  .label {
    margin-right: 10px;
  }

  .el-input {
    width: 200px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
