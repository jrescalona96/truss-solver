import React from "react";
import "./node.scss";

function Node({ data }) {
  const { _id, x, y } = data;
  const origin = { x: 25, y: 25 };
  const planeSize = 600;
  return (
    <g>
      <text
        x={origin.x + x}
        y={planeSize - origin.y - y - 10}
        stroke="black"
        fill="black"
        dy=".3em"
      >
        {_id} ({x},{y})
      </text>
      <circle cx={origin.x + x} cy={planeSize - origin.y - y} r={3}></circle>
    </g>
  );
}

export default Node;
