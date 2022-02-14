<script setup lang="ts">
import { ref, Ref, computed } from 'vue'

const giftList: Ref<any> = ref({
  买口红: { rate: 0.05, select: false, index: 1 },
  买包包: { rate: 0.05, select: false, index: 2 },
  再来一次: { rate: 0.3, select: false, index: 3 },
  买衣服: { rate: 0.09, select: false, index: 4 },
  btn: '开始抽奖',
  谢谢抽奖: { rate: 0.3, select: false, index: 6 },
  抱一下: { rate: 0.3, select: false, index: 7 },
  亲一口: { rate: 0.3, select: false, index: 8 },
  有求必应: { rate: 0.01, select: false, index: 9 }
})

const giftNameList = computed(() => Object.keys(giftList.value))
const selecting = ref(false)

const rangeGiftList = computed(() => {
  const rangeList = []
  let min = 0
  for (let key in giftList.value) {
    if (key === 'btn') continue
    const max = min + giftList.value[key].rate
    rangeList.push({
      min,
      max,
      index: giftList.value[key].index,
      gift: key
    })
    min = max
  }
  return rangeList
})

const start = () => {
  selecting.value = true
  // 最大值
  const maxRangeSize = rangeGiftList.value[rangeGiftList.value.length - 1].max
  // Math.random() 方法返回大于等于 0 小于 1 的一个随机数
  // const target = Math.random() || 1 // 这样处理是返回 > 0，<= 1 的数
  const target = Math.random() * maxRangeSize || maxRangeSize // 这样处理是返回 > 0，<= maxRangeSize 的数
  let selectIndex = 6
  let gift = '谢谢抽奖'
  for (const val of rangeGiftList.value) {
    if (target > val.min && target <= val.max) {
      selectIndex = val.index
      gift = val.gift
    }
  }
  startChange(0, selectIndex, 2, 1, () => {
    alert(gift)
    giftList.value.btn = '再抽一次'
    selecting.value = false
  })
}

// 参数 min：从第几个开始；max 最终停留的；count 循环几轮；time 时间增速；callback：回调函数
const startChange = (
  min: number,
  max: number,
  count: number,
  time: number,
  callback: any
) => {
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
    time += 0.6
    const timeOut = 10 * time
    setTimeout(
      startChange.bind(null, min, max, count, time, callback),
      timeOut > 200 ? 200 : timeOut
    )
  } else {
    setTimeout(callback, 100)
  }
}
</script>

<template>
  <h1>情人节</h1>
  <p>祝老婆情人节快乐！！快来选礼物吧~</p>
  <div class="gift-container">
    <div
      :class="['gift-container__single', { selected: giftList[ele].select }]"
      v-for="ele in giftNameList"
      :key="ele"
    >
      <div class="btn" v-if="ele === 'btn'">
        <button v-if="!selecting" @click="start">{{ giftList[ele] }}</button>
        <span v-else>抽奖中...</span>
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
      color: #000;
    }
  }
}
</style>
