import React from "react";
//Formik
import { Formik, Form, ErrorMessage } from "formik";
// Components
import InputField from "@components/InputField";
// schema
import { initialValues, validationSchema } from "./schema";
// service
import { adminRegisterApi } from "@services/auth";
// react-router-dom
import { useNavigate } from "react-router-dom";

export default function CustomForm() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log(values);
    await adminRegisterApi(values).then((response) => {
      if (response?.data?.success) {
        console.log(response?.data);
        navigate("/login");
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
          <InputField name="firstName" placeholder="Enter First Name" />
          <br />
          <ErrorMessage
            name="firstName"
            component="h6"
            className="error-msg mt-2"
          />
          <InputField name="lastName" placeholder="Enter Last Name" />
          <br />
          <InputField name="phone" placeholder="Enter Phone No" />
          <br />
          <InputField name="password" placeholder="Enter Password" />
          <br />
          <InputField
            name="confirmPassword"
            placeholder="Enter Confirm Password"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
}
