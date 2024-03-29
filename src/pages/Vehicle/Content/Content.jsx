import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import InputField from "@components/SharedComponents/InputField";
// config
import staticData from "@config/config.json";
// services
import { vehicleListApi } from "@services/vehicle";

export default function Content() {
  const [vehicleList, setVehicleList] = useState([]);
  console.log(vehicleList);
  const [search, setSearch] = useState("");
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);

  // get-all-vehicle-API-start
  const getVehicleList = async () => {
    const params = {
      vehicleNo: search,
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
    };
    await vehicleListApi(params).then((response) => {
      if (response?.data?.success) {
        setVehicleList(response?.data?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-vehicle-API-end

  useEffect(() => {
    if (search !== "") {
      const getData = setTimeout(() => {
        getVehicleList();
      }, 1000);
      return () => clearTimeout(getData);
    } else {
      getVehicleList();
    }
  }, [search, dataPerPage, selectedpage]);

  return (
    <>
      <div className="mt-5">
        <div className="mb-3 d-flex justify-content-end">
          <InputField
            behave="normal"
            size="md"
            type="text"
            placeholder="Search vehicle No"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            styles={{ width: "260px" }}
          />
        </div>
        <Table theading={staticData.vehiclesTableHeadings}>
          {vehicleList?.vehicles?.map((val, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{val?.vehicleNo}</td>
              <td>{val?.vehicleBrand}</td>
              <td>{val?.vehicleModel}</td>
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
          pageCount={Number(vehicleList?.pages)}
          selectedpage={(value) => setSelectedpage(value)}
        />
      </div>
    </>
  );
}
