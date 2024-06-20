<script setup lang='ts'>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

onMounted(() => {
  gsap.to('.item-1', { x: 350, y: 300, ease: 'bounce.out', duration: 2 })
  gsap.fromTo('.item-2', { y: 200, scale: 0.7, },
    {
      y: -80,
      x: 200,
      rotation: 720,
      duration: 1.3,
      scale: 1.4,
      repeat: -1, // 无限播放
      yoyo: true, // 来回播放
      ease: 'power1.inOut'
    })
  gsap.from('.item-3', { x: 400, yoyo: true, repeat: 3, rotation: 360, ease: 'back.inOut', duration: 1 })

  // 时间线
  const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5, defaults: {
    rotation: 360, opacity: 1,
  }})
  tl.to('.rect-2', { scale: 1.5 })
  // 定义多个帧
  tl.to('.rect-1', {
    keyframes: {
      x: [0, 48, -48, 0],
      scale: [1, 1.5, 1],
    },
    duration: 1
  })
  // 也可以用数组定义每个帧
  tl.to('.rect-3', {
    keyframes: [
      { y: 0 },
      { y: 48, scale: 1.5 },
      { y: -48, delay: 0.25 },
      { y: 0, scale: 1, delay: 0.25 },
    ],
    duration: 1
  }, '<') // 设置执行时间，< 代表与前一个动画一起执行
  
})
</script>

<template>
  <div class="container">
    <h2>GSAP 动效</h2>
    <section>
      <div v-for="i in [1,2,3]" :class="['item', `item-${i}`, `color-${i}`]"></div>
    </section>
    <section class="rect">
      <div v-for="i in [1,2,3]" :class="['item', `rect-${i}`, `color-${i}`]"></div>
    </section>
  </div>
</template>

<style lang='scss' scoped>
$noise-url: url(@/assets/noise.png);

.container {
  section {
    margin: 0 auto 60px;
    width: 800px;
    height: 400px;
    border-radius: 12px;
    background: #000;

    &.rect {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      div {
        width: 70px;
        height: 70px;
        border-radius: 12px;
        opacity: 0;
      }
    }

    .color-1 {
      background: linear-gradient(
        153.58deg,
        #f7bdf8 32.25%,
        #2f3cc0 92.68%
      ), $noise-url;
    }

    .color-2 {
      background: linear-gradient(
        114.41deg,
        #0ae448 20.74%,
        #abff84 65.5%
      ), $noise-url;
    }

    .color-3 {
      background: radial-gradient(
        78.77% 78.77% at 71.71% 30.77%,
        #f0fcff 0%,
        #9bedff 67.21%,
        #98ecff 76.04%,
        #5be1ff 84.9%,
        #00bae2 94.79%
      ), $noise-url;
    }

    .item {
      width: 100px;
      height: 100px;
      border-radius: 24px;
      background-blend-mode: color-dodge; // 该属性是背景图的混合模式（图片与颜色），color-dodge 颜色渐淡
    }

    .item-1 {
      border-radius: 50%;
    }

    .item-3 {
      margin-left: 200px;
      margin-top: -50px;
    }
  }
}
</style>