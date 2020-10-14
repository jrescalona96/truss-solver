import React from "react";

const Force = ({ xRel, yRel, direction, magnitude }) => {
  const lineWidth = 4;
  const lineLength = 20;

  const calcAxis = () => {
    return direction === "x"
      ? { height: lineWidth, width: lineLength }
      : { height: lineLength, width: lineWidth };
  };

  const calcDirection = () => {
    return magnitude < 0 && { transform: `rotate(180 ${xRel} ${yRel})` };
  };

  return (
    <rect
      className="force"
      x={xRel - lineWidth / 2}
      y={yRel - lineWidth / 2}
      {...calcAxis()}
      {...calcDirection()}
      fill={direction === "x" ? "red" : "green"}></rect>
  );
};

export default Force;
