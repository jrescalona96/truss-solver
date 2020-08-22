import React, { useState, useRef } from "react";
import "./trussSolver.scss";
import CoordinatePlane from "../common/coordinatePlane/index";
import NodeForm from "../nodeForm/index";
import BarForm from "../barForm/index";

const TrussSolver = () => {
  const [addedNodes, setAddedNodes] = useState([]);
  let nodes = useRef([]);

  const handleSetNodes = (val) => {
    let currentNodes = [...nodes.current];
    currentNodes.push(val);
    setAddedNodes(currentNodes);
  };

  const handleAddNode = (val) => {
    const node = { ...val };
    nodes.current.push(node);
    setAddedNodes(nodes.current);
  };

  const handleSetBars = (val) => {
    console.log(val);
  };

  return (
    <div id="trussSolver">
      <div>
        <NodeForm
          onAddNode={(val) => handleAddNode(val)}
          onSetNodes={(val) => handleSetNodes(val)}
          nodes={addedNodes}
        />
        <BarForm onSetBars={(val) => handleSetBars(val)} />
      </div>
      <CoordinatePlane data={addedNodes} />
    </div>
  );
};

export default TrussSolver;
