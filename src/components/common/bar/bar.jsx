import React from "react";
import * as controller from "../../../controller/controller";
import "./bar.scss";

const Bar = ({ data }) => {
  const { nodeI, nodeJ } = data;
  const coord1 = controller.calcRelativeCoord({ x: nodeI.x, y: nodeI.y });
  const coord2 = controller.calcRelativeCoord({ x: nodeJ.x, y: nodeJ.y });
  return (
    <line
      x1={coord1.relX}
      y1={coord1.relY}
      x2={coord2.relX}
      y2={coord2.relY}
      stroke="black"
      strokeWidth={4}
    ></line>
  );
};

export default Bar;
