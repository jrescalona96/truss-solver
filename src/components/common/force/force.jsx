import React from "react";

const Force = ({ xRel, yRel, direction, magnitude, style }) => {
  const lineWidth = 10;
  const lineLength = 20;

  const calcAxis = () => {
    return direction === "x"
      ? { height: lineWidth, width: lineLength }
      : { height: lineLength, width: lineWidth };
  };

  const calcDirection = () => {
    const rotate = { transform: `rotate(180 ${xRel} ${yRel})` };
    if (direction === "x") return magnitude < 0 && rotate;
    else if (direction === "y") return magnitude > 0 && rotate;
  };

  return (
    <rect
      style={style}
      className="force"
      rx="2.5"
      x={xRel - lineWidth / 2}
      y={yRel - lineWidth / 2}
      {...calcAxis()}
      {...calcDirection()}
      fill={direction === "x" ? "red" : "green"}
    />
  );
};

export default Force;
