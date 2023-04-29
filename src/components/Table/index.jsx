import React from "react";
// style
import "@styles/scss/sharedComponent/table.scss";

export default function Table({ theading, children }) {
  return (
    <>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {theading?.map((val, index) => (
              <th key={index}>{val}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      </div>
    </>
  );
}
