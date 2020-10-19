import Section from "./Section";

export default class Circular extends Section {
  constructor(radius = 1) {
    super("Circular");
    this._radius = radius;
  }

  get area() {
    return this._radius * this._radius * Math.PI;
  }

  get diameter() {
    return this._radius * 2;
  }

  set radius(val) {
    this._radius = val;
  }

  get radius() {
    return this._radius;
  }
}
