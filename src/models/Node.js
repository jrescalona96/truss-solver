import Force from "./Force";
import Coordinates from "./Coordinates";
import Support from "./Support";
import Displacement from "./Displacement";

export default class Node {
  constructor(_id, name, coordinate, force, support, displacement) {
    this._id = _id;
    this.name = name;
    this.coordinates = new Coordinates(coordinate.x, coordinate.y);
    this.force = new Force(force.x, force.y);
    this.support = new Support(support.type);
    this.displacement = new Displacement(displacement.x, displacement.y);
  }
}
