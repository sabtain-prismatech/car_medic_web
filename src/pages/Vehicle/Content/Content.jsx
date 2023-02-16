import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
// config
import staticData from "@config/config.json";
// services
import { vehicleListApi } from "@services/vehicle";

export default function Content() {
  const [vehicleList, setVehicleList] = useState([]);

 // get-all-vehicle-API-start
  const getVehicleList = async () => {
    await vehicleListApi({}).then((response) => {
      if (response?.data?.success) {
        setVehicleList(response?.data?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
 // get-all-vehicle-API-end

  useEffect(() => {
    getVehicleList();
  }, []);

  return (
    <>
      <div className="mt-5">
        <Table theading={staticData.vehiclesTableHeadings}>
          {vehicleList?.map((val, index) => (
            <tr key={index}>
              <td className="border">{index + 1}</td>
              <td className="border">{val?.vehicleNo}</td>
              <td className="border">{val?.vehicleBrand}</td>
              <td className="border">{val?.vehicleModel}</td>
              <td className="border">
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </>
  );
}
