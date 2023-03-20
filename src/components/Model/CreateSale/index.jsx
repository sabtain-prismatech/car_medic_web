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
import { createSaleProductApi } from "@services/products";

function CreateSalesModel(props) {
  const { onHide, updateProductList, product } = props;

  // onSubmit
  const onSubmit = async (values) => {
    await createSaleProductApi(values).then((response) => {
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
              initialValues={initialValues(product)}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              enableReinitialize={true}
            >
              {({ values }) => (
                <Form>
                  <div className="mt-3">
                    <label htmlFor="">Customer Name</label>
                    <br />
                    <Field
                      type="text"
                      name="customerName"
                      className="mt-3"
                      placeholder="Enter customer Name"
                    />
                    <ErrorMessage
                      name="customerName"
                      component="h6"
                      className="error-msg mt-2"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="">Product Name</label>
                    <br />
                    <Field
                      type="text"
                      name="name"
                      className="mt-3"
                      placeholder="Enter product name"
                      readOnly={true}
                    />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="">Quantity</label>
                    <br />
                    <Field
                      type="number"
                      name="quantity"
                      min="0"
                      max={product?.quantity?.$numberDecimal}
                      className="mt-3 w-100"
                      placeholder="Enter quantity"
                      step="any"
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
                      name="buyPrice"
                      className="mt-3"
                      placeholder="Enter  buyPrice"
                      readOnly={true}
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
                      readOnly={true}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="">Discount</label>
                    <br />
                    <Field
                      type="text"
                      name="discount"
                      className="mt-3"
                      placeholder="Enter discount"
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

export default CreateSalesModel;
