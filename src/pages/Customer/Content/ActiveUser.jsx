import React, { useState, useEffect } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
// config
import staticData from "@config/config.json";
// services
import { getAllCustomersApi } from "@services/customer";

export default function ActiveUser() {
  const [customerList, setCustomerList] = useState([]);

  const getAllCustomersList = async () => {
    const payload = {
      pageNo: 1,
      perPage: 5,
      status: "active",
      filter: {
        name: "",
        vehicleNo: "",
        vehicleBrand: "",
        vehicleModel: "",
        phone: "",
      },
    };
    await getAllCustomersApi(payload).then((response) => {
      if (response?.data?.success) {
        console.log(response.data.customers);
        setCustomerList(response?.data?.data?.customers || []);
      } else {
        console.log(response?.data?.message);
      }
    });
  };

  useEffect(() => {
    console.log("API IS WORKING");
    getAllCustomersList();
  }, []);

  return (
    <>
      <Table theading={staticData.customerTableHeadings}>
        {customerList?.map((val, index) => (
          <tr>
            <td className="border">{index + 1}</td>
            <td className="border">{val?.name}</td>
            <td className="border">AQD128</td>
            <td className="border">
              <button>Create Order</button>
            </td>
            <td className="border">
              1 <button onClick={() => setAddVehicleModel(true)}>ADD</button>
            </td>
            <td className="border">Honda</td>
            <td className="border">2/5/2022</td>
            <td className="border">Alrehman Garden</td>
            <td className="border">03023081302</td>
            <td className="border">icon</td>
            <td className="border">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </Table>
      <div className="mt-5">
        <Pagination
          pageCount={5}
          selectedpage={(value) => setSelectedpage(value)}
        />
        <PageSelection />
      </div>
    </>
  );
}
