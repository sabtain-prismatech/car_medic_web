import React from "react";
//Modal
import Modal from "react-bootstrap/Modal";
// Icons
import Icons from "@helper/icons";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";

function CustomerFilterModel(props) {
  const { onHide, filter } = props;

  // onSubmit
  const onSubmit = async (values) => {
    console.log(values);
    filter(values);
    onHide();
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
                  <div>
                    <Field
                      type="text"
                      name="name"
                      className="mt-3"
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="vehicleNo"
                      className="mt-3"
                      placeholder="Enter vehicle no"
                    />
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="vehicleBrand"
                      className="mt-3"
                      placeholder="Enter vehicle brand"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="vehicleModel"
                      className="mt-3"
                      placeholder="Enter vehicle model"
                    />
                  </div>

                  <div>
                    <Field
                      type="text"
                      className="mt-3"
                      name="phone"
                      placeholder="Enter phone"
                    />
                  </div>

                  <div className="text-center mt-5">
                    <button type="submit">Filter</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CustomerFilterModel;
