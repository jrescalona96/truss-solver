import Node from "../models/Node";

let nodes = [];

const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

// Nodes //
export const getNodes = () => nodes;

export const getNode = (name) => {
  return nodes.find((item) => item.name === name);
};

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
    const name = `N${nodes.length}`;
    const xCoord = parseFloat(x);
    const yCoord = parseFloat(y);
    return !isNaN(xCoord) && !isNaN(yCoord)
      ? new Node(id, name, xCoord, yCoord)
      : null;
  }
};
