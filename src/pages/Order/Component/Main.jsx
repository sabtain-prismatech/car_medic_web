import React, { useEffect, useState } from "react";
// components
import Typography from "@components/SharedComponents/Typography";
import InputField from "@components/SharedComponents/InputField";
import Selectbox from "@components/SharedComponents/Selectbox";
import Radio from "@components/SharedComponents/Radio";
import Button from "@components/SharedComponents/Button";
// formik
import { Formik, Form, ErrorMessage } from "formik";
// schema
import { initialValues, validationSchema } from "./schema";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";
// services
import { serviceListApi } from "@services/service";

export default function Main() {
  const [servicesList, setServicesList] = useState([]);

  const customerInfo = JSON.parse(localStorage.getItem("CUSTOMER_INFO"));

  // get-all-vehicle-API-start
  const getServicesList = async () => {
    const params = {
      name: "",
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
    };
    await serviceListApi(params).then((response) => {
      if (response?.data?.success) {
        setServicesList(response?.data?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-vehicle-API-end

  useEffect(() => {
    getServicesList();
  }, []);

  const onSubmit = () => {};

  return (
    <>
      <Typography variant="h2" color="txt_primary" fw="bold">
        Add Customers <span className="primary">Order</span>
      </Typography>
      <div className="container-fluid mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div className="row">
                <div className="col-6">
                  <InputField
                    behave="normal"
                    size="md"
                    type="text"
                    defaultValue={customerInfo?.name}
                    label="Customer Name"
                    disabled={true}
                  />
                </div>
                <div className="col-6">
                  <Selectbox
                    array={customerInfo?.vehicles?.map((element) => {
                      return {
                        value: element?._id,
                        name: `${element?.vehicleNo} (${element?.vehicleBrand})`,
                      };
                    })}
                    notSelected="Select Vehicle"
                    label="Vehicle #"
                    name="vehicleId"
                    formik={formik}
                  />
                </div>
              </div>
              <Typography
                variant="h3"
                color="txt_primary"
                fw="bold"
                style="my-3"
              >
                <i>Which services you purchase please select</i>
              </Typography>
              <div className="bg_secondary_low px-5 py-4">
                <div className="row">
                  <div className="col-4"></div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
