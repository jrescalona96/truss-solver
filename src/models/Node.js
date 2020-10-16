export default class Node {
  constructor(
    _id,
    name,
    xCoord,
    yCoord,
    xForce,
    yForce,
    xSupport,
    ySupport,
    xInitialCoord,
    yInitialCoord
  ) {
    this._id = _id;
    this.name = name;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.xForce = xForce;
    this.yForce = yForce;
    this.xSupport = xSupport;
    this.ySupport = ySupport;
    this.xInitialCoord = xInitialCoord;
    this.yInitialCoord = yInitialCoord;
  }
}
