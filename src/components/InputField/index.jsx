import React from "react";
//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function InputField({
  behave = "formik",
  type = "input",
  name,
  placeholder = "",
  onChange,
}) {
  return (
    <>
      {behave === "formik" ? (
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className="custom-input  border border-danger w-100"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="custom-input border border-success w-100"
        />
      )}
    </>
  );
}
