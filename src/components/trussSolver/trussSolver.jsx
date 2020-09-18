import React, { useState } from "react";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import CoordinatePlane from "../common/coordinatePlane/index";
import NodeForm from "../nodeForm/index";
import BarForm from "../barForm/index";
import "./trussSolver.scss";
import { select } from "d3";

const TrussSolver = () => {
  const [displayNodes, setDisplayNodes] = useState([]);
  const [displayBars, setDisplayBars] = useState([]);
  const [selectedNode, setSelectedNode] = useState({});

  const handleAppendNode = (data) => {
    const nodes = nodeController.appendNode(data);
    setDisplayNodes(nodes);
  };

  const handleConfirmNode = (data) => {
    const nodes = nodeController.updateNodes(data);
    setDisplayNodes(nodes);
    setSelectedNode({});
  };

  const handleAppendBar = (data) => {
    const bars = barController.appendBar(data);
    setDisplayBars(bars);
  };

  const handleConfirmBar = (data) => {
    const bars = barController.updateBars(data);
    setDisplayBars(bars);
  };

  const handleAddForce = (data) => {
    handleConfirmNode(data);
  };

  const handleSetSelectedNode = (_id) => {
    const prevNode = { ...selectedNode };
    const newNode = _getSelectedNode(_id);
    setSelectedNode(newNode);
    if (!prevNode._id) {
      _detachNode(newNode);
    } else if (prevNode._id !== newNode._id) {
      handleConfirmNode(newNode);
      _detachNode(newNode);
    } else return;
  };

  /**
   * This function returns the currently selected node
   * @param {string} id node id
   * @returns {Node} new node if newNode exists in controller. selectedNode if not.
   */
  const _getSelectedNode = (id) => {
    const prevNode = { ...selectedNode };
    let newNode = nodeController.getNode(id);
    if (!newNode) newNode = prevNode;
    return newNode;
  };

  /** "Detaches" a node from the Coordniate plane making it editable*/
  const _detachNode = (node) => {
    const data = nodeController.removeNode(node._id);
    setDisplayNodes(data);
    handleAppendNode(node);
  };

  return (
    <div id="trussSolver" className="container mx-auto">
      <div className="row">
        <div className="m-1">
          <NodeForm
            controller={nodeController}
            onConfirmNode={(data) => handleConfirmNode(data)}
            onAppendNode={(data) => handleAppendNode(data)}
            onAddForce={(data) => handleAddForce(data)}
            data={selectedNode}
          />
        </div>
        <div className="m-1">
          <BarForm
            controller={barController}
            onConfirmBar={(data) => handleConfirmBar(data)}
            onAppendBar={(data) => handleAppendBar(data)}
          />
        </div>
        <CoordinatePlane
          data={{ nodes: displayNodes, bars: displayBars }}
          onSetSelectedNode={(id) => handleSetSelectedNode(id)}
        />
      </div>
    </div>
  );
};

export default TrussSolver;
