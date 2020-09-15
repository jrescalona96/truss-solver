class Bar {
  constructor(_id, nodeI, nodeJ, material, area) {
    this._id = _id;
    this.nodeI = nodeI;
    this.nodeJ = nodeJ;
    this.material = material;
    this.area = area;
    this.length = this.calcLength();
  }

  calcLength = () => {
    if (this.nodeI && this.nodeJ) {
      const a = Math.abs(this.nodeI.x - this.nodeJ.x);
      const b = Math.abs(this.nodeI.y - this.nodeJ.y);
      const c = Math.sqrt(Math.pow(a, 2), Math.pow(b, 2));
      return c;
    }
    return null;
  };
}
export default Bar;
