import React from "react";
import "./coordinatesLabel.scss";

const CoordinatesLabel = ({ placement, text }) => {
  const { x, y } = placement;
  const { xCoord, yCoord } = text;
  return (
    <text className="coordinatesLabel" x={x} y={y}>
      {`[${xCoord},${yCoord}]`}
    </text>
  );
};
export default CoordinatesLabel;
