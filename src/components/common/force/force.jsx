import React from "react";

const Force = ({ xRel, yRel, direction, magnitude }) => {
  const calcAxis = () => {
    return direction === "x"
      ? { height: 3, width: 25 }
      : { height: 25, width: 3 };
  };

  const calcDirection = () => {
    return magnitude < 0 && `rotate(180 ${xRel} ${yRel})`;
  };

  return (
    <rect
      x={xRel - 1.5}
      y={yRel - 1.5}
      {...calcAxis()}
      fill={direction === "x" ? " red" : "blue"}
      transform={calcDirection()}
    ></rect>
  );
};

export default Force;
