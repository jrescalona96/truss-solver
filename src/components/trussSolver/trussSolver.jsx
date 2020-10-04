import React, { useState } from "react";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import CoordinatePlane from "../common/coordinatePlane/index";
import NodeForm from "../nodeForm/index";
import BarForm from "../barForm/index";
import "./trussSolver.scss";

const TrussSolver = () => {
  const [displayNodes, setDisplayNodes] = useState([]);
  const [displayBars, setDisplayBars] = useState([]);
  const [selectedNode, setSelectedNode] = useState({ id: "" });

  const handleAddTempNode = (data) => {
    const nodes = nodeController.addTempNode(data);
    setDisplayNodes(nodes);
    const bars = barController.updateBars(data);
    setDisplayBars(bars);
  };

  const handleConfirmNode = (data) => {
    const nodes = nodeController.addNode(data);
    setDisplayNodes(nodes);
    setSelectedNode({ id: "" });
  };

  const handleAddTempBar = (data) => {
    const bars = barController.addTempBar(data);
    if (bars) setDisplayBars(bars);
  };

  const handleAddBar = (data) => {
    const bars = barController.addBar(data);
    if (bars) setDisplayBars(bars);
  };

  const handleSetSelectedNode = (_id) => {
    const node = nodeController.getNodeById(_id);
    setSelectedNode(node);
    handleAddTempNode(node);
  };

  return (
    <div id="trussSolver" className="d-flex justify-space-between mx-auto">
      <div className="col-2">
        <NodeForm
          controller={nodeController}
          onConfirmNode={(data) => handleConfirmNode(data)}
          onAddTempNode={(data) => handleAddTempNode(data)}
          data={selectedNode}
        />
        <BarForm
          controller={barController}
          onAddBar={(data) => handleAddBar(data)}
          onAddTempBar={(data) => handleAddTempBar(data)}
        />
      </div>
      <div className="col-10">
        <CoordinatePlane
          data={{ nodes: displayNodes, bars: displayBars }}
          onSetSelectedNode={(id) => handleSetSelectedNode(id)}
        />
      </div>
    </div>
  );
};

export default TrussSolver;
