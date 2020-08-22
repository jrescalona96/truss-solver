import React from "react";
import "./bar.scss";

const Bar = ({ data }) => {
  const { x1, y1, x2, y2 } = data;
  const origin = { x: 25, y: 25 };
  const planeSize = 600;
  return (
    <line
      x1={origin.x + x1}
      y1={planeSize - origin.y - y1}
      x2={origin.x + x2}
      y2={planeSize - origin.y - y2}
      stroke="black"
      strokeWidth={4}
    ></line>
  );
};

export default Bar;
