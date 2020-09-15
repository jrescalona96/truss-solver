export default class Node {
  constructor(_id, name, xCoord, yCoord, xForce, yForce) {
    this.name = name;
    this._id = _id;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.xForce = xForce;
    this.yForce = yForce;
  }
}
