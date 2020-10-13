import React from "react";
import "./support.scss";
const Support = ({ contactCoords, type, offset }) => {
  const { xRel, yRel } = contactCoords;
  const height = offset;
  const width = 20;
  const strokeWidth = 1.5;
  const stroke = "#000000";
  const fill = "#00000000";

  const base = (
    <>
      <line
        x1={`${xRel - width}`}
        y1={`${yRel + height * 2}`}
        x2={`${xRel + width}`}
        y2={`${yRel + height * 2}`}
        stroke="black"
        strokeWidth={`${strokeWidth * 1.5}`}
      />
      <line
        x1={`${xRel - width + 1}`}
        y1={`${yRel + height * 2.2}`}
        x2={`${xRel + width}`}
        y2={`${yRel + height * 2.2}`}
        stroke="black"
        strokeWidth={`${strokeWidth * 3}`}
        strokeDasharray={[2, 2]}
      />
    </>
  );

  const pin = (
    <>
      <polygon
        points={`${xRel},${yRel + offset} 
                 ${xRel - width / 2}, ${yRel + height * 2}
                 ${xRel + width / 2},${yRel + height * 2}`}
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
        cy={yRel + height * 1.5}
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
