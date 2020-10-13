import React from "react";
import {
  calcRelativeCoord,
  calcLabelPosition,
} from "../../../controllers/coordinatePlaneController";
import Support from "../support/index";
import Force from "../force/index";
import Point from "../point/index";
import "./node.scss";
import CoordinatesLabel from "../coordinatesLabel/index";

const Node = ({ data, onClick, isSelected, size, fill }) => {
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
  const radius = 12;
  const { xRel, yRel } = calcRelativeCoord(xCoord, yCoord);
  const labelPlacement = calcLabelPosition(data, radius, xRel, yRel);
  const getFill = () => {};
  return (
    <g className="clickable node" onClick={() => onClick(_id)}>
      {xForce && (
        <Force xRel={xRel} yRel={yRel} direction="x" magnitude={xForce} />
      )}
      {yForce && (
        <Force xRel={xRel} yRel={yRel} direction="y" magnitude={-yForce} />
      )}
      <CoordinatesLabel text={{ xCoord, yCoord }} placement={labelPlacement} />
      <Point
        placement={{ xRel, yRel }}
        label={name}
        radius={radius}
        fill={fill}
        opacity={isSelected ? 1 : 0.7}
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
