import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { config, Spring } from "react-spring/renderprops";
import { useChain, animated } from "react-spring";
import Node from "../node/index";
import Bar from "../bar/index";
import "./coordinatePlane.scss";
import { calcRelativeCoord } from "../../../controllers/coordinatePlaneController";

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
  const offset = 100;

  const renderPrimaryNodes = () =>
    primaryData.nodes.map((item) => (
      <Spring key={item._id} from={{ opacity: 0.1 }} to={{ opacity: 1 }}>
        {(props) => (
          <Node
            animation={props}
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
        )}
      </Spring>
    ));

  const renderPrimaryBars = () =>
    primaryData.bars.map((item, index) => {
      return (
        <Spring key={item._id} from={{ opacity: 0.1 }} to={{ opacity: 1 }}>
          {(props) => (
            <Bar
              animation={props}
              data={item}
              onClick={onSetSelectedBar}
              fill={barFill[0]}
              width={barSize[0]}
            />
          )}
        </Spring>
      );
    });

  const renderSecondaryNodes = () =>
    secondaryData &&
    secondaryData.nodes.map((item, index) => {
      const { xRel: xOrigin, yRel: yOrigin } = calcRelativeCoord(
        item.xInitialCoord,
        item.yInitialCoord
      );
      const { xRel: xFinal, yRel: yFinal } = calcRelativeCoord(
        item.xCoord,
        item.yCoord
      );
      return (
        <Spring
          key={item._id}
          from={{
            transform: `translate3d(${xOrigin - xFinal}px,${
              yOrigin - yFinal
            }px,0)`,
          }}
          to={{
            transform: `translate3d(0px,0px,0)`,
          }}
          config={config.wobbly}
          delay={500}>
          {(props) => (
            <Node
              animation={props}
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
          )}
        </Spring>
      );
    });

  const renderSecondaryBars = () =>
    secondaryData &&
    secondaryData.bars.map((item, index) => (
      <Spring
        key={item._id}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        delay={500}>
        {(props) => (
          <Bar
            animation={props}
            key={item._id}
            data={item}
            onClick={() => {}}
            fill={barFill[1]}
            width={barSize[1]}
          />
        )}
      </Spring>
    ));

  return (
    <div className="coordinatePlane">
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={minX - planeSize.width / 2 + offset}
        defaultPositionY={minY - offset * 2}
        options={{ limitToBounds: false }}
        doubleClick={{ mode: "zoomOut" }}>
        <TransformComponent>
          <svg width={planeSize.width} height={planeSize.height}>
            <React.Fragment>{renderPrimaryBars()}</React.Fragment>
            <React.Fragment>{renderPrimaryNodes()}</React.Fragment>
            <React.Fragment>{renderSecondaryBars()}</React.Fragment>
            <React.Fragment> {renderSecondaryNodes()}</React.Fragment>
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default CoordinatePlane;
