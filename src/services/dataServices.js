import Support from "../models/Support";
import Node from "../models/Node";
import Bar from "../models/Bar";

export const fetchAll = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const updateAll = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  return fetchAll(key);
};

export const reset = (key) => {
  updateAll("key", []);
};

export const resetAll = () => {
  localStorage.clear();
};

export const exaggerate = (source, magnitude) => {
  return source.map((item) => {
    let node = item;
    const { x: xDis, y: yDis } = item.displacement;
    const { x: xCoord, y: yCoord } = item.coordinates;
    node.displacement.x = xDis * magnitude;
    node.displacement.y = yDis * magnitude;
    node.coordinates.x = xCoord + node.displacement.x;
    node.coordinates.y = yCoord + node.displacement.y;
    node.support = new Support();
    return node;
  });
};

export const convertToNodeModel = (data) => {
  try {
    const res = data.map((item) => {
      const { _id, name, coordinates, force, support, displacement } = item;
      return new Node(_id, name, coordinates, force, support, displacement);
    });
    return res;
  } catch (e) {
    return null;
  }
};

export const convertToBarModel = (data) => {
  try {
    const res = data.map((item) => {
      const { _id, nodeI, nodeJ, material, section } = item;
      return new Bar(_id, nodeI, nodeJ, material._type, section);
    });
    return res;
  } catch (e) {
    return null;
  }
};

export const createBarResults = (bars, resultantNodes) => {
  // build lookup table
  let lookup = {};
  resultantNodes.forEach((node) => (lookup[node._id] = node));

  // TODO: update internalForces
  // TODO: update stress

  const res = bars.map((item) => {
    const nodeI = lookup[item.nodeI._id];
    const nodeJ = lookup[item.nodeJ._id];
    item.nodeI = nodeI;
    item.nodeJ = nodeJ;
    return item;
  });
  return res;
};
