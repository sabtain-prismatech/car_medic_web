import React from "react";
//Formik
import { Formik, Form, ErrorMessage } from "formik";
// Components
import InputField from "@components/InputField";
// schema
import { initialValues, validationSchema } from "./schema";
// service
import { adminLoginApi } from "@services/auth";
// react-router-dom
import { useNavigate } from "react-router-dom";

export default function CustomForm() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log(values);
    await adminLoginApi(values).then((response) => {
      if (response?.data?.success) {
        console.log(response?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <InputField name="phone" placeholder="Enter Phone No" />
          <br />
          <InputField name="password" placeholder="Enter Password" />
          <br />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
}
