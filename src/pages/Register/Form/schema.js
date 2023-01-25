import * as Yup from "yup";

//initial values
export const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

//validation
export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().required("Required"),
});
