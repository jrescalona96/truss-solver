import React, { useState } from "react";
import * as controller from "../../controller/controller";
import CoordinatePlane from "../common/coordinatePlane/index";
import NodeForm from "../nodeForm/index";
// import BarForm from "../barForm/index";
import "./trussSolver.scss";

const TrussSolver = () => {
  const [displayNodes, setDisplayNodes] = useState([]);

  const handleSetNode = (val) => {
    const nodes = controller.appendNode(val);
    setDisplayNodes(nodes);
  };

  const handleConfirmNode = (val) => {
    const node = { ...val };
    controller.updateNodes(node);
    setDisplayNodes(controller.getNodes());
  };

  return (
    <div id="trussSolver">
      <div>
        <NodeForm
          controller={controller}
          onConfirmNode={(val) => handleConfirmNode(val)}
          onSetNode={(val) => handleSetNode(val)}
          nodes={controller.getNodes()}
        />
      </div>
      <CoordinatePlane data={displayNodes} />
    </div>
  );
};

export default TrussSolver;
