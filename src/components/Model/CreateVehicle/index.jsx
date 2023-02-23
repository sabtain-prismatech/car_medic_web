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
import { createVehicleApi } from "@services/vehicle";

function CreateVehicleModel(props) {
  const { onHide, customerInfo, updateCustomerList } = props;

  // onSubmit
  const onSubmit = async (values) => {
    console.log(values);
    values = { ...values, customerId: customerInfo._id };
    await createVehicleApi(values).then((response) => {
      if (response?.data?.success) {
        document.getElementById("vehicleResult").innerText =
          response?.data?.message;
        setTimeout(() => {
          updateCustomerList(true);
          onHide();
        }, 3000);
        console.log(response.data);
      } else {
        document.getElementById("vehicleResult").innerText =
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
                    <label htmlFor="">Customer Name</label>
                    <br />
                    <input type="text" defaultValue={customerInfo?.name} />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="">Vehicle No</label>
                    <br />
                    <Field
                      type="text"
                      name="vehicleNo"
                      className="mt-3"
                      placeholder="Enter vehicle no"
                    />
                    <ErrorMessage
                      name="vehicleNo"
                      component="h6"
                      className="error-msg mt-2"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="">Vehicle Brand</label>
                    <br />
                    <Field
                      type="text"
                      name="vehicleBrand"
                      className="mt-3"
                      placeholder="Enter vehicle brand"
                    />
                    <ErrorMessage
                      name="vehicleBrand"
                      component="h6"
                      className="error-msg mt-2"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="">Vehicle Model</label>
                    <br />
                    <Field
                      type="text"
                      name="vehicleModel"
                      className="mt-3"
                      placeholder="Enter vehicle model"
                    />
                    <ErrorMessage
                      name="vehicleModel"
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
          <div id="vehicleResult"></div>
        </div>
      </Modal>
    </>
  );
}

export default CreateVehicleModel;
