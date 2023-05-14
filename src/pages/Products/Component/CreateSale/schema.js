import * as Yup from "yup";

//initial values
export const initialValues = (data) => {
  return {
    customerName: "",
    productId: data?._id,
    name: data?.name || "",
    description: data?.description || "",
    quantity: "",
    buyPrice: data?.price || "",
    salePrice: data?.salePrice || "",
    productType: data?.productType || "",
    discount: 0,
  };
};

//validation
export const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("Required"),
  quantity: Yup.string().required("Required"),
});
