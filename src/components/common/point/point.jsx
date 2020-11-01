import React from "react";
import { Transition } from "react-spring/renderprops";
import "./point.scss";

const Point = ({ placement, radius, fill, isSelected }) => {
  const circle = (
    <circle
      cx={placement.xRel}
      cy={placement.yRel}
      r={radius}
      stroke="black"
      strokeWidth="1"
      fill={fill}
    />
  );
  return (
    <g>
      {isSelected ? (
        <Transition
          items={circle}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}>
          {(circle) => circle && ((props) => <g style={props}>{circle}</g>)}
        </Transition>
      ) : (
        circle
      )}
    </g>
  );
};
export default Point;
