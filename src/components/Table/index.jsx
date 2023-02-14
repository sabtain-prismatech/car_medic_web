import React from "react";

export default function Table({ theading, children }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            {theading?.map((val, index) => (
              <th style={{ border: "1px solid red" }} key={index}>
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
}
