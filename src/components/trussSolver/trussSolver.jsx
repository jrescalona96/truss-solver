import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const nodes = nodeController.getNodes();
    setDisplayNodes(nodes);
  }, [displayNodes]);

  const handleAppendNode = (data) => {
    const newNode = nodeController.createNode(data);
    const nodes = nodeController.addTempNode(newNode);
    const bars = barController.updateBars(data);
    setDisplayNodes(nodes);
    setDisplayBars(bars);
  };

  const handleConfirmNode = (data) => {
    const newNode = nodeController.createNode(data);
    const nodes = nodeController.addNode(newNode);
    setSelectedNode({ id: "" });
    setDisplayNodes(nodes);
  };

  const handleAppendBar = (data) => {
    const bar = barController.createBar(data);
    if (bar) {
      const bars = barController.addTempBar(bar);
      setDisplayBars(bars);
    }
  };

  const handleConfirmBar = (data) => {
    const bar = barController.createBar(data);
    if (bar) {
      const bars = barController.addBar(bar);
      setDisplayBars(bars);
    }
  };

  const handleSetSelectedNode = (_id) => {
    const node = nodeController.getNodeById(_id);
    setSelectedNode(node);
    handleAppendNode(node);
  };

  return (
    <div id="trussSolver" className="d-flex justify-space-between mx-auto">
      <div className="col-2">
        <NodeForm
          controller={nodeController}
          onConfirmNode={(data) => handleConfirmNode(data)}
          onAppendNode={(data) => handleAppendNode(data)}
          data={selectedNode}
        />
        <BarForm
          controller={barController}
          onConfirmBar={(data) => handleConfirmBar(data)}
          onAppendBar={(data) => handleAppendBar(data)}
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
