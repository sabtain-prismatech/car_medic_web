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
import { CreateCustomersApi } from "@services/customer";

function CreateCustomerModel(props) {
  const { onHide } = props;

  // onSubmit
  const onSubmit = async (values) => {
    console.log(values);
    await CreateCustomersApi(values).then((response) => {
      if (response?.data?.success) {
        console.log(response.data);
      } else {
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
              <Form>
                <Field
                  type="text"
                  name="name"
                  className="mt-3"
                  placeholder="Enter name"
                />
                <ErrorMessage
                  name="name"
                  component="h6"
                  className="error-msg mt-2"
                />
                <Field
                  type="text"
                  name="vehicleNo"
                  className="mt-3"
                  placeholder="Enter vehicle no"
                />
                <Field
                  type="text"
                  name="vehicleBrand"
                  className="mt-3"
                  placeholder="Enter vehicle brand"
                />
                <Field
                  type="text"
                  name="vehicleModel"
                  className="mt-3"
                  placeholder="Enter vehicle model"
                />
                <Field
                  type="text"
                  name="location"
                  className="mt-3"
                  placeholder="Enter location"
                />
                <ErrorMessage
                  name="location"
                  component="h6"
                  className="error-msg mt-2"
                />
                <Field
                  type="text"
                  className="mt-3"
                  name="phone"
                  placeholder="Enter phone"
                />
                <ErrorMessage
                  name="phone"
                  component="h6"
                  className="error-msg mt-2"
                />
                <label htmlFor="" className="mt-3">
                  Do you have whatsapp Number?
                  <Field type="checkbox" name="whatsapp" />
                </label>
                <div className="text-center mt-5">
                  <button type="submit">Create</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateCustomerModel;
