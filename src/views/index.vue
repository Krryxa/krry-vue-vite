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

interface StyleType {
  key: string
  value: string
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
  const bgUrl = createWatermark({
    content: 'krryblog'
  })
  // 使用 class 渲染水印
  setWatermarkClass(bgUrl, 'my-water-mark')
  // 添加监听
  addListioner('my-water-mark')

  // 使用 style 属性渲染水印
  const dom = document.querySelector('.water-mark-style') as HTMLElement
  // 设置样式优先级最高
  dom.style.setProperty('background-image', `url(${bgUrl})`, 'important')
  addListioner('water-mark-style', {
    key: 'background-image',
    value: `url("${bgUrl}")` // js 获取的样式属性值 url 里面加了 ""，所以这里加上来比对是否相同
  })

  // 添加图片水印
  const url = (await createImgWatermark({
    url: waterUrl,
    font: '50px PingFang SC',
    x: 160,
    y: 70,
    position: 'bottom-end'
  })) as string
  setImgWatermark(url, document.querySelector('img') as HTMLImageElement)
})

// 添加监听器
const addListioner = (className: string, style?: StyleType) => {
  const MutationObserver = window.MutationObserver
  // 获取所有添加了水印类名的 dom
  const containerList: NodeListOf<HTMLElement> = document.querySelectorAll(
    `.${className}`
  )
  if (MutationObserver) {
    containerList.forEach((container: HTMLElement) => {
      // 每个元素监听
      const observer = new MutationObserver(() => {
        let flag = false // 触发改变的标识
        if (style) {
          // style 属性渲染水印
          // 获取 style 属性
          const styleCss: CSSStyleDeclaration = container.style
          if (
            !styleCss.getPropertyValue(style.key) ||
            styleCss.getPropertyValue(style.key) !== style.value ||
            styleCss.getPropertyPriority(style.key) !== 'important'
          ) {
            // 重新设置样式
            styleCss.setProperty(style.key, style.value, 'important')
            flag = true
          }
        } else {
          // class 类名渲染水印
          // 获取 class 集合
          const classList: DOMTokenList = container.classList
          if (!Object.values(classList).includes(className)) {
            // 如果 classList 中不存在水印的类名，就重新添加
            container.classList.add(className)
            flag = true
          }
        }
        if (flag) {
          // 暂停监听，防止上面的操作又触发监听器
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
  <div class="water-mark my-water-mark">使用 class 类名渲染的水印</div>
  <div class="water-mark-style">使用 style 渲染的水印</div>
  <img width="600" />
</template>

<style lang="scss" scoped>
.water-mark,
.water-mark-style {
  width: 100%;
  height: 600px;
  line-height: 600px;
  font-size: 50px;
  color: #f16d71;
  margin-bottom: 100px;
}
img {
  margin-bottom: 200px;
}
</style>
