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

  const handleAppendNode = (data) => {
    const nodes = nodeController.appendNode(data);
    setDisplayNodes(nodes);
  };

  const handleConfirmNode = (data) => {
    const nodes = nodeController.updateNodes(data);
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

  return (
    <div id="trussSolver" className="container mx-auto">
      <div className="row">
        <div className="m-1">
          <NodeForm
            controller={nodeController}
            onConfirmNode={(data) => handleConfirmNode(data)}
            onAppendNode={(data) => handleAppendNode(data)}
          />
        </div>
        <div className="m-1">
          <BarForm
            controller={barController}
            onConfirmBar={(data) => handleConfirmBar(data)}
            onAppendBar={(data) => handleAppendBar(data)}
          />
        </div>
        <CoordinatePlane data={{ nodes: displayNodes, bars: displayBars }} />
      </div>
    </div>
  );
};

export default TrussSolver;
