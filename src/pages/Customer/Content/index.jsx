import React, { useState, useEffect } from "react";
// Components
import CreateCustomerModel from "@components/Model/CreateCustomer";
import CustomerFilterModel from "@components/Model/CustomerFilter";
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
  const [filterModel, setFilterModel] = useState(false);
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(1);
  const [tabsKey, setTabsKey] = useState("active");
  const [updateCustomerList, setUpdateCustomerList] = useState(false);

  const [customerInfo, setCustomerInfo] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    vehicleNo: "",
    vehicleBrand: "",
    vehicleModel: "",
    phone: "",
  });

  console.log("filter", filter);

  const getAllCustomersList = async () => {
    const payload = {
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
      status: tabsKey,
      filter,
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
    getAllCustomersList();
  }, [tabsKey, dataPerPage, selectedpage, filter]);

  // if-status is updated
  useEffect(() => {
    if (updateCustomerList) {
      setUpdateCustomerList(false);
      getAllCustomersList();
    }
  }, [updateCustomerList]);

  return (
    <>
      <div className="mt-5">
        {addModel ? (
          <CreateCustomerModel
            show={addModel}
            onHide={() => setAddModel(false)}
            updateCustomerList={(value) => setUpdateCustomerList(value)}
          />
        ) : (
          ""
        )}
        {filterModel ? (
          <CustomerFilterModel
            show={filterModel}
            onHide={() => setFilterModel(false)}
            filter={(value) => setFilter(value)}
          />
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setAddModel(true)}
          >
            Add Customer
          </button>
          <button
            type="button"
            className="btn btn-danger ms-4"
            onClick={() => setFilterModel(true)}
          >
            Filter
          </button>
          <button
            type="button"
            className="btn btn-success ms-4"
            onClick={() =>
              setFilter({
                name: "",
                vehicleNo: "",
                vehicleBrand: "",
                vehicleModel: "",
                phone: "",
              })
            }
          >
            Reset
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
                <ActiveUser
                  customerList={customerInfo?.customers}
                  updateCustomerList={(value) => setUpdateCustomerList(value)}
                />
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
              <InActiveUser
                customerList={customerInfo?.customers}
                updateCustomerList={(value) => setUpdateCustomerList(value)}
              />
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
