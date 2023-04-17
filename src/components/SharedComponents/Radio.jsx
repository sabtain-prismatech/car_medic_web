import React from "react";
//Formik
import { Field } from "formik";

export default function Radio({ label, name, value }) {
  return (
    <>
      <label className="radio-label">
        <Field type="radio" name={name} value={value} className="me-2" />
        {label}
      </label>
    </>
  );
}
