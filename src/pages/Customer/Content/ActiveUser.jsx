import React, { useState, useEffect } from "react";
// Components
import Table from "@components/Table";
import CreateVehicleModel from "@components/Model/CreateVehicle";
import EditCustomerModel from "@components/Model/EditCustomer";
// config
import staticData from "@config/config.json";
// helpers
import Icons from "@helper/icons";
// react-router-dom
import { Link } from "react-router-dom";
// services
import { updateCustomerStatusApi } from "@services/customer";

export default function ActiveUser({ customerList, updateCustomerList }) {
  const [addVehicleModel, setAddVehicleModel] = useState(false);
  const [editCustomerPop, setEditCustomerPop] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [statusLoader, setStatusLoader] = useState(false);

  const modelHandler = (value) => {
    setSelectedCustomer(value);
    setAddVehicleModel(true);
  };

  // edit-customer-model-handler
  const editCustomerModelHandler = (value) => {
    setSelectedCustomer(value);
    setEditCustomerPop(true);
  };

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
      {addVehicleModel ? (
        <CreateVehicleModel
          customerInfo={selectedCustomer}
          show={addVehicleModel}
          onHide={() => setAddVehicleModel(false)}
        />
      ) : (
        ""
      )}
      {editCustomerPop ? (
        <EditCustomerModel
          customerInfo={selectedCustomer}
          updateCustomerList={(value) => updateCustomerList(value)}
          show={editCustomerPop}
          onHide={() => setEditCustomerPop(false)}
        />
      ) : (
        ""
      )}

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
              <Link to="/customer/order">
                <button>Create Order</button>
              </Link>
            </td>
            <td>
              {val?.vehicles?.length} ,{" "}
              <button onClick={() => modelHandler(val)}>ADD</button>
            </td>
            <td>
              {val?.vehicles?.map((vehicle, index) => (
                <div key={index}>{vehicle?.vehicleBrand}</div>
              ))}
            </td>
            <td>{val?.createdAt}</td>
            <td>{val?.location}</td>
            <td>
              {val?.phone}
              {val?.whatsapp ? (
                <i>
                  <Icons.FaIcons.FaWhatsappSquare />
                </i>
              ) : (
                ""
              )}
            </td>
            <td>icon</td>
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
              <button onClick={() => editCustomerModelHandler(val)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
