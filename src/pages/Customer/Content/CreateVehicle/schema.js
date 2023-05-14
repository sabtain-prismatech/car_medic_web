import * as Yup from "yup";

//initial values of login page
export const initialValues = {
  customerId: "",
  vehicleNo: "",
  vehicleBrand: "",
  vehicleModel: "",
};

//validation of login form fields
export const validationSchema = Yup.object().shape({
  vehicleNo: Yup.string().required("Required"),
  vehicleBrand: Yup.string().required("Required"),
  vehicleModel: Yup.string().required("Required"),
});
