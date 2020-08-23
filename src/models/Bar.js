class Bar {
  constructor(_id, node1, node2) {
    this._id = _id;
    this.node1 = node1;
    this.node2 = node2;
    this.length = this.calcLength();
  }

  calcLength = () => {
    const a = Math.abs(this.node1.x - this.node2.x);
    const b = Math.abs(this.node1.y - this.node2.y);
    const c = Math.sqrt(Math.pow(a, 2), Math.pow(b, 2));
    return c;
  };
}
export default Bar;
