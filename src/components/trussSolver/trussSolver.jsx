import React, { useState } from "react";
import * as controller from "../../controller/controller";
import CoordinatePlane from "../common/coordinatePlane/index";
import NodeForm from "../nodeForm/index";
import BarForm from "../barForm/index";
import "./trussSolver.scss";

const TrussSolver = () => {
  const [displayNodes, setDisplayNodes] = useState([]);
  const [displayBars, setDisplayBars] = useState([]);

  const handleAppendNode = (data) => {
    const nodes = controller.appendNode(data);
    setDisplayNodes(nodes);
  };

  const handleConfirmNode = (data) => {
    const nodes = controller.updateNodes(data);
    setDisplayNodes(nodes);
  };

  const handleAppendBar = (data) => {
    const bars = controller.appendBar(data);
    setDisplayBars(bars);
  };

  const handleConfirmBar = (data) => {
    const bars = controller.updateBars(data);
    setDisplayBars(bars);
  };

  return (
    <div id="trussSolver">
      <div>
        <NodeForm
          controller={controller}
          onConfirmNode={(data) => handleConfirmNode(data)}
          onAppendNode={(data) => handleAppendNode(data)}
        />
        <BarForm
          controller={controller}
          data={displayBars}
          onConfirmBar={(data) => handleConfirmBar(data)}
          onAppendBar={(data) => handleAppendBar(data)}
        />
      </div>
      <CoordinatePlane data={{ nodes: displayNodes, bars: displayBars }} />
    </div>
  );
};

export default TrussSolver;
