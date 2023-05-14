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
      <ModelPopup {...props}>
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
                placeholder="Enter Customer Name"
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
              <InputField
                label="Phone"
                formik={formik}
                name="phone"
                placeholder="Enter Phone No"
              />
              <div className="text-center mt-5">
                <Button type="submit" align="mx-auto">
                  Filter
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModelPopup>
    </>
  );
}

export default CustomerFilterModel;
