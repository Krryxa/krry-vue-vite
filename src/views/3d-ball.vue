<template>
  <div class="wrap">
    <div class="x">
      <div class="x-inner"></div>
    </div>
    <div class="x1"></div>
    <div class="x2"></div>
    <div class="y">
      <div class="y-inner"></div>
    </div>
    <div class="z">
      <div class="z-inner"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
%base {
  width: 400px;
  height: 400px;
  border-radius: 50%;
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
.wrap {
  @extend %base;
  margin: 100px auto;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(60deg) rotateY(45deg);

  .x {
    @extend %base;
    border: 1px solid blue;

    .x-inner {
      @extend %base-inner;
      background: blue;
      transform: rotate(90deg); // 防止与 z 轴的中线重合
    }
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
  }
}
</style>
