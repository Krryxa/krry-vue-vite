<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
// 配置类型定义
interface imgOptions {
  // 宽度
  width: number
  // 高度
  height: number
  // 水印内容
  content: string
  // 水印字体
  font: string
  // 水印颜色
  color: string
  // 偏转角度（deg）
  rotateDegree: number
  // X轴偏移量
  x: number
  // Y轴偏移量
  y: number
}

const createImgBase = (options: imgOptions): string => {
  const canvas = document.createElement('canvas')
  const text = options.content
  // 因为要实现文字交错效果，所以这里生成两倍宽度的图片
  canvas.width = options.width * 2
  canvas.height = options.height
  const ctx = canvas.getContext('2d')
  if (ctx) {
    // X轴阴影距离，负值表示往上，正值表示往下
    ctx.shadowOffsetX = 2
    // Y轴阴影距离，负值表示往左，正值表示往右
    ctx.shadowOffsetY = 2
    // 阴影的模糊程度
    ctx.shadowBlur = 2
    ctx.font = options.font
    ctx.fillStyle = options.color
    ctx.rotate(options.rotateDegree)
    ctx.textAlign = 'left'
    ctx.fillText(text, options.x, options.y)
  }
  return canvas.toDataURL('image/png')
}

// const str = createImgBase({
//   width: 340,
//   height: 240,
//   content: '水印',
//   font: '14px PingFang SC, sans-serif',
//   color: 'rgba(156, 162, 169, 0.3)',
//   rotateDegree: (-14 * Math.PI) / 180,
//   x: 400,
//   y: 340
// })
// console.log(str)

onMounted(() => {
  const canvas = document.createElement('canvas')
  canvas.width = 840
  canvas.height = 400
  const ctx = canvas.getContext('2d')
  if (ctx) {
    // X轴阴影距离，负值表示往上，正值表示往下
    ctx.shadowOffsetX = 2
    // Y轴阴影距离，负值表示往左，正值表示往右
    ctx.shadowOffsetY = 2
    // 阴影的模糊程度
    ctx.shadowBlur = 2
    ctx.font = '60px PingFang SC, sans-serif'
    ctx.fillStyle = 'rgba(156, 162, 169, 0.3)'
    ctx.rotate(-0.4)
    ctx.fillText('krryguo', 40, 200)
    ctx.fillText('krryguo', 350, 550)
  }
  const imgStr = canvas.toDataURL('image/png')

  const waterDom = document.getElementsByClassName(
    'water-mark'
  )[0] as HTMLElement
  waterDom.style.background = `url(${imgStr})`
})
</script>

<template>
  <div class="water-mark">首页</div>
</template>

<style lang="scss" scoped>
.water-mark {
  width: 100%;
  height: 1600px;
}
</style>
