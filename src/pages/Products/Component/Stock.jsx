import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
import Typography from "@components/SharedComponents/Typography";
// Model
import CreateProductModel from "./CreateProduct/index";
import CreateSalesModel from "./CreateSale/index";
// config
import staticData from "@config/config.json";
// services
import { getStockListApi } from "@services/products";
// Icons
import Icons from "@helper/icons";

export default function Stock({ stock }) {
  const [productList, setProductList] = useState([]);
  const [createModel, setCreateModel] = useState(false);
  const [saleModel, setSaleModel] = useState(false);
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);
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
          title="Create Product"
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
          title="Sale Product"
          size="lg"
        />
      ) : (
        ""
      )}
      {/* sale-model-end */}
      <div className="mt-4">
        <div className=" d-flex justify-content-end">
          <InputField
            behave="normal"
            size="md"
            type="text"
            placeholder="Search Product Name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            styles={{ width: "260px" }}
          />
          <Button
            type="button"
            size="md"
            onClick={() => setCreateModel(true)}
            startIcon={<Icons.BsIcons.BsPlusCircleFill />}
            align="ms-auto"
          >
            Add Product
          </Button>
        </div>
      </div>
      <Typography variant="body2" color="txt_primary" fw="bold" style="pt-1">
        Total Stock Amount :
        <span className="fw-bold"> ({productList?.stockAmount})</span>
      </Typography>
      <Typography
        variant="small"
        color="txt_primary"
        fw="semibold"
        style="pb-2"
      >
        <i>Stock Amount is not included in Expense</i>
      </Typography>

      <Table theading={staticData.productStockTableHeadings}>
        {productList?.allStock?.map((val, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{val?.name || ""}</td>
            <td>{val?.description || ""}</td>
            <td>
              {val?.quantity.$numberDecimal || 0}{" "}
              {val?.productType === "liquid" ? "ltr" : ""}
            </td>
            <td>{val?.price || ""}</td>
            <td>{val?.salePrice || ""}</td>
            <td>
              <Button
                type="button"
                disabled={val?.quantity.$numberDecimal > 0 ? false : true}
                onClick={() => handleSale(val)}
                btn="secondary"
                size="sm"
              >
                Sale Now
              </Button>
            </td>
            <td>{val?.createdAt || ""}</td>
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
