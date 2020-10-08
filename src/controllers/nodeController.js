import Node from "../models/Node";
import { fetchAll, updateAll } from "../services/dataServices";

/**
 * Get data from local storage
 * @return {Array} nodes from localStorage
 */
export const getAllNodes = () => {
  let nodes = fetchAll("nodes");
  if (!nodes) nodes = updateAll("nodes", []);
  return nodes;
};

/**
 * Generates a string of length 9
 * @return {String} randomly generated Id
 */
const _generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const _generateName = () => {
  const names = getAllNodes().map((item) => item.name.charCodeAt(0));
  if (names.length < 1) return "A";
  return String.fromCharCode(Math.max(...names) + 1);
};

const _parseNumberOrZero = (input) => {
  if (!input || isNaN(input)) return 0;
  return Number(input);
};

export const getNodeById = (_id) => {
  const node = getAllNodes().find((item) => item._id === _id);
  return node;
};

export const getNodeByName = (name) => {
  const node = getAllNodes().find((item) => item.name === name);
  return node;
};

export const addNode = (data) => {
  const newNode = createNode(data);
  let nodes = getAllNodes().filter((item) => item._id !== data._id);
  nodes.push(newNode);
  return updateAll("nodes", nodes);
};

export const addTempNode = (data) => {
  let tempNodes = getAllNodes().filter((item) => item._id !== data._id);
  const newNode = createNode(data);
  tempNodes.push(newNode);
  return { newNode, nodes: tempNodes };
};

export const removeNode = (_id) => {
  const nodes = getAllNodes().filter((item) => item._id !== _id);
  return updateAll("nodes", nodes);
};

export const getSupportValues = (data) => {
  const supportTable = {
    Pin: { xSupport: 1, ySupport: 1 },
    Roller: { xSupport: 0, ySupport: 1 },
  };
  const name = data;
  if (name === "") return { xSupport: 0, ySupport: 0 };
  const values = supportTable[name];
  return values;
};

export const getSupportType = ({ xSupport, ySupport }) => {
  let support = "";
  if (xSupport > 0 && ySupport > 0) {
    support = "Pin";
  } else if (xSupport === 0 && ySupport > 0) {
    support = "Roller";
  } else {
    support = "";
  }
  return support;
};

export const createNode = (data) => {
  if (data) {
    const {
      _id,
      name,
      xCoord,
      yCoord,
      xForce,
      yForce,
      xSupport,
      ySupport,
    } = data;
    const id = _id ? _id : _generateId();
    const na = name ? name : _generateName();
    const xc = Number(xCoord);
    const yc = Number(yCoord);
    const xf = _parseNumberOrZero(xForce);
    const yf = _parseNumberOrZero(yForce);
    const xs = xSupport;
    const ys = ySupport;
    const node = new Node(id, na, xc, yc, xf, yf, xs, ys);
    return !isNaN(xc) && !isNaN(yc) ? node : null;
  }
};

// TODO: create separate function to update nodes
