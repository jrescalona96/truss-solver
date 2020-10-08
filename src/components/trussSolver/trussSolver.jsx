import React, { useState } from "react";
import { Button } from "reactstrap";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import http from "../../services/httpServices";
import * as data from "../../services/dataServices"
import CoordinatePlane from "../common/coordinatePlane/index";
import NodeForm from "../nodeForm/index";
import BarForm from "../barForm/index";
import "./trussSolver.scss";

const TrussSolver = () => {
  const [displayNodes, setDisplayNodes] = useState(
    nodeController.getAllNodes()
  );
  const [displayBars, setDisplayBars] = useState(barController.getAllBars());
  const [selectedNode, setSelectedNode] = useState({ id: "" });

  const handleAddTempNode = (data) => {
    const { nodes, newNode } = nodeController.addTempNode(data);
    setDisplayNodes(nodes);
    const bars = barController.updateBarNode(newNode);
    setDisplayBars(bars);
  };

  const handleAddNode = (data) => {
    const nodes = nodeController.addNode(data);
    setDisplayNodes(nodes);
    setSelectedNode({ id: "" });
  };

  const handleAddTempBar = (data) => {
    const bars = barController.addTempBar(data);
    if (bars) setDisplayBars(bars);
  };

  const handleAddBar = (data) => {
    const bars = barController.addBar(data);
    if (bars) setDisplayBars(bars);
  };

  const handleSetSelectedNode = (_id) => {
    const node = nodeController.getNodeById(_id);
    setSelectedNode(node);
    handleAddTempNode(node);
  };

  const handleCalculate = async () => {
    const body = {
      nodes: displayNodes,
      bars: displayBars,
    };
    const res = await http.post("api/calculate", body);
    console.log(res);
  };

  const handleDeleteNode = (id) => {
    const nodes = nodeController.deleteNode(id);
    const bars = barController.deleteConnectedBars(id);
    setDisplayNodes(nodes);
    setDisplayBars(bars)
  }

  const handleResetAll = () => {
    setDisplayBars([]);
    setDisplayNodes([]);
    setSelectedNode({id:""});
    data.resetAll();
  }

  return (
    <div id="trussSolver" className="d-flex justify-space-between">
      <div className="d-flex flex-column justify-content-between col-2">
        <div className="row">
          <NodeForm
            controller={nodeController}
            onAddNode={(data) => handleAddNode(data)}
            onAddTempNode={(data) => handleAddTempNode(data)}
            onDeleteNode={(data) => handleDeleteNode(data)}
            data={selectedNode}
          />
          <BarForm
            controller={barController}
            onAddBar={(data) => handleAddBar(data)}
            onAddTempBar={(data) => handleAddTempBar(data)}
          />
          <Button
            id="calculateButton"
            onClick={handleCalculate}
            size="sm"
            color="success"
            className="mt-2 w-100"
          >
            Calculate
          </Button>
        </div>
        <div className="row">
          <Button
            id="resetButton"
            onClick={handleResetAll}
            size="sm"
            color="danger"
            className="mt-2 w-100"
          >
            Reset
          </Button>
        </div>
      </div>
      
      <div className="col-10">
        <CoordinatePlane
          data={{ nodes: displayNodes, bars: displayBars }}
          selected={selectedNode}
          onSetSelectedNode={(id) => handleSetSelectedNode(id)}
        />
      </div>
    </div>
  );
};

export default TrussSolver;
