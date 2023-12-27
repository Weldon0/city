export class EffectManager {
  constructor() {
    this.list = [];
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EffectManager();
    }
    return this.instance;
  }

  addObj(obj) {
    this.list.push(obj);
  }

  tickForEach(t) {
    this.list.forEach((obj) => {
      obj.onTick(t);
    });
  }
}
