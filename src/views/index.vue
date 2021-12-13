<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
// 配置类型定义
interface WatermarkOptions {
  // 宽度
  width?: number
  // 高度
  height?: number
  // 水印内容
  content?: string
  // 水印字体
  font?: string
  // 水印颜色
  color?: string
  // 偏转角度
  degree?: number
  // X轴偏移量
  x1?: number
  // Y轴偏移量
  y1?: number
  x2?: number
  // Y轴偏移量
  y2?: number
}

const createWatermark = ({
  width = 880,
  height = 400,
  content = 'krryguo',
  font = '60px PingFang SC',
  color = 'rgba(156, 162, 169, 0.3)',
  degree = -23,
  x1 = 40,
  y1 = 200,
  x2 = 350,
  y2 = 556
}: WatermarkOptions): string => {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.font = font
    ctx.fillStyle = color
    ctx.rotate((degree * Math.PI) / 180)
    ctx.fillText(content, x1, y1)
    ctx.fillText(content, x2, y2)
  }
  return canvas.toDataURL('image/png')
}

const setWatermarkClass = (url: string, className: string): void => {
  const style = document.createElement('style')
  style.innerHTML = `.${className} {background-image: url(${url});}`
  document.head.appendChild(style)
}

onMounted(() => {
  setWatermarkClass(
    createWatermark({
      content: '版权所有'
    }),
    'my-water-mark'
  )
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
