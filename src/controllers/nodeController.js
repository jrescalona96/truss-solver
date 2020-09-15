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
    const { xCoord, yCoord } = data;
    const id = _generateId();
    const name = `N${nodes.length}`;
    const xc = parseFloat(xCoord);
    const yc = parseFloat(yCoord);
    return !isNaN(xc) && !isNaN(yc) ? new Node(id, name, xc, yc) : null;
  }
};

export const removeNode = (_id) => {
  nodes = nodes.filter((item) => item._id !== _id);
  return nodes;
};

export const addForce = (data) => {
  console.log(data);
};
