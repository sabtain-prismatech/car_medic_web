import React, { useState, useEffect } from "react";
// Components
import Table from "@components/Table";
// config
import staticData from "@config/config.json";
// services
import { updateCustomerStatusApi } from "@services/customer";

export default function InActiveUser({ customerList, updateStatus }) {
  const [statusLoader, setStatusLoader] = useState(false);

  // status-handler-function
  const statusHandlerFun = async (e, customer) => {
    setStatusLoader(true);
    const status = e.target.value;
    const id = customer._id;
    // payload
    const payload = {
      status,
    };

    await updateCustomerStatusApi(payload, id).then((response) => {
      if (response?.data?.success) {
        updateStatus(true);
        console.log(response);
      } else {
        console.log(response?.data?.message);
      }
    });
    setStatusLoader(false);
  };

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
            <td>
              {statusLoader ? (
                "...loading"
              ) : (
                <select
                  name=""
                  id=""
                  value={val?.status}
                  onChange={(e) => statusHandlerFun(e, val)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              )}
            </td>
            <td className="border">
              <button disabled={true}>Edit</button>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
