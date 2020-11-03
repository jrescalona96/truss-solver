import React from "react";
import TableHeader from "../tableHeader/index";
import TableBody from "../tableBody/index";
import "./table.scss";

const Table = ({ columns, data, header }) => {
  return (
    <div>
      <h4>{header}</h4>
      <table className="table table-bordered table-sm">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  );
};

export default Table;
