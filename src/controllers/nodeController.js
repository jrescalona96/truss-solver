import Node from "../models/Node";
import Coordinates from "../models/Coordinates";
import Displacement from "../models/Displacement";
import Support from "../models/Support";
import Force from "../models/Force";
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
 * Generates a string of length 10
 * @return {String} randomly generated Id
 */
export const _generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Generates a 1 Uppercase Letter name
 * @return {String} next available name in the alphabet (uppercase) or "A"
 */
export const _generateName = (nodes) => {
  if (nodes && nodes.length > 0) {
    const names = nodes.map((item) => item.name.charCodeAt(0));
    const newName = String.fromCharCode(Math.max(...names) + 1);
    return newName;
  }
  return "A";
};

// TODO: TEST
export const getNodeById = (id) => {
  const node = getAllNodes().find((item) => item._id === id);
  return node;
};

// TODO: TEST
export const getNodeByName = (n) => {
  const node = getAllNodes().find((item) => item.name === n);
  return node;
};

// TODO: TEST
export const addNode = (data) => {
  const newNode = createNode(data);
  let nodes = getAllNodes().filter((item) => item._id !== data._id);
  nodes.push(newNode);
  return updateAll("nodes", nodes);
};

// TODO: TEST
export const updateNode = (data) => {
  let tempNodes = getAllNodes().filter((item) => item._id !== data._id);
  const newNode = createNode(data);
  tempNodes.push(newNode);
  return { newNode, nodes: tempNodes };
};

// TODO: TEST
export const deleteNode = (_id) => {
  const nodes = getAllNodes().filter((item) => item._id !== _id);
  return updateAll("nodes", nodes);
};

//TODO: Remove
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

const _isValidData = (data) => {
  if (!data) return false;
  const { xCoord, yCoord, xForce, yForce } = data;
  if (
    isNaN(Number(xCoord)) ||
    isNaN(Number(yCoord)) ||
    isNaN(Number(xForce)) ||
    isNaN(Number(yForce)) ||
    isNaN(Number(xCoord))
  ) {
    return false;
  }
  return true;
};

export const createNode = (data) => {
  if (_isValidData(data)) {
    const {
      _id,
      name,
      xCoord,
      yCoord,
      xForce,
      yForce,
      support,
      xDisplacement,
      yDisplacement,
    } = data;

    const allNodes = getAllNodes();
    const node = new Node(
      _id ? _id : _generateId(),
      name ? name : _generateName(allNodes),
      new Coordinates(xCoord, yCoord),
      new Force(xForce, yForce),
      new Support(support.type || support), // support.type for updating node, support for new node
      new Displacement(xDisplacement, yDisplacement)
    );
    return node;
  }
  return null;
};

export const updateForce = (data, source) => {
  return source.map((item) => {
    const { x, y } = data[item._id];
    item.force = new Force(x, y);
    return item;
  });
};

export const updateDisplacement = (data, source) => {
  return source.map((item) => {
    const { x, y } = data[item._id];
    item.displacement = new Displacement(x, y);
    return item;
  });
};
