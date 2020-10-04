import Node from "../models/Node";

let nodes = [];

const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

// Nodes //
export const getNodes = () => nodes;

export const getNodeById = (_id) => {
  const node = nodes.find((item) => item._id === _id);
  return node;
};

export const getNodeByName = (name) => {
  const node = nodes.find((item) => item.name === name);
  return node;
};

export const addNode = (data) => {
  const newNode = createNode(data);
  const n = nodes.filter((item) => item._id !== data._id);
  n.push(newNode);
  nodes = n;
  return nodes;
};

export const removeNode = (_id) => {
  nodes = nodes.filter((item) => item._id !== _id);
  return nodes;
};

export const addTempNode = (data) => {
  let tempNodes = nodes.filter((item) => item._id !== data._id);
  const newNode = createNode(data);
  tempNodes.push(newNode);
  return tempNodes;
};

export const createNode = (data) => {
  if (data) {
    const { _id, name, xCoord, yCoord, xForce, yForce } = data;
    const id = _id ? _id : _generateId();
    const na = name ? name : `n${nodes.length}`;
    const xc = Number(xCoord);
    const yc = Number(yCoord);
    const xf = _parseNumberOrZero(xForce);
    const yf = _parseNumberOrZero(yForce);
    const node = new Node(id, na, xc, yc, xf, yf);
    return !isNaN(xc) && !isNaN(yc) ? node : null;
  }
};

const _parseNumberOrZero = (input) => {
  if (!input || isNaN(input)) return 0;
  return Number(input);
};
