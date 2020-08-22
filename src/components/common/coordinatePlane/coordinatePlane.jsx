import React from "react";
import Node from "../node/index";
import Bar from "../bar/index";
import "./coordinatePlane.scss";

function CoordinatePlane({ data }) {
  const { nodes, bars } = data;
  return (
    <div id="coordinatePlane">
      <svg>
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
