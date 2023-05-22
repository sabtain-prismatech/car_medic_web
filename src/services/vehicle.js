import axios from "@axios/axiousConfig";

// Create-Vehicle-API-start
export const createVehicleApi = async (data) => {
  //endPoint
  const endPoint = "/vehicle/create";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On create Vehicle API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Create-Vehicle-API-End

// vehicle-list-start
export const vehicleListApi = async (data) => {
  //endPoint
  const endPoint = "/vehicle/list";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On list Vehicle API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// vehicle-list-end

// get-vehicles-by-customer-id-start
export const vehicleListByCustomerIdApi = async (data, id) => {
  //endPoint
  const endPoint = `/vehicle/specific-customer/${id}`;
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On list Vehicle API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// get-vehicles-by-customer-id-end
