import Section from "./Section";

export default class Rectangular extends Section {
  constructor(_height = 1, _width = 1) {
    super("Rectangular");
    this.height = _height;
    this.width = _width;
    this.area = this.height * this.width;
  }
}
