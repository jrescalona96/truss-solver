import * as nodeController from "./nodeController";
import Bar from "../models/Bar";

let bars = [];

const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const getBars = () => bars;

export const getBarNodes = (data) => {
  const { nodeNameI, nodeNameJ } = data;
  const nodeI = nodeController.getNodeByName(nodeNameI);
  const nodeJ = nodeController.getNodeByName(nodeNameJ);
  if (nodeI && nodeJ) {
    return {
      nodeI,
      nodeJ,
    };
  } else {
    return null;
  }
};

export const updateBars = (data) => {
  // updated node related to bar being updated
  const node = data;
  // return a list of bars with updated node
  return bars.map((item) => {
    if (item.nodeI._id === node._id) {
      item.nodeI = node;
    } else if (item.nodeJ._id === node._id) {
      item.nodeJ = node;
    }
    return item;
  });
};

export const addTempBar = (data) => {
  const bar = createBar(data);
  if (bar) {
    let tempBars = [...bars];
    tempBars.push(bar);
  } else {
    return null;
  }
};

export const addBar = (data) => {
  const bar = createBar(data);
  if (bar) {
    bars.push(bar);
    return bars;
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
    // TODO: updateBars(new Bar(_id, nodeI, nodeJ, material, area))
    const bar = new Bar(_id, nodeI, nodeJ, material, area);
    return bar;
  } else {
    // TODO: return bars
    return null;
  }
};
