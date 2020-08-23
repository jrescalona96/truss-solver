import Node from "../models/Node";
import Bar from "../models/Bar";

let nodes = [];
let bars = [];

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
    const xCoord = x === "" || !x ? 0 : Number(x);
    const yCoord = y === "" || !y ? 0 : Number(y);
    return new Node(id, name, xCoord, yCoord);
  } else {
    return new Node("", "", 0, 0);
  }
};

const COORD_PLANE_SIZE = 600;
const ORIGIN = { x: 25, y: 25 };

export const calcRelativeCoord = (data) => {
  const { x, y } = data;
  const relX = ORIGIN.x + x;
  const relY = COORD_PLANE_SIZE - ORIGIN.y - y;
  return { relX, relY };
};
// Nodes //

// Bars //

export const getBars = () => bars;

export const getBarCoordinates = (data) => {
  const { startNode, endNode } = data;
  const startCoord = nodes.find((item) => item.name === startNode);
  const endCoord = nodes.find((item) => item.name === endNode);
  if (startCoord && endCoord) {
    return {
      x1: startCoord.x,
      y1: startCoord.y,
      x2: endCoord.x,
      y2: endCoord.y,
    };
  } else {
    return null;
  }
};

export const createBar = (data) => {
  if (data) {
    const _id = _generateId();
    const coords = getBarCoordinates(data);
    if (coords) {
      const { x1, y1, x2, y2 } = coords;
      return new Bar(_id, x1, y1, x2, y2);
    } else {
      return null;
    }
  } else {
    const _id = _generateId();
    return new Bar(_id, 0, 0, 0, 0);
  }
};

export const appendBar = (data) => {
  const bar = { ...data };
  let tempBars = [...bars];
  tempBars.push(bar);
  return tempBars;
};

export const updateBars = (data) => {
  console.log(data);
  const bar = { ...data };
  bars.push(bar);
  return bars;
};
