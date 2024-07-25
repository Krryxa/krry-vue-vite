<script setup lang='ts'>
import { K3DTest } from './index';
import { createBox, loadDuckModel, loadWukongModel } from './object';
import { RotateScript } from './script';

const kd = new K3DTest();
const { scene3D, camera } = await kd.init();

// 添加立方体
const platObj = createBox();
// 把脚本组件挂载到立方体
platObj.addComponent(RotateScript)
// 加载立方体
scene3D.addChild(platObj)

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