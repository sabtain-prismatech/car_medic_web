import React, { useState } from "react";
//Formik
import { Field, ErrorMessage } from "formik";

export default function Selectbox({ notSelected, array }) {
  return (
    <>
      <Field as="select" name="">
        {notSelected && <option value="">{notSelected}</option>}
        {array?.map((val, index) => (
          <option value={val} key={index}>
            {val}
          </option>
        ))}
      </Field>
    </>
  );
}
