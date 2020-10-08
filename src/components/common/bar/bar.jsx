import React from "react";
import { calcRelativeCoord } from "../../../controllers/coordinatePlaneController";
import "./bar.scss";

const Bar = ({ data }) => {
  const { nodeI, nodeJ } = data;
  const coord1 = calcRelativeCoord(nodeI.xCoord, nodeI.yCoord);
  const coord2 = calcRelativeCoord(nodeJ.xCoord, nodeJ.yCoord);
  const colors = ["#9b9b9b","#5f5f5f","#333333"]
  const widths = [12,7,2]
  return (
    <g className="bar">
      <line
        x1={coord1.xRel}
        y1={coord1.yRel}
        x2={coord2.xRel}
        y2={coord2.yRel}
        stroke={colors[0]}
        strokeWidth={widths[0]}
      />
      <line
        x1={coord1.xRel}
        y1={coord1.yRel}
        x2={coord2.xRel}
        y2={coord2.yRel}
        stroke={colors[1]}
        strokeWidth={widths[1]}
      />
      <line
        x1={coord1.xRel}
        y1={coord1.yRel}
        x2={coord2.xRel}
        y2={coord2.yRel}
        stroke={colors[2]}
        strokeWidth={widths[2]}
      />
    </g>
  );
};

export default Bar;
