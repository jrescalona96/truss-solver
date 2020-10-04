import React from "react";
import Node from "../node/index";
import Bar from "../bar/index";
import { calculatePlaneSize } from "../../../controllers/coordinatePlaneController";
import "./coordinatePlane.scss";

const CoordinatePlane = ({ data, selected, onSetSelectedNode }) => {
  const { nodes, bars } = data;
  const { width, height } = calculatePlaneSize(nodes);

  return (
    <div id="coordinatePlane">
      <svg width={width} height={height}>
        {bars.map((item) => (
          <Bar key={item._id} data={item} />
        ))}
        {nodes.map((item) => (
          <Node
            key={item._id}
            data={item}
            onClick={onSetSelectedNode}
            isSelected={item._id === selected._id}
          />
        ))}
      </svg>
    </div>
  );
};

export default CoordinatePlane;
