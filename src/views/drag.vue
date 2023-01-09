<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
defineProps({})

const selectedList = ref([
  [1, 2, 3, 4, 5],
  [11, 12, 13, 14, 15],
  [21, 22, 23, 24, 25]
])
</script>

<template>
  <h1>拖拽排序测试</h1>
  <h2>黑色区域可以拖拽整体模块排序，模块里的每一项只在自己内部排序</h2>
  <ul class="parent">
    <VueDraggableNext v-model="selectedList" handle="li" animation="200">
      <transition-group>
        <li class="container" v-for="(ele, index) of selectedList" :key="index">
          <ul>
            <VueDraggableNext
              v-model="selectedList[index]"
              handle="li"
              animation="200"
            >
              <transition-group>
                <li
                  class="container__child"
                  v-for="(jcl, index) in ele"
                  :key="jcl + index"
                >
                  {{ jcl }}
                </li>
              </transition-group>
            </VueDraggableNext>
          </ul>
        </li>
      </transition-group>
    </VueDraggableNext>
  </ul>
</template>

<style lang="scss" scoped>
.parent {
  width: 600px;
  margin: 0 auto;
  .container {
    background: #333;
    color: #fff;
    margin: 10px;

    ul {
      padding-left: 40px;

      & > div {
        background: #fff;
      }
    }

    &__child {
      background: #82adff;
      height: 40px;
      line-height: 40px;
      margin: 6px 0;
    }
  }
}
</style>
