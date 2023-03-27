import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
// config
import staticData from "@config/config.json";
// services
import { getSalesListApi } from "@services/products";

export default function Sale() {
  const [productList, setProductList] = useState([]);

  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(1);
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
      <div className="my-4">
        <input
          type="text"
          placeholder="Enter product name"
          className="me-5"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <Table theading={staticData.productSalesTableHeadings}>
        {productList?.allSales?.map((val, index) => (
          <tr key={index}>
            <td className="border">{index + 1}</td>
            <td className="border">{val?.name || ""}</td>
            <td className="border">{val?.description || ""}</td>
            <td className="border">
              {val?.quantity.$numberDecimal || 0}{" "}
              {val?.productType === "liquid" ? "ltr" : ""}
            </td>
            <td className="border">{val?.buyPrice || 0}</td>
            <td className="border">{val?.salePrice || 0}</td>
            <td className="border">{val?.discount || 0}</td>
            <td className="border">{val?.profit || 0}</td>
            <td className="border">
              {val?.salePrice / val?.quantity.$numberDecimal || 0} (per)
            </td>
            <td className="border">{val?.updatedAt || ""}</td>
          </tr>
        ))}
      </Table>

      <div className="mt-5">
        <Pagination
          pageCount={Number(productList?.pages)}
          selectedpage={(value) => setSelectedpage(value)}
        />
        <PageSelection dataPerPage={(value) => setDataPerPage(value)} value={dataPerPage} />
      </div>
    </>
  );
}
