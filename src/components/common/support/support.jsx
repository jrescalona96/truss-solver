import React from "react";
import "./support.scss";
const Support = ({ contactCoords, type, offset }) => {
  const { xRel, yRel } = contactCoords;
  const height = 20;
  const width = 20;
  const strokeWidth = 2;
  const stroke = "#000000";
  const fill = "#00000000";

  const base = (
    <line
      x1={`${xRel - width}`}
      y1={`${yRel + width}`}
      x2={`${xRel + width}`}
      y2={`${yRel + width}`}
      stroke="black"
      strokeWidth={`${strokeWidth}`}
    />
  );

  const pin = (
    <>
      <polygon
        points={`${xRel},${yRel + offset} 
                 ${xRel - width / 2}, ${yRel + height}
                 ${xRel + width / 2},${yRel + height}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={`${strokeWidth}`}
      />
      {base}
    </>
  );

  const roller = (
    <>
      <circle
        cx={xRel}
        cy={yRel + height / 2 + 3}
        r={width / 3}
        fill={fill}
        stroke={stroke}
        strokeWidth={`${strokeWidth}`}
      />
      {base}
    </>
  );

  const _getSupport = () => {
    if (type.xSupport > 0 && type.ySupport > 0 && pin) return pin;
    else if (type.xSupport === 0 && type.ySupport > 0) return roller;
    else return null;
  };

  return <g>{_getSupport()}</g>;
};
export default Support;
