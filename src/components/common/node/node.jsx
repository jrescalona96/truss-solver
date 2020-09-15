import React from "react";
import { calcRelativeCoord } from "../../../controllers/coordinatePlaneController";
import "./node.scss";

const Node = ({ data, onClick }) => {
  const { _id, name, xCoord, yCoord } = data;
  const { relX, relY } = calcRelativeCoord(xCoord, yCoord);

  return (
    <g className="clickable" onClick={() => onClick(_id)}>
      <text x={relX - 5} y={relY - 10} stroke="black" fill="black" dy=".3em">
        {name} ({xCoord},{yCoord})
      </text>
      <circle cx={relX} cy={relY} r={4}></circle>
    </g>
  );
};

export default Node;
