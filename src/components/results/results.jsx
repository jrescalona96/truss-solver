import React from "react";
import CoordinatePlane from "../common/coordinatePlane/index";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import { calculatePlaneSize } from "../../controllers/coordinatePlaneController";
import ActionButton from "../common/actionButton";
import * as data from "../../services/dataServices";
import { Table } from "reactstrap";
import "./results.scss";

const Results = (props) => {
  const existingNodes = nodeController.getAllNodes();
  const existingBars = barController.getAllBars();
  const { nodeResults, barResults } = props.history.location.state;
  const { planeSize, viewBox } = calculatePlaneSize(existingNodes);

  // exaggerate displacements
  const exagNodeResults = data.exaggerateDisplacement(nodeResults, 60);

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
        <h3>Displacement</h3>
        {/* <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>X</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            {existingNodes.map((item) => (
              <tr key={item._id}>
                <th scope="row">{item.name}</th>
                <td>{displacement[item._id].x.toFixed(2)}</td>
                <td>{displacement[item._id].y.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
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
          secondaryData={{ nodes: exagNodeResults, bars: barResults }}
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
