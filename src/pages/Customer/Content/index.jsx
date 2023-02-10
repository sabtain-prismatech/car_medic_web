import React, { useState } from "react";
// Components
import Table from "@components/Table";
import CreateCustomerModel from "@components/Model/CreateCustomer";
import CreateVehicleModel from "@components/Model/CreateVehicle";
import Pagination from "@components/Pagination";
// config
import staticData from "@config/config.json";

export default function Content() {
  const [addModel, setAddModel] = useState(false);
  const [addVehicleModel, setAddVehicleModel] = useState(false);
  const [selectedpage, setSelectedpage] = useState(0);
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
        <Table theading={staticData.customerTableHeadings}>
          <tr>
            <td className="border">1</td>
            <td className="border">Sabtain</td>
            <td className="border">AQD128</td>
            <td className="border">
              <button>Create Order</button>
            </td>
            <td className="border">
              1 <button onClick={() => setAddVehicleModel(true)}>ADD</button>
            </td>
            <td className="border">Honda</td>
            <td className="border">2/5/2022</td>
            <td className="border">Alrehman Garden</td>
            <td className="border">03023081302</td>
            <td className="border">icon</td>
            <td className="border">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </Table>
        <div className="mt-5">
          <Pagination
            pageCount={5}
            selectedpage={(value) => setSelectedpage(value)}
          />
          <select name="" id="">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </>
  );
}
