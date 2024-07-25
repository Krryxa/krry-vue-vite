<script setup lang='ts'>
import { K3DTest } from './index';
import { createBox, loadDuckModel, loadWukongModel } from './object';

const kd = new K3DTest();
const { scene3D, camera } = await kd.init();

// 添加立方体
scene3D.addChild(createBox())

// 加载模型
scene3D.addChild(await loadDuckModel())
scene3D.addChild(await loadWukongModel())

kd.run(scene3D, camera);

</script>

<template>
  <div></div>
</template>

<style lang='scss' scoped>
</style>