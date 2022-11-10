<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
onMounted(() => {
  document.body.className = 'black'
})
onUnmounted(() => {
  document.body.className = ''
})
</script>
<template>
  <div class="wrap">
    <div class="x">
      <div class="x-inner"></div>
      <div class="x1"></div>
      <div class="x2"></div>
    </div>
    <div class="y">
      <div class="y-inner"></div>
      <div class="y1"></div>
      <div class="y2"></div>
    </div>
    <div class="z">
      <div class="z-inner"></div>
      <div class="z1"></div>
      <div class="z2"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
%base {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  transform-style: preserve-3d;
}
%base-inner {
  top: 50%;
  width: 100%;
  height: 1px;
  position: absolute;
}
%base-sub {
  width: 87.5%;
  height: 87.5%;
  position: absolute;
  border-radius: 50%;
  top: 6.25%;
  left: 6.25%;
}
@keyframes play {
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
.wrap {
  @extend %base;
  margin: 100px auto;
  position: relative;
  animation: play 6s infinite linear;

  .x {
    @extend %base;
    border: 1px solid blue;

    .x-inner {
      @extend %base-inner;
      background: blue;
      transform: rotate(90deg); // 这里要旋转 90°，防止与 z 轴的中线重合
    }
    .x1 {
      @extend %base-sub;
      border: 1px solid green;
      transform: translateZ(100px);
    }
    .x2 {
      @extend %base-sub;
      border: 1px solid rgb(255, 0, 234);
      transform: translateZ(-100px);
    }
  }
  .y {
    @extend %base;
    border: 1px solid orange;
    transform: rotateY(90deg);
    position: absolute;
    top: 0;
    left: 0;

    .y-inner {
      @extend %base-inner;
      background: orange;
    }
    .y1 {
      @extend %base-sub;
      border: 1px solid #b7669c;
      transform: translateZ(100px);
    }
    .y2 {
      @extend %base-sub;
      border: 1px solid #31c844;
      transform: translateZ(-100px);
    }
  }
  .z {
    @extend %base;
    border: 1px solid red;
    transform: rotateX(90deg);
    position: absolute;
    top: 0;
    left: 0;

    .z-inner {
      @extend %base-inner;
      background: red;
    }
    .z1 {
      @extend %base-sub;
      border: 1px solid rgb(0, 145, 255);
      transform: translateZ(100px);
    }
    .z2 {
      @extend %base-sub;
      border: 1px solid rgb(255, 231, 18);
      transform: translateZ(-100px);
    }
  }
}
</style>
