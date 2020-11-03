import React from "react";
import Table from "../common/table/index";
import "./internalForcesTable.scss";

const InternalForcesTable = ({ data }) => {
  const columns = [
    { path: "name", label: "Name" },
    { path: "stress", label: "Mag." },
  ];
  const header = "Interal Forces";

  return <Table columns={columns} data={data} header={header} />;
};
export default InternalForcesTable;
