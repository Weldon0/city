import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three";

export class EdgesLine {
  scene;
  mesh;
  color;
  constructor(scene, mesh, color) {
    this.scene = scene;
    this.mesh = mesh;
    this.color = color;

    this.init();
  }

  init() {
    const edgesGeometry = new EdgesGeometry(this.mesh.geometry); // 参数为需要添加线段的几何体
    const material = new LineBasicMaterial({ color: this.color }); // 线段的材质
    const line = new LineSegments(edgesGeometry, material); // 创建线段的物体
    // 把物体的位置属性赋值给边缘几何体
    // 控制位置旋转角度
    line.position.copy(this.mesh.position);
    line.rotation.copy(this.mesh.rotation);
    line.scale.copy(this.mesh.scale);
    this.scene.add(line);
  }
}
