import React from "react";
import { Transition } from "react-spring/renderprops";
import "./point.scss";

const Point = ({
  placement,
  label,
  radius,
  fill,
  isSelected,
  nameOn,
  labelColor,
}) => {
  const inactiveColor = "orange";
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
      {nameOn && (
        <text
          x={placement.xRel}
          y={placement.yRel}
          stroke={labelColor}
          fill={labelColor}
          dy="0.35em"
          dx="-0.3em"
          fontSize="1.2rem">
          {label}
        </text>
      )}
    </g>
  );
};
export default Point;
