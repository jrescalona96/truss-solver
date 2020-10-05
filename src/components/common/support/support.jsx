import React from "react";
import "./support.scss";
const Support = ({ contactCoords, type }) => {
  const { xRel, yRel } = contactCoords;
  const pin = () => (
    <g>
      <polygon
        points={`${xRel},${yRel + 6} ${xRel - 10},${yRel + 20} ${xRel + 10},${
          yRel + 20
        }`}
        fill="#00000000"
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1={`${xRel - 20}`}
        y1={`${yRel + 20}`}
        x2={`${xRel + 20}`}
        y2={`${yRel + 20}`}
        stroke="black"
        strokeWidth="2"
      />
    </g>
  );

  return (
    <g>
      {type.xSupport > 0 && type.ySupport > 0 && (
        <g>
          <polygon
            points={`${xRel},${yRel + 6} ${xRel - 10},${yRel + 20} ${
              xRel + 10
            },${yRel + 20}`}
            fill="#00000000"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={`${xRel - 20}`}
            y1={`${yRel + 20}`}
            x2={`${xRel + 20}`}
            y2={`${yRel + 20}`}
            stroke="black"
            strokeWidth="2"
          />
        </g>
      )}
    </g>
  );
};
export default Support;
