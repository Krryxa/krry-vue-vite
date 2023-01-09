<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: string[] // v-model 默认的名字
  name: string
}

// 采用基于类型声明 props，用 withDefaults 指定默认值
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [''],
  name: '组件'
})
const emit = defineEmits(['update:modelValue'])

const list = ref(Array.from(props.modelValue))
</script>

<template>
  <div class="container">
    <span class="label">{{ name }}</span>
    <el-input
      v-for="(item, index) in list"
      :key="index"
      v-model="list[index]"
      @input="emit('update:modelValue', list)"
      placeholder="Please input"
    />
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
