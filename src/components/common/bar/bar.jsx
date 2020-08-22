import React from "react";
import * as controller from "../../../controller/controller";
import "./bar.scss";

const Bar = ({ data }) => {
  const { x1, y1, x2, y2 } = data;
  const start = controller.calcRelativeCoord({ x: x1, y: y1 });
  const end = controller.calcRelativeCoord({ x: x2, y: y2 });
  return (
    <line
      x1={start.relX}
      y1={start.relY}
      x2={end.relX}
      y2={end.relY}
      stroke="black"
      strokeWidth={4}
    ></line>
  );
};

export default Bar;
