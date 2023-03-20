import React from "react";
//Modal
import Modal from "react-bootstrap/Modal";
// Icons
import Icons from "@helper/icons";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";
// services
import { createProductApi } from "@services/products";

function CreateProductModel(props) {
  const { onHide, updateProductList } = props;

  // onSubmit
  const onSubmit = async (values) => {
    await createProductApi(values).then((response) => {
      if (response?.data?.success) {
        document.getElementById("productResult").innerText =
          response?.data?.message;
        setTimeout(() => {
          updateProductList(true);
          onHide();
        }, 3000);
      } else {
        document.getElementById("productResult").innerText =
          response?.data?.message;
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
        <div className="delete-modal-wrapper p-5">
          <div className="d-flex justify-content-end ">
            <div className="bg-e50a1e width-50-px height-50 d-flex justify-content-center align-items-center br-50-px">
              <i className="text-danger f-24-px " onClick={onHide}>
                <Icons.AiIcons.AiOutlineClose />
              </i>
            </div>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ values }) => (
                <Form>
                  <div className="mt-3">
                    <label htmlFor="">Product Name</label>
                    <br />
                    <Field
                      type="text"
                      name="name"
                      className="mt-3"
                      placeholder="Enter product name"
                    />
                    <ErrorMessage
                      name="name"
                      component="h6"
                      className="error-msg mt-2"
                    />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="">Description</label>
                    <br />
                    <Field
                      type="text"
                      name="description"
                      className="mt-3"
                      placeholder="Enter Description"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="">Quantity</label>
                    <br />
                    <Field
                      type="text"
                      name="quantity"
                      className="mt-3"
                      placeholder="Enter quantity"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="h6"
                      className="error-msg mt-2"
                    />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="">Buy Price</label>
                    <br />
                    <Field
                      type="text"
                      name="price"
                      className="mt-3"
                      placeholder="Enter  price"
                    />
                    <ErrorMessage
                      name="price"
                      component="h6"
                      className="error-msg mt-2"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="">Sale Price</label>
                    <br />
                    <Field
                      type="text"
                      name="salePrice"
                      className="mt-3"
                      placeholder="Enter salePrice"
                    />
                    <ErrorMessage
                      name="salePrice"
                      component="h6"
                      className="error-msg mt-2"
                    />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="">Product Type</label>
                    <br />
                    <label htmlFor="">
                      <Field type="radio" name="productType" value="solid" />
                      Solid
                    </label>
                    <label htmlFor="">
                      <Field type="radio" name="productType" value="liquid" />{" "}
                      Liquid
                    </label>
                    <ErrorMessage
                      name="productType"
                      component="h6"
                      className="error-msg mt-2"
                    />
                  </div>

                  <div className="text-center mt-5">
                    <button type="submit">Create</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div id="productResult"></div>
        </div>
      </Modal>
    </>
  );
}

export default CreateProductModel;
