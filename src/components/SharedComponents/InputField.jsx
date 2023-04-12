import React from "react";
//Formik
import { Field, ErrorMessage } from "formik";
export default function InputField({
  behave = "formik",
  type = "text",
  onChange,
  label,
  name,
  formik,
  placeholder = "",
  disabled = false,
}) {
  return (
    <>
      <div>
        {label && (
          <label htmlFor={`${type}_${name}`} className="d-block">
            {label}
          </label>
        )}
        {behave === "formik" ? (
          <Field
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            id={`${type}_${name}`}
            className={
              formik.errors?.[name] && formik.touched?.[name]
                ? "border border-danger"
                : "border border-success"
            }
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
      </div>
      <ErrorMessage name={name} component="h6" className="error-msg mt-1" />
    </>
  );
}