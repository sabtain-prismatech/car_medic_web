import React, { useEffect, useState } from "react";
//Modal
import ModelPopup from "@components/SharedComponents/Model";
import Typography from "@components/SharedComponents/Typography";
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
// Icons
import Icons from "@helper/icons";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// services
import { returnProductApi } from "@services/products";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";

function ReturnProductModel(props) {
  const { onHide, product, refreshList } = props;
  console.log(product);

  // Initial-Values
  const initialValues = {
    adminPassword: "",
  };
  // validation
  const validationSchema = Yup.object().shape({
    adminPassword: Yup.string().required("Required"),
  });
  // onSubmit
  const onSubmit = async (values) => {
    console.log(values);
    const adminId = localStorage.getItem("TOKEN");
    const payload = {
      quantity: product?.quantity?.$numberDecimal,
      buyPrice: product?.buyPrice,
      salePrice: product?.salePrice,
      discount: product?.discount || 0,
      profit: product?.profit,
      productId: product?.productId,
      saleHistoryId: product?._id,
      adminId: adminId,
      adminPassword: values?.adminPassword,
    };

    await returnProductApi(payload).then((response) => {
      // Toast-code-start
      toast.promise(toastPromise(response), {
        pending: "Please wait...",
        success: {
          render({ data }) {
            refreshList(true);
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
              <div className="return-modal-wrapper">
                <Typography
                  variant="h3"
                  fw="b"
                  style="text-center mb-4 mt-5"
                  color="txt_primary"
                >
                  Are you sure to return the <b>{product?.name}</b>, Quantity{" "}
                  <b>({product?.quantity.$numberDecimal || 0})</b> and Price{" "}
                  <b>
                    (
                    {product?.salePrice * product?.quantity.$numberDecimal -
                      product?.discount}
                    )
                  </b>
                </Typography>
                <InputField
                  label="Admin Password"
                  formik={formik}
                  type="password"
                  name="adminPassword"
                  placeholder="Enter Password"
                />

                <div className="mt-5 d-flex justify-content-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onHide}
                    align="ms-auto me-3"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </ModelPopup>
    </>
  );
}

export default ReturnProductModel;
