import { Sprite, SpriteMaterial, SRGBColorSpace, TextureLoader } from "three";

export class Fire {
  constructor(scene, center, size) {
    this.scene = scene;
    this.center = center;
    this.size = size;

    this.init();
  }

  init() {
    const texture = new TextureLoader().load("/icon/fire.png");
    texture.colorSpace = SRGBColorSpace;

    const material = new SpriteMaterial({
      map: texture,
    });

    const sprite = new Sprite(material);

    // +3 让精灵物体中心点不在建筑物顶点，再往上移动一些单位
    sprite.position.set(
      this.center.x,
      this.center.y + this.size.y / 2 + 3,
      this.center.z
    );
    sprite.scale.set(10, 10, 10);

    this.scene.add(sprite);
    this.model = sprite;
  }
}
