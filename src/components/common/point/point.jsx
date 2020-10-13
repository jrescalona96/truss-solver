import React from "react";
import "./point.scss";

const Point = ({ placement, label, radius, fill }) => {
  return (
    <g>
      <circle
        cx={placement.xRel}
        cy={placement.yRel}
        r={radius}
        stroke="black"
        strokeWidth="2"
        fill={fill}
      />
      <text
        x={placement.xRel-radius/3}
        y={placement.yRel}
        stroke="black"
        fill="black"
        dy=".25em"
      >
        {label}
      </text>
    </g>
  );
};
export default Point;
