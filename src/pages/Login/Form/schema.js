import * as Yup from "yup";

//initial values
export const initialValues = {
  phone: "",
  password: "",
};

//validation
export const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});
