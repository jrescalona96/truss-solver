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
    let id;
    if (!_id) id = _generateId();
    else id = data._id;
    const name = `N${nodes.length}`;
    const xc = parseFloat(xCoord);
    const yc = parseFloat(yCoord);
    let xf = parseFloat(xForce);
    let yf = parseFloat(yForce);
    xf = isNaN(xf) ? 0 : xf;
    yf = isNaN(yf) ? 0 : yf;
    return !isNaN(xc) && !isNaN(yc) ? new Node(id, name, xc, yc, xf, yf) : null;
  }
};

export const removeNode = (_id) => {
  nodes = nodes.filter((item) => item._id !== _id);
  return nodes;
};

export const addForce = (data) => {
  console.log(data);
};
