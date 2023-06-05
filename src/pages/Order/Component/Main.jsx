import React, { useEffect, useState } from "react";
// components
import Typography from "@components/SharedComponents/Typography";
import InputField from "@components/SharedComponents/InputField";
import Selectbox from "@components/SharedComponents/Selectbox";
import Checkbox from "@components/SharedComponents/Checkbox";
import Radio from "@components/SharedComponents/Radio";
import Button from "@components/SharedComponents/Button";
import AutoCompleteInput from "@components/SharedComponents/AutoComplete";
import Table from "@components/Table";
// config
import staticData from "@config/config.json";
// Icons
import Icons from "@helper/icons";
// formik
import { Formik, Form, ErrorMessage } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";
// services
import { serviceListSimpleApi } from "@services/service";
import { getStockListApi } from "@services/products";
import { createSaleProductApi } from "@services/products";
// Model
import ReturnProductModel from "../../Products/Component/ReturnProduct/index";

export default function Main() {
  const [servicesList, setServicesList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [otherServices, setOtherService] = useState({
    name: "",
    price: "",
  });
  const [totalOtherServices, setTotalOtherServices] = useState([]);
  const [saleProd, setSaleProd] = useState({
    discount: 0,
    quantity: 0,
  });
  const [selectedProd, setSelectedProd] = useState({});
  const [allSalesProdList, setAllSalesProdList] = useState([]);
  const [selectedReturnProduct, setSelectedReturnProduct] = useState({});
  const [returnModel, setReturnModel] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [disableField, setDisableField] = useState(false);

  const customerInfo = JSON.parse(localStorage.getItem("CUSTOMER_INFO"));

  // get-all-vehicle-API-start
  const getServicesList = async () => {
    await serviceListSimpleApi({}).then((response) => {
      if (response?.data?.success) {
        setServicesList(response?.data?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-vehicle-API-end
  // get-all-Product-Stock-API-start
  const getAllProductList = async () => {
    const params = {
      name: "",
      pageNo: 1,
      perPage: null,
    };
    await getStockListApi(params).then((response) => {
      if (response?.data?.success) {
        console.log(response);
        const data = response?.data?.data?.allStock;
        setProductList(data);
      }
    });
  };
  // get-all-Product-Stock-API-end
  // Latest-other-services-start
  const latestOtherServices = () => {
    const localData = JSON.parse(localStorage.getItem("OTHER_SERVICES"));
    console.log("Updated Data", localData);
    setTotalOtherServices(localData);
  };
  // Latest-other-services-end

  useEffect(() => {
    setAllSalesProdList(JSON.parse(localStorage.getItem("SOLD_PRODUCT")) || []);
    getServicesList();
    latestOtherServices();
    getAllProductList();
  }, []);

  // Other-services-handler
  const otherServicesHandler = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setOtherService({ ...otherServices, [name]: value });
  };
  // Other-Service-submit
  const otherServiceSubmit = () => {
    let serviceArray = [];
    if (otherServices?.name !== "" && otherServices?.price !== "") {
      const localData = JSON.parse(localStorage.getItem("OTHER_SERVICES"));
      serviceArray = localData || [];
      serviceArray.push({
        name: otherServices?.name,
        price: otherServices?.price,
      });
      localStorage.setItem("OTHER_SERVICES", JSON.stringify(serviceArray));
      setOtherService({ name: "", price: "" });
    }
    latestOtherServices();
    console.log(serviceArray);
  };

  // Remove other service
  const removeOtherService = (index) => {
    console.log(index);
    let localData = JSON.parse(localStorage.getItem("OTHER_SERVICES"));
    localData = localData?.filter((val, i) => {
      if (i !== index) {
        return val;
      }
    });
    console.log(localData);
    localStorage.setItem("OTHER_SERVICES", JSON.stringify(localData));
    latestOtherServices();
  };

  // Product-Sale-handler
  const prodSaleHandler = (e) => {
    const { value, name } = e.target;
    setSaleProd({ ...saleProd, [name]: value });
  };
  // create-sale-api
  const createSaleApi = async (params) => {
    const localSaleData = JSON.parse(localStorage.getItem("SOLD_PRODUCT"));
    await createSaleProductApi(params).then((response) => {
      let finalData = response?.data?.data;
      // Toast-code-start
      toast.promise(toastPromise(response), {
        pending: "Please wait...",
        success: {
          render({ data }) {
            setTimeout(() => {
              onHide();
            }, 1500);
            localStorage.setItem(
              "SOLD_PRODUCT",
              JSON.stringify(
                localSaleData ? [...localSaleData, finalData] : [finalData]
              )
            );
            getAllProductList();
            setAllSalesProdList(
              JSON.parse(localStorage.getItem("SOLD_PRODUCT")) || []
            );
            return `${data}`;
          },
          autoClose: 1500,
        },
        error: {
          render({ data }) {
            return `${data} `;
          },
          autoClose: 3000,
        },
      });
    });
  };
  // Sale-product-Function
  const saleProductFun = () => {
    if (Object.keys(selectedProd).length > 0 && saleProd?.quantity > 0) {
      document.getElementById("productError").innerText = "";
      if (
        Number(saleProd.quantity) <=
        Number(selectedProd?.quantity?.$numberDecimal)
      ) {
        let params = {
          customerName: customerInfo?.name,
          productId: selectedProd?._id,
          name: selectedProd?.name,
          description: selectedProd?.description,
          quantity: saleProd?.quantity,
          buyPrice: selectedProd?.price,
          salePrice: selectedProd?.salePrice,
          productType: selectedProd?.productType,
          discount: saleProd?.discount,
        };
        createSaleApi(params);
      } else {
        document.getElementById("productError").innerText =
          "Quantity must be under the available stock.";
        setTimeout(() => {
          document.getElementById("productError").innerText = "";
        }, 3000);
      }
    } else {
      document.getElementById("productError").innerText =
        "Please Select Product and Quantity";
      setTimeout(() => {
        document.getElementById("productError").innerText = "";
      }, 3000);
    }
  };

  // return-produc
  useEffect(() => {
    if (refreshList) {
      setRefreshList(false);
      let localProd = JSON.parse(localStorage.getItem("SOLD_PRODUCT"));
      localProd = localProd?.filter((val) => {
        if (val?._id !== selectedReturnProduct?._id) {
          return val;
        }
      });
      localStorage.setItem("SOLD_PRODUCT", JSON.stringify(localProd));
      setAllSalesProdList(localProd);
      getAllProductList();
    }
  }, [refreshList]);

  // handle-return-product
  const handleReturnedProduct = (product) => {
    setSelectedReturnProduct(product);
    setReturnModel(true);
  };

  console.log(otherServices);

  const onSubmit = (values) => {
    console.log(values);
    let total = 0;

    // Calculate-services-price
    for (let i = 0; i < values?.servicesId?.length; i++) {
      for (let j = 0; j < servicesList?.length; j++) {
        if (values?.servicesId[i] === servicesList[j]._id) {
          total += Number(servicesList[j]?.price);
        }
      }
    }
    // calculate-other-services
    for (let i = 0; i < totalOtherServices?.length; i++) {
      total += Number(totalOtherServices[i]?.price);
    }
    // calculate-product-price
    for (let i = 0; i < allSalesProdList?.length; i++) {
      const price =
        Number(allSalesProdList[i]?.salePrice) -
        Number(allSalesProdList[i]?.discount);
      total += Number(price);
    }

    total = total - Number(values?.discount);

    setTotalBill(total);
    console.log(allSalesProdList);
    console.log(total);
    setIsEdit(true);
    setDisableField(true);
  };

  // Handle-Edit-Order
  const handleEditOrder = () => {
    setDisableField(false);
    setIsEdit(false);
  };

  console.log("isEdit", isEdit);

  return (
    <>
      {returnModel ? (
        <ReturnProductModel
          show={returnModel}
          onHide={() => setReturnModel(false)}
          product={selectedReturnProduct}
          refreshList={(value) => setRefreshList(value)}
          title={`Return Product`}
        />
      ) : (
        ""
      )}
      {!returnModel ? (
        <ToastContainer position="top-center" toastClassName="carCare-toast" />
      ) : (
        ""
      )}

      <Typography variant="h2" color="txt_primary" fw="bold">
        Add Customers <span className="primary">Order</span>
      </Typography>
      <div className="container-fluid mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div className="row">
                <div className="col-6">
                  <InputField
                    behave="normal"
                    size="md"
                    type="text"
                    defaultValue={customerInfo?.name}
                    label="Customer Name"
                    disabled={true}
                  />
                </div>
                {/* {console.log(formik)} */}
                <div className="col-6">
                  <Selectbox
                    array={customerInfo?.vehicles?.map((element) => {
                      return {
                        value: element?._id,
                        name: `${element?.vehicleNo} (${element?.vehicleBrand})`,
                      };
                    })}
                    notSelected="Select Vehicle"
                    label="Vehicle #"
                    name="vehicleId"
                    formik={formik}
                  />
                </div>
              </div>
              <Typography
                variant="h3"
                color="txt_primary"
                fw="bold"
                style="my-3"
              >
                <i>Select Services</i>
              </Typography>
              <div className="bg_secondary_low px-5 py-4">
                <div className="row">
                  {servicesList?.map((value, index) => (
                    <div className="col-4 mb-4" key={index}>
                      <Checkbox
                        label={`${value?.name} (${value?.price})`}
                        name="servicesId"
                        value={value?._id}
                        disabled={disableField}
                      />
                    </div>
                  ))}
                </div>
                <Typography
                  variant="h3"
                  color="txt_primary"
                  fw="bold"
                  style="my-3"
                >
                  Others
                </Typography>
                {/* Read-Others-services-start */}
                {totalOtherServices?.map((val, index) => (
                  <div
                    className="row d-flex align-items-center my-2"
                    key={index}
                  >
                    <div className="col-5">
                      <Typography
                        variant="body2"
                        color="txt_primary"
                        style="border py-2 px-3 rounded"
                        fw="semibold"
                      >
                        <i>{val?.name}</i>
                      </Typography>
                    </div>
                    <div className="col-5">
                      <Typography
                        variant="body2"
                        color="txt_primary"
                        style="border py-2 px-3 rounded"
                        fw="semibold"
                      >
                        {val?.price}
                      </Typography>
                    </div>
                    <div className="col-2 d-flex justify-content-end">
                      <Button
                        type="button"
                        size="md"
                        title="ADD"
                        align="ms-auto me-3"
                        classes="cursor-disable"
                        disabled={true}
                      >
                        <i className="text-white m-0">
                          <Icons.FaIcons.FaPlus />
                        </i>
                      </Button>
                      <Button
                        type="button"
                        size="md"
                        title="Delete"
                        classes="bg-danger"
                        onClick={() => removeOtherService(index)}
                      >
                        <i className="text-white m-0">
                          <Icons.AiIcons.AiFillDelete />
                        </i>
                      </Button>
                    </div>
                  </div>
                ))}
                {/* Create-services-Start */}
                <div className="row">
                  <div className="col-5">
                    <InputField
                      behave="normal"
                      size="md"
                      type="text"
                      name="name"
                      value={otherServices?.name}
                      onChange={otherServicesHandler}
                      placeholder="Enter Service Name"
                      disabled={disableField}
                    />
                  </div>
                  <div className="col-5">
                    <InputField
                      behave="normal"
                      size="md"
                      type="number"
                      name="price"
                      value={otherServices?.price}
                      onChange={otherServicesHandler}
                      placeholder="Enter Service Price"
                      disabled={disableField}
                    />
                  </div>
                  <div className="col-2 d-flex justify-content-end">
                    <Button
                      type="button"
                      size="md"
                      title="ADD"
                      align="ms-auto me-3"
                      onClick={otherServiceSubmit}
                    >
                      <i className="text-white m-0">
                        <Icons.FaIcons.FaPlus />
                      </i>
                    </Button>
                    <Button
                      type="button"
                      size="md"
                      title="Delete"
                      classes="cursor-disable bg-danger"
                      disabled={true}
                    >
                      <i className="text-white m-0">
                        <Icons.AiIcons.AiFillDelete />
                      </i>
                    </Button>
                  </div>
                </div>
                {/* Create-services-End */}
              </div>
              {/* if-oil-change-service-is-selected-start */}
              <div className="row mt-5">
                <div className="col-4">
                  <InputField
                    label="Current Mileage"
                    name="currentMileage"
                    placeholder="Enter Current Mileage"
                    formik={formik}
                    disabled={disableField}
                  />
                </div>
                <div className="col-4">
                  <InputField
                    label="Best KM spend"
                    name="bestKM"
                    placeholder="Enter Best KM"
                    formik={formik}
                    disabled={disableField}
                  />
                </div>
                <div className="col-4">
                  <InputField
                    behave="normal"
                    size="md"
                    type="text"
                    disabled={true}
                    label="Mileage to need change the oil"
                  />
                </div>
              </div>
              {/* if-oil-change-service-is-selected-end */}
              {/* sale-product-start */}
              <hr className="my-5" />
              <Typography
                variant="h3"
                color="txt_primary"
                fw="bold"
                style="mt-5 mb-3"
              >
                <i>Sale Products</i>
              </Typography>
              <div className="row">
                <div className="col-4">
                  <AutoCompleteInput
                    behave="normal"
                    size="md"
                    type="text"
                    name="productName"
                    placeholder="Select Product"
                    list={productList}
                    selectedProd={(value) => setSelectedProd(value)}
                    disabled={disableField}
                  />
                </div>
                <div className="col-3">
                  <InputField
                    behave="normal"
                    size="md"
                    type="number"
                    placeholder="Enter Quantity"
                    name="quantity"
                    value={saleProd?.quantity}
                    onChange={prodSaleHandler}
                    min="0"
                    step="any"
                    disabled={disableField}
                  />
                </div>
                <div className="col-3">
                  <InputField
                    behave="normal"
                    size="md"
                    type="number"
                    name="discount"
                    value={saleProd?.discount}
                    onChange={prodSaleHandler}
                    placeholder="Enter Discount"
                    min="0"
                    disabled={disableField}
                  />
                </div>
                <div className="col-2">
                  <Button
                    type="button"
                    size="md"
                    title="Sale Product"
                    align="mx-auto"
                    classes="w-100 justify-content-center"
                    onClick={saleProductFun}
                  >
                    Sale Now
                  </Button>
                </div>
              </div>
              <div id="productError" className="error-msg mb-3"></div>
              {/* product-list */}
              <Table theading={staticData.productOrderSaleTableHeadings}>
                {allSalesProdList?.map((val, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val?.name || ""}</td>
                    <td>
                      {val?.quantity.$numberDecimal || 0}{" "}
                      {val?.productType === "liquid" ? "ltr" : ""}
                    </td>
                    <td>
                      {`(${val?.quantity.$numberDecimal} x ${
                        val?.salePrice
                      }) , ${val?.salePrice * val?.quantity.$numberDecimal}`}
                    </td>
                    <td>{val?.discount || 0}</td>
                    <td>
                      {val?.salePrice * val?.quantity.$numberDecimal -
                        val?.discount}
                    </td>
                    <td>
                      <Button
                        type="button"
                        onClick={() => handleReturnedProduct(val)}
                        btn="secondary"
                        size="sm"
                        align="mx-auto"
                      >
                        Return
                      </Button>
                    </td>
                  </tr>
                ))}
              </Table>
              {/* sale-product-end */}
              <hr className="my-5" />
              <div className="row mt-4">
                <div className="col-6">
                  <InputField
                    label="Discount"
                    name="discount"
                    placeholder="Enter Discount"
                    formik={formik}
                  />
                </div>
                <div className="col-6">
                  <InputField
                    label="Grand Total"
                    behave="normal"
                    size="md"
                    type="text"
                    value={totalBill}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="mt-5 d-flex">
                {isEdit ? (
                  <div>
                    <Button
                      type="button"
                      size="lg"
                      title="Edit Order"
                      align="mx-auto"
                      variant="outline"
                      onClick={handleEditOrder}
                    >
                      Edit
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      title="Create Order"
                      align="mx-auto"
                      variant="outline"
                    >
                      Create Order
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    title="Submit the Order"
                    align="mx-auto"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
