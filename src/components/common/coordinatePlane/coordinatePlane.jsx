import React from "react";
import Node from "../node/index";
import Bar from "../bar/index";
import {
  calculatePlaneSize,
  getScales,
} from "../../../controllers/coordinatePlaneController";
import "./coordinatePlane.scss";

const CoordinatePlane = ({ data, onSetSelectedNode }) => {
  const { nodes, bars } = data;
  const { yScale, xScale } = getScales(nodes);
  const { width, height } = calculatePlaneSize(nodes);

  return (
    <div id="coordinatePlane">
      <svg width={width} height={height}>
        {nodes.map((item) => (
          <Node
            key={item._id}
            data={item}
            onClick={onSetSelectedNode}
            scales={{ yScale, xScale }}
          />
        ))}
        {bars.map((item) => (
          <Bar key={item._id} data={item} />
        ))}
      </svg>
    </div>
  );
};

export default CoordinatePlane;
