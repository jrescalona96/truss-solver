import React from "react";
import "./tableHeader.scss";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th scope="col" key={col.label}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
