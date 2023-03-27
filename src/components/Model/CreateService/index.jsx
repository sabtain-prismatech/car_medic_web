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
import { createServiceApi } from "@services/service";

function CreateServiceModel(props) {
  const { onHide, updateServiceList } = props;

  // onSubmit
  const onSubmit = async (values) => {
    await createServiceApi(values).then((response) => {
      if (response?.data?.success) {
        console.log("If is trigger");
        document.getElementById("servicesResult").innerText =
          response?.data?.message;
        setTimeout(() => {
          updateServiceList(true);
          onHide();
        }, 3000);
      } else {
        console.log("Else is trigger");
        document.getElementById("servicesResult").innerText =
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
              <Form>
                <div className="mt-3">
                  <label htmlFor="">Name</label>
                  <br />
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
                </div>
                <div className="mt-3">
                  <label htmlFor="">Price</label>
                  <br />
                  <Field
                    type="text"
                    name="price"
                    className="mt-3"
                    placeholder="Enter vehicle price"
                  />
                  <ErrorMessage
                    name="price"
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
            </Formik>
          </div>
          <div id="servicesResult"></div>
        </div>
      </Modal>
    </>
  );
}

export default CreateServiceModel;
