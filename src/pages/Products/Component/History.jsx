import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
// Model
import ReturnProductModel from "./ReturnProduct/index";
// config
import staticData from "@config/config.json";
// services
import { getSalesHistoryListApi } from "@services/products";

export default function History() {
  const [productList, setProductList] = useState([]);
  const [returnModel, setReturnModel] = useState(false);
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);
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
          title={`Return Product`}
        />
      ) : (
        ""
      )}
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

      <Table theading={staticData.productSalesHistoryTableHeadings}>
        {productList?.productHistory?.map((val, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{val?.customerName || ""}</td>
            <td>{val?.name || ""}</td>
            <td>{val?.description || ""}</td>
            <td>
              {val?.quantity.$numberDecimal || 0}{" "}
              {val?.productType === "liquid" ? "ltr" : ""}
            </td>
            <td>
              {`(${val?.quantity.$numberDecimal} x ${val?.salePrice}) , ${
                val?.salePrice * val?.quantity.$numberDecimal
              }`}
            </td>
            <td>{val?.discount || 0}</td>
            <td>
              {val?.salePrice * val?.quantity.$numberDecimal - val?.discount}
            </td>
            <td>{val?.createdAt || ""}</td>
            <td>
              <Button
                type="button"
                onClick={() => handleReturnedProduct(val)}
                btn="secondary"
                size="sm"
              >
                Return
              </Button>
            </td>
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
