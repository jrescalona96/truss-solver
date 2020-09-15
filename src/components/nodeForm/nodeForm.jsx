import React from "react";
import NodeCoordinatesForm from "../nodeCoordinatesForm/index";
import NodeForcesForm from "../nodeForcesForm/index";
import "./nodeForm.scss";

const NodeForm = ({ controller }) => {
  return (
    <div id="nodeForm">
      <h3>Nodes</h3>
      <NodeCoordinatesForm controller={controller} />
      <NodeForcesForm />
    </div>
  );
};

export default NodeForm;
