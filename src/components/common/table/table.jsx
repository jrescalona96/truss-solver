import React from "react";
import _ from "lodash";
import "./table.scss";

const Table = ({ columns, data, header }) => {
  return (
    <div>
      <h4>{header}</h4>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th scope="col" key={col.label}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {columns.map((col) => {
                const val = _.get(item, col.path);
                return (
                  <td key={col.path} scope="row">
                    {isNaN(val) ? val : val.toFixed(2)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
