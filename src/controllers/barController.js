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
  console.log(nodeI, nodeJ);
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
  bars = bars.map((item) => {
    if (item.nodeI._id === data._id) {
      item.nodeI = data;
    }
    if (item.nodeJ._id === data._id) {
      item.nodeJ = data;
    }
    return item;
  });

  console.log("bars => ", bars);

  return bars;
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

export const addTempBar = (data) => {
  const bar = { ...data };
  let tempBars = [...bars];
  tempBars.push(bar);
  return tempBars;
};

export const addBar = (data) => {
  const bar = { ...data };
  bars.push(bar);
  return bars;
};
