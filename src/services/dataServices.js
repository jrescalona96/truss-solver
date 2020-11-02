import { createNode } from "../controllers/nodeController";
import { createBar } from "../controllers/barController";
import Displacement from "../models/Displacement";

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

export const exaggerateDisplacement = (source, magnitude) => {
  return source.map((item) => {
    const node = { ...item };
    const { x, y } = item.displacement;
    node.displacement = new Displacement(x * magnitude, y * magnitude);
    return node;
  });
};
