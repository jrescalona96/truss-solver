import Node from "../models/Node";

let nodes = [];

const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

// Nodes //
export const getNodes = () => nodes;

/**
 * returns specified node
 * @param {string} id - id of node
 */
export const getNode = (_id) => {
  return nodes.find((item) => item._id === _id);
};

export const addNode = (data) => {
  const n = nodes.filter((item) => item._id !== data._id);
  n.push(data);
  nodes = n;
  return nodes;
};

export const removeNode = (_id) => {
  nodes = nodes.filter((item) => item._id !== _id);
  return nodes;
};

export const updateNode = (data) => {
  let tempNodes = nodes.filter((item) => item._id !== data._id);
  tempNodes.push(data);
  return tempNodes;
};

export const createNode = (data) => {
  if (data) {
    const { _id, name, xCoord, yCoord, xForce, yForce } = data;
    const id = _id ? _id : _generateId();
    const na = name ? name : `N${nodes.length}`;
    const xc = parseFloat(xCoord);
    const yc = parseFloat(yCoord);
    const xf = _parseNumberOrZero(xForce);
    const yf = _parseNumberOrZero(yForce);
    return !isNaN(xc) && !isNaN(yc) ? new Node(id, na, xc, yc, xf, yf) : null;
  }
};

const _parseNumberOrZero = (input) => {
  if (!input || isNaN(input)) return 0;
  return parseFloat(input);
};
