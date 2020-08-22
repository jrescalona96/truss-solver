import Node from "../models/Node";

let nodes = [];

const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

// Nodes //
export const getNodes = () => nodes;

export const updateNodes = (data) => {
  const node = { ...data };
  nodes.push(node);
  return nodes;
};

export const appendNode = (data) => {
  let tempNodes = [...nodes];
  tempNodes.push(data);
  return tempNodes;
};

export const createNode = (data) => {
  if (data) {
    const { x, y } = data;
    const id = _generateId();
    const name = `n${nodes.length}`;
    const xCoor = x === "" || !x ? 0 : Number(x);
    const yCoor = y === "" || !y ? 0 : Number(y);
    return new Node(id, name, xCoor, yCoor);
  } else {
    return new Node("", "", 0, 0);
  }
};

// Nodes //

// Bars //
export const getBarCoordinates = (data) => {
  const { startNode, endNode } = data;
  const start = Number(startNode.slice(1, startNode.length));
  const end = Number(endNode.slice(1, endNode.length));
  const startCoor = nodes[start];
  const endCoor = nodes[end];
  return {
    _id: _generateId(),
    x1: startCoor.x,
    y1: startCoor.y,
    x2: endCoor.x,
    y2: endCoor.y,
  };
};
