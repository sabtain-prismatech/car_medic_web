import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import CreateServiceModel from "@components/Model/CreateService";
// config
import staticData from "@config/config.json";
// services
import { serviceListApi } from "@services/service";
// date-formatter
import dateFormat from "dateformat";

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
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search Services"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            type="button"
            className="ms-3"
            onClick={() => setCreateModel(true)}
          >
            Add Service
          </button>
        </div>
        <Table theading={staticData.servicesTableHeadings}>
          {servicesList?.services?.map((val, index) => (
            <tr key={index}>
              <td className="border">{index + 1}</td>
              <td className="border">{val?.name || ""}</td>
              <td className="border">{val?.price || 0}</td>
              <td className="border">{val?.description || "N/A"}</td>
            </tr>
          ))}
        </Table>
      </div>

      <div className="mt-5">
        <Pagination
          pageCount={Number(servicesList?.pages)}
          selectedpage={(value) => setSelectedpage(value)}
        />
        <PageSelection dataPerPage={(value) => setDataPerPage(value)} value={dataPerPage}  />
      </div>
    </>
  );
}
