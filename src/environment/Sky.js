import { CubeTextureLoader } from "three";
// import {texture} from "three/nodes";

export class Sky {
  constructor(scene) {
    this.scene = scene;
  }

  setBack(publicPath, pathList) {
    new CubeTextureLoader().setPath(publicPath).load(pathList, (texture) => {
      this.scene.background = texture;
    });
  }
}
