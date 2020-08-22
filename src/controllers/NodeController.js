import Node from "../models/Node";

export const createNode = ({ _id, x, y }) => {
  const id = _id ? _id : "";
  const xCoor = x === "" || !x ? 0 : Number(x);
  const yCoor = y === "" || !y ? 0 : Number(y);
  return new Node(id, xCoor, yCoor);
};
