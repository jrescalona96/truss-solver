import React, { useState } from "react";
import * as nodeController from "../../controllers/nodeController";
import * as barController from "../../controllers/barController";
import { calculatePlaneSize } from "../../controllers/coordinatePlaneController";
import http from "../../services/httpServices";
import * as data from "../../services/dataServices";
import CoordinatePlane from "../common/coordinatePlane/index";
import ActionButton from "../common/actionButton/index";
import NodeForm from "../nodeForm/index";
import BarForm from "../barForm/index";
import "./trussSolver.scss";

const TrussSolver = (props) => {
  const [displayNodes, setDisplayNodes] = useState(
    nodeController.getAllNodes()
  );
  const [displayBars, setDisplayBars] = useState(barController.getAllBars());
  const [selectedNode, setSelectedNode] = useState({ id: "" });
  const [selectedBar, setSelectedBar] = useState({ id: "" });

  const handleAddNode = (data) => {
    const nodes = nodeController.addNode(data);
    setDisplayNodes(nodes);
    setSelectedNode({ id: "" });
  };

  const handleUpdateNode = (data) => {
    const { nodes, newNode } = nodeController.updateNode(data);
    setDisplayNodes(nodes);
    const bars = barController.updateBarNode(newNode);
    setDisplayBars(bars);
  };

  const handleSetSelectedNode = (id) => {
    const node = nodeController.getNodeById(id);
    setSelectedNode(node);
  };

  const handleDeleteNode = (id) => {
    const nodes = nodeController.deleteNode(id);
    setDisplayNodes(nodes);
    const bars = barController.deleteConnectedBars(id);
    setDisplayBars(bars);
    setSelectedNode({ id: "" });
  };

  const handleUpdateBar = (data) => {
    const bars = barController.updateBar(data);
    if (bars) setDisplayBars(bars);
  };

  const handleAddBar = (data) => {
    const bars = barController.addBar(data);
    if (bars) setDisplayBars(bars);
  };

  const handleSetSelectedBar = (id) => {
    const bar = barController.getBarById(id);
    setSelectedBar(bar);
    handleUpdateBar(bar);
  };

  const handleDeleteBar = (id) => {
    const bars = barController.deleteBar(id);
    setDisplayBars(bars);
  };

  const handleResetAll = () => {
    setDisplayBars([]);
    setDisplayNodes([]);
    setSelectedNode({ id: "" });
    data.resetAll();
  };

  const handleCalculate = () => {
    const body = {
      nodes: displayNodes,
      bars: displayBars,
    };
    http
      .post("api/calculate", body)
      .then((res) => {
        const results = data.mapResults(res.data);
        data.updateAll("results", results);
        props.history.push("/solver/results");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const memberStyles = {
    nodeNameColor: "#0000ff",
    nodeSize: [12, 12],
    nodeFill: "skyblue",
    barSize: [6, 6],
    barFill: ["#959595", "#0000ff2f"],
  };

  const { planeSize, viewBox } = calculatePlaneSize(displayNodes);
  return (
    <div
      id="trussSolver"
      className="d-flex justify-self-center justify-space-between m-2">
      <div className="forms container d-flex flex-column justify-content-between col-2">
        <div className="row">
          <NodeForm
            controller={nodeController}
            onAddNode={(data) => handleAddNode(data)}
            onUpdateNode={(data) => handleUpdateNode(data)}
            onDeleteNode={(data) => handleDeleteNode(data)}
            data={selectedNode}
          />
          <BarForm
            controller={barController}
            onAddBar={(data) => handleAddBar(data)}
            onUpdateBar={(data) => handleUpdateBar(data)}
            onDeleteBar={(data) => handleDeleteBar(data)}
            data={selectedBar}
          />
          <ActionButton
            label="Calculate"
            onClick={handleCalculate}
            color="success"
          />
        </div>
        <div className="row">
          <ActionButton label="Reset" onClick={handleResetAll} color="danger" />
        </div>
      </div>
      <div className="col-10">
        <CoordinatePlane
          viewBox={viewBox}
          planeSize={planeSize}
          primaryData={{ nodes: displayNodes, bars: displayBars }}
          secondaryData={null}
          selectedNode={selectedNode}
          selectedBar={selectedBar}
          onSetSelectedNode={(id) => handleSetSelectedNode(id)}
          onSetSelectedBar={(id) => handleSetSelectedBar(id)}
          primaryLabelsOn={true}
          primaryNamesOn={true}
          primaryForcesOn={true}
          {...memberStyles}
        />
      </div>
    </div>
  );
};

export default TrussSolver;
