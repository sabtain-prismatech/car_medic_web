import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import CreateServiceModel from "@components/Model/CreateService";
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
// config
import staticData from "@config/config.json";
// services
import { serviceListApi } from "@services/service";
// date-formatter
import dateFormat from "dateformat";
// Icons
import Icons from "@helper/icons";

export default function Main() {
  const [servicesList, setServicesList] = useState([]);
  const [createModel, setCreateModel] = useState(false);
  const [updateServiceList, setUpdateServiceList] = useState(false);
  const [search, setSearch] = useState("");

  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);

  // get-all-vehicle-API-start
  const getServicesList = async () => {
    const params = {
      name: search,
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
    };
    await serviceListApi(params).then((response) => {
      if (response?.data?.success) {
        setServicesList(response?.data?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-vehicle-API-end

  useEffect(() => {
    if (search !== "") {
      const getData = setTimeout(() => {
        getServicesList();
      }, 1000);
      return () => clearTimeout(getData);
    } else {
      getServicesList();
    }
  }, [search, dataPerPage, selectedpage]);

  useEffect(() => {
    if (updateServiceList) {
      setUpdateServiceList(false);
      getServicesList();
    }
  }, [updateServiceList]);

  return (
    <>
      {createModel ? (
        <CreateServiceModel
          show={createModel}
          onHide={() => setCreateModel(false)}
          updateServiceList={(value) => setUpdateServiceList(value)}
        />
      ) : (
        ""
      )}
      <div className="mt-5">
        <div className=" d-flex justify-content-end">
          <InputField
            behave="normal"
            size="md"
            type="text"
            placeholder="Search Services"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            styles={{ width: "260px" }}
          />
          <Button
            type="button"
            size="md"
            onClick={() => setCreateModel(true)}
            startIcon={<Icons.BsIcons.BsPlusCircleFill />}
            align="ms-auto"
          >
            Add Service
          </Button>
        </div>
        <Table theading={staticData.servicesTableHeadings}>
          {servicesList?.services?.map((val, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{val?.name || ""}</td>
              <td>{val?.price || 0}</td>
              <td>{val?.description || "N/A"}</td>
              <td></td>
            </tr>
          ))}
        </Table>
      </div>

      <div className="mt-5 d-flex justify-content-between align-items-center">
        <PageSelection
          dataPerPage={(value) => setDataPerPage(value)}
          value={dataPerPage}
        />
        <Pagination
          pageCount={Number(servicesList?.pages)}
          selectedpage={(value) => setSelectedpage(value)}
        />
      </div>
    </>
  );
}
