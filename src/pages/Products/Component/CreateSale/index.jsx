import React from "react";
//Modal
import ModelPopup from "@components/SharedComponents/Model";
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
// Icons
import Icons from "@helper/icons";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";
// services
import { createSaleProductApi } from "@services/products";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";

function CreateSalesModel(props) {
  const { onHide, updateProductList, product } = props;

  // onSubmit
  const onSubmit = async (values) => {
    await createSaleProductApi(values).then((response) => {
      // Toast-code-start
      toast.promise(toastPromise(response), {
        pending: "Please wait...",
        success: {
          render({ data }) {
            updateProductList(true);
            setTimeout(() => {
              onHide();
            }, 1500);
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

  return (
    <>
      <ModelPopup {...props}>
        <ToastContainer position="top-center" toastClassName="carCare-toast" />
        <Formik
          initialValues={initialValues(product)}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form>
              <div className="row">
                <div className="col-6">
                  <InputField
                    label="Customer Name"
                    formik={formik}
                    name="customerName"
                    placeholder="Enter Customer Name"
                  />
                </div>
                <div className="col-6">
                  <InputField
                    label="Product Name"
                    formik={formik}
                    name="name"
                    placeholder="Enter Product Name"
                    readOnly={true}
                  />
                </div>
                <div className="col-6">
                  <InputField
                    type="number"
                    label="Quantity"
                    formik={formik}
                    name="quantity"
                    min="0"
                    max={product?.quantity?.$numberDecimal}
                    step="any"
                    placeholder="Enter Quantity"
                  />
                </div>
                <div className="col-6">
                  <InputField
                    label="Buy Price"
                    formik={formik}
                    name="buyPrice"
                    placeholder="Enter Buy Price"
                    readOnly={true}
                  />
                </div>
                <div className="col-6">
                  <InputField
                    label="Sale Price"
                    formik={formik}
                    name="salePrice"
                    placeholder="Enter Sale Price"
                    readOnly={true}
                  />
                </div>
                <div className="col-6">
                  <InputField
                    label="Discount"
                    formik={formik}
                    name="discount"
                    placeholder="Enter Discount"
                  />
                </div>
              </div>
              <div className="text-center mt-5">
                <Button type="submit" align="mx-auto">
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModelPopup>
    </>
  );
}

export default CreateSalesModel;
