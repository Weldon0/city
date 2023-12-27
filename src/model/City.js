import { BaseModel } from "@/model/BaseModel.js";
import { Color, MeshBasicMaterial } from "three";
import { EdgesLine } from "@/effect/EdgesLine.js";
import { modifyCityDefaultMaterial } from "@/shader/modifyCityMaterial.js";
import { CityWater } from "@/effect/CityWater.js";
import { Fire } from "@/effect/Fire.js";
import { getBoxCenter } from "@/utils/getBoxCenter.js";
import { FireBall } from "@/effect/FireBall.js";
import { BuildInfo } from "@/dom/BuildInfo.js";
import { EffectManager } from "@/effect/EffectManager.js";

export class City extends BaseModel {
  init() {
    this.scene.add(this.model);
    this.initEffect();
    this.initFire("01-shanghaizhongxindasha");
  }
  // 初始化城市效果
  initEffect() {
    const RIVER_NAME = "Shanghai-08-River";
    const names = [RIVER_NAME, "Shanghai-09-Floor"]; // 地板和河水
    // 周围城市
    const otherNames = [
      "Shanghai-07",
      "Shanghai-06",
      "Shanghai-05",
      "Shanghai-04",
      "Shanghai-03",
      "Shanghai-02",
      // "Shanghai-01",
    ];
    this.buildNameObj = {
      // 模型名字和建筑显示名字对应关系
      "01-shanghaizhongxindasha": "上海中心大厦",
      "02-huanqiujinrongzhongxin": "环球金融中心",
      "03-jinmaodasha": "金茂大厦",
      "04-dongfangmingzhu": "东方明珠",
    };

    // 周围城市材质
    // 中心城市建筑材质
    const centerMaterial = new MeshBasicMaterial({
      color: 0xa8cded,
      transparent: true,
    });
    // 外围城市建筑材质
    const periphery = new MeshBasicMaterial({
      color: 0xa8cded,
      transparent: true,
    });
    this.model.traverse((model) => {
      if (model.name === "Text") {
        model.visible = false;
        return;
      }

      if (!names.includes(model.name)) {
        if (otherNames.includes(model.name)) {
          model.material = periphery;
          new EdgesLine(this.scene, model, new Color("#666666"));
          modifyCityDefaultMaterial(model, true);
        } else {
          model.material = centerMaterial;
          new EdgesLine(this.scene, model, new Color("#00ffff"));
          modifyCityDefaultMaterial(model);
        }
      }

      if (model.name === RIVER_NAME) {
        model.visible = false;
        const theWater = new CityWater(model, this.scene);
        EffectManager.getInstance().addObj(theWater);
      }
    });
  }

  initFire(buildName) {
    const build = this.model.getObjectByName(buildName);
    const { center, size } = getBoxCenter(build);

    const fire = new Fire(this.scene, center, size);
    const ball = new FireBall(this.scene, center);

    new BuildInfo(this.scene, center, {
      squareMeters: "200",
      name: this.buildNameObj[buildName],
      officesRemain: "200",
      accommodate: "500",
      parkingRemain: "88",
      cameraPosition: {
        x: "-27.60404773326758",
        y: "77.6723594934777",
        z: "190.86129619259177",
      },
    });
  }
}

/**
 * 1、找到模型对象的名字
 * 2、隐藏自带的建筑名字
 * 3、排除地面和河水
 */
