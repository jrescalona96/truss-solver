import React, { useState } from "react";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import CoordinatePlane from "../common/coordinatePlane/index";
import NodeForm from "../nodeForm/index";
import BarForm from "../barForm/index";
import Node from "../../models/Node";
import "./trussSolver.scss";

const TrussSolver = () => {
  const [displayNodes, setDisplayNodes] = useState([]);
  const [displayBars, setDisplayBars] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleAppendNode = (data) => {
    const nodes = nodeController.appendNode(data);
    setDisplayNodes(nodes);
  };

  const handleConfirmNode = (data) => {
    const nodes = nodeController.updateNodes(data);
    setDisplayNodes(nodes);
    setSelectedNode({});
  };

  const handleAppendBar = (data) => {
    const bars = barController.appendBar(data);
    setDisplayBars(bars);
  };

  const handleConfirmBar = (data) => {
    const bars = barController.updateBars(data);
    setDisplayBars(bars);
  };

  const handleAddForce = (data) => {
    nodeController.addForce(data);
  };

  const handleSetSelectedNode = (_id) => {
    const node = displayNodes.find((item) => item._id === _id);
    setSelectedNode(node);
  };

  return (
    <div id="trussSolver" className="container mx-auto">
      <div className="row">
        <div className="m-1">
          <NodeForm
            controller={nodeController}
            onConfirmNode={(data) => handleConfirmNode(data)}
            onAppendNode={(data) => handleAppendNode(data)}
            onAddForce={(data) => handleAddForce(data)}
            selectedNode={selectedNode}
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
