export default class Node {
  constructor(_id, name, xCoord, yCoord, xForce, yForce) {
    this._id = _id;
    this.name = name;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.xForce = xForce;
    this.yForce = yForce;
  }
}
