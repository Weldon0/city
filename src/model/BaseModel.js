export class BaseModel {
  model;
  camera;
  control;
  scene;
  constructor(model, scene, camera, control) {
    this.model = model;
    this.scene = scene;
    this.camera = camera;
    this.control = control;

    this.init();
  }
}
