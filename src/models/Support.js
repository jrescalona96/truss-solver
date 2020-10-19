export default class Support {
  #supportValues = {
    Roller: { x: 0, y: 1 },
    Pin: { x: 1, y: 1 },
    None: { x: 0, y: 0 },
  };

  constructor(_type) {
    const support = this.#supportValues[_type];
    this.type = support ? _type : "None";
    this.x = this.#supportValues[this.type].x;
    this.y = this.#supportValues[this.type].y;
  }
}
