import React from "react";
import "./point.scss";

const Point = ({ placement, label, radius, fill }) => {
  return (
    <g>
      <text
        x={placement.xRel + 10}
        y={placement.yRel - 10}
        stroke="black"
        fill="black"
        dy=".25em"
      >
        {label}
      </text>
      <circle
        cx={placement.xRel}
        cy={placement.yRel}
        r={radius}
        stroke="black"
        fill={fill}
      ></circle>
    </g>
  );
};
export default Point;
