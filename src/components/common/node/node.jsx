import React from "react";
import { calcRelativeCoord } from "../../../controllers/coordinatePlaneController";
import "./node.scss";

const Node = ({ data, onClick }) => {
  const { _id, name, xCoord, yCoord, xForce, yForce } = data;
  const { xRel, yRel } = calcRelativeCoord(xCoord, yCoord);

  return (
    <g className="clickable" onClick={() => onClick(_id)}>
      <text x={xRel + 10} y={yRel - 10} stroke="black" fill="black" dy=".25em">
        {name} ({xCoord},{yCoord})
      </text>
      <circle cx={xRel} cy={yRel} r={5}></circle>
      <rect x={xRel} y={yRel} height={yForce * 0.25} width={2}></rect>
      <rect
        x={xRel}
        y={yRel}
        height={2}
        width={xForce * 0.25}
        fill={"#FF0000"}
      ></rect>
    </g>
  );
};

export default Node;
