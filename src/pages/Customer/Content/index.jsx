import React, { useState, useEffect } from "react";
// Components
import CreateCustomerModel from "./CreateCustomer/index";
import CustomerFilterModel from "@components/Model/CustomerFilter";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import ActiveUser from "./ActiveUser";
import InActiveUser from "./InactiveUser";
import Button from "@components/SharedComponents/Button";
// Tabs
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "@styles/scss/sharedComponent/tabs.scss";
// services
import { getAllCustomersApi } from "@services/customer";
// Icons
import Icons from "@helper/icons";

export default function Content() {
  const [addModel, setAddModel] = useState(false);
  const [filterModel, setFilterModel] = useState(false);
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);
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
      <div className="">
        {addModel ? (
          <CreateCustomerModel
            show={addModel}
            onHide={() => setAddModel(false)}
            updateCustomerList={(value) => setUpdateCustomerList(value)}
            title="Create Customer"
            size="lg"
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
        <div className="d-flex justify-content-end mb-3">
          <div className="d-flex align-items-center">
            <Button
              type="button"
              size="md"
              classes="bg-success"
              title="Reset"
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
              <i className="text-white m-0">
                <Icons.FiIcons.FiRefreshCcw />
              </i>
            </Button>
            <Button
              type="button"
              size="md"
              align="mx-3"
              variant="outline"
              className="btn btn-danger ms-4"
              onClick={() => setFilterModel(true)}
              startIcon={<Icons.BsIcons.BsListTask />}
            >
              Filter
            </Button>
            <Button
              type="button"
              size="md"
              onClick={() => setAddModel(true)}
              startIcon={<Icons.BsIcons.BsPlusCircleFill />}
              align="ms-auto"
            >
              Add Customer
            </Button>
          </div>
        </div>
        <div className="tabs-container">
          <Tabs
            id="customer-tabs"
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
        </div>
        <div className="mt-5 d-flex justify-content-between align-items-center">
          <PageSelection
            dataPerPage={(value) => setDataPerPage(value)}
            value={dataPerPage}
          />
          <Pagination
            pageCount={Number(customerInfo?.pages)}
            selectedpage={(value) => setSelectedpage(value)}
          />
        </div>
      </div>
    </>
  );
}
