import Displacement from "../models/Displacement";
import Coordinates from "../models/Coordinates";

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
    let node = { ...item };
    const { x: xDis, y: yDis } = item.displacement;
    const { x: xCoord, y: yCoord } = item.coordinates;
    node.displacement = new Displacement(xDis * magnitude, yDis * magnitude);
    node.coordinates = new Coordinates(
      xCoord + node.displacement.x,
      yCoord + node.displacement.y
    );
    return node;
  });
};

export const createBarResults = (bars, nodes) => {
  // TODO: update nodes
  // build lookup table
  let lookup = {};
  nodes.forEach((node) => (lookup[node._id] = node));

  // TODO: update internalForces
  // TODO: update stress

  const res = bars.map((item) => {
    const nodeI = lookup[item.nodeI._id];
    const nodeJ = lookup[item.nodeJ._id];
    let bar = { ...item };
    bar.nodeI = nodeI;
    bar.nodeJ = nodeJ;
    return bar;
  });
  return res;
};
