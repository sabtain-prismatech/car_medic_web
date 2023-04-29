import React from "react";

export default function PageSelection({ dataPerPage, value }) {
  return (
    <>
      <select onChange={(e) => dataPerPage(e.target.value)} value={value}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </>
  );
}
