export default class Resultant {
  constructor(_x = 0, _y = 0) {
    this.x = Number(_x);
    this.y = Number(_y);
  }

  get resultant() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
