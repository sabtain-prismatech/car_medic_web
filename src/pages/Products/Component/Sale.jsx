import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import InputField from "@components/SharedComponents/InputField";
// config
import staticData from "@config/config.json";
// services
import { getSalesListApi } from "@services/products";

export default function Sale() {
  const [productList, setProductList] = useState([]);

  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [search, setSearch] = useState("");

  // get-all-Product-Stock-API-start
  const getAllProductSaleList = async () => {
    const params = {
      name: search,
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
    };
    await getSalesListApi(params).then((response) => {
      if (response?.data?.success) {
        console.log(response);
        const data = response?.data?.data;
        setProductList(data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-Product-Stock-API-end

  useEffect(() => {
    if (search !== "") {
      const getData = setTimeout(() => {
        getAllProductSaleList();
      }, 1000);
      return () => clearTimeout(getData);
    } else {
      getAllProductSaleList();
    }
  }, [search, dataPerPage, selectedpage]);

  return (
    <>
      <div className="mt-4 d-flex justify-content-end">
        <InputField
          behave="normal"
          size="md"
          type="text"
          placeholder="Search Product Name"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          styles={{ width: "260px" }}
        />
      </div>

      <Table theading={staticData.productSalesTableHeadings}>
        {productList?.allSales?.map((val, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{val?.name || ""}</td>
            <td>{val?.description || ""}</td>
            <td>
              {val?.quantity.$numberDecimal || 0}{" "}
              {val?.productType === "liquid" ? "ltr" : ""}
            </td>
            <td>{val?.buyPrice || 0}</td>
            <td>{val?.salePrice || 0}</td>
            <td>{val?.discount || 0}</td>
            <td>{val?.profit || 0}</td>
            <td>{val?.salePrice / val?.quantity.$numberDecimal || 0} (per)</td>
            <td>{val?.updatedAt || ""}</td>
            <td></td>
          </tr>
        ))}
      </Table>
      <div className="mt-5 d-flex justify-content-between align-items-center">
        <PageSelection
          dataPerPage={(value) => setDataPerPage(value)}
          value={dataPerPage}
        />
        <Pagination
          pageCount={Number(productList?.pages)}
          selectedpage={(value) => setSelectedpage(value)}
        />
      </div>
    </>
  );
}
