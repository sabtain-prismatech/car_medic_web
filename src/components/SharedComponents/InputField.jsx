import React, { useState } from "react";
//Formik
import { Field, ErrorMessage } from "formik";
// style
import "@styles/scss/sharedComponent/form.scss";
// react-icons
import Icons from "@helper/icons";

export default function InputField({
  behave = "formik",
  type = "text",
  onChange,
  label,
  name,
  formik,
  placeholder = "Enter Input",
  disabled = false,
  size = "md",
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="input-field-wrapper">
        {label && (
          <label htmlFor={`${type}_${name}`} className={`d-block mb-1 ${size}`}>
            {label}
          </label>
        )}
        <div className={`${size} input-wrapper`}>
          {behave === "formik" ? (
            <Field
              type={showPassword ? "text" : type}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              id={`${type}_${name}`}
              className={`input ${
                formik.errors?.[name] && formik.touched?.[name]
                  ? "danger"
                  : formik.touched?.[name] && "success"
              }`}
            />
          ) : (
            <input
              type={showPassword ? type : "text"}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              className="custom-input border border-success w-100"
            />
          )}
          {type === "password" ? (
            <i
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Icons.BsIcons.BsEye />
              ) : (
                <Icons.BsIcons.BsEyeSlash />
              )}
            </i>
          ) : formik.errors?.[name] && formik.touched?.[name] ? (
            <i className="danger">
              <Icons.MdIcons.MdNotInterested />
            </i>
          ) : (
            formik.touched?.[name] && (
              <i className="success">
                <Icons.BsIcons.BsCheck2Square />
              </i>
            )
          )}
        </div>
      </div>
      <ErrorMessage name={name} component="h6" className="error-msg mt-2" />
    </>
  );
}
