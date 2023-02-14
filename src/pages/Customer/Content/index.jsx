import React, { useState, useEffect } from "react";
// Components
import CreateCustomerModel from "@components/Model/CreateCustomer";
import CreateVehicleModel from "@components/Model/CreateVehicle";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import ActiveUser from "./ActiveUser";
import InActiveUser from "./InactiveUser";
// Tabs
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
// services
import { getAllCustomersApi } from "@services/customer";

export default function Content() {
  const [addModel, setAddModel] = useState(false);
  const [addVehicleModel, setAddVehicleModel] = useState(false);
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(1);
  const [tabsKey, setTabsKey] = useState("active");

  const [customerInfo, setCustomerInfo] = useState([]);

  const getAllCustomersList = async () => {
    const payload = {
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
      status: tabsKey,
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
        setCustomerInfo(response?.data?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };

  useEffect(() => {
    console.log("API IS WORKING");
    getAllCustomersList();
  }, [tabsKey, dataPerPage,selectedpage]);

  return (
    <>
      <div className="mt-5">
        <CreateCustomerModel
          show={addModel}
          onHide={() => setAddModel(false)}
        />
        <CreateVehicleModel
          show={addVehicleModel}
          onHide={() => setAddVehicleModel(false)}
        />
        <div className="d-flex justify-content-center mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setAddModel(true)}
          >
            Add Customer
          </button>
          <button type="button" className="btn btn-danger ms-4">
            Filter
          </button>
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={tabsKey}
          onSelect={(k) => setTabsKey(k)}
          className="tabs d-flex justify-content-start"
        >
          <Tab
            eventKey="active"
            title={`Active User (${customerInfo?.activeCustomer})`}
          >
            <div>
              {tabsKey === "active" ? (
                <ActiveUser customerList={customerInfo?.customers} />
              ) : (
                ""
              )}
            </div>
          </Tab>
          <Tab
            eventKey="inactive"
            title={`Inactive User (${customerInfo?.inactiveCustomer})`}
          >
            <div>
              <InActiveUser customerList={customerInfo?.customers} />
            </div>
          </Tab>
        </Tabs>

        <div className="mt-5">
          <Pagination
            pageCount={Number(customerInfo?.pages)}
            selectedpage={(value) => setSelectedpage(value)}
          />
          <PageSelection dataPerPage={(value) => setDataPerPage(value)} />
        </div>
      </div>
    </>
  );
}
