import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
// Model
import CreateProductModel from "@components/Model/CreateProduct";
import CreateSalesModel from "@components/Model/CreateSale";
// config
import staticData from "@config/config.json";
// services
import { getStockListApi } from "@services/products";

export default function Stock({ stock }) {
  const [productList, setProductList] = useState([]);
  const [createModel, setCreateModel] = useState(false);
  const [saleModel, setSaleModel] = useState(false);
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(1);
  const [search, setSearch] = useState("");
  const [updateProductList, setUpdateProductList] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  // get-all-Product-Stock-API-start
  const getAllProductList = async () => {
    const params = {
      name: search,
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
    };
    await getStockListApi(params).then((response) => {
      if (response?.data?.success) {
        console.log(response);
        const data = response?.data?.data;
        setProductList(data);
        stock(data?.totalProducts);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-Product-Stock-API-end

  useEffect(() => {
    if (search !== "") {
      const getData = setTimeout(() => {
        getAllProductList();
      }, 1000);
      return () => clearTimeout(getData);
    } else {
      getAllProductList();
    }
  }, [search, dataPerPage, selectedpage]);

  // if-update-product-list-trigger-then-update-the-list
  useEffect(() => {
    if (updateProductList) {
      setUpdateProductList(false);
      getAllProductList();
    }
  }, [updateProductList]);

  // Handle-Sale-Products
  const handleSale = (prod) => {
    setSelectedProduct(prod);
    setSaleModel(true);
  };

  return (
    <>
      {/* create-model-start */}
      {createModel ? (
        <CreateProductModel
          show={createModel}
          onHide={() => setCreateModel(false)}
          updateProductList={(value) => setUpdateProductList(value)}
        />
      ) : (
        ""
      )}
      {/* create-model-end */}
      {/* sale-model-start */}
      {saleModel ? (
        <CreateSalesModel
          show={saleModel}
          onHide={() => setSaleModel(false)}
          updateProductList={(value) => setUpdateProductList(value)}
          product={selectedProduct}
        />
      ) : (
        ""
      )}
      {/* sale-model-end */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Enter product name"
          className="me-5"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="button" onClick={() => setCreateModel(true)}>
          Add New Product
        </button>
      </div>
      <div>Total Stock Amount : {productList?.stockAmount}</div>
      <small className="mb-2 d-block">
        <i>Stock Amount is not included in Expense</i>
      </small>
      <Table theading={staticData.productStockTableHeadings}>
        {productList?.allStock?.map((val, index) => (
          <tr key={index}>
            <td className="border">{index + 1}</td>
            <td className="border">{val?.name || ""}</td>
            <td className="border">{val?.description || ""}</td>
            <td className="border">
              {val?.quantity.$numberDecimal || 0}{" "}
              {val?.productType === "liquid" ? "ltr" : ""}
            </td>
            <td className="border">{val?.price || ""}</td>
            <td className="border">{val?.salePrice || ""}</td>
            <td className="border">
              <button
                type="button"
                disabled={val?.quantity.$numberDecimal > 0 ? false : true}
                onClick={() => handleSale(val)}
              >
                Sale Now
              </button>
            </td>
            <td className="border">{val?.createdAt || ""}</td>
          </tr>
        ))}
      </Table>

      <div className="mt-5">
        <Pagination
          pageCount={Number(productList?.pages)}
          selectedpage={(value) => setSelectedpage(value)}
        />
        <PageSelection dataPerPage={(value) => setDataPerPage(value)} />
      </div>
    </>
  );
}
