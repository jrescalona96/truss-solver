// TODO: Fix Class
export default class Material {
  #materials = {
    Steel: { index: 1, rating: 29000 },
    Wood: { index: 3, rating: 4200 },
  };

  constructor(type) {
    this._type = type;
    const mat = this.#materials[this._type];
    if (mat) {
      this._index = mat.index;
      this._rating = mat.rating;
    } else {
      this._index = 0;
      this._rating = 0;
    }
  }

  /** This method should not be used, outside class.
   * Implementation is only limited to two types of material
   */
  set index(val) {
    this._index = val;
    this._rating =
      val === 1
        ? this.#materials["Steel"].rating
        : this.#materials["Wood"].rating;
    this.type = val === 1 ? "Steel" : "Wood";
  }

  get index() {
    return this._index;
  }

  /** This method should not be used, outside class.
   * Implementation is only limited to two types of material
   */
  set rating(val) {
    this._rating = val;
    this._index = val === 29000 ? 1 : 3;
    this.type = val === 29000 ? "Steel" : "Wood";
  }

  get rating() {
    return this._rating;
  }

  set type(val) {
    this._type = val;
    const mat = this.#materials[this._type];
    this._index = mat.index;
    this._rating = mat.rating;
  }

  get type() {
    return this._type;
  }
}
