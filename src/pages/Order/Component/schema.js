import * as Yup from "yup";

//initial values
export const initialValues = {
  vehicleId: "",
  servicesId: [],
  currentMileage: 0,
  bestKM: 0,
  discount: 0,
};

//validation
export const validationSchema = Yup.object().shape({
  vehicleId: Yup.string().required("Required"),
});
