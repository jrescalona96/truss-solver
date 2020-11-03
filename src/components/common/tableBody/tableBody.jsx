import React from "react";
import _ from "lodash";
import "./tableBody.scss";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((col) => {
            const val = _.get(item, col.path);
            return col.content ? (
              <td key={col.key}>{col.content(val)}</td>
            ) : (
              <td key={col.path}>{isNaN(val) ? val : val.toFixed(2)}</td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
export default TableBody;
