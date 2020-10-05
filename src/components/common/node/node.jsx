import React from "react";
import { calcRelativeCoord } from "../../../controllers/coordinatePlaneController";
import Force from "../force/index";
import Point from "../point/index";
import "./node.scss";

const Node = ({ data, onClick, isSelected }) => {
  const { _id, name, xCoord, yCoord, xForce, yForce } = data;
  const { xRel, yRel } = calcRelativeCoord(xCoord, yCoord);
  const label = `${name}(${xCoord}, ${yCoord})`;
  return (
    <g className="clickable node" onClick={() => onClick(_id)}>
      {xForce && (
        <Force xRel={xRel} yRel={yRel} direction="x" magnitude={xForce} />
      )}
      {yForce && (
        <Force xRel={xRel} yRel={yRel} direction="y" magnitude={yForce} />
      )}
      <Point
        placement={{ xRel, yRel }}
        label={label}
        radius={isSelected ? 8 : 5}
        fill={isSelected ? "orange" : "green"}
      />
    </g>
  );
};

export default Node;
