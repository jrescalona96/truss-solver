import * as nodeController from "./nodeController";
import { fetchAll, updateAll } from "../services/dataServices";
import Bar from "../models/Bar";

export const getAllBars = () => {
  let bars = fetchAll("bars");
  if (!bars) bars = updateAll("bars", []);
  return bars;
};

const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const getBarById = (id) => {
  const bars = getAllBars();
  return bars.find((item) => item._id === id);
};

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

/**
 * Delete all bars connecgted to a node
 * @param {id} id of Node
 * @returns {Array} array of updated bars
 */
export const deleteConnectedBars = (id) => {
  const prevBars = getAllBars();
  const bars = prevBars.filter(
    (item) => item.nodeI._id !== id && item.nodeJ._id !== id
  );
  return updateAll("bars", bars);
};

export const updateBarNode = (node) => {
  // updated node related to bar being updated
  const prevBars = getAllBars();
  const bars = prevBars.map((item) => {
    if (item.nodeI._id === node._id) {
      item.nodeI = node;
    } else if (item.nodeJ._id === node._id) {
      item.nodeJ = node;
    }
    return item;
  });
  return bars;
};

export const updateBar = (data) => {
  const bars = getAllBars().filter((item) => item._id !== data._id);
  const bar = createBar(data);
  if (bar) {
    let tempBars = [...bars];
    tempBars.push(bar);
  } else {
    return null;
  }
};

export const addBar = (data) => {
  let bars = getAllBars().filter((item) => item._id !== data._id);
  const bar = createBar(data);
  if (bar) {
    bars.push(bar);
    updateAll("bars", bars);
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
    const bar = new Bar(_id, nodeI, nodeJ, material, area);
    return bar;
  } else {
    return null;
  }
};

export const deleteBar = (id) => {
  const bars = getAllBars().filter((item) => item._id !== id);
  updateAll("bars", bars);
  return bars;
};
