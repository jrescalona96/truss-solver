import React from "react";
import { Spring } from "react-spring/renderprops";

const Force = ({ xRel, yRel, direction, magnitude, style }) => {
  const lineWidth = 5;
  const lineLength = 50;

  const calcAxis = () => {
    return direction === "x"
      ? { height: lineWidth, width: lineLength }
      : { height: lineLength, width: lineWidth };
  };

  const calcDirection = () => {
    return (
      magnitude < 0 &&
      direction === "x" && { transform: `rotate(180 ${xRel} ${yRel})` }
    );
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
