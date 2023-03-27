import React, { useEffect, useState } from "react";
//Modal
import Modal from "react-bootstrap/Modal";
// Icons
import Icons from "@helper/icons";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// services
import { returnProductApi } from "@services/products";

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
      console.log(response);
      if (response?.data?.success) {
        document.getElementById("returnError").innerText =
          response?.data?.message;
        setTimeout(() => {
          refreshList(true);
          onHide();
        }, 2000);
      } else {
        document.getElementById("returnError").innerText =
          response?.data?.message;
        console.log(response?.data?.message);
      }
    });
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="return-modal-wrapper p-5">
              <h4>Are you sure to return the product</h4>
              <label>Please Enter Your Password</label> <br />
              <Field type="password" name="adminPassword" />
              <ErrorMessage
                name="adminPassword"
                component="h6"
                className="error-msg mt-2"
              />
              <div className="mt-4">
                <button type="submit">Submit</button>
                <button type="button" onClick={onHide}>Cancel</button>
              </div>
            </div>
            <div id="returnError"></div>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

export default ReturnProductModel;
