import React, { useState, useEffect } from "react";
// Components
import Table from "@components/Table";
import Button from "@components/SharedComponents/Button";
// config
import staticData from "@config/config.json";
// services
import { updateCustomerStatusApi } from "@services/customer";
// Icons
import Icons from "@helper/icons";
// dateformat
import dateformat from "dateformat";

export default function InActiveUser({ customerList, updateCustomerList }) {
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
        updateCustomerList(true);
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
            <td>{index + 1}</td>
            <td>{val?.name}</td>
            <td>
              {val?.vehicles?.map((vehicle, index) => (
                <div key={index}>{vehicle?.vehicleNo}</div>
              ))}
            </td>
            <td>
              <Button type="button" btn="secondary" size="sm" disabled={true}>
                Create Order
              </Button>
            </td>
            <td>
              <div className="d-flex justify-content-center align-items-center ">
                {val?.vehicles?.length} <span className="mx-2 ">,</span>
                <Button type="button" btn="secondary" size="sm" disabled={true}>
                  Add
                </Button>
              </div>
            </td>
            <td>
              {val?.vehicles?.map((vehicle, index) => (
                <div key={index}>{vehicle?.vehicleBrand}</div>
              ))}
            </td>
            <td>{dateformat(val?.createdAt, "dd-mmm-yyyy")}</td>
            <td>{val?.location}</td>
            <td>
              <div className="d-flex justify-content-center align-items-center">
                {val?.phone}
                {val?.whatsapp ? (
                  <i
                    className="text-success ms-2"
                    title="This number have whatsapp"
                  >
                    <Icons.BsIcons.BsWhatsapp />
                  </i>
                ) : (
                  ""
                )}
              </div>
            </td>
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
            <td>
              <div className="d-flex justify-content-center">
                <i className="primary" title="Details">
                  <Icons.BsIcons.BsFillEyeFill />
                </i>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
