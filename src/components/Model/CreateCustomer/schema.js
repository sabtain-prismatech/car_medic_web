import * as Yup from "yup";

//initial values of login page
export const initialValues = {
  name: "",
  location: "",
  phone: "",
  whatsapp: false,
  status: "active",
  vehicleNo: "",
  vehicleBrand: "",
  vehicleModel: "",
};

//validation of login form fields
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});
