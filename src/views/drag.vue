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
  <ul>
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
.container {
  background: #333;
  color: #fff;
  margin: 10px;
  &__child {
    background: #82adff;
    border: 1px solid #fff;
  }
}
</style>
