import React, { useState } from "react";
//Formik
import { Formik, Form } from "formik";
// Components
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
// schema
import { initialValues, validationSchema } from "./schema";
// service
import { adminLoginApi } from "@services/auth";
// react-router-dom
import { useNavigate } from "react-router-dom";
// react-icons
import Icons from "@helper/icons";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";
// ----Loader---- //
import { PulseLoader } from "react-spinners";

export default function CustomForm() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const onSubmit = async (values) => {
    setLoader(true);
    await adminLoginApi(values).then((response) => {
      // Toast-code-start
      toast.promise(toastPromise(response), {
        pending: "Please wait...",
        success: {
          render({ data }) {
            const adminInfo = response?.data?.data;
            localStorage.setItem("TOKEN", adminInfo?._id);
            setTimeout(() => {
              navigate("/");
            }, 1500);
            return `${data}`;
          },
          autoClose: 1500,
        },
        error: {
          render({ data }) {
            return `${data} `;
          },
          autoClose: 3000,
        },
      });
    });
    setLoader(false);
  };

  return (
    <>
      <ToastContainer position="top-center" toastClassName="carCare-toast" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <InputField
              label="Phone Number"
              name="phone"
              placeholder="Enter Phone No"
              formik={formik}
            />
            <InputField
              type="password"
              label="Password"
              name="password"
              placeholder="Enter Password"
              formik={formik}
              margin="mb-5"
            />
            <Button
              type="submit"
              size="md"
              align="mx-auto"
              startIcon={<Icons.FiIcons.FiUserCheck />}
            >
              {loader ? <PulseLoader color={"#fff"} size={8} /> : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
