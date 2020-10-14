import React from "react";
import CoordinatePlane from "../common/coordinatePlane/index";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import "./results.scss";

const Results = () => {
  const existingNodes = nodeController.getAllNodes();
  const existingBars = barController.getAllBars();
  const { resultNodes } = nodeController.getResultants();

  return (
    <div id="results">
      <h4>Results</h4>
      <CoordinatePlane
        data={{ nodes: existingNodes, bars: existingBars }}
        secondaryData={{ nodes: resultNodes, bars: [] }}
        selectedNode={{ id: "" }}
        onSetSelectedNode={() => {}}
        onSetSelectedBar={() => {}}
        nodeFill="lightblue"
        nodeSize={12}
      />
    </div>
  );
};

export default Results;
