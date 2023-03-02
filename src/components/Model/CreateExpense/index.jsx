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
import { createExpenseApi } from "@services/expense";

function CreateExpenseModel(props) {
  const { onHide, updateExpenseList } = props;

  // onSubmit
  const onSubmit = async (values) => {
    await createExpenseApi(values).then((response) => {
      if (response?.data?.success) {
        document.getElementById("expenseResult").innerText =
          response?.data?.message;
        setTimeout(() => {
          updateExpenseList(true);
          onHide();
        }, 3000);
      } else {
        document.getElementById("expenseResult").innerText =
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
                    <label htmlFor="">Title</label>
                    <br />
                    <Field
                      type="text"
                      name="title"
                      className="mt-3"
                      placeholder="Enter title"
                    />
                    <ErrorMessage
                      name="title"
                      component="h6"
                      className="error-msg mt-2"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="">Amount</label>
                    <br />
                    <Field
                      type="text"
                      name="amount"
                      className="mt-3"
                      placeholder="Enter vehicle amount"
                    />
                    <ErrorMessage
                      name="amount"
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

                  <div className="text-center mt-5">
                    <button type="submit">Create</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div id="expenseResult"></div>
        </div>
      </Modal>
    </>
  );
}

export default CreateExpenseModel;
