import React from "react";
import CoordinatePlane from "../common/coordinatePlane/index";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import { calculatePlaneSize } from "../../controllers/coordinatePlaneController";
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
  const { planeSize, viewBox } = calculatePlaneSize(existingNodes);

  return (
    <div id="results" className="container row">
      <div className="col-2"></div>
      <div className="col-10">
        <CoordinatePlane
          viewBox={viewBox}
          planeSize={planeSize}
          primaryData={{ nodes: existingNodes, bars: existingBars }}
          secondaryData={{ nodes: nodeResults, bars: barResults }}
          selectedNode={{ id: "" }}
          onSetSelectedNode={() => {}}
          onSetSelectedBar={() => {}}
          primaryLabelsOn={true}
          primaryNamesOn={true}
          primaryForcesOn={false}
          secondaryForcesOn={true}
          secondaryLabelsOn={false}
          secondaryNamesOn={false}
          {...memberStyles}
        />
      </div>
    </div>
  );
};

export default Results;
