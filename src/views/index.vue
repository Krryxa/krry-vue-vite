<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import waterUrl from '@/assets/water.jpeg'

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
  // 偏移量
  x1?: number
  y1?: number
  x2?: number
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

// https://ainyi.com/upload/2021/12/13/974f1fd2-04ba-48df-abcf-6d51a3b8fd98.jpeg

const createImgWatermark = async (
  {
    url = '',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '30px PingFang SC',
    fillStyle = '#fff',
    x = 120,
    y = 50,
    position = 'top-start'
  },
  content: string = '这是水印'
) => {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const img = new Image()
  img.src = url
  img.setAttribute('crossOrigin', 'Anonymous')
  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        ctx.textAlign = textAlign
        ctx.textBaseline = textBaseline
        ctx.font = font
        ctx.fillStyle = fillStyle
        switch (position) {
          case 'top-end':
            x = img.width - x
            break
          case 'bottom-start':
            y = img.height - y
            break
          case 'bottom-end':
            x = img.width - x
            y = img.height - y
            break
        }
        ctx.fillText(content, x, y)
      }
      resolve(canvas.toDataURL())
    }
  })
}

const setImgWatermark = (url: string, dom: HTMLImageElement) => {
  dom.src = url
}

onMounted(async () => {
  setWatermarkClass(
    createWatermark({
      content: 'krryblog'
    }),
    'my-water-mark'
  )
  const url = (await createImgWatermark({
    url: waterUrl,
    font: '50px PingFang SC',
    x: 160,
    y: 70,
    position: 'bottom-end'
  })) as string
  setImgWatermark(url, document.querySelector('img') as HTMLImageElement)
  addListioner('my-water-mark')
})

// 添加监听器
const addListioner = (className: string) => {
  const MutationObserver = window.MutationObserver
  // 获取所有添加了水印类名的 dom
  const containerList = document.querySelectorAll(`.${className}`)
  if (MutationObserver) {
    containerList.forEach((container: Element) => {
      // 每个元素监听
      const observer = new MutationObserver(() => {
        // 获取 class 集合
        const classList: DOMTokenList = container.classList
        if (!Object.values(classList).includes(className)) {
          // ['water-mark', 'my-water-mark']
          // 如果 classList 中不存在水印的类名，就重新添加
          container.classList.add(className)
          // 暂停监听，防止上面的 add 操作又触发监听器
          observer.disconnect()
          // 然后再重新开始观察
          addObserve(observer, container)
        }
      })
      // 每个元素开启观察
      addObserve(observer, container)
    })
  }
}
// 开启观察
const addObserve = (mutation: MutationObserver, container: Element) => {
  mutation.observe(container, {
    // 观察器的配置，需要观察属性的变动
    attributes: true
  })
}
</script>

<template>
  <div class="water-mark my-water-mark">首页</div>
  <img width="600" />
</template>

<style lang="scss" scoped>
.water-mark {
  width: 100%;
  height: 1600px;
  line-height: 600px;
  font-size: 50px;
  color: #f16d71;
}
img {
  margin-bottom: 200px;
}
</style>
