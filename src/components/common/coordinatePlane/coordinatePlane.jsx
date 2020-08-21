import React from "react";
import "./coordinatePlane.scss";
import Node from "../node/index";

function CoordinatePlane({ data }) {
  return (
    <div id="coordinatePlane">
      <svg>
        {data.map((item) => (
          <Node key={item._id} data={item} />
        ))}
      </svg>
    </div>
  );
}

export default CoordinatePlane;
