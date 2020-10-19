export default class Bar {
  constructor(id, nodeI, nodeJ, material, section) {
    this._id = id;
    this.nodeI = nodeI;
    this.nodeJ = nodeJ;
    this.material = material;
    this.section = section;
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
