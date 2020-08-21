import React from "react";
import "./node.scss";

function Node({ data }) {
  const { x, y } = data;
  return (
    <g>
      <text x={x - 25} y={590 - y} stroke="white" fill="white" dy=".3em">
        {x},{y}
      </text>
      <circle cx={x} cy={600 - y} r={2.5}></circle>
    </g>
  );
}

export default Node;
