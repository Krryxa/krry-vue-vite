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

const createWatermark = (options?: imgOptions): string => {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = 880
  canvas.height = 400
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.font = '60px PingFang SC'
    ctx.fillStyle = 'rgba(156, 162, 169, 0.3)'
    ctx.rotate(-0.4)
    ctx.fillText('krryguo', 40, 200)
    ctx.fillText('krryguo', 350, 555)
  }
  return canvas.toDataURL('image/png')
}

const setWatermarkClass = (url: string, className: string): void => {
  const style = document.createElement('style')
  style.innerHTML = `.${className} {background-image: url(${url});}`
  document.head.appendChild(style)
}

onMounted(() => {
  setWatermarkClass(createWatermark(), 'my-water-mark')
})
</script>

<template>
  <div class="water-mark my-water-mark">首页</div>
</template>

<style lang="scss" scoped>
.water-mark {
  width: 100%;
  height: 1600px;
  line-height: 600px;
  font-size: 50px;
  color: #f16d71;
}
</style>
