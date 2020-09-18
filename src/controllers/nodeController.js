import Node from "../models/Node";

let nodes = [];

const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

// Nodes //
export const getNodes = () => nodes;

export const getNode = (_id) => {
  return nodes.find((item) => item._id === _id);
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
    const { _id, xCoord, yCoord, xForce, yForce } = data;
    const id = _id ? _id : _generateId();
    const name = `N${nodes.length}`;
    const xc = parseFloat(xCoord);
    const yc = parseFloat(yCoord);
    const xf = _parseNumberOrZero(xForce);
    const yf = _parseNumberOrZero(yForce);
    return !isNaN(xc) && !isNaN(yc) ? new Node(id, name, xc, yc, xf, yf) : null;
  }
};

const _parseNumberOrZero = (input) => {
  if (input && input.isNaN) return 0;
  return parseFloat(input);
};

export const removeNode = (_id) => {
  nodes = nodes.filter((item) => item._id !== _id);
  return nodes;
};
