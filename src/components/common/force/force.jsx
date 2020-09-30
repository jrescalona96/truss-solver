import React from "react";

const Force = ({ xRel, yRel, direction, magnitude }) => {
  const lineWidth = 3;
  const lineLength = 30;

  const calcAxis = () => {
    return direction === "x"
      ? { height: lineWidth, width: lineLength }
      : { height: lineLength, width: lineWidth };
  };

  const calcDirection = () => {
    return magnitude < 0 && `rotate(180 ${xRel} ${yRel})`;
  };

  return (
    <rect
      className="force"
      x={xRel - lineWidth / 2}
      y={yRel - lineWidth / 2}
      {...calcAxis()}
      fill={direction === "x" ? "red" : "green"}
      transform={calcDirection()}
    ></rect>
  );
};

export default Force;
