import React from "react";
//Formik
import { Field } from "formik";
// style
import "@styles/scss/sharedComponent/form.scss";

export default function Checkbox({ label, name, value,disabled }) {
  return (
    <>
      <label className="checkbox-label">
        <Field type="checkbox" name={name} value={value} className="me-2" disabled={disabled} />
        {label}
      </label>
    </>
  );
}
