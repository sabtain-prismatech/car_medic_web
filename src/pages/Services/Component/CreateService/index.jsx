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
import { createServiceApi } from "@services/service";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";

function CreateServiceModel(props) {
  const { onHide, updateServiceList } = props;

  // onSubmit
  const onSubmit = async (values) => {
    await createServiceApi(values).then((response) => {
      // Toast-code-start
      toast.promise(toastPromise(response), {
        pending: "Please wait...",
        success: {
          render({ data }) {
            updateServiceList(true);
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
                label="Name"
                formik={formik}
                name="name"
                placeholder="Enter Service Name"
              />
              <InputField
                label="Price"
                formik={formik}
                name="price"
                placeholder="Enter Price"
              />
              <InputField
                label="Description"
                formik={formik}
                name="description"
                placeholder="Enter Description"
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

export default CreateServiceModel;
