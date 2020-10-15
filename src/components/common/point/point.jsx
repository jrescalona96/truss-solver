import React from "react";
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
  return (
    <g>
      <circle
        cx={placement.xRel}
        cy={placement.yRel}
        r={radius}
        stroke="black"
        strokeWidth="1"
        fill={isSelected ? inactiveColor : fill}
      />
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
