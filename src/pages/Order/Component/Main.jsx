import React, { useEffect, useState } from "react";
// components
import Typography from "@components/SharedComponents/Typography";
import InputField from "@components/SharedComponents/InputField";
import Selectbox from "@components/SharedComponents/Selectbox";
import Checkbox from "@components/SharedComponents/Checkbox";
import Radio from "@components/SharedComponents/Radio";
import Button from "@components/SharedComponents/Button";
// Icons
import Icons from "@helper/icons";
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
import { serviceListSimpleApi } from "@services/service";

export default function Main() {
  const [servicesList, setServicesList] = useState([]);
  const [otherServices, setOtherService] = useState({
    name: "",
    price: "",
  });
  const [totalOtherServices, setTotalOtherServices] = useState([]);

  const customerInfo = JSON.parse(localStorage.getItem("CUSTOMER_INFO"));

  // get-all-vehicle-API-start
  const getServicesList = async () => {
    await serviceListSimpleApi({}).then((response) => {
      if (response?.data?.success) {
        setServicesList(response?.data?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-vehicle-API-end
  // Latest-other-services-start
  const latestOtherServices = () => {
    const localData = JSON.parse(localStorage.getItem("OTHER_SERVICES"));
    setTotalOtherServices(localData);
  };
  // Latest-other-services-end

  useEffect(() => {
    getServicesList();
    latestOtherServices();
  }, []);

  // Other-services-handler
  const otherServicesHandler = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setOtherService({ ...otherServices, [name]: value });
  };
  // Other-Service-submit
  const otherServiceSubmit = () => {
    let serviceArray = [];
    if (otherServices?.name !== "" && otherServices?.price !== "") {
      const localData = JSON.parse(localStorage.getItem("OTHER_SERVICES"));
      serviceArray = localData || [];
      serviceArray.push({
        name: otherServices?.name,
        price: otherServices?.price,
      });
      localStorage.setItem("OTHER_SERVICES", JSON.stringify(serviceArray));
      setOtherService({ name: "", price: "" });
    }
    latestOtherServices();
    console.log(serviceArray);
  };

  console.log(otherServices);

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
                  {servicesList?.map((value, index) => (
                    <div className="col-4 mb-4" key={index}>
                      <Checkbox
                        label={value?.name}
                        name="services"
                        value={value?._id}
                      />
                    </div>
                  ))}
                </div>
                <Typography
                  variant="h3"
                  color="txt_primary"
                  fw="bold"
                  style="my-3"
                >
                  Others
                </Typography>
                {/* Read-Others-services-start */}
                {totalOtherServices?.map((val, index) => (
                  <div className="row" key={index}>
                    <div className="col-5">
                      <InputField
                        behave="normal"
                        size="md"
                        type="text"
                        defaultValue={val?.name || ""}
                        readOnly={true}
                        placeholder="Enter Service Name"
                      />
                    </div>
                    <div className="col-5">
                      <InputField
                        behave="normal"
                        size="md"
                        type="text"
                        defaultValue={val?.price || ""}
                        readOnly={true}
                        placeholder="Enter Service Price"
                      />
                    </div>
                    <div className="col-2 d-flex justify-content-end">
                      <Button
                        type="button"
                        size="md"
                        title="ADD"
                        align="ms-auto me-3"
                        classes="cursor-disable"
                        disabled={true}
                      >
                        <i className="text-white m-0">
                          <Icons.FaIcons.FaPlus />
                        </i>
                      </Button>
                      <Button
                        type="button"
                        size="md"
                        title="ADD"
                        classes="bg-danger"
                      >
                        <i className="text-white m-0">
                          <Icons.AiIcons.AiFillDelete />
                        </i>
                      </Button>
                    </div>
                  </div>
                ))}
                {/* Create-services-Start */}
                <div className="row">
                  <div className="col-5">
                    <InputField
                      behave="normal"
                      size="md"
                      type="text"
                      name="name"
                      value={otherServices?.name}
                      onChange={otherServicesHandler}
                      placeholder="Enter Service Name"
                    />
                  </div>
                  <div className="col-5">
                    <InputField
                      behave="normal"
                      size="md"
                      type="number"
                      name="price"
                      value={otherServices?.price}
                      onChange={otherServicesHandler}
                      placeholder="Enter Service Price"
                    />
                  </div>
                  <div className="col-2 d-flex justify-content-end">
                    <Button
                      type="button"
                      size="md"
                      title="ADD"
                      align="ms-auto me-3"
                      onClick={otherServiceSubmit}
                    >
                      <i className="text-white m-0">
                        <Icons.FaIcons.FaPlus />
                      </i>
                    </Button>
                    <Button
                      type="button"
                      size="md"
                      title="ADD"
                      classes="bg-danger"
                    >
                      <i className="text-white m-0">
                        <Icons.AiIcons.AiFillDelete />
                      </i>
                    </Button>
                  </div>
                </div>
                {/* Create-services-End */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
