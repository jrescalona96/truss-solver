import { createNode } from "../controllers/nodeController";
import { createBar } from "../controllers/barController";

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
  const bars = fetchAll("bars");
  const { displacement, forces, internal, stress } = data;
  const nodeResults = mapResultNodes(nodes, displacement, forces);
  const barResults = mapResultBars(bars, nodeResults, internal, stress);
  return { nodeResults, barResults };
};

const mapResultNodes = (nodes, displacements, forces) => {
  const results = nodes.map((n) => {
    const { _id } = n;
    const nodeDisplacement = displacements[_id];
    const nodeForces = forces[_id];
    const data = {
      name: n["name"],
      support: { x: 0, y: 0 },
      xCoord: n.coordinates.x + nodeDisplacement.x * 60,
      yCoord: n.coordinates.y + nodeDisplacement.y * 60,
      xForce: nodeForces["x"],
      yForce: nodeForces["y"],
      xDisplacement: nodeDisplacement.x * 60,
      yDisplacement: nodeDisplacement.y * 60,
    };
    const resultantNode = createNode(data);
    return resultantNode;
  });
  return results;
};

// TODO: Add data representation for internal and stress
const mapResultBars = (bars, nodes, internal, stress) => {
  const results = bars.map((b) => {
    let data = { ...b };
    data.nodeNameI = b.nodeI.name;
    data.nodeNameJ = b.nodeJ.name;
    let resultantBar = createBar(data);
    resultantBar.nodeI = nodes.find(
      (item) => item.name === resultantBar.nodeI.name
    );
    resultantBar.nodeJ = nodes.find(
      (item) => item.name === resultantBar.nodeJ.name
    );
    return resultantBar;
  });
  return results;
};
