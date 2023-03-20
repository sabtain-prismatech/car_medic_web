import * as Yup from "yup";

//initial values
export const initialValues = {
  name: "",
  description: "",
  quantity: "",
  price: "",
  salePrice: "",
  productType: "",
};

//validation
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  quantity: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  salePrice: Yup.string().required("Required"),
  productType: Yup.string().required("Required"),
});
