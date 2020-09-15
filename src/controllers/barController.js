import * as nodeController from "./nodeController";
import Bar from "../models/Bar";

let bars = [];

const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const getBars = () => bars;

export const getBarNodes = (data) => {
  const { nodeNameI, nodeNameJ } = data;
  const nodeI = nodeController.getNode(nodeNameI);
  const nodeJ = nodeController.getNode(nodeNameJ);
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
