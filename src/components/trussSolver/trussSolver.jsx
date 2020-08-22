import React, { useState } from "react";
import * as controller from "../../controller/controller";
import CoordinatePlane from "../common/coordinatePlane/index";
import NodeForm from "../nodeForm/index";
import BarForm from "../barForm/index";
import "./trussSolver.scss";

const TrussSolver = () => {
  const [displayNodes, setDisplayNodes] = useState([]);
  const [displayBars, setDisplayBars] = useState([]);

  const handleSetNode = (data) => {
    const nodes = controller.appendNode(data);
    setDisplayNodes(nodes);
  };

  const handleConfirmNode = (data) => {
    const nodes = controller.updateNodes(data);
    setDisplayNodes(nodes);
  };

  const handleSetBar = (data) => {};

  const handleConfirmBar = (data) => {
    let bars = [...displayBars];
    const bar = controller.getBarCoordinates(data);
    bars.push(bar);
    setDisplayBars(bars);
  };

  return (
    <div id="trussSolver">
      <div>
        <NodeForm
          controller={controller}
          onConfirmNode={(data) => handleConfirmNode(data)}
          onSetNode={(data) => handleSetNode(data)}
        />
        <BarForm
          controller={controller}
          data={displayBars}
          onConfirmBar={(data) => handleConfirmBar(data)}
          onSetBar={(data) => handleSetBar(data)}
        />
      </div>
      <CoordinatePlane data={{ nodes: displayNodes, bars: displayBars }} />
    </div>
  );
};

export default TrussSolver;
