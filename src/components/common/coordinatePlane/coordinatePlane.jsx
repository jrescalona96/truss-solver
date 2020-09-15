import React from "react";
import Node from "../node/index";
import Bar from "../bar/index";
import {
  COORD_PLANE_SIZE_X,
  COORD_PLANE_SIZE_Y,
} from "../../../controllers/coordinatePlaneController";
import "./coordinatePlane.scss";
import { isCompositeComponent } from "react-dom/test-utils";

function CoordinatePlane({ data }) {
  const { nodes, bars } = data;
  return (
    <div id="coordinatePlane">
      <svg width={COORD_PLANE_SIZE_X} height={COORD_PLANE_SIZE_Y}>
        {nodes.map((item) => (
          <Node key={item._id} data={item} />
        ))}
        {bars.map((item) => (
          <Bar key={item._id} data={item} />
        ))}
      </svg>
    </div>
  );
}

export default CoordinatePlane;
