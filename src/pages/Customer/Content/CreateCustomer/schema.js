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
  vehicleNo: Yup.string(),
  vehicleModel: Yup.string().when("vehicleNo", {
    is: (val) => !!val,
    then: Yup.string().required("Vehicle model is required"),
  }),
  vehicleBrand: Yup.string().when("vehicleNo", {
    is: (val) => !!val,
    then: Yup.string().required("Vehicle brand is required"),
  }),
});
