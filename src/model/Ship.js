import { BaseModel } from "@/model/BaseModel.js";

export class Ship extends BaseModel {
  init() {
    this.scene.add(this.model);
  }
}
