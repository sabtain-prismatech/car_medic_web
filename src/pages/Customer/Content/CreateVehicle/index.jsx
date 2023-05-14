import React from "react";
//Modal
import ModelPopup from "@components/SharedComponents/Model";
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
// Icons
import Icons from "@helper/icons";
// formik
import { Formik, Form } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";
// services
import { createVehicleApi } from "@services/vehicle";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";

function CreateVehicleModel(props) {
  const { onHide, customerInfo, updateCustomerList } = props;

  // onSubmit
  const onSubmit = async (values) => {
    console.log(values);
    values = { ...values, customerId: customerInfo._id };
    await createVehicleApi(values).then((response) => {
      // Toast-code-start
      toast.promise(toastPromise(response), {
        pending: "Please wait...",
        success: {
          render({ data }) {
            updateCustomerList(true);
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
                behave="normal"
                size="md"
                type="text"
                defaultValue={customerInfo?.name}
                label="Customer Name"
                disabled={true}
              />
              <InputField
                label="Vehicle No"
                formik={formik}
                name="vehicleNo"
                placeholder="Enter Vehicle No"
              />
              <InputField
                label="Vehicle Brand"
                formik={formik}
                name="vehicleBrand"
                placeholder="Enter Vehicle Brand"
              />
              <InputField
                label="Vehicle Model"
                formik={formik}
                name="vehicleModel"
                placeholder="Enter Vehicle Model"
              />
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

export default CreateVehicleModel;
