import Material from "./Material";
import Section from "./Section";
import Circular from "./Circular";

export default class Bar {
  constructor(
    id,
    nodeI,
    nodeJ,
    material,
    section,
    internalForce = 0,
    stress = 0
  ) {
    this._id = id;
    this.nodeI = nodeI;
    this.nodeJ = nodeJ;
    this.material = new Material(material);
    this.section = section; // TODO: relocate creation of section
    this.internalForce = internalForce;
    this.stress = stress;
  }

  get length() {
    if (this.nodeI && this.nodeJ) {
      const { x: xi, y: yi } = this.nodeI.coordinates;
      const { x: xj, y: yj } = this.nodeJ.coordinates;
      const a = Math.abs(xi - xj);
      const b = Math.abs(yi - yj);
      return Math.sqrt(a * a, b * b);
    }
    return 0;
  }
}
