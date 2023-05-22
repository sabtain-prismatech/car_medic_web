import React, { useState, useEffect } from "react";
// Components
import Table from "@components/Table";
import CreateVehicleModel from "./CreateVehicle/index";
import EditCustomerModel from "./EditCustomer/index";
import Button from "@components/SharedComponents/Button";
// config
import staticData from "@config/config.json";
// helpers
import Icons from "@helper/icons";
// react-router-dom
import { useNavigate } from "react-router-dom";
// services
import { updateCustomerStatusApi } from "@services/customer";
// date-format
import dateformat from "dateformat";

export default function ActiveUser({ customerList, updateCustomerList }) {
  const [addVehicleModel, setAddVehicleModel] = useState(false);
  const [editCustomerPop, setEditCustomerPop] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [statusLoader, setStatusLoader] = useState(false);
  const navigate = useNavigate();

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

  // Go-to-create-order-page
  const createOrderPage = (value) => {
    localStorage.setItem("CUSTOMER_INFO", JSON.stringify(value));
    navigate("/customer/order");
  };

  return (
    <>
      {addVehicleModel ? (
        <CreateVehicleModel
          customerInfo={selectedCustomer}
          updateCustomerList={(value) => updateCustomerList(value)}
          show={addVehicleModel}
          onHide={() => setAddVehicleModel(false)}
          title="Create Vehicle"
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
          title="Edit Customer"
          size="md"
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
              <Button
                type="button"
                btn="secondary"
                size="sm"
                onClick={() => createOrderPage(val)}
              >
                Create Order
              </Button>
            </td>
            <td>
              <div className="d-flex justify-content-center align-items-center">
                {val?.vehicles?.length} <span className="mx-2">,</span>
                <Button
                  type="button"
                  btn="secondary"
                  size="sm"
                  onClick={() => modelHandler(val)}
                >
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
                <i
                  className="me-3 text-success"
                  onClick={() => editCustomerModelHandler(val)}
                  title="Edit"
                >
                  <Icons.FaIcons.FaEdit />
                </i>
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
