import Node from "../models/Node";
import Bar from "../models/Bar";

let nodes = [];
let bars = [];
let forces = [];

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
    const name = `n${nodes.length}`;
    const xCoord = x === "" || !x ? 0 : Number(x);
    const yCoord = y === "" || !y ? 0 : Number(y);
    return new Node(id, name, xCoord, yCoord);
  } else {
    return new Node("", "", 0, 0);
  }
};

// Nodes //

const COORD_PLANE_SIZE = 600;
const ORIGIN = { x: 25, y: 25 };

export const calcRelativeCoord = (data) => {
  const { x, y } = data;
  const relX = ORIGIN.x + x;
  const relY = COORD_PLANE_SIZE - ORIGIN.y - y;
  return { relX, relY };
};

// Bars //
export const getBars = () => bars;

export const getBarNodes = (data) => {
  const { nodeNameI, nodeNameJ } = data;
  const nodeI = getNode(nodeNameI);
  const nodeJ = getNode(nodeNameJ);
  if (nodeI && nodeJ) {
    return {
      nodeI,
      nodeJ,
    };
  } else {
    return null;
  }
};

export const createBar = (data) => {
  const _id = _generateId();
  const { material, area } = data;
  const nodes = getBarNodes(data);
  if (nodes) {
    const { nodeI, nodeJ } = nodes;
    return new Bar(_id, nodeI, nodeJ, material, area);
  }
  return null;
};

export const appendBar = (data) => {
  const bar = { ...data };
  let tempBars = [...bars];
  tempBars.push(bar);
  return tempBars;
};

export const updateBars = (data) => {
  const bar = { ...data };
  bars.push(bar);
  return bars;
};
