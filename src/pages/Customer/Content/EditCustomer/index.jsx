import React from "react";
//components
import ModelPopup from "@components/SharedComponents/Model";
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
import Checkbox from "@components/SharedComponents/Checkbox";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";
// services
import { updateCustomerApi } from "@services/customer";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";

function EditCustomerModel(props) {
  const { onHide, customerInfo, updateCustomerList } = props;
  console.log(customerInfo);

  // onSubmit
  const onSubmit = async (values) => {
    console.log(values);
    await updateCustomerApi(values, customerInfo._id).then((response) => {
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
          initialValues={initialValues(customerInfo)}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form>
              <InputField
                label="Name"
                formik={formik}
                name="name"
                placeholder="Enter Customer Name"
              />
              <InputField
                label="Location"
                formik={formik}
                name="location"
                placeholder="Enter Customer Location"
              />
              <InputField
                label="Phone #"
                formik={formik}
                name="phone"
                placeholder="Enter Customer Phone No"
              />
              <Checkbox label="Do you have whatsapp Number?" name="whatsapp" />
              <div className="text-center mt-4">
                <Button type="submit" align="mx-auto">
                  Edit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModelPopup>
    </>
  );
}

export default EditCustomerModel;
