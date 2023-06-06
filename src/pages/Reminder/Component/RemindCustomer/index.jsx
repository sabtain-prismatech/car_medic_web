import React from "react";
//Modal
import ModelPopup from "@components/SharedComponents/Model";
import Button from "@components/SharedComponents/Button";
import Typography from "@components/SharedComponents/Typography";
// Icons
import Icons from "@helper/icons";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";

function RemindCustomerModel(props) {
  const { selectedOrder } = props;
  return (
    <>
      <ModelPopup {...props}>
        <ToastContainer position="top-center" toastClassName="carCare-toast" />
        <Typography variant="h3" fw="bold">
          CarMadic Reminder!
        </Typography>
        <Typography variant="body1">
          Hello{" "}
          <b>
            <u>{selectedOrder?.customerId?.name}</u>
          </b>{" "}
          It's time for your car's oil change at CarMadic. Our records show that
          your last oil change was at <b>{selectedOrder?.currentMileage}</b>. To
          ensure optimal performance, we recommend changing the oil at{" "}
          <b>{selectedOrder?.currentMileage + selectedOrder?.bestKM}</b>. Visit
          us soon for a smooth and efficient ride!
        </Typography>
      </ModelPopup>
    </>
  );
}

export default RemindCustomerModel;
