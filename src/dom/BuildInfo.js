import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export class BuildInfo {
  constructor(scene, center, dataObj) {
    this.scene = scene;
    this.center = center;
    this.dataObj = dataObj;
    this.list = [];

    this.createNameDiv();
    this.createInfoDiv();
  }

  createNameDiv() {
    const nameDiv = document.querySelector("#tag-1");
    nameDiv.innerHTML = this.dataObj.name;
    const nameObject = new CSS2DObject(nameDiv);
    nameObject.position.set(this.center.x, this.center.y + 10, this.center.z);
    this.scene.add(nameObject);
    this.list.push(nameObject);
  }

  createInfoDiv() {
    const infoDiv = document.querySelector("#tag-2");
    infoDiv.style.pointerEvents = "all";
    const { squareMeters, accommodate, officesRemain, parkingRemain } =
      this.dataObj;

    const textHtml = `
    <div>总平米数： ${squareMeters}</div>
    <div>容纳人数： ${accommodate}</div>
    <div>可出租位： ${officesRemain}</div>
    <div>空余车位： ${parkingRemain}</div>
      `;
    infoDiv.innerHTML = textHtml;

    const infoObject = new CSS2DObject(infoDiv);
    infoObject.position.set(this.center.x, this.center.y + 5, this.center.z);
    this.scene.add(infoObject);
    this.list.push(infoObject);
  }
}
