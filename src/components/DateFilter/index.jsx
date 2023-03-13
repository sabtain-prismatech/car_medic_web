import React from "react";

export default function DateFilter({ dateFilter, setDateFilter, clickEvent }) {
  return (
    <>
      <div>
        From{" "}
        <input
          type="date"
          value={dateFilter.fromDate}
          onChange={(e) =>
            setDateFilter({ ...dateFilter, fromDate: e.target.value })
          }
        />
        -To-
        <input
          type="date"
          value={dateFilter.toDate}
          onChange={(e) =>
            setDateFilter({ ...dateFilter, toDate: e.target.value })
          }
        />
        <button type="button" onClick={clickEvent}>
          Find
        </button>
      </div>
    </>
  );
}
