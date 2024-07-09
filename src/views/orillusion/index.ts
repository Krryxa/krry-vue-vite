import {
  Engine3D,
  Scene3D,
  Object3D,
  Camera3D,
  View3D,
  LitMaterial,
  UnLitMaterial,
  BlendMode,
  Color,
  BoxGeometry,
  MeshRenderer,
  DirectLight,
  HoverCameraController,
  AtmosphericComponent
} from '@orillusion/core'

export class K3DTest {
  async run() {
    // 初始化引擎
    await Engine3D.init()
    // 场景根节点
    const scene3D = new Scene3D()

    // 添加天空盒
    const sky = scene3D.addComponent(AtmosphericComponent)

    // 添加摄像机
    const cameraObj = new Object3D()
    const camera = cameraObj.addComponent(Camera3D)
    // 根据窗口大小设置摄像机视角
    camera.perspective(60, window.innerWidth / window.innerHeight, 1, 5000.0)
    // 设置相机控制器
    const controller = camera.object3D.addComponent(HoverCameraController)
    controller.setCamera(45, -30, 15)
    // 添加相机节点
    scene3D.addChild(cameraObj)

    // 新建光照
    const light = new Object3D()
    const lightComp = light.addComponent(DirectLight)
    // 调整光照参数
    light.rotationX = 45
    light.rotationY = 30
    lightComp.intensity = 2
    // 添加光照对象
    scene3D.addChild(light)

    // 添加立方体
    scene3D.addChild(createBox())

    // 渲染场景
    // 创建View3D对象
    const view = new View3D()
    // 指定渲染的场景
    view.scene = scene3D
    // 指定使用的相机
    view.camera = camera
    // 开始渲染
    Engine3D.startRenderView(view)
  }
}

// 立方体
const createBox = () => {
  // 新建对象
  const obj = new Object3D()
  // 为对象添 MeshRenderer
  let mr = obj.addComponent(MeshRenderer)
  // 设置几何体
  mr.geometry = new BoxGeometry(5, 5, 5)
  // 设置材质
  // const mat = new UnLitMaterial()
  // mr.material = mat
  // mat.transparent = true
  // mat.blendMode = BlendMode.ALPHA
  // mat.baseColor = new Color(1, 0, 0, 0.5)
  mr.material = new LitMaterial()
  return obj
}
