import React from "react";
import "./point.scss";

const Point = ({ placement, label, radius, fill, opacity }) => {
  return (
    <g>
      <circle
        cx={placement.xRel}
        cy={placement.yRel}
        r={radius}
        stroke="black"
        strokeWidth="2"
        fill={fill}
        fillOpacity={opacity}
      />
      <text
        x={placement.xRel}
        y={placement.yRel}
        stroke="black"
        fill="black"
        dy="0.3em"
        dx="-0.35em"
        fontSize="1.2rem">
        {label}
      </text>
    </g>
  );
};
export default Point;
