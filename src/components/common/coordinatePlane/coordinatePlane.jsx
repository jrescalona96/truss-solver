import React from "react";
import Node from "../node/index";
import Bar from "../bar/index";
import { calculatePlaneSize } from "../../../controllers/coordinatePlaneController";
import "./coordinatePlane.scss";

const CoordinatePlane = ({
  data,
  secondaryData,
  selectedNode,
  onSetSelectedNode,
  onSetSelectedBar,
  nodeFill,
  nodeSize,
}) => {
  const { nodes: primaryNodes, bars: primaryBars } = data;
  const { width, height } = calculatePlaneSize(primaryNodes);
  let secondaryNodes = [];
  let secondaryBars = [];
  if (secondaryData) {
    secondaryNodes = secondaryData.nodes;
    secondaryBars = secondaryData.bars;
  }
  return (
    <div className="coordinatePlane">
      <svg viewBox={`0 0 ${width} ${height}`}>
        {secondaryBars.map((item) => (
          <Bar key={item._id} data={item} onClick={() => {}} />
        ))}
        {secondaryNodes.map((item) => (
          <Node
            key={item._id}
            data={item}
            onClick={() => {}}
            isSelected={item._id === selectedNode._id}
            fill="orange"
            size={nodeSize / 2}
            nameOn={false}
            labelOn={false}
            forcesOn={true}
          />
        ))}
        {primaryBars.map((item) => (
          <Bar key={item._id} data={item} onClick={onSetSelectedBar} />
        ))}
        {primaryNodes.map((item) => (
          <Node
            key={item._id}
            data={item}
            onClick={onSetSelectedNode}
            isSelected={item._id === selectedNode._id}
            fill={nodeFill}
            size={nodeSize}
            nameOn={true}
            labelOn={true}
            forcesOn={false}
          />
        ))}
      </svg>
    </div>
  );
};

export default CoordinatePlane;
