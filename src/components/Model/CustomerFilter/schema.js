import * as Yup from "yup";

//initial values of login page
export const initialValues = {
  name: "",
  phone: "",
  vehicleNo: "",
  vehicleBrand: "",
  vehicleModel: "",
};

//validation of login form fields
export const validationSchema = Yup.object().shape({});
