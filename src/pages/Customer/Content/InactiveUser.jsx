import React, { useState, useEffect } from "react";
// Components
import Table from "@components/Table";
// config
import staticData from "@config/config.json";

export default function InActiveUser({ customerList }) {
  return (
    <>
      <Table theading={staticData.customerTableHeadings}>
        {customerList?.map((val, index) => (
          <tr key={index}>
            <td className="border">{index + 1}</td>
            <td className="border">{val?.name}</td>
            <td className="border">
              {val?.vehicles?.map((vehicle, index) => (
                <div key={index}>{vehicle?.vehicleNo}</div>
              ))}
            </td>
            <td className="border">
              <button disabled>Create Order</button>
            </td>
            <td className="border">{val?.vehicles?.length}</td>
            <td className="border">
              {val?.vehicles?.map((vehicle, index) => (
                <div key={index}>{vehicle?.vehicleBrand}</div>
              ))}
            </td>
            <td className="border">{val?.createdAt}</td>
            <td className="border">{val?.location}</td>
            <td className="border">{val?.phone}</td>
            <td className="border">icon</td>
            <td className="border">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </Table>
      {/* <div className="mt-5">
        <Pagination
          pageCount={5}
          selectedpage={(value) => setSelectedpage(value)}
        />
        <PageSelection />
      </div> */}
    </>
  );
}
