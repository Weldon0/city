import {
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
} from "three";

export class FireBall {
  constructor(scene, center) {
    this.scene = scene;
    this.center = center;

    this.init();
  }

  init() {
    const geometry = new SphereGeometry(
      25,
      32, // 水平分段数
      16, // 垂直分段数
      0, // 水平起始角度
      Math.PI * 2, // 水平扫描角度
      0,
      Math.PI / 2
    );

    const material = new MeshBasicMaterial({
      color: new Color("#f4790b"),
      side: DoubleSide,
      depthTest: false, // 关闭透视效果
    });

    const spere = new Mesh(geometry, material);
    spere.position.set(this.center.x, 0, this.center.y);
    this.scene.add(spere);
    this.nowMesh = spere;
    // this.nowMesh.scale.set(0, 0, 0);
  }
}
