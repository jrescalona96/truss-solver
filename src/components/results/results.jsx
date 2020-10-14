import React from "react";
import CoordinatePlane from "../common/coordinatePlane/index";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import { Label } from "reactstrap";
import "./results.scss";

const Results = () => {
  const existingNodes = nodeController.getAllNodes();
  const existingBars = barController.getAllBars();
  const { nodeResults, barResults } = nodeController.getResultants();
  const memberStyles = {
    nodeSize: 12,
    nodeFill: "lightblue",
    barSize: [6, 6],
    barFill: ["#959595", "#0000ff2f"],
  };
  return (
    <div id="results" className="container">
      <Label className="d-block">Results</Label>
      <CoordinatePlane
        primaryData={{ nodes: existingNodes, bars: existingBars }}
        secondaryData={{ nodes: nodeResults, bars: barResults }}
        selectedNode={{ id: "" }}
        onSetSelectedNode={() => {}}
        onSetSelectedBar={() => {}}
        {...memberStyles}
      />
    </div>
  );
};

export default Results;
