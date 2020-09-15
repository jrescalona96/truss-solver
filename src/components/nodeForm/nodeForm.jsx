import React from "react";
import NodeCoordinatesForm from "../nodeCoordinatesForm/index";
import NodeForcesForm from "../nodeForcesForm/index";
import "./nodeForm.scss";

const NodeForm = ({
  controller,
  onConfirmNode,
  onAppendNode,
  onAddForce,
  selectedNode,
}) => {
  return (
    <div id="nodeForm">
      <h3>Nodes</h3>
      <NodeCoordinatesForm
        controller={controller}
        onConfirmNode={onConfirmNode}
        onAppendNode={onAppendNode}
        data={selectedNode}
      />
      <NodeForcesForm onAddForce={onAddForce} data={selectedNode} />
    </div>
  );
};

export default NodeForm;
