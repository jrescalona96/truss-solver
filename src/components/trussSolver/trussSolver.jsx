import React, { useState } from "react";
import "./trussSolver.scss";
import CoordinatePlane from "../common/coordinatePlane/coordinatePlane";
import NodeForm from "../nodeForm/index";

const TrussSolver = () => {
  const [data, setData] = useState([]);

  const handleSetData = (val) => {
    const point = { ...val };
    const nodes = [...data];
    point._id = nodes.length;
    nodes.push(point);
    setData(nodes);
  };

  return (
    <div id="trussSolver">
      <NodeForm onSetData={(val) => handleSetData(val)} />
      <CoordinatePlane data={data} />
    </div>
  );
};

export default TrussSolver;
