import React from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
// config
import staticData from "@config/config.json";

export default function InActiveUser(props) {
  return (
    <>
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
          <PageSelection />

      </div>
    </>
  );
}
