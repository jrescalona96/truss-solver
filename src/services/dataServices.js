import { createNode } from "../controllers/nodeController";

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

export const mapResults = (data) => {
  const nodes = fetchAll("nodes");
  const { displacement, forces } = data;
  const nodeResults = mapResultNodes(nodes, displacement, forces);
  return { resultNodes: nodeResults };
};

const mapResultNodes = (nodes, displacements, forces) => {
  const results = nodes.map((n) => {
    const { _id } = n;
    const nodeDisplacement = displacements[_id];
    const nodeForces = forces[_id];
    const data = {
      name: n["name"],
      xSupport: 0,
      ySupport: 0,
      xCoord: n["xCoord"] + nodeDisplacement["x"] * 30,
      yCoord: n["yCoord"] + nodeDisplacement["y"] * 30,
      xForce: nodeForces["x"],
      yForce: nodeForces["y"],
    };
    const resultantNode = createNode(data);
    return resultantNode;
  });
  return results;
};

// // TODO: Add data representation for internal and stress
// const mapResultBars = (bars, internal, stress) => {
//   const results = bars.map((b) => {
//     const { _id } = b;
//     const barInternal = internal[_id];
//     const barStress = stress[_id];
//   });
// };
