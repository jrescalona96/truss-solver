import React from "react";

const Force = ({ xRel, yRel, direction }) => {
  const calcDirection = () => {
    return direction === "x"
      ? { height: 3, width: 25 }
      : { height: 25, width: 3 };
  };

  return (
    <rect
      x={xRel - 1.5}
      y={yRel - 1.5}
      {...calcDirection()}
      fill={direction === "x" ? " red" : "blue"}
    ></rect>
  );
};

export default Force;
