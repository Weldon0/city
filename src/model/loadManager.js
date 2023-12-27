import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

export function loadManager(pathList, suc) {
  const gltfLoader = new GLTFLoader();
  const fbxLoader = new FBXLoader();
  const model = [];
  /**
   *
   */
  pathList.forEach((path) => {
    if (path.includes("fbx")) {
      fbxLoader.load(path, (obj) => {
        model.push({
          model: obj,
          url: path,
        });
        model.length === pathList.length && suc(model);
      });
    } else if (path.includes("gltf")) {
      gltfLoader.load(path, (gltf) => {
        model.push({
          model: gltf.scene,
          url: path,
        });
      });
      model.length === pathList.length && suc(model);
    }
  });
}
