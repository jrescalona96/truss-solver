import React from "react";
import { calcRelativeCoord } from "../../../controllers/coordinatePlaneController";
import "./bar.scss";

const Bar = ({ data, onClick, fill, width, animation }) => {
  const { _id, nodeI, nodeJ } = data;
  const coord1 = calcRelativeCoord(nodeI.coordinates.x, nodeI.coordinates.y);
  const coord2 = calcRelativeCoord(nodeJ.coordinates.x, nodeJ.coordinates.y);
  return (
    <g className="bar clickable" onClick={() => onClick(_id)} style={animation}>
      <line
        strokeLinecap="round"
        rx="5"
        x1={coord1.xRel}
        y1={coord1.yRel}
        x2={coord2.xRel}
        y2={coord2.yRel}
        stroke={fill}
        strokeWidth={width}
      />
    </g>
  );
};

export default Bar;
