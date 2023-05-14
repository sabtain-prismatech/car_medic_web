import * as Yup from "yup";

//initial values
export const initialValues = {
  name: "",
  price: "",
  description: "",
};

//validation
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
});
