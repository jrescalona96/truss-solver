import React from "react";
import Table from "../common/table/index";
import "./displacementTable.scss";

const DisplacementTable = ({ data }) => {
  const columns = [
    { path: "name", label: "Name" },
    { path: "displacement.x", label: "X" },
    { path: "displacement.y", label: "Y" },
  ];
  const header = "Displacements";

  return <Table columns={columns} data={data} header={header} />;
};
export default DisplacementTable;
