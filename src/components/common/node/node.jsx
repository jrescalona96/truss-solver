import React from "react";
import {
  calcRelativeCoord,
  calcLabelPosition,
} from "../../../controllers/coordinatePlaneController";
import CoordinatesLabel from "../coordinatesLabel/index";
import Support from "../support/index";
import Force from "../force/index";
import Point from "../point/index";
import { Spring } from "react-spring/renderprops";
import "./node.scss";

const Node = ({
  data,
  onClick,
  isSelected,
  size,
  fill,
  labelOn,
  forcesOn,
  nameOn,
  nodeNameColor,
  animation,
}) => {
  const { _id, name, coordinates, force, support } = data;
  const radius = size;
  const { xRel, yRel } = calcRelativeCoord(coordinates.x, coordinates.y);
  const labelPlacement = calcLabelPosition(data, radius, xRel, yRel);
  return (
    <g
      style={animation}
      className="clickable node"
      onClick={() => onClick(_id)}>
      {labelOn && (
        <CoordinatesLabel
          text={{ xCoord: coordinates.x, yCoord: coordinates.y }}
          placement={labelPlacement}
        />
      )}
      {force.x && forcesOn && (
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} delay={500}>
          {(props) => (
            <Force
              style={props}
              xRel={xRel}
              yRel={yRel}
              direction="x"
              magnitude={force.x}
            />
          )}
        </Spring>
      )}
      {force.y && forcesOn && (
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} delay={500}>
          {(props) => (
            <Force
              style={props}
              xRel={xRel}
              yRel={yRel}
              direction="y"
              magnitude={force.y}
            />
          )}
        </Spring>
      )}
      <Point
        placement={{ xRel, yRel }}
        label={name}
        labelColor={nodeNameColor ? nodeNameColor : "#000"}
        radius={radius}
        fill={fill}
        isSelected={isSelected}
        nameOn={nameOn}
      />
      <Support
        contactCoords={{ xRel, yRel }}
        type={{ xSupport: support.x, ySupport: support.y }}
        offset={radius}
      />
    </g>
  );
};

export default Node;
