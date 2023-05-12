import React from "react";
//components
import ModelPopup from "@components/SharedComponents/Model";
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
import Checkbox from "@components/SharedComponents/Checkbox";
// formik
import { Formik, Form } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";
// services
import { CreateCustomersApi } from "@services/customer";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";

function CreateCustomerModel(props) {
  const { onHide, updateCustomerList } = props;

  // onSubmit
  const onSubmit = async (values) => {
    console.log(values);
    await CreateCustomersApi(values).then((response) => {
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
              <div className="row">
                <div className="col-6">
                  <InputField
                    label="Name"
                    formik={formik}
                    name="name"
                    placeholder="Enter Customer Name"
                  />
                </div>
                <div className="col-6">
                  <InputField
                    label="Vehicle No #"
                    formik={formik}
                    name="vehicleNo"
                    placeholder="Enter Vehicle No"
                  />
                </div>
                {formik?.values?.vehicleNo !== "" ? (
                  <>
                    <div className="col-6">
                      <InputField
                        label="Vehicle Brand"
                        formik={formik}
                        name="vehicleBrand"
                        placeholder="Enter Vehicle Brand"
                      />
                    </div>
                    <div className="col-6">
                      <InputField
                        label="Vehicle Model"
                        formik={formik}
                        name="vehicleModel"
                        placeholder="Enter Vehicle Model"
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="col-6">
                  <InputField
                    label="Location"
                    formik={formik}
                    name="location"
                    placeholder="Enter Customer Location"
                  />
                </div>
                <div className="col-6">
                  <InputField
                    label="Phone #"
                    formik={formik}
                    name="phone"
                    placeholder="Enter Customer Phone No"
                  />
                </div>
              </div>
              <Checkbox label="Do you have whatsapp Number?" name="whatsapp" />
              <div className="text-center mt-4">
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

export default CreateCustomerModel;
