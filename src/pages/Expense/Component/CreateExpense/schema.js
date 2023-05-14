import * as Yup from "yup";

//initial values
export const initialValues = {
  title: "",
  amount: "",
  description: "",
};

//validation
export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  amount: Yup.string().required("Required"),
});
