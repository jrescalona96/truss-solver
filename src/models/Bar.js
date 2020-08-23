class Bar {
  constructor(_id, node1, node2) {
    this._id = _id;
    this.node1 = node1;
    this.node2 = node2;
    this.length = this.calcLength();
  }

  // TODO: implement
  calcLength = () => {};
}
export default Bar;
