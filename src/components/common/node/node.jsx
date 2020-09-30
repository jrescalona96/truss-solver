import React from "react";
import { calcRelativeCoord } from "../../../controllers/coordinatePlaneController";
import Force from "../force/index";
import "./node.scss";

const Node = ({ data, onClick }) => {
  const { _id, name, xCoord, yCoord, xForce, yForce } = data;
  const { xRel, yRel } = calcRelativeCoord(xCoord, yCoord);

  return (
    <g className="clickable" onClick={() => onClick(_id)}>
      {xForce && (
        <Force xRel={xRel} yRel={yRel} direction="x" magnitude={xForce} />
      )}
      {yForce && (
        <Force xRel={xRel} yRel={yRel} direction="y" magnitude={yForce} />
      )}
      <text x={xRel + 10} y={yRel - 10} stroke="black" fill="black" dy=".25em">
        {name} ({xCoord},{yCoord})
      </text>
      <circle cx={xRel} cy={yRel} r={5} stroke="black" fill="green"></circle>
    </g>
  );
};

export default Node;
