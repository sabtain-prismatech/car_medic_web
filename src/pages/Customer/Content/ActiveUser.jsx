import React, { useState, useEffect } from "react";
// Components
import Table from "@components/Table";
import CreateVehicleModel from "@components/Model/CreateVehicle";
// config
import staticData from "@config/config.json";
// helpers
import Icons from "@helper/icons";

export default function ActiveUser({ customerList }) {
  const [addVehicleModel, setAddVehicleModel] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  const modelHandler = (value) => {
    setSelectedCustomer(value);
    setAddVehicleModel(true);
  };

  return (
    <>
      {addVehicleModel ? (
        <CreateVehicleModel
          customerInfo={selectedCustomer}
          show={addVehicleModel}
          onHide={() => setAddVehicleModel(false)}
        />
      ) : (
        ""
      )}
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
              <button>Create Order</button>
            </td>
            <td className="border">
              {val?.vehicles?.length} ,{" "}
              <button onClick={() => modelHandler(val)}>ADD</button>
            </td>
            <td className="border">
              {val?.vehicles?.map((vehicle, index) => (
                <div key={index}>{vehicle?.vehicleBrand}</div>
              ))}
            </td>
            <td className="border">{val?.createdAt}</td>
            <td className="border">{val?.location}</td>
            <td className="border">
              {val?.phone}
              {val?.whatsapp ? (
                <i>
                  <Icons.FaIcons.FaWhatsappSquare />
                </i>
              ) : (
                ""
              )}
            </td>
            <td className="border">icon</td>
            <td className="border">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
