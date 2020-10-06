import React from "react";
import { calcRelativeCoord } from "../../../controllers/coordinatePlaneController";
import Support from "../support/index";
import Force from "../force/index";
import Point from "../point/index";
import "./node.scss";

const Node = ({ data, onClick, isSelected }) => {
  const {
    _id,
    name,
    xCoord,
    yCoord,
    xForce,
    yForce,
    xSupport,
    ySupport,
  } = data;
  const radius = 6;
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
        radius={radius}
        fill={isSelected ? "orange" : "green"}
      />
      <Support
        contactCoords={{ xRel, yRel }}
        type={{ xSupport, ySupport }}
        offset={radius}
      />
    </g>
  );
};

export default Node;
