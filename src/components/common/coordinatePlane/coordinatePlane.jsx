import React from "react";
import Node from "../node/index";
import Bar from "../bar/index";
import "./coordinatePlane.scss";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const CoordinatePlane = ({
  viewBox,
  planeSize,
  primaryData,
  secondaryData,
  selectedNode,
  onSetSelectedNode,
  onSetSelectedBar,
  primaryLabelsOn,
  primaryNamesOn,
  secondaryLabelsOn,
  secondaryNamesOn,
  primaryForcesOn,
  secondaryForcesOn,
  nodeFill,
  nodeSize,
  nodeNameColor,
  barFill,
  barSize,
}) => {
  const minX = Math.min(...primaryData.nodes.map((item) => item.xCoord));
  const minY = primaryData.nodes.find((item) => item.xCoord === minX).yCoord;
  const offset = 50;
  return (
    <div className="coordinatePlane">
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={minX - planeSize.width / 2 + offset}
        defaultPositionY={minY + offset}
        options={{ limitToBounds: false }}
        doubleClick={{ mode: "zoomOut" }}>
        <TransformComponent>
          <svg width={planeSize.width} height={planeSize.height}>
            <React.Fragment>
              {primaryData.bars.map((item) => (
                <Bar
                  key={item._id}
                  data={item}
                  onClick={onSetSelectedBar}
                  fill={barFill[0]}
                  width={barSize[0]}
                />
              ))}
              {secondaryData &&
                secondaryData.bars.map((item) => (
                  <Bar
                    key={item._id}
                    data={item}
                    onClick={() => {}}
                    fill={barFill[1]}
                    width={barSize[1]}
                  />
                ))}
              {secondaryData &&
                secondaryData.nodes.map((item) => (
                  <Node
                    key={item._id}
                    data={item}
                    onClick={() => {}}
                    isSelected={item._id === selectedNode._id}
                    fill="orange"
                    size={nodeSize[1]}
                    nameOn={secondaryNamesOn}
                    labelOn={secondaryLabelsOn}
                    forcesOn={secondaryForcesOn}
                  />
                ))}
              {primaryData.nodes.map((item) => (
                <Node
                  key={item._id}
                  data={item}
                  onClick={onSetSelectedNode}
                  isSelected={item._id === selectedNode._id}
                  fill={nodeFill}
                  size={nodeSize[0]}
                  nameOn={primaryNamesOn}
                  nodeNameColor={nodeNameColor}
                  labelOn={primaryLabelsOn}
                  forcesOn={primaryForcesOn}
                />
              ))}
            </React.Fragment>
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default CoordinatePlane;
