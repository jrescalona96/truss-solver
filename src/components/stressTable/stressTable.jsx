import React from "react";
import Table from "../common/table/index";
import "./stressTable.scss";

const StressTable = ({ data }) => {
  const columns = [
    { path: "name", label: "Name" },
    { path: "stress", label: "Mag." },
    {
      key: "type",
      path: "stress",
      content: (val) => getType(val),
      label: "Type",
    },
  ];
  const header = "Stress";
  const getType = (val) => {
    return val < 0 ? "C" : "T";
  };
  return <Table columns={columns} data={data} header={header} />;
};
export default StressTable;
