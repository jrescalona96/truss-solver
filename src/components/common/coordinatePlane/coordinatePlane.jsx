import React from "react";
import Node from "../node/index";
import Bar from "../bar/index";
import "./coordinatePlane.scss";

const CoordinatePlane = ({
  width,
  height,
  primaryData,
  secondaryData,
  selectedNode,
  onSetSelectedNode,
  onSetSelectedBar,
  nodeFill,
  nodeSize,
  barFill,
  barSize,
}) => {
  const { nodes: primaryNodes, bars: primaryBars } = primaryData;

  let secondaryNodes = [];
  let secondaryBars = [];
  if (secondaryData) {
    secondaryNodes = secondaryData.nodes;
    secondaryBars = secondaryData.bars;
  }

  return (
    <svg className="coordinatePlane" viewBox={`0 0 ${width} ${height}`}>
      {primaryBars.map((item) => (
        <Bar
          key={item._id}
          data={item}
          onClick={onSetSelectedBar}
          fill={barFill[0]}
          width={barSize[0]}
        />
      ))}
      {secondaryBars.map((item) => (
        <Bar
          key={item._id}
          data={item}
          onClick={() => {}}
          fill={barFill[1]}
          width={barSize[1]}
        />
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
  );
};

export default CoordinatePlane;
