import * as Yup from "yup";

//initial values of login page
export const initialValues = (value) => {
  return {
    name: value?.name,
    location: value?.location,
    phone: value?.phone,
    whatsapp: value?.whatsapp,
  };
};

//validation of login form fields
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});
