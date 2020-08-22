import React from "react";
import * as controller from "../../../controller/controller";
import "./node.scss";

function Node({ data }) {
  const { name, x, y } = data;
  const { relX, relY } = controller.calcRelativeCoord(data);
  return (
    <g>
      <text x={relX - 5} y={relY - 10} stroke="black" fill="black" dy=".3em">
        {name} ({x},{y})
      </text>
      <circle cx={relX} cy={relY} r={4}></circle>
    </g>
  );
}

export default Node;
