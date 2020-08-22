import Node from "../models/Node";

let nodes = [];

export const getNodes = () => nodes;

export const updateNodes = (data) => nodes.push(data);

export const appendNode = (data) => {
  let tempNodes = [...nodes];
  tempNodes.push(data);
  return tempNodes;
};

export const createNode = (data) => {
  if (data) {
    const { name, x, y } = data;
    const id = _generateId();
    const xCoor = x === "" || !x ? 0 : Number(x);
    const yCoor = y === "" || !y ? 0 : Number(y);
    return new Node(id, name, xCoor, yCoor);
  } else {
    return new Node("", "", 0, 0);
  }
};

const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};
