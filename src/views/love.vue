<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { ElMessageBox, ElButton } from 'element-plus'

const giftList: Ref<any[]> = ref([
  { name: '买口红', rate: 0.05, select: false, order: 0 }, // order：flex布局子元素顺序
  { name: '买包包', rate: 0.05, select: false, order: 1 },
  { name: '再来一次', rate: 0.3, select: false, order: 2 },
  { name: '买衣服', rate: 0.09, select: false, order: 5 },
  { name: '开始抽奖', order: 4 },
  { name: '谢谢抽奖', rate: 0.3, select: false, order: 8 },
  { name: '抱一下', rate: 0.3, select: false, order: 7 },
  { name: '亲一口', rate: 0.3, select: false, order: 6 },
  { name: '有求必应', rate: 0.01, select: false, order: 3 }
])

const selecting = ref(false)

const rangeGiftList = computed(() => {
  const rangeList = []
  let min = 0
  for (const [index, val] of giftList.value.entries()) {
    if (index === 4) continue
    const max = min + val.rate
    rangeList.push({
      min,
      max,
      index: index + 1, // index 是当前位置，选中时 index 的值。从 1 开始
      gift: val.name
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
      console.log(val)
      selectIndex = val.index
      gift = val.gift
      break
    }
  }
  startChange(0, selectIndex, 5, 1, () => {
    if (isMobile()) {
      alert(`哇哦！你抽到了【${gift}】`)
    } else {
      ElMessageBox.alert(`哇哦！你抽到了【${gift}】`, '奖品公示', {
        confirmButtonText: 'OK'
      })
    }
    giftList.value[4].name = '再抽一次'
    selecting.value = false
  })
}

// 参数 min：从第几个开始；max 最终停留的；count 循环几轮；time 时间增速；callback：停止时的回调函数
const startChange = (
  min: number,
  max: number,
  count: number,
  time: number,
  callback: any
) => {
  if (min === 9) {
    // 一轮了
    count--
    min = 1
  } else {
    min === 4 ? (min += 2) : min++
  }
  for (const [index, val] of giftList.value.entries()) {
    if (index !== 4) {
      val.select = false
      if (index === min - 1) {
        val.select = true
      }
    }
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

const isMobile = () => {
  if (
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
      navigator.userAgent
    )
  ) {
    return true // 移动端
  } else {
    return false // PC端
  }
}
</script>

<template>
  <h1>情人节</h1>
  <p>祝老婆情人节快乐！！快来选礼物吧~</p>
  <div class="gift-container">
    <div
      :class="['gift-container__single', { selected: ele.select }]"
      :style="{ order: ele.order }"
      v-for="(ele, index) in giftList"
      :key="index"
    >
      <div class="btn" v-if="index === 4">
        <el-button v-if="!selecting" @click="start">
          {{ ele.name }}
        </el-button>
        <span v-else>抽奖中...</span>
      </div>
      <div class="content">{{ ele.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gift-container {
  width: 612px;
  margin: 60px auto;
  display: flex;
  flex-wrap: wrap;
  &__single {
    height: 200px;
    width: 200px;
    line-height: 200px;
    border: 2px solid transparent;
    color: #fff;
    overflow: hidden;
    .content {
      background: #92d1ff;
    }
    &.selected {
      border-color: #ff5a5a;
    }
    .btn {
      color: #000;
    }
  }
}
@media screen and (max-width: 780px) {
  .gift-container {
    width: 24.2rem;
    &__single {
      height: 7.8em;
      width: 7.8rem;
      line-height: 7.8rem;
      border: 0.13rem solid transparent;
      color: #fff;
    }
  }
}
</style>
