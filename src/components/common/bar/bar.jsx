import React from "react";
import * as controller from "../../../controller/controller";
import "./bar.scss";

const Bar = ({ data }) => {
  const { node1, node2 } = data;
  const coord1 = controller.calcRelativeCoord({ x: node1.x, y: node1.y });
  const coord2 = controller.calcRelativeCoord({ x: node2.x, y: node2.y });
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
