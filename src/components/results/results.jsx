import React from "react";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import * as data from "../../services/dataServices";
import * as planeController from "../../controllers/coordinatePlaneController";
import CoordinatePlane from "../common/coordinatePlane/index";
import ActionButton from "../common/actionButton";
import DisplacementTable from "../displacementTable";
import ForcesTable from "../forcesTable/forcesTable";
import "./results.scss";
import StressTable from "../stressTable/index";
import InternalForcesTable from "../internalForcesTable/internalForcesTable";

const Results = (props) => {
  const existingNodes = nodeController.getAllNodes();
  const existingBars = barController.getAllBars();
  const { resultantNodes, resultantBars } = props.history.location.state;
  const { planeSize, viewBox } = planeController.calculatePlaneSize(
    existingNodes
  );

  // exaggerate displacements
  const exagNodeResults = data.exaggerate(resultantNodes, 40);

  // update bar results
  const exagBarResults = data.createBarResults(resultantBars, exagNodeResults);

  const memberStyles = {
    nodeSize: [6, 6],
    nodeFill: "lightblue",
    barSize: [4, 4],
    barFill: ["orange", "#0000ffbf"],
  };

  return (
    <div
      id="results"
      className="d-flex justify-self-center justify-space-between m-2">
      <div className="col-2">
        <DisplacementTable data={resultantNodes} />
        <ForcesTable data={resultantNodes} />
        <StressTable data={resultantBars} />
        <InternalForcesTable data={resultantBars} />
        <ActionButton
          onClick={() => props.history.push("/solver")}
          label="Edit Members"
          color="info"
        />
      </div>

      <div className="col-10">
        <CoordinatePlane
          viewBox={viewBox}
          planeSize={planeSize}
          primaryData={{ nodes: existingNodes, bars: existingBars }}
          secondaryData={{ nodes: exagNodeResults, bars: exagBarResults }}
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
