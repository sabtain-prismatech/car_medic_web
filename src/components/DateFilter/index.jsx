import React from "react";
// components
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";

export default function DateFilter({ dateFilter, setDateFilter, clickEvent }) {
  return (
    <>
      <div className="d-flex align-items-center ">
        <InputField
          behave="normal"
          size="sm"
          type="date"
          onChange={(e) =>
            setDateFilter({ ...dateFilter, fromDate: e.target.value })
          }
          value={dateFilter.fromDate}
          styles={{
            width: "150px",
            padding: "0px 5px 0px 5px",
            marginBottom: "0",
          }}
          label="From"
        />
        <span className="fs-1 mx-1"> - </span>
        <InputField
          behave="normal"
          size="sm"
          type="date"
          value={dateFilter.toDate}
          onChange={(e) =>
            setDateFilter({ ...dateFilter, toDate: e.target.value })
          }
          styles={{
            width: "150px",
            padding: "0px 5px 0px 5px",
            marginBottom: "0",
          }}
          label="To"
        />
        <Button
          type="button"
          size="sm"
          onClick={clickEvent}
          align="ml-auto"
          classes={"mx-2 mt-2 align-self-center"}
          styles={{ height: "31px" }}
        >
          Find
        </Button>
      </div>
    </>
  );
}
