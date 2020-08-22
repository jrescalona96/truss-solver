import React, { useState, useRef } from "react";
import "./trussSolver.scss";
import CoordinatePlane from "../common/coordinatePlane/index";
import NodeForm from "../nodeForm/index";
// import BarForm from "../barForm/index";

const TrussSolver = () => {
  const [nodes, setNodes] = useState([]);
  let currentNodes = useRef([]);

  const handleSetCurrentNodes = (val) => {
    let nodes = [...currentNodes.current];
    nodes.push(val);
    setNodes(nodes);
  };

  const handleConfirmNode = (val) => {
    const node = { ...val };
    currentNodes.current.push(node);
    setNodes(currentNodes.current);
  };

  return (
    <div id="trussSolver">
      <div>
        <NodeForm
          onConfirmNode={(val) => handleConfirmNode(val)}
          onSetCurrentNodes={(val) => handleSetCurrentNodes(val)}
          nodes={currentNodes.current}
        />
      </div>
      <CoordinatePlane data={nodes} />
    </div>
  );
};

export default TrussSolver;
