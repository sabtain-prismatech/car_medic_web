import React, { useState } from "react";
//Formik
import { Field, ErrorMessage } from "formik";
// react-icons
import Icons from "@helper/icons";

export default function Selectbox({
  notSelected,
  array,
  size = "md",
  label,
  name,
  formik,
}) {
  return (
    <>
      <div className="select-box-wrapper">
        {label && (
          <label htmlFor={`${name}`} className={`d-block mb-1 ${size}`}>
            {label}
          </label>
        )}
        <div className={`${size} select-inner`}>
          <Field
            as="select"
            name={name}
            id={`${name}`}
            className={`select-input ${
              formik.errors?.[name] && formik.touched?.[name]
                ? "danger"
                : formik.touched?.[name] && "success"
            }`}
          >
            {notSelected && <option value="">{notSelected}</option>}
            {array?.map((val, index) => (
              <option value={val} key={index}>
                {val}
              </option>
            ))}
          </Field>
          <i className="cursor-pointer">
            <Icons.MdIcons.MdKeyboardArrowDown />
          </i>
        </div>
      </div>
      <ErrorMessage name={name} component="h6" className="error-msg mt-2" />
    </>
  );
}
