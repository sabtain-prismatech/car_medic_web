import React, { useState } from "react";
// Components
import CreateCustomerModel from "@components/Model/CreateCustomer";
import CreateVehicleModel from "@components/Model/CreateVehicle";
import ActiveUser from "./ActiveUser";
import InActiveUser from "./InactiveUser";
// config
import staticData from "@config/config.json";
// Tabs
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function Content() {
  const [addModel, setAddModel] = useState(false);
  const [addVehicleModel, setAddVehicleModel] = useState(false);
  const [selectedpage, setSelectedpage] = useState(0);
  const [tabsKey, setTabsKey] = useState("active");


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
          <Tab eventKey="active" title={`Active User (${0})`}>
            <div>{tabsKey === "active" ? <ActiveUser /> : ""}</div>
          </Tab>
          <Tab eventKey="inactive" title={`Inactive User (${0})`}>
            <div>
              <InActiveUser />
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
