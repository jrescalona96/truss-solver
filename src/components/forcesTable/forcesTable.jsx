import React from "react";
import Table from "../common/table/index";
import "./forcesTable.scss";

const ForcesTable = ({ data }) => {
  const columns = [
    { path: "name", label: "Name" },
    { path: "force.x", label: "X" },
    { path: "force.y", label: "Y" },
  ];

  const header = "Forces";
  return <Table columns={columns} data={data} header={header} />;
};

export default ForcesTable;
