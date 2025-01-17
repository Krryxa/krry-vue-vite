import {
  Engine3D,
  Object3D,
  LitMaterial,
  UnLitMaterial,
  BlendMode,
  Color,
  BoxGeometry,
  MeshRenderer
} from '@orillusion/core'
import { RotateScript } from './script'

// 立方体
export const createBox = () => {
  // 新建对象
  const obj = new Object3D()
  // 为对象添 MeshRenderer
  const mr = obj.addComponent(MeshRenderer)
  // 设置几何体
  mr.geometry = new BoxGeometry(400, 100, 400)
  // 设置材质
  // const mat = new UnLitMaterial()
  // mr.material = mat
  // mat.transparent = true
  // mat.blendMode = BlendMode.ALPHA
  // mat.baseColor = new Color(1, 0, 0, 0.5)
  mr.material = new LitMaterial()

  // 把旋转的脚本组件挂载到对象
  obj.addComponent(RotateScript)
  return obj
}

// 小黄鸭模型
export const loadDuckModel = async () => {
  const data = await Engine3D.res.loadGltf('/3D/duck/Duck.gltf')
  // data.x = 100
  data.y = 45
  data.scaleX = 0.5
  data.scaleY = 0.5
  data.scaleZ = 0.5
  data.rotationY = -90

  // 把旋转的脚本组件挂载到对象
  data.addComponent(RotateScript)
  return data
}

// 猴子模型
export const loadWukongModel = async () => {
  const data = await Engine3D.res.loadGltf('/3D/wukong/wukong.gltf')
  data.x = 100
  data.y = 50
  data.scaleX = 50
  data.scaleY = 50
  data.scaleZ = 50
  return data
}
