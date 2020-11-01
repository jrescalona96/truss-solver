import React from "react";
import "./coordinatesLabel.scss";

const CoordinatesLabel = ({ placement, text }) => {
  const { x, y } = placement;

  return (
    <text className="coordinatesLabel" x={x} y={y}>
      {text}
    </text>
  );
};
export default CoordinatesLabel;
