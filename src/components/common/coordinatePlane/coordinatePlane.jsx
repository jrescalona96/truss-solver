import React from "react";
import Node from "../node/index";
import Bar from "../bar/index";
import { calculatePlaneSize } from "../../../controllers/coordinatePlaneController";
import "./coordinatePlane.scss";

const CoordinatePlane = ({
  data,
  selectedNode,
  onSetSelectedNode,
  onSetSelectedBar,
  nodeFill,
  nodeSize,
}) => {
  const { nodes, bars } = data;
  const { width, height } = calculatePlaneSize(nodes);

  return (
    <div className="coordinatePlane">
      <svg viewBox={`0 0 ${width} ${height}`}>
        {bars.map((item) => (
          <Bar key={item._id} data={item} onClick={onSetSelectedBar} />
        ))}
        {nodes.map((item) => (
          <Node
            key={item._id}
            data={item}
            onClick={onSetSelectedNode}
            isSelected={item._id === selectedNode._id}
            fill={nodeFill}
            size={nodeSize}
          />
        ))}
      </svg>
    </div>
  );
};

export default CoordinatePlane;
