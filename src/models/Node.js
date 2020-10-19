export default class Node {
  constructor(_id, name, coordinate, force, support, displacement) {
    this._id = _id;
    this.name = name;
    this.coordinates = coordinate;
    this.force = force;
    this.support = support;
    this.displacement = displacement;
  }
}
