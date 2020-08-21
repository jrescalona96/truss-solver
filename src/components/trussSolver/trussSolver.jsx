import React, { useState } from "react";
import _ from "lodash";
import "./trussSolver.scss";
import CoordinatePlane from "../common/coordinatePlane/coordinatePlane";
import Form from "../common/form/index";

const size = 600;
const numberOfPoints = 50;

function TrussSolver() {
  const [data, setData] = useState([]);

  const generateData = () => {
    const nums = _.range(1, numberOfPoints);
    let _id = 0;
    return nums.map(() => {
      const x = Math.floor(Math.random() * Math.floor(size));
      const y = Math.floor(Math.random() * Math.floor(size));
      return { _id: _id++, x: x, y: y };
    });
  };

  return (
    <div id="trussSolver">
      <Form />
      <button onClick={() => setData(generateData())}>Generate</button>
      <CoordinatePlane data={data} />
    </div>
  );
}

export default TrussSolver;
