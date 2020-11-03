import React from "react";
import "./support.scss";
const Support = ({ contactCoords, type, offset }) => {
  const { xRel, yRel } = contactCoords;
  const height = 15;
  const width = 20;
  const strokeWidth = 1.5;
  const stroke = "#000000";
  const fill = "#00000000";

  const base = (
    <>
      <line
        x1={`${xRel - width}`}
        y1={`${yRel + height + offset}`}
        x2={`${xRel + width}`}
        y2={`${yRel + height + offset}`}
        stroke="black"
        strokeWidth={`${strokeWidth * 1.5}`}
      />
    </>
  );

  const pin = (
    <>
      <polygon
        points={`${xRel}            ,${yRel + offset} 
                 ${xRel - width / 2}, ${yRel + height + offset}
                 ${xRel + width / 2},${yRel + height + offset}`}
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
        cy={yRel + height / 2 + offset}
        r={height / 2}
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

  return <>{_getSupport()}</>;
};

export default Support;
