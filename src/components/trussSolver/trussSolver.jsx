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

  const handleAppendNode = (data) => {
    const nodes = nodeController.updateNode(data);
    setDisplayNodes(nodes);
  };

  const handleConfirmNode = (data) => {
    const nodes = nodeController.addNode(data);
    setSelectedNode({ id: "" });
    setDisplayNodes(nodes);
  };

  const handleAppendBar = (data) => {
    const bars = barController.appendBar(data);
    setDisplayBars(bars);
  };

  const handleConfirmBar = (data) => {
    const bars = barController.updateBars(data);
    setDisplayBars(bars);
  };

  const handleSetSelectedNode = (_id) => {
    const node = nodeController.getNode(_id);
    setSelectedNode(node);
    handleAppendNode(node);
  };

  return (
    <div id="trussSolver" className="container mx-auto">
      <div className="row">
        <div className="m-1">
          <NodeForm
            controller={nodeController}
            onConfirmNode={(data) => handleConfirmNode(data)}
            onAppendNode={(data) => handleAppendNode(data)}
            data={selectedNode}
          />
        </div>
        <div className="m-1">
          <BarForm
            controller={barController}
            onConfirmBar={(data) => handleConfirmBar(data)}
            onAppendBar={(data) => handleAppendBar(data)}
          />
        </div>
        <CoordinatePlane
          data={{ nodes: displayNodes, bars: displayBars }}
          onSetSelectedNode={(id) => handleSetSelectedNode(id)}
        />
      </div>
    </div>
  );
};

export default TrussSolver;
