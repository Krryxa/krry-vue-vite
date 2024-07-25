import { Object3D, ComponentBase } from '@orillusion/core'

export class RotateScript extends ComponentBase {
  public onUpdate() {
    this.object3D.rotationY += 1 
  }
}