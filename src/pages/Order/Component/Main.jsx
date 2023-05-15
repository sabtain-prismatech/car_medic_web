import React from "react";
// components
import Typography from "@components/SharedComponents/Typography";
import InputField from "@components/SharedComponents/InputField";
import Selectbox from "@components/SharedComponents/Selectbox";
import Radio from "@components/SharedComponents/Radio";
import Button from "@components/SharedComponents/Button";
// formik
import { Formik, Form, ErrorMessage } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";

export default function Main() {
  const onSubmit = () => {};

  return (
    <>
      <Typography variant="h2" color="txt_primary" fw="bold">
        Add Customers <span class="primary">Order</span>
      </Typography>
      <div className="container-fluid mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div className="row">
                <div className="col-6">
                  <InputField
                    behave="normal"
                    size="md"
                    type="text"
                    defaultValue={"Ali"}
                    label="Customer Name"
                    disabled={true}
                  />
                </div>
                <div className="col-6">
                  <Selectbox
                    array={[]}
                    notSelected="Select Vehicle"
                    label="Vehicle #"
                    name="vehicleId"
                    formik={formik}
                  />
                </div>
              </div>
              <Typography
                variant="h3"
                color="txt_primary"
                fw="bold"
                style="my-3"
              >
                <i>Which services you purchase please select</i>
              </Typography>
              <div className="bg_secondary_low px-5 py-4"></div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
