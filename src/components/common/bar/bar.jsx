import React from "react";
import { calcRelativeCoord } from "../../../controllers/coordinatePlaneController";
import "./bar.scss";

const Bar = ({ data }) => {
  const { nodeI, nodeJ } = data;
  const coord1 = calcRelativeCoord(nodeI.xCoord, nodeI.yCoord);
  const coord2 = calcRelativeCoord(nodeJ.xCoord, nodeJ.yCoord);

  return (
    <line
      x1={coord1.xRel}
      y1={coord1.yRel}
      x2={coord2.xRel}
      y2={coord2.yRel}
      stroke="black"
      strokeWidth={4}
    ></line>
  );
};

export default Bar;
