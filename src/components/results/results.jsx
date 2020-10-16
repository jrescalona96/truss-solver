import React from "react";
import CoordinatePlane from "../common/coordinatePlane/index";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import { calculatePlaneSize } from "../../controllers/coordinatePlaneController";
import "./results.scss";
import ActionButton from "../common/actionButton";

const Results = (props) => {
  const existingNodes = nodeController.getAllNodes();
  const existingBars = barController.getAllBars();
  const { nodeResults, barResults } = nodeController.getResultants();

  const memberStyles = {
    nodeSize: [12, 12],
    nodeFill: "lightblue",
    barSize: [8, 6],
    barFill: ["#959595", "#0000ffbf"],
  };
  const { planeSize, viewBox } = calculatePlaneSize(existingNodes);

  return (
    <div
      id="results"
      className="d-flex justify-self-center justify-space-between m-2">
      <div className="col-2">
        <ActionButton
          onClick={() => {
            props.history.push("/solver");
          }}
          label="Edit Members"
          color="info"
        />
      </div>
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
          primaryNamesOn={false}
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
