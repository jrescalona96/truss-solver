import React from "react";
import { Transition } from "react-spring/renderprops";
import "./point.scss";

const Point = ({ placement, radius, fill, isSelected }) => {
  const center = { cx: placement.xRel, cy: placement.yRel };
  const strokeStyle = { stroke: "black", strokeWidth: "2.5" };
  return (
    <g>
      {isSelected ? (
        <Transition
          items={[<circle {...center} r={radius * 1.5} {...strokeStyle} />]}
          from={{ fill: `${fill}` }}
          enter={{ fill: "red" }}>
          {(c) => c && ((props) => <g style={props}>{c}</g>)}
        </Transition>
      ) : (
        <circle {...center} r={radius} {...strokeStyle} fill="white" />
      )}
    </g>
  );
};
export default Point;
