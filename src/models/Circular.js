import Section from "./Section";

export default class Circular extends Section {
  constructor(radius = 1) {
    super("Circular");
    this._radius = radius;
    this.area = this._radius * this._radius * Math.PI;
  }

  get diameter() {
    return this._radius * 2;
  }

  set radius(val) {
    this._radius = val;
    this.area = this._radius * this._radius * Math.PI;
  }

  get radius() {
    return this._radius;
  }
}
