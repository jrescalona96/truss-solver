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

const Node = ({
  data,
  onClick,
  isSelected,
  size,
  fill,
  labelOn,
  forcesOn,
  nameOn,
}) => {
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
  const radius = size;
  const { xRel, yRel } = calcRelativeCoord(xCoord, yCoord);
  const labelPlacement = calcLabelPosition(data, radius, xRel, yRel);
  return (
    <g className="clickable node" onClick={() => onClick(_id)}>
      {labelOn && (
        <CoordinatesLabel
          text={{ xCoord, yCoord }}
          placement={labelPlacement}
        />
      )}
      {xForce && forcesOn && (
        <Force xRel={xRel} yRel={yRel} direction="x" magnitude={xForce} />
      )}
      {yForce && forcesOn && (
        <Force xRel={xRel} yRel={yRel} direction="y" magnitude={-yForce} />
      )}
      <Point
        placement={{ xRel, yRel }}
        label={name}
        radius={radius}
        fill={fill}
        isSelected={isSelected}
        nameOn={nameOn}
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
