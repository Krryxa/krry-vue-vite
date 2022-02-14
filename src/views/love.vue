<script setup lang="ts">
import { ref, Ref, computed } from 'vue'

const giftList: Ref<any> = ref({
  买口红: { rate: 0.05, select: true },
  买包包: { rate: 0.05, select: false },
  再来一次: { rate: 0.3, select: false },
  买衣服: { rate: 0.09, select: false },
  btn: '抽奖',
  谢谢抽奖: { rate: 0.1, select: false },
  抱一下: { rate: 0.2, select: false },
  亲一口: { rate: 0.2, select: false },
  有求必应: { rate: 0.01, select: false }
})

const giftNameList = computed(() => Object.keys(giftList.value))

const start = () => {
  startChange(0, 2, 3)
}

// 参数 min：从第几个开始；max 最终停留的；count 循环几轮
const startChange = (min: number, max: number, count: number) => {
  let index = 0
  for (let key in giftList.value) {
    if (index !== 4) {
      giftList.value[key].select = false
      if (index === min) {
        giftList.value[key].select = true
      }
    }
    index++
  }
  if (min === 8) {
    // 一轮了
    count--
    min = 0
  } else {
    min === 3 ? (min += 2) : min++
  }
  if (min < max || count !== 1) {
    setTimeout(startChange.bind(null, min, max, count), 200)
  }
}
</script>

<template>
  <h1>情人节</h1>
  <p>祝你情人节快乐！！快来选礼物吧~</p>
  <div class="gift-container">
    <div
      :class="['gift-container__single', { selected: giftList[ele].select }]"
      v-for="ele in giftNameList"
      :key="ele"
    >
      <div class="btn" v-if="ele === 'btn'">
        <button @click="start">{{ giftList[ele] }}</button>
      </div>
      <div class="content">{{ ele }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gift-container {
  width: 606px;
  margin: 60px auto;
  display: flex;
  flex-wrap: wrap;
  &__single {
    height: 200px;
    width: 200px;
    line-height: 200px;
    border: 1px solid transparent;
    color: #fff;
    .content {
      background: #92d1ff;
    }
    &.selected {
      border-color: red;
    }
    .btn {
    }
  }
}
</style>
