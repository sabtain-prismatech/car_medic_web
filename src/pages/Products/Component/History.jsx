import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
// Model
import ReturnProductModel from "@components/Model/ReturnProduct";
// config
import staticData from "@config/config.json";
// services
import { getSalesHistoryListApi } from "@services/products";

export default function History() {
  const [productList, setProductList] = useState([]);
  const [returnModel, setReturnModel] = useState(false);
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [refreshList, setRefreshList] = useState(false);

  // get-all-Product-Stock-API-start
  const getAllProductSaleList = async () => {
    const params = {
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
      filter: {
        customerName: "",
        name: search,
        fromDate: "",
        toDate: "",
      },
    };

    await getSalesHistoryListApi(params).then((response) => {
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

  // refresh the list
  useEffect(() => {
    if (refreshList) {
      setRefreshList(false);
      getAllProductSaleList();
    }
  }, [refreshList]);

  // handle-return-product
  const handleReturnedProduct = (product) => {
    console.log(product);
    setSelectedProduct(product);
    setReturnModel(true);
  };

  return (
    <>
      {returnModel ? (
        <ReturnProductModel
          show={returnModel}
          onHide={() => setReturnModel(false)}
          product={selectedProduct}
          refreshList={(value) => setRefreshList(value)}
        />
      ) : (
        ""
      )}
      <div className="my-4">
        <input
          type="text"
          placeholder="Enter product name"
          className="me-5"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <Table theading={staticData.productSalesHistoryTableHeadings}>
        {productList?.productHistory?.map((val, index) => (
          <tr key={index}>
            <td className="border">{index + 1}</td>
            <td className="border">{val?.customerName || ""}</td>
            <td className="border">{val?.name || ""}</td>
            <td className="border">{val?.description || ""}</td>
            <td className="border">
              {val?.quantity.$numberDecimal || 0}{" "}
              {val?.productType === "liquid" ? "ltr" : ""}
            </td>
            <td className="border">
              {`(${val?.quantity.$numberDecimal} x ${val?.salePrice}) , ${
                val?.salePrice * val?.quantity.$numberDecimal
              }`}
            </td>
            <td className="border">{val?.discount || 0}</td>
            <td className="border">
              {val?.salePrice * val?.quantity.$numberDecimal - val?.discount}
            </td>
            <td className="border">{val?.createdAt || ""}</td>
            <td className="border">
              <button type="button" onClick={() => handleReturnedProduct(val)}>
                Return
              </button>
            </td>
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
