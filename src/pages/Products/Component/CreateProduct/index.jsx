import React from "react";
//Modal
import ModelPopup from "@components/SharedComponents/Model";
import InputField from "@components/SharedComponents/InputField";
import Radio from "@components/SharedComponents/Radio";
import Button from "@components/SharedComponents/Button";
// Icons
import Icons from "@helper/icons";
// formik
import { Formik, Form,  ErrorMessage } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";
// services
import { createProductApi } from "@services/products";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";

function CreateProductModel(props) {
  const { onHide, updateProductList } = props;

  // onSubmit
  const onSubmit = async (values) => {
    await createProductApi(values).then((response) => {
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
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <InputField
                label="Product Name"
                formik={formik}
                name="name"
                placeholder="Enter Name"
              />
              <InputField
                label="Description"
                formik={formik}
                name="description"
                placeholder="Enter Description"
              />
              <InputField
                label="Quantity"
                formik={formik}
                name="quantity"
                placeholder="Enter Quantity"
              />
              <InputField
                label="Buy Price"
                formik={formik}
                name="price"
                placeholder="Enter Buy Price"
              />
              <InputField
                label="Sale Price"
                formik={formik}
                name="salePrice"
                placeholder="Enter Sale Price"
              />
              <div className="mt-3">
                <label htmlFor="" className="md-label mb-2">
                  Product Type
                </label>
                <br />
                <Radio
                  label="Solid"
                  name="productType"
                  value="solid"
                  classes="me-3"
                />
                <Radio label="Liquid" name="productType" value="liquid" />
                <ErrorMessage
                  name="productType"
                  component="h6"
                  className="error-msg mt-2"
                />
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

export default CreateProductModel;
