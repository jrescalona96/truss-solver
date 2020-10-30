import React, { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { config, Spring } from "react-spring/renderprops";
import Node from "../node/index";
import Bar from "../bar/index";
import "./coordinatePlane.scss";

const CoordinatePlane = ({
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
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, [height, width]);

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
      return (
        <Spring
          key={item._id}
          from={{
            transform: `translate3d(${-item.displacement.x}px,${
              item.displacement.y
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
        delay={750}
        config={config.slow}>
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
    <div id="coordinatePlane" ref={ref}>
      <TransformWrapper
        defaultScale={1}
        options={{ limitToBounds: false }}
        defaultPositionX={-(planeSize.width / 4 + width)}
        defaultPositionY={-(planeSize.height / 4 - height)}
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
